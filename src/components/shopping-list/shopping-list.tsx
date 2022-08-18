import {useLocation} from "react-router-dom";
import {createContext, useEffect, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faPlus} from '@fortawesome/free-solid-svg-icons';

import ShoppingListRow from "components/shopping-list-row/shopping-list-row";
import {ViewMode} from "models/view.model";

import './shopping-list.scss';

export const CurrentViewMode = createContext(ViewMode.Edit);

const ShoppingList = () => {
  const [ listData, setListData ] = useState([{id: '1'},{id: '2'},{id: '3'}]);
  const [ listMode, setListMode ] = useState(ViewMode.Default);
  const location = useLocation();

  useEffect(() => {
    const data: any = location.state;

    if (data?.view === ViewMode.Edit) {
      setListMode(ViewMode.Edit);
    }
  }, [location]);

  const addItem = () => {
    setListData(prevState => [...prevState, { id: '1'}]);
  };

  const deleteItem = (id: string) => {
    const tempList = listData.filter(item => item.id !== id);
    setListData(tempList);
  };

  const toggleMode = () => {
    setListMode(listMode === ViewMode.Default ? ViewMode.Edit : ViewMode.Default);
  }

  return <div className="shopping-list-layout">
    <CurrentViewMode.Provider value={ listMode }>
      <div className="shopping-list-header">
        <span className="list-title">Shopping list Title</span>

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
              listData?.length ? listData.map((data, index) => {
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
