// src/utils/backendless.ts
import Backendless from "backendless";

const APP_ID = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_BACKENDLESS_API_KEY;

if (!APP_ID || !API_KEY) {
  const errorMsg =
    "Backendless APP_ID or API_KEY is not defined in environment variables.";
  console.error(errorMsg);
  console.error("APP_ID exists:", !!APP_ID);
  console.error("API_KEY exists:", !!API_KEY);
  throw new Error(errorMsg);
}

// Initialize Backendless only once
if (!Backendless.appId) {
  try {
    Backendless.initApp(APP_ID, API_KEY);
    console.log("✅ Backendless SDK initialized successfully");
    console.log("📱 App ID:", APP_ID.substring(0, 8) + "...");
  } catch (error) {
    console.error("❌ Failed to initialize Backendless:", error);
    throw error;
  }
} else {
  console.log("ℹ️ Backendless SDK already initialized");
}

// Helper function untuk data validation
export function validateBackendlessResponse<T>(response: unknown): T | null {
  if (!response) {
    console.warn("⚠️ Backendless returned null/undefined");
    return null;
  }

  if (typeof response !== "object") {
    console.warn("⚠️ Backendless returned non-object:", typeof response);
    return null;
  }

  return response as T;
}

export default Backendless;
