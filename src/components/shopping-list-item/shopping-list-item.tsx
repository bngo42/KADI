import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import Paper from 'assets/paper.png';

import SpanOverflow from "components/span-overflow/span-overflow";

import {ShoppingListData} from "models/shopping-list.model";

import './shopping-list-item.scss';

interface ShoppingListItemProps {
  data: ShoppingListData,
  onDeleteList: () => void
}

const formatDate = (date: string | undefined) => {
  return date ? new Date(date).toLocaleString() : '';
}

const ShoppingListItem = (props: ShoppingListItemProps) => {
    const deleteListItem = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (props.onDeleteList) {
        props.onDeleteList();
      }
    }
    return (
      <div className="shopping-list-item">
          <div className="list-header">
              <img height="100%" src={ Paper } alt="Liste"/>

              <div className="delete-list-btn" onClick={ (e) => deleteListItem(e) }>
                <FontAwesomeIcon icon={ faTrashCan }/>
              </div>
          </div>
          <div className="list-description">
            <SpanOverflow><span className="list-name">{ props.data.title }</span></SpanOverflow>
            <span className="list-date">{ formatDate(props.data.date) }</span>
          </div>
      </div>
    )
}

export default ShoppingListItem;
