import {useContext, useEffect, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

import Checkbox from "components/inputs/checkbox/checkbox";
import Input from "components/inputs/input/input";

import {inEditMode} from "components/shopping-list/shopping-list";
import {InputType} from "components/inputs/input/input.model";
import {ShoppingListRowProps} from "./shopping-list-row.model";

import './shopping-list-row.scss';

const ShoppingListRow = (props: ShoppingListRowProps) => {
  const isInEditMode = useContext(inEditMode);
  const [ isChecked, setIsChecked ] = useState(props.data.checked);
  const [ price, setPrice ] = useState(props.data.price);
  const [ quantity, setQuantity ] = useState(props.data.quantity);
  const [ name, setName ] = useState(props.data.name);
  const deleteItem = () => {
    if (props.itemCount > 1) {
      props.onDelete();
    }
  };

  useEffect(() => {
    if (props.onValueChange) {
      props.onValueChange({ name, price, quantity, checked: isChecked });
    }
  }, [name, price, quantity, isChecked]);

  return (
    <tr className="shopping-list-row">
      {
        !isInEditMode ?
        <>
          <td><Checkbox label={ name } value={ isChecked } onValueChange={ setIsChecked }/></td>
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
  )
}

export default ShoppingListRow;
