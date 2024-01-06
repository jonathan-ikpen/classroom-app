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

        if(existingUser) {
            return new NextResponse("User Already Exist", { status: 401 });
        }

        const createdUser = await prismadb.user.create({
            data: {
                email,
                firstName: "",
                lastName: "",
                role: "",
                photoUrl: "",
                matno: "",
                password,
                course: {
                    create: {
                        title: "",
                    }
                },
            }});

        return NextResponse.json({
            success: true,
            data: createdUser,
        });

    } catch (error) {
        console.log("[Members_Post]", error);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function GET(req: Request) {
    try {
        const users = await prismadb.user.findMany();
        return NextResponse.json({
            users,
        });
    } catch (error) {
        console.log("[Users_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
