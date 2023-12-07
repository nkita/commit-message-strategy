import { responseJson } from '@/lib/response'
import { guestId } from '@/lib/guest'
export const GET = async () => {
    guestId()
    return responseJson(200)
}
export const POST = async () => responseJson(405)

