'use client'
import { InputArea, ResultArea, TopArea } from '@/components'
import { useForm } from "react-hook-form"
import { useHotkeys } from 'react-hotkeys-hook'
import { Toaster, toast } from 'react-hot-toast'
import { useFetch } from '@/hooks/fetch'
import { useParams } from 'next/navigation'

export default function Home() {
  const params = useParams()
  const tid = params.id
  const { data: template, error: t_error, isLoading: t_loading } = useFetch(`/api/templates/${tid}`, { method: 'GET' })

  const {
    register,
    control,
    setValue,
    watch,
  } = useForm<any>()

  watch((data, { name }) => {
    if (!template) return
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


  if (t_loading) return <>loading...</>
  if (!template) return <>No template</>
  if (t_error) return <>{t_error}</>

  return (
    <main className="flex pt-10 px-16 justify-center w-screen">
      <div className='md:min-w-[768px] md:max-w-[1024px]'>
        <section>
          <TopArea template={template} />
        </section>
        <div className='md:flex gap-8 items-start pb-10'>
          <section className='md:w-6/12'>
            <InputArea template={template} control={control} register={register} />
          </section>
          <section className='h-full md:w-6/12 md:w-min-[400px] overflow-auto md:sticky md:top-10'>
            <div className='bg-green-50 p-5 rounded-md'>
              <h1>Preview</h1>
              <TopArea template={template}  />
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