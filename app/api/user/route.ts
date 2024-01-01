import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // requesting data from frontend
    const body = await req.json();

    const { firstname, lastname, email, photoUrl, user_type, matric_no, course_code } = body;

    if (!email) {
      return new NextResponse("Invalid email", { status: 401 });
    }

    if (user_type === "LECTURER") {
      const createLecturer = await prismadb.lecturer.create({
        data: {
          email,
          lastname,
          fname: firstname,
          photoUrl,
          course: course_code
        }
      })

      return NextResponse.json({
        createLecturer,
      });
    } else if (user_type === "STUDENT") {
      const createStudent = await prismadb.student.create({
        data: {
          email,
          lastname,
          fname: firstname,
          matno: matric_no,
          photoUrl,
        }
      })

      return NextResponse.json({
        createStudent,
      });
    }

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
