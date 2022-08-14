import ShoppingListItem from 'components/shopping-list-item/shopping-list-item';
import {useState} from "react";
import './shopping-list-grid.scss';

const ShoppingListGrid = () => {
    const [ dataList ] = useState([1,2,3,4,5,6,7,8,9,10]);

    return  <div className="shopping-list-grid">
        { dataList.map(() => <ShoppingListItem/>) }
    </div>
}

export default ShoppingListGrid;
