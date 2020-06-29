import React from 'react';
import styles from './Form.module.scss';
import Input from '../Input/Input';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../Button/Button';

const Form = ({ 
    arrayOfInputs,
    checkbox,
    onClickBtn,
    error
}) => {

    return (
        <div className={styles.content} onKeyDown={e => e.keyCode === 13 ? onClickBtn() : null}>
            {arrayOfInputs && arrayOfInputs.map(data => (
                <Input 
                    value={data.value} 
                    placeholder={data.placeholder}
                    onChangeInput={data.onChange}
                    small={data.placeholder === 'Дней'}
                    key={data.id}
                    error={error}
                />
            ))}
            <CheckBox 
                checked={checkbox.isChecked}
                onClick={checkbox.onClick}
                label={checkbox.label}
            />
            <div className={styles.btn}>
                <Button 
                    text={"Добавить"}
                    onClick={onClickBtn}
                />
                {error &&
                    <div className={styles.error}>
                        {error}
                    </div>
                }
            </div>
        </div>
    )
}

export default Form;