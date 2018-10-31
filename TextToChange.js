import React, { Component } from 'react';

class TextToChange extends React.Component {// ввод текста, в котором надо найти слова с "трудными" буквами и буквосочетаниями

    constructor (props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        this.props.onTextChange(e.target.value);
    }

    render () {

        let userText = this.props.userText;

        return (
            <fieldset>
                <legend> Введите Ваш текст: </legend>
                <textarea value={userText} onChange={this.handleChange} rows="10" cols="50"/>
            </fieldset>
        );
    }
}


export default TextToChange;