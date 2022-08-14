import Paper from 'assets/paper.png';
import './shopping-list-item.scss';

const ShoppingListItem = () => {
    return <div className="shopping-list-item">
        <div className="list-header">
            <img height="100%" src={ Paper } alt="Liste"/>
        </div>
        <div className="list-description">
            <span className="list-name">Ma liste de course 1</span>
            <span className="list-date">24/07/2022 - 17:54</span>
        </div>
    </div>
}

export default ShoppingListItem;
