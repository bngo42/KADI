export interface ShoppingListData {
  id: string;
  title: string;
  date: string;
  data: ShoppingListRowData[];
}

export interface ShoppingListRowData {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
