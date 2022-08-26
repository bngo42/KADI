import {ShoppingListRowData} from "models/shopping-list.model";

export interface ShoppingListRowProps {
  onDelete: () => void
  onCheckboxChange?: (val: boolean) => void,
  onValueChange?: (data: ShoppingListRowValueConfig) => void,
  data: ShoppingListRowData
  itemCount: number;
}

export interface ShoppingListRowValueConfig {
  name: string,
  price: number,
  quantity: number;
}
