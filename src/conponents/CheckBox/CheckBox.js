import React from 'react';
import styles from './CheckBox.module.scss';
import classnames from 'classnames';

const CheckBox = ({ onClick, checked = false, label }) => {
    return (
        <label className={classnames({
            [styles.label]: label,
            [styles.checked]: checked
            })
        }>
            <input 
                type="checkbox"
                className={styles.checkbox}
                onClick={onClick}
                defaultChecked={checked}
            />
            {label}
        </label>
    )
}

export default CheckBox;