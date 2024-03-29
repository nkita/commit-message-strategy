
export const CheckBox = (
    {
        id,
        name,
        register,
        autoFocus = false,
        defaultChecked = false,
    }: {
        id: string
        name?: string
        register: any
        autoFocus?: boolean
        defaultChecked?: boolean
    }) => {
    const _n = !name ? id : name
    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name={_n} id={id} {...register(id)} defaultChecked={defaultChecked} autoFocus={autoFocus} className="sr-only peer" />
                <div className="outline outline-sky-200 outline-1 w-11 h-6 bg-sky-50 peer-focus:outline-none rounded-full peer peer-focus:ring-2 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
        </>
    )
}