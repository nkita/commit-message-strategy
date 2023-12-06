import { getServerSession } from "next-auth/next"
import { nextAuthOptions } from '@/lib/nextAuthOptions'
import { guestId } from '@/lib/guest'

export default async function sessionUID(): Promise<string> {
    const session = await getServerSession(nextAuthOptions)
    return (session && typeof session.user.id === 'string') ? session.user.id : guestId()
}