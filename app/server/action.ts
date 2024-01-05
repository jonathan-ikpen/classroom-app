import prismadb from "@/lib/prismadb"

export const getCurrentUser = async (email: string) => {

    const getUser = await prismadb.user.findUnique({
        where: {
            email: email,
        },
    });

    return getUser;
};