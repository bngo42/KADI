import Paper from 'assets/paper.png';

import {ShoppingListData} from "models/shopping-list.model";

import './shopping-list-item.scss';

interface ShoppingListItemProps {
  data: ShoppingListData
}

const formatDate = (date: string | undefined) => {
  return date ? new Date(date).toLocaleString() : '';
}

const ShoppingListItem = (props: ShoppingListItemProps) => {
    return <div className="shopping-list-item">
        <div className="list-header">
            <img height="100%" src={ Paper } alt="Liste"/>
        </div>
        <div className="list-description">
            <span className="list-name">{ props.data.title }</span>
            <span className="list-date">{ formatDate(props.data.date) }</span>
        </div>
    </div>
}

export default ShoppingListItem;
