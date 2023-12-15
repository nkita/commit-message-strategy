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
    if (name === "edit_title") {
      template.title = data[name]
      setTemplate({ ...template })
      return
    }
    if (name === "edit_description") {
      template.description = data[name]
      setTemplate({ ...template })
      return
    }
    if (name === "edit_format") {
      template.format = data[name]
      setTemplate({ ...template })
      return
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
      type: ""
    })
    template.input = inputs
    setTemplate({ ...template })
  }

  return (
    <main className="flex pt-10 px-16 justify-center w-screen">
      <div className='md:min-w-[768px] md:max-w-[1024px]'>
        <div className='md:flex gap-8 items-start pb-10'>
          <section className='justify-center md:w-6/12'>
            <InputLine label="Title" required={true} >
              <InputText id={"edit_title"} placeholder='Write Title' register={register} />
            </InputLine>
            <InputLine label="Description" required={true} >
              <TextArea id={"edit_description"} resize={true} rows={5} placeholder='Write description' register={register} />
            </InputLine>
            <InputLine label="Format" required={true} >
              <TextArea id={"edit_format"} resize={true} rows={5} placeholder='Write format' register={register} />
            </InputLine>
            {template.input.length > 0 &&
              <div>
                {template.input.map((i: any, idx) => {
                  return (
                    <>
                      <div key={idx} className='p-4 border rounded-md'>
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
                    </>
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
  required: string
  description: string
  target_value: string
  replace_format: string
  type: 'select' | 'input' | 'textarea' | 'toggle'
  sort: number
  register: any
}
) => {
  return (
    <>
      <h1>Input #{sort}</h1>
      <div>
        <InputLine label="Please input type.">
          <select placeholder='Select type' className='p-4 rounded-md w-full outline-none border focus:ring-1 border-gray-300 focus:ring-blue-300 focus:border-blue-300' >
            <option value="select">select</option>
            <option value="input">input</option>
            <option value="textare">textare</option>
            <option value="toggle">switch</option>
          </select >
        </InputLine>
        <InputLine label="Label">
          <InputText id={"edit_input_label" + id} placeholder='Write Label' register={register} />
        </InputLine>
        <InputLine label="Required">
          <CheckBox id={"edit_input_required" + id} register={register} />
        </InputLine>
        <InputLine label="Description">
          <TextArea id={"edit_input_description" + id} placeholder='Write Description' register={register} />
        </InputLine>
        <InputLine label="Target Value">
          <TextArea id={"edit_input_target" + id} placeholder='Write Target value.' register={register} />
        </InputLine>
        <InputLine label="Replace Value">
          <TextArea id={"edit_input_replace" + id} placeholder='Write Replace value.' register={register} />
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