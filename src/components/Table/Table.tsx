import * as React from 'react'
import { useMemo, useRef, useState } from 'react'
import { VariableSizeList } from 'react-window'
import { Input, Select } from 'antd'

import TableOptions from '../TableOptions/TableOptions'
import { ITableData } from '../../types/table'

import { TableContext } from './TableContext'

import './styles.css'
import { TABLE_HEAD_HEIGHT, TABLE_ROW_HEIGHT } from './constants'
import RowContainer from './RowContainer'

type TTable = {
    tableData: ITableData
}

const Table: React.FC<TTable> = ({ tableData, updateStoredData }) => {
    const { columns, data } = tableData
    const [hiddenColumns, setHiddenColumns] = useState({})
    const [groupBy, setGroupBy] = useState<string>('none')
    const [searchValue, setSearchValue] = useState<string>('')
    const listRef = useRef<VariableSizeList | null>()

    const [expandedRows, setExpandedRows] = useState<number[]>([])

    const handleSearchValueChange = ({ target: { value } }) => {
        setSearchValue(value)
    }

    const headerColumns = useMemo(() => {
        return columns.map(({ id, title }) => ({ key: id, label: title }))
    }, [columns])

    const filteredColumns = useMemo(() => {
        const rowWidth = columns.reduce(
            (sum, column) =>
                hiddenColumns[column.id] ? sum : sum + column?.width || 100,
            0
        )
        const updatedColumns = columns.map((column) => ({
            ...column,
            width: `${(column.width / rowWidth) * 100}%`,
        }))

        return updatedColumns.filter((item) => !hiddenColumns[item.id])
    }, [columns, hiddenColumns])

    const filteredRows = useMemo(() => {
        const searchValueTrimmed = searchValue.trim().toLowerCase()
        return data.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchValueTrimmed) ||
                item.age === Number(searchValueTrimmed) ||
                item.id === searchValueTrimmed ||
                item.gender.toLowerCase() === searchValueTrimmed ||
                (item.isActive && searchValueTrimmed === 'active') ||
                (!item.isActive && searchValueTrimmed === 'inactive')
            )
        })
    }, [searchValue, data])

    const groupedList = useMemo(() => {
        if (groupBy === 'none') {
            return filteredRows
        }
        return Object.values(
            filteredRows.reduce((groups, item) => {
                const key = item[groupBy]
                if (!groups[key]) {
                    groups[key] = { ...item, children: [] }
                } else {
                    groups[key].children.push(item)
                }
                return groups
            }, {})
        )
    }, [filteredRows, groupBy])

    const rows = useMemo(() => {
        listRef.current?.resetAfterIndex(0)
        return groupedList.reduce((list, item) => {
            if (!item.children?.length) {
                list.push(item)
                return list
            }
            item.expanded = expandedRows.includes(item.id)
            const { children, ...rest } = item
            list.push({ ...rest })
            if (item.expanded) {
                list.push({ header: true })
                list.push(...children.map((item) => ({ ...item, child: true })))
            }
            return list
        }, [])
    }, [groupedList, expandedRows])

    const groupColumnOptions = useMemo(() => {
        let options = columns
            .filter((item) => item.id !== 'id' && item.id !== 'isActive')
            .map((item) => ({ label: item.title, value: item.id }))
        options = [{ value: 'none', label: 'None' }, ...options]
        return options
    }, [columns])

    const handleChange = ({ value }) => {
        setGroupBy(value)
        setExpandedRows([])
        listRef.current?.resetAfterIndex(0)
    }

    const getItemHeight = (index) => {
        const row = rows[index]
        listRef.current?.resetAfterIndex(index - 1)
        return row.header ? TABLE_HEAD_HEIGHT : TABLE_ROW_HEIGHT
    }

    const handleSetExpandedRows = (rows) => {
        setExpandedRows(rows)
        listRef.current?.resetAfterIndex(0)
    }

    return (
        <TableContext.Provider
            value={{
                hiddenColumns,
                setHiddenColumns,
                tableData,
                updateStoredData,
                expandedRows,
                setExpandedRows: handleSetExpandedRows,
            }}
        >
            <div className="tableFilters">
                <div className="tableFiltersLeft">
                    <Input
                        onChange={handleSearchValueChange}
                        value={searchValue}
                        style={{ width: '50%' }}
                        placeholder="Search"
                    />
                    <div>
                        <span>Group by: </span>
                        <Select
                            style={{ width: 120 }}
                            onChange={handleChange}
                            value={groupBy}
                            labelInValue="Group by"
                            options={groupColumnOptions}
                        />
                    </div>
                </div>
                <TableOptions
                    headerColumns={headerColumns}
                    onChange={setHiddenColumns}
                />
            </div>
            <div>
                <div className="tableHead">
                    {filteredColumns.map((column) => (
                        <div
                            className="tableHeadColumn"
                            style={{ width: column.width || 100 }}
                            key={column.id}
                        >
                            {column.title}
                        </div>
                    ))}
                </div>
                <VariableSizeList
                    height={700}
                    itemCount={rows.length}
                    itemSize={getItemHeight}
                    itemData={{
                        listData: rows,
                        columns: filteredColumns,
                    }}
                    width="100%"
                    ref={listRef}
                    className="tableBody"
                >
                    {RowContainer}
                </VariableSizeList>
            </div>
        </TableContext.Provider>
    )
}

export default Table
