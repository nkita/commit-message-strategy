
import { responseJson } from '@/lib/response'
import { guestId } from '@/lib/guest'
import cc100 from '@/recipes/cc100.json'
import { select } from '@/db/template'

export const GET = async (request: Request, { params }: { params: any }) => {
    guestId()

    // const result = await select({ where: { id: params.id } })
    let result = []
    switch (params.id) {
        case 'cc100':
            result.push(cc100)
            break;
        default:
            break;
    }
    if (result.length === 0) {
        return responseJson(400)
    } else {
        const inputs = result[0].input.map(i => {

        })
        return responseJson(200, result[0])
    }
}

// TOdo idは半角英数のみ
export const POST = async () => responseJson(405)

