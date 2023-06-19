export interface IColumnData {
    id: string // <- id of the column. Should match the one on the data rows
    ordinalNo: number // <- position of the column
    title: string // <- name of the column
    type: string // <- type of the data in the column
    width?: number // <- defines the width of the column
}

export interface IRowData {
    id: string // <- rowId
    [columnId: string]: any // <- Data for the column
}

export interface ITableData {
    // This is the schema for a column. The column should abide by this schema for the column definition
    columns: Array<IColumnData>
    // Array of rows. Each columnId represent the cell on given row for a given column
    data: Array<IRowData>
}

export interface Item {
    id: string
    name: string
    age: number
    isActive: boolean
    gender: string
    profession: string
}
