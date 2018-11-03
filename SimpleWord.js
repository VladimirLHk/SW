/*
Главный модуль интерфеса сервиса 'Simple Word'.
 */


import React, { Component } from 'react';
import {getWordsToChange}  from './AuxLib';
import SyllableFilter from './SyllableFilter';
import TextToChange from './TextToChange';
import WordToChange from './WordToChange';


class SimpleWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterStr: "", userText: ""}; //инициализируются элементы "Строка-список сложных букв и сочетаний" и "Текст для порверки" М.б. стоит предусмотреть возможность передачи начальных значений?
        this.handleSyllableFilter = this.handleSyllableFilter.bind(this);
        this.handleTextToChange = this.handleTextToChange.bind(this);
        this.handleWordToChange = this.handleWordToChange.bind(this);

    }

    //изменяет состояние фильтра: перечня букв и сочетаний, котроые трудно поризносить
    handleSyllableFilter (filter) {
        this.setState ({filterStr: filter});
    }

    //изменяет состояние текста, в котором ищутся слова со сложными буквами и сочетаниями
    handleTextToChange (userTextToCheck) {
        this.setState ({userText: userTextToCheck});
    }

    //интерфейс выбора подходящих синонимов для обнаруженных в тексте слов со сложными буквами и сочетаниями
    handleWordToChange (newUserText) {
        this.setState ({userText: newUserText});
    }

    render () {
        const filterStr = this.state.filterStr;
        const userText = this.state.userText;
        const isFullCondition = filterStr && userText;

        const mainBlock = [
            <br/>,
            <br/>,
            <br/>,
            <SyllableFilter filterStr={filterStr} onSyllableFilterChange={this.handleSyllableFilter}/>,
            <TextToChange userText={userText} onTextChange={this.handleTextToChange}/>
        ];


        if (isFullCondition) {// сформирован набор букв для исключения, и есть текст
            const listToChange = getWordsToChange (filterStr, userText); //формирование списка слов на замену
            if (listToChange.size == 0) {// нет слов для замены;
                return (
                    <div className = "element">
                        {mainBlock}
                        <p> В тексте нет слов, которые надо менять. </p>
                    </div>
                )
            } else { // есть слова для замены; формируем список слов на замену и отображаем раздел выбора синонимов на замену
                let optionsWords = [];
                for (let currentWord of listToChange.keys()) {
                    let curWrd = listToChange.get(currentWord);
                    optionsWords.push(<option value={currentWord} key={curWrd.id}> {currentWord} </option>);
                }
                return (
                    <div className = "element">
                        {mainBlock}
                        <WordToChange optionsWords={optionsWords} dic={listToChange} userText={userText}
                                      onWordChange={this.handleWordToChange}/>
                    </div>
                )
            }
        } else {// не сформирован набор букв для исключения или нет текста
            return (
                <div className = "element">
                    {mainBlock}
               </div>
            )
        }
    }
}


export default SimpleWord;