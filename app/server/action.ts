"use server"
import prismadb from "@/lib/prismadb"

export const getCurrentUser = async (email: string) => {

    const getUser = await prismadb.user.findUnique({
        where: {
            email: email,
        },
    });

    return getUser;
};

export const getAssignments = async (id: number) => {
    const assignments = await prismadb.assignment.findMany({
        where: {
            courseId: id,
        },
    });

    return assignments;
};

export const testingActions = async () => {
    return true;
}

export const getMaterials = async (id: number) => {
    const materials = await prismadb.lectureMaterial.findMany({
        where: {
            courseId: id,
        },
    });

    return materials;
};

export const getTests = async (id: number) => {
    const tests = await prismadb.test.findMany({
        where: {
            courseId: id,
        },
    });

    return tests;
};