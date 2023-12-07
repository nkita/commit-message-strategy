import { responseJson } from '@/lib/response'
import { guestId } from '@/lib/guest'
import config from '@/inputdata.json'

export const GET = async (request: Request, { params }: { params: any }) => {
    guestId()

    return responseJson(200, config)
}
export const POST = async () => responseJson(405)

