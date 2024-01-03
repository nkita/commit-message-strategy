export const Card = (
    {
        emoji,
        title,
        description,
        updateAt,
        isCompact = false,
    }: {
        emoji: string
        title: string
        description: string
        updateAt: string
        isCompact?: boolean
    }
) => {

    return (
        <a className="hover:shadow-none  bg-white shadow-md rounded-md border border-gray-100 hover:bg-blue-50 hover:border-blue-300 hover:cursor-pointer ease-in duration-200">
            <div className={`p-8 ${isCompact ? "w-[400px] md:h-[300px] md:w-[300px]" : "h-[300px] md:h-[350px]"}`}>
                <div className="text-3xl text-center ">{emoji}</div>
                <div className={`${isCompact ? "line-clamp-1 h-[40px] md:line-clamp-2" : "h-[70px] md:h-[100px] line-clamp-2 md:line-clamp-3"} font-semibold  text-lg text-gray-800 text-center py-3`}>
                    <h1>{title}</h1>
                </div>
                <div className="text-gray-600 text-base line-clamp-6">{description}</div>
            </div>
            <div className="text-xs text-gray-400 p-2 text-right">{updateAt}</div>
        </a >
    )
}