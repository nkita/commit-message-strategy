import { Select, CheckBox, InputText, TextArea, View } from './'
import { ReactNode, useState } from 'react'

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
    register,
    autoFocus = true,
}: {
    template: any
    control: any
    register: any,
    autoFocus?: boolean
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
                                    <Select id={i.id} items={i.typeItem} control={control} placeholder={`Write a ${i.label}.`} autoFocus={autoFocus ? idx === 0 : autoFocus} />
                                }
                                {i.type.label === "toggle" &&
                                    <CheckBox id={i.id} register={register} autoFocus={autoFocus ? idx === 0 : autoFocus} />
                                }
                                {i.type.label === "input" &&
                                    <InputText id={i.id} register={register} placeholder={`Write a ${i.label}.`} autoFocus={autoFocus ? idx === 0 : autoFocus} />
                                }
                                {i.type.label === "textarea" &&
                                    <TextArea id={i.id} register={register} rows={3} resize={true} placeholder={`Write a ${i.label}.`} autoFocus={autoFocus ? idx === 0 : autoFocus} />
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
    handleClearBtn,
    disableBtn,
    isEdit = false,
    withCmd = false,
}: {
    template: any
    register: any
    handleCopyBtn?: any
    handleClearBtn?: any
    disableBtn?: boolean
    isEdit?: boolean
    withCmd?: boolean
}) => {
    if (template.input.length === 0 && !isEdit) return
    return (
        <div className={`p-5 rounded-lg ${isEdit ? "shadow-none" : "shadow-lg"} bg-white border`}>
            <h2>Result</h2>
            {!isEdit &&
                <div className='flex justify-between pt-2'>
                    <div className='leading-5'>
                        {withCmd &&
                            <p className='text-sm text-gray-500'>git commit -m</p>
                        }
                    </div>
                    <div className='flex'>
                        <label htmlFor='withcmd' className='text-xs pr-2 text-gray-500'>Execute from git command</label>
                        <input id='withcmd' type="checkbox" {...register("withcmd")} />
                    </div>
                </div>
            }
            <div className='pt-1'>
                <TextArea id='result'
                    placeholder={template.format}
                    register={register}
                    resize={true}
                    rows={3}
                />
            </div>
            <div className='flex justify-between  py-1'>
                <button type="button" onClick={handleClearBtn} className="text-blue-500 cursor-pointer ring-1 ring-blue-300 hover:ring-2 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center disabled:bg-gray-300 disabled:cursor-auto ease-in duration-150">
                    <div>
                        <span className='text-sm'>Clear<span className='pl-1 text-xs'>(Ctrl + L)</span></span>
                    </div>
                </button>
                {handleCopyBtn !== undefined && disableBtn !== undefined &&
                    <button type="button" onClick={handleCopyBtn} disabled={disableBtn} className="text-white cursor-pointer bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center disabled:bg-gray-300 disabled:cursor-auto ease-in duration-150">
                        <div>
                            <span className='text-sm'>Copy<span className='pl-1 text-xs'>(Ctrl + K)</span></span>
                        </div>
                    </button>
                }
            </div>
        </div >
    )
}

export const InputLine = ({ label, required = false, children }: { label: string, required?: boolean, children: ReactNode }) => {
    return (
        <div className='w-full py-1'>
            <div className={`pb-1 text-base ${required ? "text-red-500" : ""}`}>{`${label}${required ? "*" : ""}`}</div>
            <div>{children}</div>
        </div>
    )
}

export const EditInputs = ({
    id,
    label,
    required,
    description,
    target_value,
    replace_format,
    sort,
    register,
}: {
    id: string
    label: string
    required: boolean
    description: string
    target_value: string
    replace_format: string
    type: 'select' | 'input' | 'textarea' | 'toggle'
    sort: number
    register: any
}
) => {
    const [open, setOpen] = useState(true)
    return (
        <>
            <div className='flex justify-between'>
                <h1>Input #{sort}</h1>
                <button className='text-lg bg-gray-100 text-center px-2 rounded-lg  border border-gray-200 hover:border-gray-600 ' onClick={() => setOpen(!open)}>{open ? "-" : "+"}</button>
            </div>
            <div className={`${open ? '' : 'hidden'} ease-in`}>
                <InputLine label="Please input type.">
                    <select  {...register(`edit-input-${id}-type`)} placeholder='Select type' className='p-4 rounded-md w-full outline-none border focus:ring-1 border-gray-300 focus:ring-blue-300 focus:border-blue-300' >
                        <option value="input">input</option>
                        <option value="select">select</option>
                        <option value="textarea">textarea</option>
                        <option value="toggle">switch</option>
                    </select >
                </InputLine>
                <InputLine label="Label">
                    <InputText id={`edit-input-${id}-label`} placeholder='Write Label' register={register} defaultValue={label} />
                </InputLine>
                <InputLine label="Required">
                    <CheckBox id={`edit-input-${id}-required`} register={register} defaultChecked={required} />
                </InputLine>
                <InputLine label="Description">
                    <TextArea id={`edit-input-${id}-description`} resize={true} rows={3} placeholder='Write Description' register={register} defaultValue={description} />
                </InputLine>
                <InputLine label="Target Value">
                    <TextArea id={`edit-input-${id}-target_value`} resize={true} placeholder='Write Target value.' register={register} defaultValue={target_value} />
                </InputLine>
                <InputLine label="Replace Value">
                    <TextArea id={`edit-input-${id}-replace_format`} resize={true} placeholder='Write Replace value.' register={register} defaultValue={replace_format} />
                </InputLine>
            </div>
        </>
    )
}
