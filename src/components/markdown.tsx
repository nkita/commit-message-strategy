import Markdown from 'react-markdown'

export const View = ({
    data
}: {
    data: string
}) => {
    return (
        <div className='markdown'>
            <Markdown>{data}</Markdown>
        </div>
    )
}
