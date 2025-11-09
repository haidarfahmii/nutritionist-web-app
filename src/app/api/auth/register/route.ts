import { NextRequest, NextResponse } from "next/server";
import Backendless from "@/utils/backendless";

interface BackendlessUser {
  objectId: string;
  name: string;
  email: string;
  role?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // terima response sebagai any dulu
    const result = await Backendless.UserService.register({
      name,
      email,
      password,
      role: "user",
    });

    // validasi response
    if (!result || typeof result !== "object" || !("objectId" in result)) {
      console.error("Invalid Backendless response:", result);
      throw new Error("Invalid response from authentication service");
    }

    const registeredUser = result as BackendlessUser;

    // Filter response
    const safeUserData = {
      objectId: registeredUser.objectId,
      name: registeredUser.name,
      email: registeredUser.email,
      role: registeredUser.role || "user",
    };

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: safeUserData,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        data: null,
      },
      { status: 500 }
    );
  }
}
