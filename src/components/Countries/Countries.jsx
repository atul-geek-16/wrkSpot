import { useEffect, useState } from "react";

import { COLUMNS } from "./countries.columns.jsx";
import Table from "../../molecules/Table";
import fetchCountries from "../../api/getCountries";
import TableHeaderRight from '../TableHeaderRight';
import './countries.css';

export const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = () => {
        setIsLoading(true);
        setCountries([]);
        fetchCountries().then(response => {
            setIsLoading(false);
            setCountries(response.data);
        });
    }
    const tableHeaderRightRenderer = () => (
        <TableHeaderRight
            onClickHandler={getCountries}
        />
    )
  return (
    <div>
        <Table
            columns={COLUMNS}
            data={countries}
            headerRightComponent={tableHeaderRightRenderer}
            isLoading={isLoading}
        />
    </div>
  )
}
