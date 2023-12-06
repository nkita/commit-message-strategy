import { cookies } from 'next/headers'
import { randomStr } from '@/lib/util'

export const guestId = () => {
    const guest_name = 'elg.guest'
    const guest = cookies().get(guest_name);
    if (guest) {
        return guest.value
    } else {
        const yymmdd = new Date().toLocaleDateString('ja-JP', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\//g, '');
        const id = `g-${yymmdd}-${randomStr()}`
        const maxAge = 15552000
        cookies().set(guest_name, id, { secure: true, httpOnly: true, maxAge: maxAge })
        return id
    }
}