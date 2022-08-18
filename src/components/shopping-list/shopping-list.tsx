import {useLocation} from "react-router-dom";
import {createContext, useEffect, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faPlus} from '@fortawesome/free-solid-svg-icons';

import ShoppingListRow from "components/shopping-list-row/shopping-list-row";
import {ViewMode} from "models/view.model";

import './shopping-list.scss';

export const CurrentViewMode = createContext(ViewMode.Edit);

const ShoppingList = () => {
  const [ listData, setListData ] = useState([1,2,3]);
  const [ listMode, setListMode ] = useState(ViewMode.Default);
  const location = useLocation();

  useEffect(() => {
    const data: any = location.state;

    if (data?.view === ViewMode.Edit) {
      setListMode(ViewMode.Edit);
    }
  }, [location]);

  const addItem = () => {
    setListData(prevState => [...prevState, 1]);
  }

  return <div className="shopping-list-layout">
    <CurrentViewMode.Provider value={ listMode }>
      <div className="shopping-list-header">
        <span className="list-title">Shopping list Title</span>

        <button className="btn transparent">
          <FontAwesomeIcon icon={ faPen } />
        </button>
      </div>

      <div className="shopping-list">
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix</th>
            </tr>
          </thead>

          <tbody>
            {
              listData?.length && listData.map((data, index) => {
                return <ShoppingListRow key={ index } />
              })
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
