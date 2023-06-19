import { ITableData, Item } from './types/table'

export const mockedOptionList = [
    { label: 'Software Engineer', value: 'software_engineer' },
    { label: 'Doctor', value: 'doctor' },
    { label: 'Teacher', value: 'teacher' },
    { label: 'Graphic Designer', value: 'graphic_designer' },
    { label: 'Accountant', value: 'accountant' },
]

const generateItems = (): Item[] => {
    const items: Item[] = []

    for (let i = 1; i <= 20000; i++) {
        const randomIndexForProfession = Math.floor(Math.random() * 5)
        const item: Item = {
            id: i.toString(),
            name: `John ${i}`,
            age: Math.floor(Math.random() * (60 - 18 + 1)) + 18,
            isActive: false,
            gender: 'Male',
            profession: mockedOptionList[randomIndexForProfession].value,
        }

        items.push(item)
    }

    return items
}

export const mockedTableData: ITableData = {
    columns: [
        {
            id: 'id',
            ordinalNo: 0,
            title: 'ID',
            type: 'string',
            width: 50,
        },
        {
            id: 'name',
            ordinalNo: 1,
            title: 'Name',
            type: 'string',
            width: 200,
        },
        {
            id: 'age',
            ordinalNo: 2,
            title: 'Age',
            type: 'number',
            width: 100,
        },
        {
            id: 'gender',
            ordinalNo: 3,
            title: 'Gender',
            type: 'string',
            width: 100,
        },
        {
            id: 'isActive',
            ordinalNo: 4,
            title: 'Active',
            type: 'boolean',
            width: 150,
        },
        {
            id: 'profession',
            ordinalNo: 5,
            title: 'Profession',
            type: 'list',
            width: 200,
        },
    ],
    data: [
        {
            id: '121323',
            name: 'John',
            age: 25,
            isActive: false,
            gender: 'Male',
            profession: 'software_engineer',
        },
        {
            id: '1241242',
            name: 'Emily',
            age: 25,
            isActive: true,
            gender: 'Female',
            profession: 'doctor',
        },
        {
            id: '4412413',
            name: 'Michael',
            age: 35,
            isActive: false,
            gender: 'Male',
            profession: 'teacher',
        },
        {
            id: '29023',
            name: 'Michael',
            age: 35,
            isActive: false,
            gender: 'Male',
            profession: 'doctor',
        },
        ...generateItems(),
    ],
}
