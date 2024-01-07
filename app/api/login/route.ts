import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // requesting data from frontend
        const body = await req.json();

        const { email, password } = body;

        if (!email) {
            return new NextResponse("Invalid email", { status: 401 });
        }

        const existingUser = await prismadb.user.findUnique({
            where: {
                email: email,
            },
        });

        const isUser = existingUser?.password === password

        if(!isUser) return new NextResponse("User Credential does not Match", { status: 401 })


        return NextResponse.json({
            success: true,
            data: existingUser,
            isUser,
        });
    } catch (error) {
        console.log("[Users_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
