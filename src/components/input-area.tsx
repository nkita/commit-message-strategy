import { Select, CheckBox, InputText, TextArea, View } from './'
import { ReactNode, useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

export const TopArea = ({
    template,
}: {
    template: any
}) => {
    return (
        <div>
            <h1 className='text-2xl py-4 font-semibold text-center'>{template?.title}</h1>
            <div><View data={template?.description} /></div>
            <div className='flex py-2 justify-start text-sm text-red-500'>*required</div>
        </div>
    )

}

export const InputArea = ({
    template,
    control,
    register,
    watch,
    autoFocus = true,
}: {
    template: any
    control: any
    register: any
    watch?: any
    autoFocus?: boolean
}
) => {
    return (
        <div className='justify-center px-2'>
            {template.input &&
                template.input.map((i: any, idx: number) => {
                    const str = watch(i.id)
                    const count = !str ? 0 : str.length
                    return (
                        <InputLine label={i.label} required={i.required} key={i.id} count={count} countLimit={i.count}>
                            <div>
                                {i.type.label === "select" &&
                                    <Select id={i.id} items={i.typeItem} control={control} placeholder={`Write a ${i.label}.`} autoFocus={autoFocus ? idx === 0 : autoFocus} />
                                }
                                {i.type.label === "toggle" &&
                                    <CheckBox id={i.id} register={register} autoFocus={autoFocus ? idx === 0 : autoFocus} />
                                }
                                {i.type.label === "input" &&
                                    <InputText id={i.id} register={register} placeholder={`Write a ${i.label}.`} maxLength={i.count} autoFocus={autoFocus ? idx === 0 : autoFocus} />
                                }
                                {i.type.label === "textarea" &&
                                    <TextArea id={i.id} register={register} rows={3} resize={true} placeholder={`Write a ${i.label}.`} maxLength={i.count} autoFocus={autoFocus ? idx === 0 : autoFocus} />
                                }
                            </div>
                            <Description description={i.description} />
                        </InputLine>
                    )
                })
            }
        </div>
    )
}
const Description = ({ description }: { description: any }) => {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            {description &&
                <div className='relative border border-gray-100  p-3 mt-1 rounded-md bg-gray-50'>
                    <div className={`${isOpen ? "h-full" : 'opacity-0 h-[0px] pointer-events-none'}  ease-in  duration-100`}>
                        <View data={description} />
                    </div>
                    <div className='flex justify-center pt-2  text-sm w-full '>
                        <div onClick={e => setOpen(!isOpen)} className='w-full'>
                            <div className='flex py-1 cursor-pointer border border-gray-50 bg-white items-center justify-center hover:bg-sky-50 hover:border-sky-100 '>
                                {!isOpen && <ChevronDownIcon className='w-[25px] h-[25]' />}
                                {isOpen && <ChevronUpIcon className='w-[25px] h-[25]' />}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}
export const ResultArea = ({
    template,
    register,
    handleCopyBtn,
    handleClearBtn,
    disabled,
    isEdit = false,
    withCmd = false,
}: {
    template: any
    register: any
    handleCopyBtn?: any
    handleClearBtn?: any
    disabled?: boolean
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
                        <p className={`${withCmd ? "" : "hidden"} text-sm text-gray-500 ease-in duration-300`}>git commit -m</p>
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
                    rows={1}
                    maxRows={100}
                />
            </div>
            <div className='flex justify-between  py-1'>
                <button type="button" onClick={handleClearBtn} className="text-blue-500 cursor-pointer ring-1 ring-blue-300 hover:ring-2 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center disabled:bg-gray-300 disabled:cursor-auto ease-in duration-150">
                    <div>
                        <span className='text-sm'>Clear<span className='pl-1 text-xs'>(Ctrl + L)</span></span>
                    </div>
                </button>
                {handleCopyBtn !== undefined && disabled !== undefined &&
                    <button type="button" onClick={handleCopyBtn} disabled={disabled} className="text-white cursor-pointer bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center disabled:bg-gray-300 disabled:cursor-auto ease-in duration-150">
                        <div>
                            <span className='text-sm'>Copy<span className='pl-1 text-xs'>(Ctrl + K)</span></span>
                        </div>
                    </button>
                }
            </div>
            <div className='h-5 text-right'>
                <div className={`${disabled ? "" : "hidden"} leading-4 text-red-400 text-xs ease-n duration-350`}>Enter the <span className="font-bold">required</span> information.</div>
            </div>
        </div >
    )
}

export const InputLine = ({
    label,
    required = false,
    count = 0,
    countLimit = null,
    children
}: {
    label: string,
    required?: boolean,
    count?: number | null
    countLimit?: number | null
    children: ReactNode
}) => {
    return (
        <div className='w-full py-1 '>
            <div className='flex justify-between align-text-bottom'>
                <div className={`pb-1 text-lg font-semibold ${required ? "text-red-500" : ""}`}>{`${label}${required ? "*" : ""}`}</div>
                {countLimit &&
                    <div className='flex text-gray-500 justify-end text-xs items-end'>{count}/{countLimit}</div>
                }
            </div>
            <div>{children}</div>
        </div>
    )
}

export const EditInputs = ({
    id,
    label,
    required,
    count = 100,
    description,
    target_value,
    replace_format,
    sort,
    type,
    typeItem,
    register,
    setValue,
}: {
    id: string
    label: string
    count?: number
    required: boolean
    description: string
    target_value: string
    replace_format: string
    type: 'select' | 'input' | 'textarea' | 'toggle'
    typeItem?: any,
    sort: number
    register: any
    setValue: any
}
) => {
    const [open, setOpen] = useState(true)
    const [items, setItems] = useState(typeItem ?? [])
    const handleAddItem = (id: string) => {
        const l = `edit-input-${id}-typeItem-label-${items.length}`
        const d = `edit-input-${id}-typeItem-description-${items.length}`
        setValue(l, "")
        setValue(d, "")
    }
    return (
        <>
            <div className='flex justify-between'>
                <h1>Input #{sort}</h1>
                <button className='text-lg bg-gray-100 text-center px-2 rounded-lg  border border-gray-200 hover:border-gray-600 ' onClick={() => setOpen(!open)}>{open ? "-" : "+"}</button>
            </div>
            <div className={`${open ? '' : 'hidden'} ease-in`}>
                <InputLine label="Input type.">
                    <select  {...register(`edit-input-${id}-type`)} defaultValue={type} placeholder='Select type' className='p-4 rounded-md w-full outline-none border focus:ring-1 border-gray-300 focus:ring-blue-300 focus:border-blue-300' >
                        <option value="input">input</option>
                        <option value="select">select</option>
                        <option value="textarea">textarea</option>
                        <option value="toggle">switch</option>
                    </select >
                </InputLine>
                {type === "select" && items &&
                    <div className='pl-10'>
                        Select Items
                        {
                            items.map((i: any, index: number) => {
                                return (
                                    <div key={i + index} className='p-1'>
                                        <InputLine label={`# ${index + 1}`} >
                                            <InputText id={`edit-input-${id}-typeItem-label-${index}`} placeholder='Write label' register={register} defaultValue={i.label} />
                                            <InputText id={`edit-input-${id}-typeItem-description-${index}`} placeholder='Write description' register={register} defaultValue={i.description} />
                                        </InputLine>
                                    </div>
                                )
                            })
                        }
                        <button onClick={e => handleAddItem(id)} className='py-1 px-2 bg-blue-500 text-white rounded-lg'> + Add </button>
                    </div>
                }
                <InputLine label="Label">
                    <InputText id={`edit-input-${id}-label`} placeholder='Write Label' register={register} defaultValue={label} />
                </InputLine>
                <InputLine label="Required">
                    <CheckBox id={`edit-input-${id}-required`} register={register} defaultChecked={required} />
                </InputLine>
                {(type === "input" || type === "textarea") &&
                    <InputLine label="Max Count">
                        <InputText id={`edit-input-${id}-count`} type="number" placeholder='Write Count' register={register} defaultValue={count} />
                    </InputLine>
                }
                <InputLine label="Description">
                    <TextArea id={`edit-input-${id}-description`} resize={true} rows={3} placeholder='Write Description' register={register} defaultValue={description} />
                </InputLine>
                <InputLine label="Target Value">
                    <TextArea id={`edit-input-${id}-target_value`} resize={true} placeholder='Write Target value.' register={register} defaultValue={target_value} />
                </InputLine>
                <InputLine label="Replace Value">
                    <TextArea id={`edit-input-${id}-replace_format`} resize={true} placeholder='Write Replace value.' register={register} defaultValue={replace_format} />
                </InputLine>
            </div >
        </>
    )
}
