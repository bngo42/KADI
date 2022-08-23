export interface ShoppingListData {
  id?: string;
  title?: string;
  date?: string;
  data?: ShoppingListRowData[];
}

export interface ShoppingListRowData {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export const tempData: ShoppingListData = {
  id: 'xxxxx',
  title: 'Testing shopping list',
  date: 'Thu Aug 18 2022 20:18:05 GMT+0200',
  data: [
    {
      id: 'aaa',
      name: 'Product 1',
      quantity: 1,
      price: 10.00
    }, {
      id: 'bbb',
      name: 'Product 2',
      quantity: 1,
      price: 2.50
    },     {
      id: 'ccc',
      name: 'Product 3',
      quantity: 3,
      price: 7.99
    }
  ]
};
