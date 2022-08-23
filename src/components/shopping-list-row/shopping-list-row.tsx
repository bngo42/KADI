import {useContext, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

import Checkbox from "components/checkbox/checkbox";
import {CurrentViewMode} from "components/shopping-list/shopping-list";

import {ShoppingListRowData} from "models/shopping-list.model";
import {ViewMode} from "models/view.model";

import './shopping-list-row.scss';

interface ShoppingListRowProps {
  onDelete: () => void
  data: ShoppingListRowData
  itemCount: number;
}

const ShoppingListRow = (props: ShoppingListRowProps) => {
  const Current = useContext(CurrentViewMode);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => setIsChecked(isChecked);

  return <tr className="shopping-list-row">
    {
      Current === ViewMode.Default ? <>
        <td><Checkbox label={ props.data.name } value={isChecked} onValueChange={handleChange}/></td>
        <td>{ props.data.quantity }</td>
        <td>{ props.data.price }</td>
      </>
      :
      <>
        <td>
          <div className="product-name">
            { (props.itemCount > 1) && <FontAwesomeIcon icon={ faXmark } className="delete-btn" onClick={ props.onDelete }/> }
            <span className="product-label">{ props.data.name }</span>
          </div>
        </td>
        <td>Edit 2</td>
        <td>Edit 3</td>
      </>
    }
  </tr>
}

export default ShoppingListRow;
