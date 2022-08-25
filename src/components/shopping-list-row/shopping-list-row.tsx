import {useContext, useEffect, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

import Checkbox from "components/inputs/checkbox/checkbox";
import Input from "components/inputs/input/input";

import {CurrentViewMode} from "components/shopping-list/shopping-list";
import {ShoppingListRowData} from "models/shopping-list.model";
import {ViewMode} from "models/view.model";
import {InputType} from "components/inputs/input/input.model";


import './shopping-list-row.scss';

interface ShoppingListRowProps {
  onDelete: () => void
  onCheckChange?: (val: boolean) => void,
  data: ShoppingListRowData
  itemCount: number;
}

const ShoppingListRow = (props: ShoppingListRowProps) => {
  const Current = useContext(CurrentViewMode);
  const [isChecked, setIsChecked] = useState(false);
  const [ price, setPrice ] = useState(props.data.price);
  const [ quantity, setQuantity ] = useState(props.data.price);
  const [ name, setName ] = useState(props.data.name);
  const deleteItem = () => {
    if (props.itemCount > 1) {
      props.onDelete();
    }
  };

  useEffect(() => {
    if (props.onCheckChange) {
      props.onCheckChange(isChecked);
    }
  }, [isChecked]);

  return <tr className="shopping-list-row">
    {
      Current === ViewMode.Default ?
      <>
        <td><Checkbox label={ name } value={isChecked} onValueChange={ setIsChecked }/></td>
        <td>{ quantity }</td>
        <td>{ price }</td>
      </>
      :
      <>
        <td>
          <div className="product-name">
            <FontAwesomeIcon
              icon={ faXmark }
              className={`delete-btn ${ props.itemCount > 1 ? '' : 'disabled' }`}
              onClick={ deleteItem }/>
            <Input type={ InputType.Text } value={ name } onValueChange={ (newName) => setName(newName)}/>
          </div>
        </td>
        <td><Input type={ InputType.Number } value={ quantity } onValueChange={ (newQuantity) => setQuantity(newQuantity)}/></td>
        <td><Input type={ InputType.Number } value={ price } onValueChange={ (newPrice) => setPrice(newPrice)}/></td>
      </>
    }
  </tr>
}

export default ShoppingListRow;
