'use client'
import { InputArea, ResultArea, TopArea } from '@/components'
import { useForm } from "react-hook-form"
import { useHotkeys } from 'react-hotkeys-hook'
import { Toaster, toast } from 'react-hot-toast'
import { useFetch } from '@/hooks/fetch'
import { useParams } from 'next/navigation'
import { Footer } from '@/components/footer';

export default function Home() {
  const params = useParams()
  const tid = params.id
  const { data: template, error: t_error, isLoading: t_loading } = useFetch(`/api/templates/${tid}`, { method: 'GET' })

  const {
    register,
    control,
    setValue,
    setFocus,
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
          val = val.replace(i.target_value, !data[i.id] ? "" : i.replace_format.replace('${value}', data[i.id]))
        })
        setValue('result', val)
      }
    }
  })

  useHotkeys('ctrl+k', () => handleCopyBtn(), { enableOnFormTags: true })
  useHotkeys('ctrl+l', () => handleClearBtn(), { enableOnFormTags: true })

  const handleCopyBtn = async () => {
    const msg = watch('result')
    if (msg) {
      await navigator.clipboard.writeText(msg)
      toast.success('Copied')
    }
  }

  const handleClearBtn = () => {
    setFocus(template.input[0].id)
    Object.entries(watch()).forEach(([k, v]) => {
      setValue(k, typeof v === 'boolean' ? false : "")
    })
    toast.success('Clear')
  }
  if (t_loading) return <><div className='flex justify-center items-center'>loading...</div></>
  if (!template) return <>No template</>
  if (t_error) return <>{t_error}</>

  return (
    <>
      <main className="flex pt-10 px-16 justify-center w-screen">
        <div className='md:min-w-[768px] md:max-w-[1024px]'>
          <section>
            <TopArea template={template} />
          </section>
          <div className='md:flex gap-8 items-start pb-10'>
            <section className='md:w-6/12'>
              <InputArea template={template} control={control} register={register} />
            </section>
            <section className='md:w-6/12  md:w-min-[400px] md:sticky md:top-10'>
              <ResultArea template={template} register={register} handleCopyBtn={handleCopyBtn} handleClearBtn={handleClearBtn} disableBtn={!watch('result')} />
            </section>
          </div>
        </div>
        <div><Toaster /></div>
      </main >
      <Footer />
    </>
  )
}