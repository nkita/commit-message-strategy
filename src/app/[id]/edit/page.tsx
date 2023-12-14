'use client'
import { InputArea, TextArea, ResultArea, TopArea, InputText } from '@/components'
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
            <InputLine label="Type" required={true} >
              <EditInputs />
            </InputLine>
          </section>
          <section className='h-full md:w-6/12 md:w-min-[400px] overflow-auto md:sticky md:top-10'>
            <div className='bg-green-50 p-5 rounded-md'>
              <h1>Preview</h1>
              <TopArea template={template} />
              <InputArea template={template} control={control} register={register} />
              <ResultArea template={template} register={register} />
            </div>
          </section>
        </div>
      </div>
      <div><Toaster /></div>
    </main >
  )
}

const EditInputs = () => {
  return (
    <select className='p-4 rounded-md w-full outline-none border focus:ring-1 border-gray-300 focus:ring-blue-300 focus:border-blue-300' >
      <option value="select">select</option>
      <option value="input">input</option>
      <option value="textare">textare</option>
      <option value="toggle">switch</option>
    </select>
  )
}

const InputLine = ({ label, required, children }: { label: string, required: boolean, children: ReactNode }) => {
  return (
    <div className='w-full py-1'>
      <div className={`pb-1 text-base ${required ? "text-red-500" : ""}`}>{`${label}${required ? "*" : ""}`}</div>
      <div>{children}</div>
    </div>
  )
}