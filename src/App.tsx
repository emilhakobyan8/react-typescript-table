import Table from './components/Table/Table'
import useLocalStorage from './hooks/useLocalStorage'
import { ITableData } from './types/table'
import { mockedTableData } from './mockedData'

function App() {
    const [storedTableData, storeTableData] = useLocalStorage<ITableData>(
        'tableData',
        mockedTableData
    )

    return (
        <>
            <Table
                tableData={storedTableData}
                updateStoredData={storeTableData}
            />
        </>
    )
}

export default App
