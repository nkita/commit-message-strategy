import { Combobox } from '@headlessui/react'
import { useState } from 'react'
import { Controller } from "react-hook-form"
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

export const Select = ({
    id,
    items,
    control,
    placeholder,
    autoFocus = false
}: {
    id: string,
    items: any,
    control: any,
    placeholder?: string, autoFocus?: boolean
}) => {
    const [query, setQuery] = useState('')
    const filteredItems =
        query === ''
            ? items
            : items.filter((item: any) =>
                item.label.toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )
    return (
        <div className='w-full'>
            <Controller
                name={id}
                control={control}
                defaultValue={''}
                rules={{
                    required: "Please select a type",
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                    <Combobox value={value} onChange={onChange} nullable>
                        <div className="relative mt-1">
                            <div className="relative w-full">
                                <Combobox.Input onBlur={onBlur} displayValue={(item: string) => item} onChange={(event) => setQuery(event.target.value)} maxLength={50} autoFocus={autoFocus} placeholder={placeholder} className="py-2 pl-3 pr-10  w-full leading-1  text-sm text-gray-900 bg-gray-50 outline-none border focus:ring-1 border-gray-300 focus:ring-blue-300 focus:border-blue-300 text-left rounded-md" />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>
                            </div>
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 ring-1 ring-gray-500 focus:outline-none text-base shadow-2xl z-10" >
                                {filteredItems.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredItems.map((item: any) => (
                                        <Combobox.Option key={item.label} value={item.label} className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4  ${active ? 'bg-blue-50 text-gray-900' : 'text-gray-600'
                                            }`
                                        }>

                                            <div className='text-sm font-bold'>
                                                {item.label}
                                            </div>
                                            <div className={'font-light text-sm'}>
                                                {item.description}
                                            </div>
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </div>
                    </Combobox>
                )} />
        </div>
    )
}