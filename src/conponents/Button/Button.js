import React from 'react';
import styles from './Button.module.scss';
import classnames from 'classnames';

const Button = ({ text, error = true, onClick }) => {

    return (
        <button
            className={classnames({
                [styles.button]: true,
            })}
            onClick={onClick}
        > 
            {text}
        </button>
    )
}

export default Button;