import './shopping-list-row.scss';
import Checkbox from "components/checkbox/checkbox";
import {useState} from "react";

const ShoppingListRow = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => setIsChecked(isChecked);

  return <tr className="shopping-list-row">
    <td width="80%" height="100%">
      <Checkbox label={ 'Product name' } value={isChecked} onValueChange={handleChange}/>
    </td>
    <td width="10%" height="100%">Cel 2</td>
    <td width="10%" height="100%">Cel 3</td>
  </tr>
}

export default ShoppingListRow;
