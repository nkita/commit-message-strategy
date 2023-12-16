
export const InputText = (
    {
        id,
        name,
        register,
        placeholder,
        autoFocus = false,
        defaultValue = "",
    }: {
        id: string
        name?: string
        register: any
        placeholder?: string
        autoFocus?: boolean
        defaultValue?: string
    }) => {
    const _n = !name ? id : name
    return (
        <input
            type="text"
            autoFocus={autoFocus}
            name={_n}
            id={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...register(id)}
            className="py-2 pl-3 pr-3  w-full  leading-1  text-sm text-gray-900 bg-gray-50 outline-none border focus:ring-1 border-gray-300 focus:ring-blue-300 focus:border-blue-300 text-left rounded-md"
        />
    )
}