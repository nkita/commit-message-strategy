'use client'
import { Select, InputText, CheckBox, TextArea, View } from '@/components'
import React from 'react'
import type { ReactNode } from 'react'
import { useForm } from "react-hook-form"
import { useHotkeys } from 'react-hotkeys-hook'
import { Toaster, toast } from 'react-hot-toast'

import config from '@/inputdata.json'

export default function Home() {

  const {
    register,
    control,
    setValue,
    watch,
  } = useForm<any>()


  watch((data, { name }) => {
    if (name !== 'result') {
      if (["false", "true"].includes(Object.keys(data).filter(k => k !== 'result').map(k => data[k]).join(''))) {
        setValue('result', '')
      } else {
        let val = config.format
        config.inputs.forEach(i => {
          val = val.replace(i.target_value, !data[i.id] ? "" : i.replace_format.replace('${value}', data[i.id]))
        })
        setValue('result', val)
      }
    }
  })

  useHotkeys('ctrl+k', () => handleCopyBtn(), { enableOnFormTags: true })

  const handleCopyBtn = async () => {
    const msg = watch('result')
    if (msg) {
      await navigator.clipboard.writeText(msg)
      toast.success('Copied')
    }
  }

  return (
    <main className="flex pt-10 px-16 justify-center w-screen">
      <div className='md:min-w-[768px] md:max-w-[1024px]'>
        <h1 className='text-2xl py-4 text-center'>{config.title}</h1>
        <div><View data={config.description} /></div>
        <div className='flex py-2 justify-start text-sm text-red-500'>*required</div>
        <div className='md:flex gap-8 items-start pb-10'>
          <section className='justify-center px-2 md:w-6/12'>
            {config.inputs &&
              config.inputs.map((i, idx) => {
                return (
                  <InputLine label={i.label} required={i.required} key={i.id}>
                    <div>
                      {i.type === "select" &&
                        <Select id={i.id} items={i.type_items} control={control} placeholder={`Write a ${i.label}.`} autoFocus={idx === 0} />
                      }
                      {i.type === "toggle" &&
                        <CheckBox id={i.id} register={register} autoFocus={idx === 0} />
                      }
                      {i.type === "input" &&
                        <InputText id={i.id} register={register} placeholder={`Write a ${i.label}.`} autoFocus={idx === 0} />
                      }
                      {i.type === "textarea" &&
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
          </section>
          <section className='p-5 rounded-lg shadow-lg md:w-6/12 bg-white border md:w-min-[400px] md:sticky md:top-10'>
            <div className='flex justify-between items-center '>
              <h2>Result</h2>
              <div className='py-1'>
                <button type="button" onClick={handleCopyBtn} disabled={!watch('result')} className="text-white cursor-pointer bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center disabled:bg-gray-300 disabled:cursor-auto ease-in duration-150">
                  <div>
                    <span className='text-sm'>Copy<span className='pl-1 text-xs'>(Ctrl + K)</span></span>
                  </div>
                </button>
              </div>
            </div>
            <div className='pt-2'>
              <TextArea id='result'
                placeholder={config.format}
                register={register}
                rows={5}
              />
            </div>
          </section>
        </div>
      </div>
      <div><Toaster /></div>
    </main >
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
