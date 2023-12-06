'use client'
import { useEffect, useState } from "react"

const useLocalStorage = (key: string, defaultValue: string | number | boolean) => {
    const [value, setValue] = useState(JSON.stringify(defaultValue))
    useEffect(() => {
        const data = localStorage.getItem(key)
        if (data) {
            setValue(data)
        } else {
            setValue(JSON.stringify(defaultValue))
        }
    }, [key, defaultValue])

    const setValueAndStorage = (v: string | number | boolean) => {
        v = JSON.stringify(v)
        localStorage.setItem(key, v)
        setValue(v)
    }
    return [JSON.parse(value), setValueAndStorage]
}

export default useLocalStorage
