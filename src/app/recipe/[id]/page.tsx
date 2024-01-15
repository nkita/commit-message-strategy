'use client'
import { InputArea, ResultArea, TopArea, Spiner } from '@/components'
import { useForm } from "react-hook-form"
import { useHotkeys } from 'react-hotkeys-hook'
import { Toaster, toast } from 'react-hot-toast'
import { useFetch } from '@/hooks/fetch'
import { useParams } from 'next/navigation'
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react'

export default function Home() {
  const [isFormValid, setFormValid] = useState(false)
  const params = useParams()
  const tid = params.id
  const { data: template, error: t_error, isLoading: t_loading } = useFetch(`/api/templates/${tid}`, { method: 'GET' })

  const {
    register,
    control,
    setValue,
    setFocus,
    watch,
  } = useForm<any>({
    defaultValues: {
      withcmd: true
    }
  })
  watch((data, { name }) => {
    if (!template) return
    if (name !== 'result' && name !== 'withcmd') {
      // not input
      if (!Object.keys(data).filter(k => (k !== 'result' && k !== 'withcmd')).map(k => data[k]).filter(d => d !== false).join('')) {
        setValue('result', '')
      } else {
        let val = template.format
        let isError = false
        template.input.forEach((i: any) => {
          val = val.replace(i.target_value, !data[i.id] ? "" : i.replace_format.replace('${value}', data[i.id]))
          if (i.required) {
            if (!data[i.id]) {
              isError = true
            }
          }
        })
        setFormValid(!isError)
        setValue('result', val)
      }
    }
  })
  useHotkeys('ctrl+k', () => handleCopyBtn(), { enableOnFormTags: true })
  useHotkeys('ctrl+l', () => handleClearBtn(), { enableOnFormTags: true })

  const handleCopyBtn = async () => {
    if (!isFormValid) return
    const msg = watch('result')
    const cmd = watch('withcmd')
    if (msg) {
      await navigator.clipboard.writeText(cmd ? `git commit -m "${msg}"` : msg)
      toast.success('Copied')
    }
  }

  const handleClearBtn = () => {
    setFocus(template.input[0].id)
    Object.entries(watch()).forEach(([k, v]) => {
      if (k !== 'withcmd') setValue(k, typeof v === 'boolean' ? false : "");
    })
    toast.success('Clear')
  }

  if (t_loading) return (
    <div className='absolute top-1/2 left-1/2 h-12 w-12'>
      <Spiner />
    </div>
  )
  if (!template) return <>No template</>
  if (t_error) return <>{t_error}</>

  return (
    <>
      <main className="flex pt-10 px-8 md:px-16 justify-center">
        <div className='w-[1280px]'>
          <section>
            <TopArea template={template} />
          </section>
          <div className='md:flex gap-8 items-start pb-10'>
            <section className='md:w-6/12'>
              <InputArea template={template} control={control} register={register} watch={watch} />
            </section>
            <section className='md:w-6/12  md:sticky md:top-10'>
              <ResultArea template={template} register={register} handleCopyBtn={handleCopyBtn} handleClearBtn={handleClearBtn} withCmd={watch('withcmd')} disabled={!isFormValid} />
            </section>
          </div>
        </div>
        <div><Toaster /></div>
      </main >
    </>
  )
}