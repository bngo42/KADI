import './checkbox.scss';
import {useEffect, useState} from "react";

export interface CheckBoxProps {
  value: any;
  label?: any;
  onValueChange?: (value: boolean) => void
}

const Checkbox = (props: CheckBoxProps) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    if (props.onValueChange) {
      props.onValueChange(value);
    }
  }, [value]);

  return <label className="checkbox">
    <input type="checkbox" value={ value } onChange={ e => setValue(e.target.checked) }/>
    <span className="checkbox-label">{ props.label }</span>
  </label>
}

export default Checkbox;
