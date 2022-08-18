import {useContext, useState} from "react";

import Checkbox from "components/checkbox/checkbox";
import {CurrentViewMode} from "components/shopping-list/shopping-list";
import {ViewMode} from "models/view.model";

import './shopping-list-row.scss';

const ShoppingListRow = () => {
  const Current = useContext(CurrentViewMode);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => setIsChecked(isChecked);

  return <tr className="shopping-list-row">
    {
      Current === ViewMode.Edit ? <>
        <td width="80%" height="100%">
          <Checkbox label={'Product name'} value={isChecked} onValueChange={handleChange}/>
        </td>
        <td width="10%" height="100%">Edit 2</td>
        <td width="10%" height="100%">Edit 3</td>
      </>
      :
      <>
        <td width="80%" height="100%">
          <Checkbox label={'Product name'} value={isChecked} onValueChange={handleChange}/>
        </td>
        <td width="10%" height="100%">Normal 2</td>
        <td width="10%" height="100%">Normal 3</td>
      </>
    }
  </tr>
}

export default ShoppingListRow;
