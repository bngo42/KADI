import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import ShoppingListItem from 'components/shopping-list-item/shopping-list-item';

import {ShoppingListData} from "models/shopping-list.model";
import {getParsedLocalStorageItem} from "utils/storage.utils";

import './shopping-list-grid.scss';

const ShoppingListGrid = () => {
    const [dataList, setDataList] = useState<ShoppingListData[]>([]);

    useEffect(() => {
      const shoppingLists = getParsedLocalStorageItem('shopping-lists');

      if (shoppingLists?.length) {
        setDataList(shoppingLists);
      }
    }, []);

    return  <div className="shopping-list-grid">
        {
            dataList?.length ? dataList.map((list: ShoppingListData, index: number) => (
              <Link key={ index } to={ `/list/${ list.id }` }>
                <ShoppingListItem data={list}/>
              </Link>
            )) : <span>Aucune liste de course a afficher.</span>
        }
    </div>
}

export default ShoppingListGrid;
