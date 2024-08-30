import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, useGlobalFilter } from "react-table";
import _intersection from 'lodash/intersection';

import Loader from '../../assets/svg/loader.svg'
import { countryNameFilter, populationFilter } from '../../utils/filter';
import TableHeader from '../TableHeader';
import './table.css';

const Table = ({
    columns = [],
    data,
    headerRightComponent,
    isLoading = false
}) => {
    const [filtered, setFilteredRows] = useState([]);

    const globalFilter = useCallback((rows = [], ids, query = {}) => {
        const {currentField} = query;
        if (!currentField) {
            setFilteredRows(rows);
            return rows;
        }

        setFilteredRows(rows);
        const selectedRowsOnName = rows.length && rows.filter((row) => {
            const rowValue = row.values.name;
                return countryNameFilter(query.name, rowValue);
        });
        const selectedRowsOnPopulation = rows.length && rows.filter((row) => {
            const rowValue = row.values.population;
                return populationFilter(query.population, rowValue);
        });
        let filtredResult = [];
        if (selectedRowsOnName.length && !selectedRowsOnPopulation.length) {
            filtredResult = selectedRowsOnName;
        } else if (!selectedRowsOnName.length && selectedRowsOnPopulation.length) {
            filtredResult = selectedRowsOnPopulation;
        } else {
            filtredResult = selectedRowsOnName.length ? selectedRowsOnName.filter(o => selectedRowsOnPopulation.some(({id}) => o.id === id)) : [];
        }

        setFilteredRows([...filtredResult]);
        return filtredResult;
    }, []); 

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        globalFilter: globalFilter
    }, useGlobalFilter);

    useEffect(() => {
        setGlobalFilter({
            currentField: null
        })
    }, [data]);

    const getHeaders = () => (
        <>
        {headerGroups.map(column => (
            <tr key={column.id} {...column.getHeaderGroupProps()}>
                {
                    column.headers.map(eachHeader => (
                        <th key={eachHeader.id} {...eachHeader.getHeaderProps()}>
                            {
                                eachHeader.render('Header')
                            }
                        </th>
                    ))
                }
            </tr>
        ))}
        </>
    );

    const getBody = () => (
        <>
            {   
                rows.map(eachRow => {
                    prepareRow(eachRow);
                    return (
                        <tr key={eachRow.id} {...eachRow.getRowProps()}>
                            {
                                eachRow.cells.map(eachCell => (
                                    <td key={eachCell.id} {...eachCell.getCellProps()}>
                                        {
                                            eachCell.render('Cell')
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    )
                })
            }

        </>
    )

  return (
    <>
        <TableHeader
            filter={globalFilter}
            setFilter={setGlobalFilter}
            headerRightComponent={headerRightComponent}
        />
        <table {...getTableProps()}>
            <thead>
                {getHeaders()}
            </thead>
            <tbody {...getTableBodyProps()}>
                {getBody()}
            </tbody>
        </table>
        {
            isLoading && <div className='no-data'>Searching Globe...</div>
        }
        {
            (!filtered.length && !isLoading) && <div className='no-data'>No Countries Found</div>
        }
    </>
  )
}

Table.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
};

export default Table
