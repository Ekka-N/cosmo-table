import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Table from './Table/Table';
import Form from './Form/Form';
import Input from './Input/Input';

const App = () => {

  const data = [
    { "name": "Sigmund Jähn", "date": 272926800, "days": 7, "mission": "Sojus 31 / Sojus 29",
    "isMultiple": false },
    { "name": "Ulf Merbold", "date": 438814800, "days": 10, "mission": "STS-9", "isMultiple":
    true },
    { "name": "Reinhard Furrer", "date": 499467600, "days": 7, "mission": "STS-61-A (D1)",
    "isMultiple": false },
    { "name": "Ernst Messerschmid", "date": 499467600, "days": 7, "mission": "STS-61-A (D1)",
    "isMultiple": false },
    { "name": "Klaus-Dietrich Flade", "date": 700779600, "days": 7, "mission": "Sojus TM-14 / Sojus TM-13",
    "isMultiple": false },
    { "name": "Hans Schlegel", "date": 735768000, "days": 9, "mission": "STS-55 (D2)",
    "isMultiple": true },
    { "name": "Ulrich Walter", "date": 735768000, "days": 9, "mission": "STS-55 (D2)",
    "isMultiple": false },
    { "name": "Thomas Reiter", "date": 810072000, "days": 179, "mission": "Sojus TM-22 / Euromir 95",
    "isMultiple": true },
    { "name": "Reinhold Ewald", "date": 855522000, "days": 19, "mission": "Sojus TM-25 / Sojus TM-24",
    "isMultiple": false },
    { "name": "Gerhard Thiele", "date": 950216400, "days": 11, "mission": "STS-99",
    "isMultiple": false },
    { "name": "Alexander Gerst", "date": 1401224400, "days": 165, "mission": "Sojus TMA-13M / ISS-Expedition 40 /ISS-Expedition 41",
    "isMultiple": false }
  ];

  const [arrayOfData, setArrayOfData] = useState(data);
  const [sortedArray, setSortedArray] = useState(arrayOfData);
  const [valueName, setValueName] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [valueDays, setValueDays] = useState("");
  const [valueMission, setValueMission] = useState("");
  const [isMultiple, setIsMultiple] = useState(false);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue) {
      let newArray = [...arrayOfData];

      newArray = newArray.filter(obj => 
        obj.name.toLowerCase().search(searchValue.toLowerCase()) >= 0
      );
      setSortedArray(newArray);
    } else setSortedArray(arrayOfData)
  }, [searchValue, arrayOfData]);

  const deleteRow = objToDelete => {
    let newArray = [...arrayOfData];

    newArray = newArray.filter(obj => 
        obj.name !== objToDelete.name && obj.mission !== objToDelete.mission
    );
    setArrayOfData(newArray);
  }

  const toAdd = () => {   

    if (valueName && valueDate && valueDays && valueMission) {

      if (!Number.isInteger(+valueDays)) {
        setError("Дни должны быть целым числом");
        return;
      };

      if (!Number.isInteger(+valueDate)) {
        if (!valueDate.match(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/g)) {
          setError("Дата должна быть в формате unixtime или формата DD.MM.YYYY");
          return;
        }
      };

      let newArray = [...arrayOfData];

      newArray.push(
        { "name": valueName, "date": valueDate, "days": valueDays, "mission": valueMission,
          "isMultiple": isMultiple }
      )
      setArrayOfData(newArray);
      setValueName("");
      setValueDate("");
      setValueDays("");
      setValueMission("");
      setIsMultiple(false);
    } else {
      setError("Заполнены не все поля")
    }
  };
  
  return (
    <div className={styles.content}>
      <Form  
          arrayOfInputs = {[
            {
              id: 1,
              value: valueName,
              onChange: e => {setError(""); setValueName(e.target.value)},
              placeholder: "Имя космонавта"
            },
        
            {
              id: 2,
              value: valueDate,
              onChange: e => {setError(""); setValueDate(e.target.value)},
              placeholder: "Дата первого полёта"
            },
        
            {
              id: 3,
              value: valueDays,
              onChange: e => {setError(""); setValueDays(e.target.value)},
              placeholder: "Дней"
            },
        
            {
              id: 4,
              value: valueMission,
              onChange: e => {setError(""); setValueMission(e.target.value)},
              placeholder: "Название миссии"
            }
          ]}

          checkbox={ {
            isChecked: isMultiple,
            onClick: () => setIsMultiple(!isMultiple),
            label:"Повторные вылеты"
          } }
          
          onClickBtn={toAdd}
          error={error}
      />
      <Input 
          search
          value={searchValue} 
          placeholder={"Поиск по имени космонавта"}
          onChangeInput={e => setSearchValue(e.target.value.replace(/[\W]/g, ""))}
      />
      <Table      
        dataArray={sortedArray}
        deleteRow={deleteRow}
      />
    </div>
  );
}

export default App;
