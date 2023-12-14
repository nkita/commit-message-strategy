export const TextArea = (
    {
        id,
        name,
        rows = 2,
        register,
        placeholder,
        autoFocus = false,
        resize = false,
    }: {
        id: string
        name?: string
        rows?: number
        register?: any
        placeholder?: string
        autoFocus?: boolean
        resize?: boolean
    }) => {
    const _n = !name ? id : name
    return (
        <textarea
            name={_n}
            id={id}
            placeholder={placeholder}
            autoFocus={autoFocus}
            rows={rows}
            {...register(id)}
            className={`py-2 pl-3 pr-3 ${resize ? "resize-y" : "resize-none"} w-full  leading-1  text-sm text-gray-900 bg-gray-50 outline-none border focus:ring-1 border-gray-300 focus:ring-blue-300 focus:border-blue-300 text-left rounded-md `}
        />

    )
}