export type ShoppingListRouteParams = {
  listId: string;
}

export interface ShoppingListRouteState {
  editMode: boolean;
  newList: boolean;
}
