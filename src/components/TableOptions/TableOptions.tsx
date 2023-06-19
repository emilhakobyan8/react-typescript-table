import * as React from 'react'

import { SettingFilled, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { Dropdown } from 'antd'
import { useCallback, useContext, useState } from 'react'
import { TableContext } from '../Table/TableContext'

import './styles.css'

type TColumn = {
    key: string
    label: string
}

type TTableOptions = {
    headerColumns: TColumn[]
}

const DropdownItem = ({ data }) => {
    const { setHiddenColumns, hiddenColumns } = useContext(TableContext)
    const [hidden, setHidden] = useState<boolean>(
        Boolean(hiddenColumns[data.key])
    )
    const onButtonClick = () => {
        setHidden(!hidden)
        setHiddenColumns({
            ...hiddenColumns,
            [data.key]: !hidden,
        })
    }
    return (
        <div className="dropdownItem">
            {data.label}
            <div className="eyeIconWrapper" onClick={onButtonClick}>
                {hidden ? (
                    <EyeInvisibleFilled style={{ fontSize: 20 }} />
                ) : (
                    <EyeFilled style={{ fontSize: 20 }} />
                )}
            </div>
        </div>
    )
}

const TableOptions: React.FC<TTableOptions> = ({ headerColumns }) => {
    const renderDropdown = useCallback(() => {
        return (
            <div className="dropdownWrapper">
                {headerColumns.map((item) => (
                    <DropdownItem data={item} key={item.key} />
                ))}
            </div>
        )
    }, [headerColumns])

    return (
        <Dropdown
            dropdownRender={renderDropdown}
            trigger={['click']}
            placement="bottomRight"
        >
            <span className="dropdownButtonWrapper">
                Options <SettingFilled />
            </span>
        </Dropdown>
    )
}

export default TableOptions
