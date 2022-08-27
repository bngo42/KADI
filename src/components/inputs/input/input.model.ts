export interface InputProps {
  value: any;
  type: InputType;
  onValueChange?: (e: any) => any
  placeholder?: string;
}

export enum InputType {
  Text = 'text',
  Number = 'number'
}
