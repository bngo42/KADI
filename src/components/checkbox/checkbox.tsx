import './checkbox.scss';

export interface CheckBoxProps {
  label: any;
  value: any;
  onValueChange: () => any
}

const Checkbox = (props: CheckBoxProps) => {
  return <label className="checkbox">
    <input type="checkbox" value={ props.value } onChange={ props.onValueChange }/>
    <span className="checkbox-label">{ props.label }</span>
  </label>
}

export default Checkbox;
