
export const InputText = (
    {
        id,
        type = "text",
        name,
        register,
        placeholder,
        autoFocus = false,
        maxLength,
        defaultValue = "",
    }: {
        id: string
        type?: string
        name?: string
        register: any
        placeholder?: string
        autoFocus?: boolean
        maxLength?: number
        defaultValue?: string | number
    }) => {
    const _n = !name ? id : name
    return (
        <input
            type={type}
            autoFocus={autoFocus}
            name={_n}
            id={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            maxLength={maxLength}
            {...register(id)}
            className="py-2 pl-3 pr-3  w-full  leading-1  text-base text-gray-900 bg-sky-50 outline-none border focus:ring-1 border-gray-300 focus:ring-blue-300 focus:border-blue-300 text-left rounded-md"
        />
    )
}