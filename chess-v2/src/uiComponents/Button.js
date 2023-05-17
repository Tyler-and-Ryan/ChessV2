import "./Button.css";
import { BUTTON_TYPES } from "../data/stringEnums";

const Button = (props) => {
    const getButtonClass = () => {
        if (props.type === BUTTON_TYPES.PRIMARY) {
            return "primaryBtn";
        } else if (props.type === BUTTON_TYPES.SECONDARY) {
            return "secondaryBtn";
        } else if (props.type === BUTTON_TYPES.TERTIARY) {
            return "tertiaryBtn";
        }
    }
  return <div className="button">
    <div className={getButtonClass()} onClick={props.onClick}>{props.text}</div>
    </div>
};

export default Button;
