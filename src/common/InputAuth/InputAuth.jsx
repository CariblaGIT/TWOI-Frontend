import "./InputAuth.css"

export const InputAuth = ({ className, type, name, value, placeholder, disabled, min, onChange, onBlur}) => {
    return(
        <div className="inputAuthDesign">
            <input
                className={className} 
                type={type} 
                name={name} 
                value={value} 
                placeholder={placeholder}
                disabled={disabled}
                min={min}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
}