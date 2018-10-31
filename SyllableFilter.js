import React, { Component } from 'react';
import {adjustFilterString, getFilterFromString, getStringByFilter}  from './AuxLib';

class SyllableFilter extends React.Component { // ввод строки с буквами и буквосочетаниями (= "элемент"), слова с которыми надо исключить из текста

    constructor (props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange (e) {//контролирует ввод корректных символов; проверяет на дубли, кроме последнего элемента, который, возможно, введен ещё не до конца
        this.props.onSyllableFilterChange(adjustFilterString(e.target.value));
    }

    handleBlur (e) {//при потере фокуса проверяет на дубли всю строку, включая последний элемент
        this.props.onSyllableFilterChange(getStringByFilter(getFilterFromString(e.target.value)));
    }


    render () {
        let str = this.props.filterStr;

        return (
            <fieldset>
                <legend> Введите буквы и сочетания букв, которые Вам сложно произносить: </legend>
                <input type="text" value={str} onChange={this.handleChange} onBlur={this.handleBlur}/>
            </fieldset>
        );
    }
}


export default SyllableFilter;