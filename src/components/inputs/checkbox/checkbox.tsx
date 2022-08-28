import {useEffect, useState} from "react";
import SpanOverflow from "components/span-overflow/span-overflow";
import './checkbox.scss';

export interface CheckBoxProps {
  value: any;
  label?: any;
  onValueChange?: (value: boolean) => void
}

const Checkbox = (props: CheckBoxProps) => {
  const [ value, setValue ] = useState(props.value);

  useEffect(() => {
    if (props.onValueChange) {
      props.onValueChange(value);
    }
  }, [value]);

  return <label className="checkbox">
    <input type="checkbox" checked={ value } onChange={ e => setValue(e.target.checked) }/>
    <SpanOverflow><span className="checkbox-label">{ props.label }</span></SpanOverflow>
  </label>
}

export default Checkbox;
