import './tableHeaderRight.css';

const TableHeaderRight = ({ onClickHandler }) => {
  return (
    <div>
      <button onClick={onClickHandler} className="show_all_button">
        Show All Countries
      </button>
    </div>
  )
}

export default TableHeaderRight
