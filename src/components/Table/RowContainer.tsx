import { useContext } from 'react'
import { TableContext } from './TableContext'
import { TableRow } from './TableRow'
import * as React from 'react'

const RowContainer = ({ data: { listData, columns }, index, style }) => {
    const row = listData[index]

    const { expandedRows, setExpandedRows } = useContext(TableContext)
    const toggleRow = () => {
        if (isExpanded) {
            setExpandedRows(expandedRows.filter((id) => id !== row.id))
        } else {
            setExpandedRows([...expandedRows, row.id])
        }
    }

    const isExpanded = expandedRows.includes(row.id)
    const hasChild = 'expanded' in row

    if (row.header) {
        return (
            <div className="tableHead childHeadRow" style={style}>
                {columns.map((column) => (
                    <div
                        className="tableHeadColumn"
                        style={{ width: column.width || 100 }}
                        key={column.id}
                    >
                        {column.title}
                    </div>
                ))}
            </div>
        )
    }
    return (
        <TableRow
            row={row}
            columns={columns}
            toggleRow={toggleRow}
            style={style}
            isExpanded={isExpanded}
            hasChild={hasChild}
        />
    )
}

export default RowContainer
