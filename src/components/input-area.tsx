
import { Select, CheckBox, InputText, TextArea, View } from './'
import { ReactNode } from 'react'

export const TopArea = ({
    template,
}: {
    template: any
}) => {
    return (
        <div>
            <h1 className='text-2xl py-4 text-center'>{template?.title}</h1>
            <div><View data={template?.description} /></div>
            <div className='flex py-2 justify-start text-sm text-red-500'>*required</div>
        </div>
    )

}

export const InputArea = ({
    template,
    control,
    register
}: {
    template: any
    control: any
    register: any
}
) => {
    return (
        <div className='justify-center px-2'>
            {template.input &&
                template.input.map((i: any, idx: number) => {
                    return (
                        <InputLine label={i.label} required={i.required} key={i.id}>
                            <div>
                                {i.type.label === "select" &&
                                    <Select id={i.id} items={i.typeItem} control={control} placeholder={`Write a ${i.label}.`} autoFocus={idx === 0} />
                                }
                                {i.type.label === "toggle" &&
                                    <CheckBox id={i.id} register={register} autoFocus={idx === 0} />
                                }
                                {i.type.label === "input" &&
                                    <InputText id={i.id} register={register} placeholder={`Write a ${i.label}.`} autoFocus={idx === 0} />
                                }
                                {i.type.label === "textarea" &&
                                    <TextArea id={i.id} register={register} rows={3} placeholder={`Write a ${i.label}.`} autoFocus={idx === 0} />
                                }
                            </div>
                            <div className='pb-4'>
                                <View data={i.description} />
                            </div>
                        </InputLine>
                    )
                })
            }
        </div>
    )
}

export const ResultArea = ({
    template,
    register,
    handleCopyBtn,
    disableBtn,
    isEdit = false,
}: {
    template: any
    register: any
    handleCopyBtn?: any
    disableBtn?: boolean
    isEdit?: boolean
}) => {

    if (template.input.length === 0 && !isEdit) return
    return (
        <div className={`p-5 rounded-lg ${isEdit ? "shadow-none" : "shadow-lg"} bg-white border`}>
            <div className='flex justify-between items-center '>
                <h2>Result</h2>
                {handleCopyBtn !== undefined && disableBtn !== undefined &&
                    <div className='py-1'>
                        <button type="button" onClick={handleCopyBtn} disabled={disableBtn} className="text-white cursor-pointer bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center disabled:bg-gray-300 disabled:cursor-auto ease-in duration-150">
                            <div>
                                <span className='text-sm'>Copy<span className='pl-1 text-xs'>(Ctrl + K)</span></span>
                            </div>
                        </button>
                    </div>
                }
            </div>
            <div className='pt-2'>
                <TextArea id='result'
                    placeholder={template.format}
                    register={register}
                    rows={5}
                />
            </div>
        </div >
    )
}

const InputLine = ({ label, required, children }: { label: string, required: boolean, children: ReactNode }) => {
    return (
        <div className='w-full py-1'>
            <div className={`pb-1 text-sm ${required ? "text-red-500" : ""}`}>{`${label}${required ? "*" : ""}`}</div>
            <div>{children}</div>
        </div>
    )
}