import * as React from "react";

interface IProps {
    name: string;
    type: string;
    error: string;
    focus: string;
    placeholder: string;
    handleFocus: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AccountInput = ({ name, handleFocus, handleChange, error, focus, placeholder, type }: IProps) => {
    return (<div className={`login-input sdd login-${name}`}>
    <span className="icon-box">
        <i className={`login-icon ${focus === name ? name + "-blue" : name + "-grey"}`} />
    </span>
    <input
        className={`login-input-inner input-${name}`}
        type={type}
        name={name}
        onFocus={handleFocus}
        onChange={handleChange}
        placeholder={placeholder}
    />
    <span className="input-bar" />
    {
        error ? <span className={`error-text ${name}-error`}>{error}</span> : null
    }
</div>);
};

export default AccountInput;
