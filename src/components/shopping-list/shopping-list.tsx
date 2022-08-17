import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import './shopping-list.scss';

const ShoppingList = () => {
  const location = useLocation();
  useEffect(() => {
    const data = location.state;

  }, [location]);
  return <div className="shopping-list-layout">
    <div className="shopping-list-header">
      <span className="list-title">Shopping list Title</span>

      <button className="btn transparent">
        <FontAwesomeIcon icon={ faPen } />
      </button>
    </div>

    <div className="shopping-list">
      <div className="shopping-list-items">

      </div>

      <button className="shopping-list-add-button">
        <FontAwesomeIcon icon={ faPlus } />
        <span>Ajouter un élément</span>
      </button>

      <div className="shopping-list-total">
        <span className="total-label">TOTAL:</span>
        <span className="total-value">{ '30$' }</span>
      </div>
    </div>
  </div>
}

export default ShoppingList;
