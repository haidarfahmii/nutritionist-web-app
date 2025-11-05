// src/lib/backendless-helpers.ts
// Helper functions untuk Backendless operations yang lebih type-safe

import Backendless from "@/utils/backendless";

/**
 * Safe save operation with type checking
 * Backendless.Data.save() returns object with objectId, created, updated
 */
export async function safeSave<T>(
  tableName: string,
  data: any
): Promise<T & { objectId: string; created: number }> {
  try {
    const response = await Backendless.Data.of(tableName).save(data);

    // Validate response has objectId
    if (!response || typeof response !== "object") {
      throw new Error(`Invalid save response for ${tableName}`);
    }

    const result = response as any;

    if (!result.objectId || typeof result.objectId !== "string") {
      console.error("Save response:", result);
      throw new Error(
        `Save operation did not return objectId for ${tableName}`
      );
    }

    return result as T & { objectId: string; created: number };
  } catch (error) {
    console.error(`Error in safeSave for ${tableName}:`, error);
    throw error;
  }
}

/**
 * Find with relation - ensures relations are loaded
 */
export async function findWithRelation<T>(
  tableName: string,
  whereClause: string,
  relations: string[]
): Promise<T[]> {
  try {
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setWhereClause(whereClause);

    if (relations.length > 0) {
      queryBuilder.setRelated(relations);
    }

    const results = await Backendless.Data.of(tableName).find(queryBuilder);
    return results as T[];
  } catch (error) {
    console.error(`Error in findWithRelation for ${tableName}:`, error);
    throw error;
  }
}

/**
 * Find by ID with relations
 */
export async function findById<T>(
  tableName: string,
  objectId: string,
  relations: string[] = []
): Promise<T | null> {
  try {
    const results = await findWithRelation<T>(
      tableName,
      `objectId = '${objectId}'`,
      relations
    );

    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error(`Error in findById for ${tableName}:`, error);
    return null;
  }
}

/**
 * Create and fetch - save object then fetch with relations
 * This is the safest way to ensure all data is loaded correctly
 */
export async function createAndFetch<T>(
  tableName: string,
  data: any,
  relations: string[] = []
): Promise<T> {
  try {
    // Save data
    const saveResponse = await safeSave(tableName, data);
    const objectId = saveResponse.objectId;

    // Fetch complete object with relations
    const result = await findById<T>(tableName, objectId, relations);

    if (!result) {
      throw new Error(
        `Failed to fetch created ${tableName} with ID: ${objectId}`
      );
    }

    return result;
  } catch (error) {
    console.error(`Error in createAndFetch for ${tableName}:`, error);
    throw error;
  }
}

/**
 * Update and fetch - update object then fetch with relations
 */
export async function updateAndFetch<T>(
  tableName: string,
  objectId: string,
  updates: any,
  relations: string[] = []
): Promise<T> {
  try {
    const updateData = {
      objectId,
      ...updates,
    };

    await safeSave(tableName, updateData);

    const result = await findById<T>(tableName, objectId, relations);

    if (!result) {
      throw new Error(
        `Failed to fetch updated ${tableName} with ID: ${objectId}`
      );
    }

    return result;
  } catch (error) {
    console.error(`Error in updateAndFetch for ${tableName}:`, error);
    throw error;
  }
}

/**
 * Safe delete operation
 */
export async function safeDelete(
  tableName: string,
  objectId: string
): Promise<void> {
  try {
    await Backendless.Data.of(tableName).remove({ objectId });
  } catch (error) {
    console.error(`Error in safeDelete for ${tableName}:`, error);
    throw error;
  }
}

/**
 * Build query with filters
 */
export function buildQuery(options: {
  pageSize?: number;
  offset?: number;
  sortBy?: string[];
  whereClause?: string;
  relations?: string[];
}) {
  const queryBuilder = Backendless.DataQueryBuilder.create();

  if (options.pageSize) {
    queryBuilder.setPageSize(options.pageSize);
  }

  if (options.offset) {
    queryBuilder.setOffset(options.offset);
  }

  if (options.sortBy && options.sortBy.length > 0) {
    queryBuilder.setSortBy(options.sortBy);
  }

  if (options.whereClause) {
    queryBuilder.setWhereClause(options.whereClause);
  }

  if (options.relations && options.relations.length > 0) {
    queryBuilder.setRelated(options.relations);
  }

  return queryBuilder;
}

/**
 * Execute query
 */
export async function executeQuery<T>(
  tableName: string,
  queryBuilder: any
): Promise<T[]> {
  try {
    const results = await Backendless.Data.of(tableName).find(queryBuilder);
    return results as T[];
  } catch (error) {
    console.error(`Error executing query for ${tableName}:`, error);
    throw error;
  }
}
