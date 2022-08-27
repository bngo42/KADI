import {getParsedLocalStorageItem, setLocalStorageItem} from "utils/storage.utils";
import {ShoppingListData, ShoppingListRowData} from "../models/shopping-list.model";

const ListService = {
  getList: (listId: string | undefined): ShoppingListData | undefined => {
    if (!listId) {
      return undefined;
    }
    const shoppingLists: ShoppingListData[] = getParsedLocalStorageItem('shopping-lists');
    return (shoppingLists?.length) ? shoppingLists?.find(list => list.id === listId) : undefined;
  },
  saveList: (listData: ShoppingListData): void => {
    const shoppingLists: ShoppingListData[] = getParsedLocalStorageItem('shopping-lists');
    const currentListIndex = shoppingLists.findIndex(list => list.id === listData.id);

    if (currentListIndex >= 0) {
      shoppingLists[currentListIndex] = listData;
    } else {
      shoppingLists.push(listData);
    }
    setLocalStorageItem('shopping-lists', shoppingLists);
  },
  deleteList: (listId: string): ShoppingListData[] => {
    let shoppingLists: ShoppingListData[] = getParsedLocalStorageItem('shopping-lists');

    shoppingLists = shoppingLists.filter(list => list.id !== listId);
    setLocalStorageItem('shopping-lists', shoppingLists);

    return shoppingLists;
  },
  createListObject: (title: string, data: ShoppingListRowData[], forceId?: string): ShoppingListData => {
    return {
      id: forceId || ListService.getUID(),
      date: new Date().toString(),
      title,
      data
    }
  },
  getID: (length: number): string => {
    const ALPH_NUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const uid = [];
    for (let i = 0; i < length; i++) {
      uid.push(ALPH_NUM[Math.round((Math.random() * ALPH_NUM.length))]);
    }

    return uid.join('');
  },
  getUID: (length: number = 5): string => {
    let id = ListService.getID(length);
    while (ListService.getList(id)) {
      id = ListService.getID(length);
    }

    return id;
  },
  getNewItemRow: (name: string, quantity: number, price: number): ShoppingListRowData => {
    return {
      id: ListService.getID(5),
      name,
      quantity,
      price,
      checked: false
    }
  }
};

export default ListService;
