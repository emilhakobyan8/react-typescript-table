import * as React from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import * as classNames from 'classnames'
import { Column } from './TableColumn'

import './styles.css'

export const TableRow = ({
    isExpanded,
    toggleRow,
    row,
    columns,
    style,
    hasChild,
}) => {
    return (
        <div
            className={classNames('tableRow', {
                expanded: row.child,
                childRow: row.child,
            })}
            style={style}
            key={row.id}
        >
            <div className="expandButtonWrapper">
                {hasChild &&
                    (isExpanded ? (
                        <MinusOutlined onClick={toggleRow} />
                    ) : (
                        <PlusOutlined onClick={toggleRow} />
                    ))}
            </div>
            {columns.map((column) => (
                <Column
                    key={`${row.id}-${column.id}`}
                    data={{
                        row,
                        column,
                    }}
                />
            ))}
        </div>
    )
}
