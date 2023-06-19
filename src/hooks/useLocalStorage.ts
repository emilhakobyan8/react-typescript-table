import { useState, useEffect } from 'react'

const useLocalStorage = <Type>(
    key: string,
    initialValue: Type
): [Type, (value: Type) => void] => {
    const [storedValue, setStoredValue] = useState<Type>(() => {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue))
    }, [key, storedValue])

    const updateValue = (value: Type) => {
        setStoredValue(value)
    }

    return [storedValue, updateValue]
}

export default useLocalStorage
