import ShoppingListItem from 'components/shopping-list-item/shopping-list-item';
import {useState} from "react";
import {Link} from "react-router-dom";
import './shopping-list-grid.scss';

const ShoppingListGrid = () => {
    const [ dataList ] = useState([1,2,3,4,5,6,7,8,9,10]);

    return  <div className="shopping-list-grid">
        {
            dataList.map((item, index) => (
                <Link to={ '/list/' }>
                    <ShoppingListItem key={ index }/>
                </Link>
            ))
        }
    </div>
}

export default ShoppingListGrid;
