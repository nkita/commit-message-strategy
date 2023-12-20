import TextareaAutosize from 'react-textarea-autosize';

export const TextArea = (
    {
        id,
        name,
        rows = 3,
        maxRows = 8,
        register,
        placeholder,
        autoFocus = false,
        resize = false,
        defaultValue = "",
    }: {
        id: string
        name?: string
        rows?: number
        maxRows?: number
        register?: any
        placeholder?: string
        autoFocus?: boolean
        resize?: boolean
        defaultValue?: string
    }) => {
    const _n = !name ? id : name
    return (

        <TextareaAutosize
            name={_n}
            id={id}
            placeholder={placeholder}
            autoFocus={autoFocus}
            minRows={rows}
            maxRows={maxRows}
            defaultValue={defaultValue}
            {...register(id)}
            className={`py-2 pl-3 pr-3 ${resize ? "resize-y" : "resize-none"} w-full  leading-1  text-sm text-gray-900 bg-gray-50 outline-none border focus:ring-1 border-gray-300 focus:ring-blue-300 focus:border-blue-300 text-left rounded-md `}
        />
    )
}