import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // requesting data from frontend
    const body = await req.json();

    const { user_id, title, quizId, instructions, url, upload, assignment, exam, test, lectureMaterial, } = body;

    if (assignment) {
      const createAssignment = await prismadb.assignment.create({
        data: {
          title,
          instructions,
          url,
          upload,
          courseId: user_id
        }
      })

      return NextResponse.json({
        success: true,
        data: createAssignment,
      });
    }

    if (test) {
      const createTest = await prismadb.test.create({
        data: {
          title,
          quizId,
          instructions,
          courseId: user_id
        }
      })

      return NextResponse.json({
        success: true,
        data: createTest,
      });
    }

    if (lectureMaterial) {
      const createLectureMaterial = await prismadb.lectureMaterial.create({
        data: {
          title,
          instructions,
          url,
          upload,
          courseId: user_id
        }
      })

      return NextResponse.json({
        success: true,
        data: createLectureMaterial,
      });
    }

    if (exam) {
      const createExam = await prismadb.exam.create({
        data: {
          title,
          content: instructions,
          courseId: user_id
        }
      })

      return NextResponse.json({
        success: true,
        data: createExam,
      });
    }

    return NextResponse.json({
      message: 'no action selected',
    });

  } catch (error) {
    console.log("[Members_Post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }

  }

export async function GET(req: Request) {
  try {
    const courses = await prismadb.course.findMany();
    return NextResponse.json({
      courses,
    });
  } catch (error) {
    console.log("[Users_Get]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
