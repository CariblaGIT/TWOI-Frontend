import "./ButtonAuth.css";

export const ButtonAuth = ({buttonText, className, onClickFunction, disabled}) => {
    return (
        <button className={className} onClick={onClickFunction} disabled={disabled}>
            {buttonText}
        </button>
    )
}