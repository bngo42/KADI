export enum ViewMode {
  Default = 'default',
  Edit = 'edit'
}

export enum ListType {
  Grid = 'grid',
  List = 'list'
}

export interface Settings {
  viewMode: ViewMode;
  listMode: ListType;
}
