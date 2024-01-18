'use client'
import { InputArea, TextArea, ResultArea, TopArea, InputText, EditInputs, InputLine } from '@/components'
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'react-hot-toast'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const params = useParams()
  const [isLoading, setLoading] = useState(true)
  const [template, setTemplate] = useState(
    {
      id: "i" + Math.floor(new Date().getTime() / 1000),
      title: "",
      description: "",
      input: [],
      format: ""
    }
  )
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/templates/${params.id}`);
      const data = await res.json();
      if (data) setTemplate(data)
      setLoading(false)
    }
    fetchData();
  }, [params.id]);

  const {
    register,
    control,
    setValue,
    watch,
  } = useForm<any>()


  if (isLoading) return <>loading...</>
  watch((data, { name }) => {
    if (name?.includes("edit-")) {
      const s = name.split("-")
      const type = s[1]
      const inputId = s[2]
      const inputElementName = s[3]
      if (type === "input") {
        template.input.map((i: any) => {
          if (i.id === inputId) {
            i[inputElementName] = inputElementName === "type" ? { "label": data[name] } : data[name]
          }
          return i
        })
      } else if (
        "title" === type ||
        "description" === type ||
        "format" === type
      ) {
        template[type] = data[name]
      }
      setTemplate({ ...template })
    } else {
      if (name !== 'result') {
        if (["false", "true"].includes(Object.keys(data).filter(k => k !== 'result').map(k => data[k]).join(''))) {
          setValue('result', '')
        } else {
          let val = template.format
          template.input.forEach((i: any) => {
            if (i.id === 'cc100footer') {
              // console.log(i.target_value, i.replace_format.replace('${value}', data[i.id]))
            }
            val = val.replace(i.target_value, !data[i.id] ? "" : i.replace_format.replace('${value}', data[i.id]))
          })
          setValue('result', val)
        }
      }

    }
  })

  const handleAdd = () => {
    const inputs: any = template.input
    inputs.push({
      id: template.id + inputs.length,
      label: "",
      required: false,
      description: "",
      target_value: "",
      replace_format: "${value}",
      type: { "label": "input" },
      typeItem: []
    })
    template.input = inputs
    setTemplate({ ...template })
  }
  return (
    <main className="flex pt-10 px-16 justify-center w-screen">
      <div className='w-full md:max-w-[1280px]'>
        <button className='bg-gray-100 p-2 rounded-md leading-3' onClick={e => console.info(JSON.stringify(template))}>GetJson</button>
        <div className='md:flex gap-8 items-start pb-10'>
          <section className='justify-center md:w-6/12'>
            <InputLine label="Title" required={true} >
              <InputText id={"edit-title"} placeholder='Write Title' defaultValue={template.title} register={register} />
            </InputLine>
            <InputLine label="Description" required={true} >
              <TextArea id={"edit-description"} resize={true} rows={3} placeholder='Write description' defaultValue={template.description} register={register} />
            </InputLine>
            {template.input.length > 0 &&
              <div>
                {template.input.map((i: any, idx: number) => {
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
                          type={i.type.label}
                          typeItem={i.typeItem}
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
            <InputLine label="Format" required={true} >
              <TextArea id={"edit-format"} resize={true} rows={3} placeholder='Write format' defaultValue={template.format} register={register} />
            </InputLine>
            <div className='py-4'>
              <button onClick={handleAdd} className='w-full p-4 border border-dashed border-gray-400 rounded-md hover:border-blue-300 hover:bg-blue-50 ease-linear duration-200'>+Add</button>
            </div>
          </section>
          <section className='h-full md:w-6/12 md:w-min-[400px] overflow-auto md:sticky md:top-10'>
            <div className='bg-green-50 p-5 rounded-md'>
              <h1>Preview</h1>
              <TopArea template={template} />
              <InputArea template={template} control={control} register={register} autoFocus={true} watch={watch} />
              <ResultArea template={template} register={register} isEdit={true} />
            </div>
          </section>
        </div>
      </div>
      <div><Toaster /></div>
    </main >
  )
}