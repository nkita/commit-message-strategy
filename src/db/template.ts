import prisma from "@/db/prisma";
import { randomUUID } from "crypto";
export const select = async ({ where = {} }: { where: any }) => await prisma.gCTemplate.findMany({
    include: {
        input: {
            include: {
                typeItem: true,
                type: {
                    select: {
                        label: true
                    }
                }
            },
            orderBy:{
                sort:'asc'
            }
        }
    },
    where: where,
})
