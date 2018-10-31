import React, { Component } from 'react';

class SynonymsChoise extends React.Component {// выбор синонима, на замену выбранному слову

    constructor (props) {
        super (props);
        this.handleSynonymChoise = this.handleSynonymChoise.bind(this);
    }

    handleSynonymChoise (e) {
        if (e.target.selectedIndex == 0) return; //Выбран пункт "Оставить без изменения"

        let choosenWord = this.props.choosenWord; // слово, которое надо заменить
        let newWord = e.target.value; // слово, на которое надо заменить
        const pattern = "(^|[^а-яё-])" + choosenWord + "($|[^а-яё-])"; //формирование шаблона для поиска слов на замену: начало строки или "небуква", потом выбранное слово, после которого идет "небуква" или конец строки
        const re = new RegExp (pattern, "mig");
        let newText = this.props.userText.replace(re, smartReplacer);
        this.props.onWordChange(newText);

        function smartReplacer (w1, lab1, lab2, offset,  tagStr) {// сохраняет при замене верхний регистр для всего слова или для первой буквы слова
            const testWordFirstChar = lab1.length; //номер позиции в найденной строке, в которой начинается слово на замену
            let findWord = w1.substr(testWordFirstChar, newWord.length);

            let testWord = findWord.toUpperCase();
            if (testWord == findWord) newWord = newWord.toUpperCase();
            else if (testWord.charAt(0) == findWord.charAt(0)) {
                let a = newWord.charAt(0).toUpperCase();
                newWord = a + newWord.substring(1);
            }
            return lab1 + newWord + lab2;
        }
    }

    render () {
        return (
            <select id="synonyms" value={0} onChange={this.handleSynonymChoise}>
                {this.props.optArr}
            </select>
        )
    }

}

export default SynonymsChoise;


