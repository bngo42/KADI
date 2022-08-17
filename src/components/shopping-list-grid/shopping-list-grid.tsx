import ShoppingListItem from 'components/shopping-list-item/shopping-list-item';
import {useState} from "react";
import {Link} from "react-router-dom";
import './shopping-list-grid.scss';

const ShoppingListGrid = () => {
    const [ dataList ] = useState([1,2,3,4,5,6,7,8,9,10]);

    return  <div className="shopping-list-grid">
        {
            dataList?.length ? dataList.map((item, index) => (
                <Link to={ '/list/' } key={ index }>
                    <ShoppingListItem/>
                </Link>
            )) : <span>Aucune liste de course a afficher.</span>
        }
    </div>
}

export default ShoppingListGrid;
