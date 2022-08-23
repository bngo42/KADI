import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createContext, useEffect, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faPlus, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import ShoppingListRow from "components/shopping-list-row/shopping-list-row";

import {getParsedLocalStorageItem} from "utils/storage.utils";
import {ShoppingListData} from "models/shopping-list.model";
import {ViewMode} from "models/view.model";

import './shopping-list.scss';

export const CurrentViewMode = createContext(ViewMode.Edit);

const ShoppingList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams()

  const [ listData, setListData ] = useState<ShoppingListData>({});
  const [ listMode, setListMode ] = useState(ViewMode.Default);

  useEffect(() => {
    const data: any = location.state;

    if (data?.view === ViewMode.Edit) {
      setListMode(ViewMode.Edit);
    } else {
      if (params?.id) {
        const shoppingLists: ShoppingListData[] = getParsedLocalStorageItem('shopping-lists');

        if (shoppingLists) {
          const currentList = shoppingLists.find(list => list.id === params.id);

          if (currentList) {
            setListData(currentList);
          } else {
            navigate('/');
          }
        }
      } else {
        navigate('/');
      }
    }
  }, [location]);

  const addItem = () => {
    const newProduct = { id: '1', name: 'abc', quantity: 1, price: 1};
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

  const toggleMode = () => {
    setListMode(listMode === ViewMode.Default ? ViewMode.Edit : ViewMode.Default);
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
                return <ShoppingListRow key={ index } data={ data } onDelete={ () => deleteItem(data.id) } />
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

        <div className="shopping-list-total">
          <span className="total-label">TOTAL:</span>
          <span className="total-value">{ '30$' }</span>
        </div>
      </div>
    </CurrentViewMode.Provider>
  </div>
}

export default ShoppingList;
