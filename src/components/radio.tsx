export const Radio = (
    {
        name,
        id,
        register,
        defaultChecked = false
    }: {
        name: string
        id: string
        register: any
        defaultChecked?: boolean
    }) => {

    return (
        <>
            <input type="radio" {...register(id)} name={name} id={id} defaultChecked={defaultChecked} />
        </>
    )
}