
import { responseJson } from '@/lib/response'
import { guestId } from '@/lib/guest'
import config from '@/inputdata.json'
import { select } from '@/db/template'

export const GET = async (request: Request, { params }: { params: any }) => {
    guestId()

    const result = await select({ where: { id: params.id } })
    if (result.length === 0) {
        return responseJson(400)
    } else {
        return responseJson(200, config)
    }
}

// TOdo idは半角英数のみ
export const POST = async () => responseJson(405)

