import React from 'react';
import styles from './SearchForm.module.scss';

const SearchForm = ({ placeholder, onChange }) => {
    return (
        <input 
            type="text"
            placeholder={placeholder}
            className={styles.input}
            onChange={onChange}
        />
    )
}

export default SearchForm;