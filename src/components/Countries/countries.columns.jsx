export const COLUMNS = [
    {
        Header: 'Country Name',
        accessor: 'name'
    },
    {
        Header: 'Code',
        accessor: 'abbreviation',
        disableGlobalFilter: true
    },
    {
        Header: 'Capital',
        accessor: 'capital',
        disableGlobalFilter: true
    },
    {
        Header: 'Ph Code',
        accessor: 'phone',
        disableGlobalFilter: true
    },
    {
        Header: 'Population',
        accessor: 'population',
    },
    {
        Header: 'Flag',
        Cell: tableProps  => (
            <img
                className='flag_image'
                alt={tableProps.row.original.name}
                src={tableProps.row.original.media.flag}
            />
        )
    },
    {
        Header: 'Emblem',
        Cell: tableProps  => (
            <img
                className='flag_image'
                alt={tableProps.row.original.name}
                src={tableProps.row.original.media.emblem}
            />
        )
    },
]