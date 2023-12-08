import prisma from "@/db/prisma";
import { randomUUID } from "crypto";
export const select = async (opt: any = {}) => await prisma.gCTemplate.findMany({
    include: {
        input: {
            include: {
                typeItem: true,
                type: true
            },
        }
    },
    where: {
        id: 'cc1.0.0'
    }
})
