import * as React from 'react'
import { useCallback, useContext, useMemo, useState } from 'react'

import {
    CheckCircleFilled,
    CheckOutlined,
    CloseCircleFilled,
    CloseOutlined,
    EditFilled,
} from '@ant-design/icons'
import { Input, Select } from 'antd'

import { IColumnData, IRowData } from '../../types/table'
import { TableContext } from './TableContext'
import { mockedOptionList } from '../../mockedData'

type TColumn = {
    data: {
        column: IColumnData
        row: IRowData
    }
}

export const Column: React.FC<TColumn> = ({ data }) => {
    const { row, column } = data
    const { tableData, updateStoredData } = useContext(TableContext)
    const [isEditOpen, setEditOpen] = useState(false)
    const renderColumn = useMemo(() => {
        if (column.type === 'boolean') {
            return row[column.id] ? (
                <CheckCircleFilled />
            ) : (
                <CloseCircleFilled />
            )
        } else if (column.type === 'list') {
            return (
                <Select
                    defaultValue={row[column.id]}
                    style={{ width: '95%' }}
                    options={mockedOptionList}
                />
            )
        }
        return row[column.id]
    }, [row, column])

    const onEditPress = useCallback(() => {
        setEditOpen(!isEditOpen)
    }, [setEditOpen, isEditOpen])

    const rowIcon = useMemo(() => {
        if (column.id === 'name') {
            if (isEditOpen) {
                return <CloseOutlined onClick={onEditPress} />
            } else {
                return <EditFilled onClick={onEditPress} />
            }
        }
        return null
    }, [isEditOpen, column.id, onEditPress])

    const submitEditedValue = (newValue) => {
        const updatedData = tableData.data.map((item) => {
            if (row.id === item.id) {
                return {
                    ...item,
                    [column.id]: newValue,
                }
            }
            return item
        })

        updateStoredData({
            ...tableData,
            data: updatedData,
        })

        setEditOpen(false)
    }

    return (
        <div className="tableColumn" style={{ width: column.width || 100 }}>
            {isEditOpen ? (
                <ColumnEditForm
                    value={row[column.id]}
                    submit={submitEditedValue}
                />
            ) : (
                renderColumn
            )}
            {rowIcon}
        </div>
    )
}

const ColumnEditForm = ({ value, submit }) => {
    const [inputValue, setInputValue] = useState(value)
    const handleValueChange = ({ target: { value: newValue } }) =>
        setInputValue(newValue)

    const onSave = () => {
        submit(inputValue)
    }

    return (
        <>
            <Input
                style={{ width: '70%', margin: '0 8px' }}
                onChange={handleValueChange}
                value={inputValue}
            />
            <CheckOutlined onClick={onSave} />
        </>
    )
}
