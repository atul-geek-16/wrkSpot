import { useState } from 'react';
import PropTypes from 'prop-types';

import './tableFilter.css';

const TableFilter = ({setFilter}) => {
    const [value, setValue] = useState({});

    const onChange = (e, field) => {
        const filterValue = e.currentTarget.value;
        const nextValue = {
            ...value,
            [field]: filterValue,
            currentField: field
        };
        setValue(nextValue);
        setFilter(nextValue);
    };

    const resetFilters = () => {
        setValue({
            name: '',
            population: ''
        });
        setFilter({
            currentField: null
        })
    }
    const { name, population = "" } = value;
  return (
    <div className='table-header-left-wrapper'>
        <input
            value={name || ''}
            type='text'
            placeholder='Country Name'
            onChange={(e) => onChange(e, 'name')}
        />
        <select onChange={(e) => onChange(e, 'population')} selected={population}>
            <option value="" disabled selected hidden>Population</option>
            <option value="1000000">{ `< 1M`}</option>
            <option value="5000000">{ `< 5M`}</option>
            <option value="10000000">{ `< 10M`}</option>
        </select>
        <a className="clear_text" href='javascript:;' onClick={resetFilters}>Clear</a>
    </div>
  )
}

TableFilter.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func
};

export default TableFilter
