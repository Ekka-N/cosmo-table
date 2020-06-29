import React, { useEffect, useState } from 'react';
import styles from './Table.module.scss';
import classnames from 'classnames';
import iconDelete from './icons/bin.svg';
import iconOK from './icons/OK.svg';

const Table = ({ dataArray, deleteRow }) => {  
    
const [sortedArray, setSortedArray] = useState(dataArray);
const [isSorted, setIsSorted] = useState(false);

useEffect(() => {
    setSortedArray(dataArray);
    setIsSorted(false);
  }, [dataArray]);

const convertTime = (time) => {
    let date = new Date();
    date.setTime(time*1000);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    const result = `${day}.${month}.${date.getFullYear()}`;
    return result;
}

const sortBy = (sortKey) => {
    if (isSorted) {
        setSortedArray(dataArray);
        setIsSorted(!isSorted);
    } else {
        let newArray = [...dataArray];

        if (newArray !== []) {
            newArray = newArray.sort((a, b) => (
                    (a === b ? 0 : a[sortKey].toLowerCase() < b[sortKey].toLowerCase() ? -1 : 1)
                )
            );
        };
        setSortedArray(newArray);
        setIsSorted(!isSorted);
    }
};

  return (
    <div className={styles.content}>
        <div className={styles.table}>
            <div className={ classnames(styles.row, styles.titles) }>
                <p className={styles.table__item}>
                    Имя космонавта
                    <span 
                        className={classnames({
                            [styles.sort]: true,
                            [styles.sortActive]: isSorted
                            })
                        }
                        onClick={() => sortBy("name")}
                    >По алфавиту</span>
                </p>
                <p className={styles.table__item}>
                    Первый полет
                </p>
                <p className={styles.table__item}>
                    Дней в космосе
                </p>
                <p className={styles.table__item}>
                    Название миссии
                </p>
                <p className={styles.table__item}>
                    Повторные полеты
                </p>
            </div>
            {sortedArray.map(obj => (

                <div className={styles.row} key={obj.name + obj.date}>
                    <p className={ classnames(styles.table__item, styles.bold)}>
                        {obj.name}
                    </p>
                    <p className={styles.table__item}>
                        {Number.isInteger(+obj.date) ? convertTime(obj.date) : obj.date}
                    </p>
                    <p className={styles.table__item}>
                        {obj.days}
                    </p>
                    <p className={styles.table__item}>
                        {obj.mission}
                    </p>
                    <p className={styles.table__item}>
                        {obj.isMultiple ? 
                            <img alt="OK" src={iconOK} /> 
                            : '-'
                        }
                    </p>
                    <img 
                        src={iconDelete}
                        alt="delete"
                        className={styles.delete}
                        onClick={() => deleteRow(obj)}
                    />
                </div>
            ))}
        </div>
    </div>
  );
}

export default Table;
