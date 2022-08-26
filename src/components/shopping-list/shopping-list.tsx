import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createContext, useEffect, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFloppyDisk, faPen, faPlus} from '@fortawesome/free-solid-svg-icons';

import ShoppingListRow from "components/shopping-list-row/shopping-list-row";

import ListService from "services/list.service";
import {ShoppingListData, ShoppingListRowData} from "models/shopping-list.model";
import {ShoppingListRowValueConfig} from "components/shopping-list-row/shopping-list-row.model";
import {ViewMode} from "models/view.model";
import {ShoppingListRouteParams} from "./shopping-list.model";

import './shopping-list.scss';

export const CurrentViewMode = createContext(ViewMode.Edit);

const ShoppingList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { listId } = useParams<ShoppingListRouteParams>();

  const [ listData, setListData ] = useState<ShoppingListData>({});
  const [ listMode, setListMode ] = useState<ViewMode>(ViewMode.Default);
  const [ totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const data: any = location.state;

    if (data?.view === ViewMode.Edit) {
      setListMode(ViewMode.Edit);
    } else {
      const currentList = ListService.getList(listId);

      if (currentList) {
        setListData(currentList);
      } else if (listId === 'new') {
        const newListItem = ListService.getNewItemRow('Nouveau produit', 1, 0);
        const newListData = ListService.createListObject('Nouvelle liste', [newListItem]);

        setListMode(ViewMode.Edit);
        setListData(newListData);
      } else {
        navigate('/');
      }
    }
  }, [location]);

  useEffect(() => {
    const newTotal = listData.data?.reduce((prev, item) => {
      return prev + (item.checked ? (item.price * item.quantity) : 0);
    }, 0) || 0;
    const fixedValue = (newTotal % 1 !== 0) ? Number(newTotal.toFixed(2)) : newTotal;

    setTotalPrice(fixedValue);
  }, [listData, listMode]);

  const addItem = () => {
    const newProduct = ListService.getNewItemRow('Nouveau produit', 1, 0);
    const newListData = {...listData};

    if (newListData?.data) {
      newListData.data.push(newProduct);
      setListData(newListData);
    }
  };

  const deleteItem = (id: string) => {
    const newList = listData?.data?.filter(item => item.id !== id);

    if (newList) {
      const newListData: ShoppingListData = {...listData};

      if (newListData?.data) {
        newListData.data = newList;
        setListData(newListData);
      }
    }
  };

  const onRowValueChange = (val: ShoppingListRowValueConfig, itemData: ShoppingListRowData): void => {
    const newItemData = {...itemData, ...val};
    const newListData = {...listData};
    const itemIndex = newListData.data!.findIndex(item => item.id === newItemData.id);

    if (itemIndex >= 0) {
      newListData.data![itemIndex] = newItemData;
      setListData(newListData);
    }
  };

  const onCheckboxChange = (state: boolean, itemData: ShoppingListRowData): void => {
    const newItemData = {...itemData};
    const newListData = {...listData};
    const itemIndex = newListData.data!.findIndex(item => item.id === newItemData.id);

    if (itemIndex >= 0) {
      newItemData.checked = state;
      newListData.data![itemIndex] = newItemData;
      setListData(newListData);
      ListService.saveList(newListData);
    }
  };

  const toggleMode = (): void => {
    if (listMode === ViewMode.Default) {
      setListMode(ViewMode.Edit);
    } else {
      setListMode(ViewMode.Default);
      ListService.saveList(listData);
    }
  }

  return <div className="shopping-list-layout">
    <CurrentViewMode.Provider value={ listMode }>
      <div className="shopping-list-header">
        <span className="list-title">{ listData.title }</span>
        <button className="btn" onClick={ toggleMode }>
          <FontAwesomeIcon icon={ listMode === ViewMode.Default ? faPen : faFloppyDisk } />
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
              listData?.data?.length ? listData.data?.map((data, index) => {
                return <ShoppingListRow
                          key={index}
                          data={data}
                          onDelete={() => deleteItem(data.id)}
                          itemCount={listData.data?.length || 0}
                          onCheckboxChange={ val => onCheckboxChange(val, data) }
                          onValueChange={ val => onRowValueChange(val, data) }/>
              }) : null
            }
          </tbody>
        </table>

        {
          listMode === ViewMode.Edit &&
          <button className="shopping-list-add-button" onClick={ addItem }>
            <FontAwesomeIcon icon={ faPlus } />
            <span>Ajouter un élément</span>
          </button>
        }

        {
          listMode !== ViewMode.Edit &&
          <div className="shopping-list-total">
            <span className="total-label">TOTAL:</span>
            <span className="total-value">{`${totalPrice}€`}</span>
          </div>
        }
      </div>
    </CurrentViewMode.Provider>
  </div>
}

export default ShoppingList;
