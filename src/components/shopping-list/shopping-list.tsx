import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createContext, useEffect, useState} from "react";

import {faFloppyDisk, faPen, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ShoppingListRow from "components/shopping-list-row/shopping-list-row";
import Input from "components/inputs/input/input";
import SpanOverflow from "components/span-overflow/span-overflow";

import ListService from "services/list.service";
import {ShoppingListData, ShoppingListRowData} from "models/shopping-list.model";
import {ShoppingListRouteParams, ShoppingListRouteState} from "./shopping-list.model";
import {InputType} from "components/inputs/input/input.model";
import {ShoppingListRowValueConfig} from "components/shopping-list-row/shopping-list-row.model";

import './shopping-list.scss';

export const inEditMode = createContext(false);

const ShoppingList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { listId } = useParams<ShoppingListRouteParams>();
  const [ listData, setListData ] = useState<ShoppingListData>({});
  const [ listTitle, setListTitle ] = useState<string>('');
  const [ editMode, setEditMode ] = useState<boolean>(false);
  const [ totalPrice, setTotalPrice ] = useState(0);

  useEffect(() => {
    const navData = location.state as ShoppingListRouteState;

    if (navData?.newList) {
      const newListItem = ListService.getNewItemRow('Nouveau produit', 1, 0);
      const newListData = ListService.createListObject('Nouvelle liste', [newListItem], listId);

      setListTitle(newListData.title!);
      setListData(newListData);
      setEditMode(navData.editMode);
    } else {
      const currentList = ListService.getList(listId);

      if (currentList) {
        setListData(currentList);
        setListTitle(currentList.title!);
      } else {
        navigate('/');
      }
    }
  }, [location]);

  useEffect(() => {
    const newPrice = listData.data?.reduce((prev, current) => {
      return prev + (current.checked ? (Number(current.price) * current.quantity) : 0);
    }, 0);

    setTotalPrice(previousPrice => Number((newPrice || previousPrice).toFixed(2)));
  }, [listData]);

  const addItem = () => {
    const newItemRow = ListService.getNewItemRow('Nouveau produit', 1, 0);
    const newListData = {...listData};

    newListData.data?.push(newItemRow);
    setListData(newListData);
  };

  const deleteItem = (rowId: string) => {
    const newListData = {...listData};

    if (newListData.data) {
      newListData.data = newListData.data.filter(row => row.id !== rowId);
      setListData(newListData);
    }
  };

  const onRowValueChange = (newData: ShoppingListRowValueConfig, itemData: ShoppingListRowData) => {
    const newItemData = {...itemData, ...newData};
    const newListData = {...listData};

    if (newListData.data) {
      const itemIndex = newListData.data.findIndex(data => data.id === itemData.id);

      if (itemIndex >= 0) {
        newListData.data[itemIndex] = newItemData;
        setListData(newListData);
      }
    }
  };

  const toggleMode = () => {
    if (editMode) {
      const newListData = {...listData};

      newListData.title = listTitle;
      ListService.saveList(newListData);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  return (
    <div className="shopping-list-layout">
      <inEditMode.Provider value={ editMode }>
        <div className="shopping-list-header">
          <span className="list-title">
            {
              !editMode ?
              <SpanOverflow>{ listTitle }</SpanOverflow> :
              <Input value={ listTitle } type={ InputType.Text } onValueChange={ (newTitle) => setListTitle(newTitle) }/>
            }
          </span>
          <button className="btn" onClick={ toggleMode }>
            <FontAwesomeIcon icon={ !editMode ? faPen : faFloppyDisk } />
          </button>
        </div>

        <div className="shopping-list">
          <table>
            <thead>
              <tr>
                <th style={{ width: '70%' }}>Produit</th>
                <th style={{ width: '15%' }}>Quantité</th>
                <th style={{ width: '15%' }}>Prix</th>
              </tr>
            </thead>

            <tbody>
              {
                listData?.data?.length && listData.data?.map((data, index) => {
                  return <ShoppingListRow
                    key={index}
                    data={data}
                    onDelete={() => deleteItem(data.id)}
                    itemCount={listData.data?.length || 0}
                    onValueChange={ val => onRowValueChange(val, data) }/>
                })
              }
            </tbody>
          </table>

          {
            editMode ?
            <button className="shopping-list-add-button" onClick={ addItem }>
              <FontAwesomeIcon icon={ faPlus } />
              <span>Ajouter un élément</span>
            </button> :

            <div className="shopping-list-total">
              <span className="total-label">TOTAL:</span>
              <span className="total-value">{`${totalPrice}€`}</span>
            </div>
          }
        </div>
      </inEditMode.Provider>
    </div>
  )
}

export default ShoppingList;
