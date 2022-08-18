import {useContext, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

import Checkbox from "components/checkbox/checkbox";
import {CurrentViewMode} from "components/shopping-list/shopping-list";
import {ViewMode} from "models/view.model";

import './shopping-list-row.scss';

interface ShoppingListRowConfig {
  onDelete: () => void
  data: { id: string }
}

const ShoppingListRow = (props: ShoppingListRowConfig) => {
  const Current = useContext(CurrentViewMode);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => setIsChecked(isChecked);

  const productName = 'Product Name';

  return <tr className="shopping-list-row">
    {
      Current === ViewMode.Default ? <>
        <td><Checkbox label={productName + ' ' + props.data.id} value={isChecked} onValueChange={handleChange}/></td>
        <td>Edit 2</td>
        <td>Edit 3</td>
      </>
      :
      <>
        <td>
          <div className="product-name">
            <FontAwesomeIcon icon={ faXmark } className="delete-btn" onClick={ props.onDelete }/>
            <span className="product-label">{productName + ' ' + props.data.id}</span>
          </div>
        </td>
        <td>Normal 2</td>
        <td>Normal 3</td>
      </>
    }
  </tr>
}

export default ShoppingListRow;
