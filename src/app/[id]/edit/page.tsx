'use client'
import { InputArea, TextArea, ResultArea, CheckBox, TopArea, InputText } from '@/components'
import { useForm } from "react-hook-form"
import { useHotkeys } from 'react-hotkeys-hook'
import { Toaster, toast } from 'react-hot-toast'
import { useFetch } from '@/hooks/fetch'
import { useParams } from 'next/navigation'
import { ReactNode, useState } from 'react'

export default function Home() {
  const [template, setTemplate] = useState({
    id: "aaa",
    title: "",
    description: "",
    input: [],
    format: ""
  })
  const params = useParams()
  const tid = params.id
  // const { data: template, error: t_error, isLoading: t_loading } = useFetch(`/api/templates/${tid}`, { method: 'GET' })
  const {
    register,
    control,
    setValue,
    watch,
  } = useForm<any>()

  watch((data, { name }) => {
    if (name === "edit-title") {
      template.title = data[name]
      setTemplate({ ...template })
      return
    }
    if (name === "edit-description") {
      template.description = data[name]
      setTemplate({ ...template })
      return
    }
    if (name === "edit-format") {
      template.format = data[name]
      setTemplate({ ...template })
      return
    }
    if (name?.includes("edit-input")) {
      const input_id = name.split("-")
      const id = input_id[2]
      const element = input_id[3]
      template.input.map((i: any) => {
        if (i.id === id) {
          console.log(element, data[name])
          i[element] = element === "type" ? { "label": data[name] } : data[name]
        }
        return i
      })
      console.log(template)
      setTemplate({ ...template })
    }

    if (name !== 'result') {
      if (["false", "true"].includes(Object.keys(data).filter(k => k !== 'result').map(k => data[k]).join(''))) {
        setValue('result', '')
      } else {
        let val = template.format
        template.input.forEach((i: any) => {
          if (i.id === 'cc100footer') {
            console.log(i.target_value, i.replace_format.replace('${value}', data[i.id]))
          }
          val = val.replace(i.target_value, !data[i.id] ? "" : i.replace_format.replace('${value}', data[i.id]))
        })
        setValue('result', val)
      }
    }
  })

  // if (t_loading) return <>loading...</>
  // if (!template) return <>No template</>
  // if (t_error) return <>{t_error}</>
  const handleAdd = () => {
    const inputs: any = template.input
    inputs.push({
      id: template.id + inputs.length,
      label: "",
      required: false,
      description: "",
      target_value: "",
      replace_format: "",
      type: { "label": "input" },
      typeItem: []
    })
    template.input = inputs
    setTemplate({ ...template })
  }
  return (
    <main className="flex pt-10 px-16 justify-center w-screen">
      <div className='w-full md:max-w-[1280px]'>
        <div className='md:flex gap-8 items-start pb-10'>
          <section className='justify-center md:w-6/12'>
            <InputLine label="Title" required={true} >
              <InputText id={"edit-title"} placeholder='Write Title' register={register} />
            </InputLine>
            <InputLine label="Description" required={true} >
              <TextArea id={"edit-description"} resize={true} rows={5} placeholder='Write description' register={register} />
            </InputLine>
            <InputLine label="Format" required={true} >
              <TextArea id={"edit-format"} resize={true} rows={5} placeholder='Write format' register={register} />
            </InputLine>
            {template.input.length > 0 &&
              <div>
                {template.input.map((i: any, idx) => {
                  return (
                    <div key={idx}>
                      <div className='p-4 border rounded-md'>
                        <EditInputs
                          id={i.id}
                          label={i.label}
                          required={i.required}
                          description={i.description}
                          target_value={i.target_value}
                          replace_format={i.replace_format}
                          type={i.type}
                          register={register}
                          sort={idx} />
                      </div>
                      <div className='py-2'></div>
                    </div>
                  )
                })
                }
              </div>
            }
            <div className='py-4'>
              <button onClick={handleAdd} className='w-full p-4 border border-dashed border-gray-400 rounded-md hover:border-blue-300 hover:bg-blue-50 ease-linear duration-200'>+Add</button>
            </div>
          </section>
          <section className='h-full md:w-6/12 md:w-min-[400px] overflow-auto md:sticky md:top-10'>
            <div className='bg-green-50 p-5 rounded-md'>
              <h1>Preview</h1>
              <TopArea template={template} />
              <InputArea template={template} control={control} register={register} />
              <ResultArea template={template} register={register} isEdit={true} />
            </div>
          </section>
        </div>
      </div>
      <div><Toaster /></div>
    </main >
  )
}

const EditInputs = ({
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
          <TextArea id={`edit-input-${id}-description`} rows={3} placeholder='Write Description' register={register} defaultValue={description} />
        </InputLine>
        <InputLine label="Target Value">
          <TextArea id={`edit-input-${id}-target_value`} placeholder='Write Target value.' register={register} defaultValue={target_value} />
        </InputLine>
        <InputLine label="Replace Value">
          <TextArea id={`edit-input-${id}-replace_format`} placeholder='Write Replace value.' register={register} defaultValue={replace_format} />
        </InputLine>
      </div>
    </>
  )
}

const InputLine = ({ label, required = false, children }: { label: string, required?: boolean, children: ReactNode }) => {
  return (
    <div className='w-full py-1'>
      <div className={`pb-1 text-base ${required ? "text-red-500" : ""}`}>{`${label}${required ? "*" : ""}`}</div>
      <div>{children}</div>
    </div>
  )
}