import React from 'react';
import styles from './Input.module.scss';
import classnames from 'classnames';

const Input = ({ 
    placeholder,
    onChangeInput,
    value,
    small = false,
    error = false,
    search = false
}) => {
    return (
        <input 
            type="text"
            value={value}
            placeholder={placeholder}
            className={classnames({
                [styles.text]: !search,
                [styles.search]: search,
                [styles.small]: small,
                [styles.error]: error
            }
            )}
            onChange={onChangeInput}
        />
    )
}

export default Input;