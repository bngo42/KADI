import {InputProps} from "./input.model";
import './input.scss';

const Input = (props: InputProps) => {
  return <div className="input-style">
    <input
      type={ props.type }
      value={ props.value }
      onChange={ (e) => props.onValueChange(e.target.value) }/>
  </div>
}

export default Input;
