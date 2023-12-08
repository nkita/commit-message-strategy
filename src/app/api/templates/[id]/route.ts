import { responseJson } from '@/lib/response'
import { guestId } from '@/lib/guest'
import config from '@/inputdata.json'
import { select } from '@/db/template'

export const GET = async (request: Request, { params }: { params: any }) => {
    guestId()

    const result = await select()
    console.log(result[0].input)
    return responseJson(200, config)
}
export const POST = async () => responseJson(405)

