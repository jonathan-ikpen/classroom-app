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


export const deleteAssignments = async (id: number) => {
    const deleted = await prismadb.assignment.delete({
        where: { id: id },
    });

    return deleted;
};

export const testingActions = async () => {
    return true;
}

export const testingDeleter = async (id: number) => {
    const deleted = await prismadb.assignment.findUnique({
        where: {
            id: id
        }
    })

    return deleted
}

export const getMaterials = async (id: number) => {
    const materials = await prismadb.lectureMaterial.findMany({
        where: {
            courseId: id,
        },
    });

    return materials;
};


export const deleteMaterials = async (id: number) => {
    const deleted = await prismadb.lectureMaterial.delete({
        where: { id: id },
    });

    return deleted;
};

export const getTests = async (id: number) => {
    const tests = await prismadb.test.findMany({
        where: {
            courseId: id,
        },
    });

    return tests;
};

export const deleteTest = async (id: number) => {
    const deleted = await prismadb.test.delete({
        where: { id: id },
    });

    return deleted;
};