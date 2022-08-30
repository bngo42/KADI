import {InputProps} from "./input.model";
import './input.scss';

const Input = (props: InputProps) => {
  const handleInputChange = (value: string) => {
    if (props.onValueChange) {
      props.onValueChange(value);
    }
  };

  return (
    <div className="input-style">
      <input
        type={ props.type }
        value={ props.value }
        onChange={ (e) => handleInputChange(e.target.value)}/>
    </div>
  )
}

export default Input;
