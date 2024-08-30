import TableFilter from "../TableFilter";
import './tableHeader.css';

const TableHeader = (props) => {
  const TableHeaderRight = props.headerRightComponent;
  return (
    <div className="table_header-wrapper">
        <TableFilter {...props}/>
        <TableHeaderRight />
    </div>
  )
}

export default TableHeader
