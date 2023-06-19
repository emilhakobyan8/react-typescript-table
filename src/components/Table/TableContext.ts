import { createContext } from 'react'

type TTableContext = {
    hiddenColumns: {
        [key: string]: string
    }
    setHiddenColumns: (value: { [key: string]: string }) => void
}

export const TableContext = createContext<null | TTableContext>(null)
