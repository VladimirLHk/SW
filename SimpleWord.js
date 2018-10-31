import React, { Component } from 'react';
import {getWordsToChange}  from './AuxLib';
import SyllableFilter from './SyllableFilter';
import TextToChange from './TextToChange';
import WordToChange from './WordToChange';


class SimpleWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterStr: "", userText: ""};
        this.handleSyllableFilter = this.handleSyllableFilter.bind(this);
        this.handleTextToChange = this.handleTextToChange.bind(this);
        this.handleWordToChange = this.handleWordToChange.bind(this);

    }

    handleSyllableFilter (filter) {
        this.setState ({filterStr: filter});
    }

    handleTextToChange (userTextToCheck) {
        this.setState ({userText: userTextToCheck});
    }

    handleWordToChange (newUserText) {
        this.setState ({userText: newUserText});
    }

    render () {
        const filterStr = this.state.filterStr;
        const userText = this.state.userText;
        const isFullCondition = filterStr && userText;


        if (isFullCondition) {// сформирован набор букв для исключения, и есть текст
            const listToChange = getWordsToChange (filterStr, userText);
            if (listToChange.size == 0) {// нет слов для замены
                return (
                    <div>
                        <SyllableFilter filterStr={filterStr} onSyllableFilterChange={this.handleSyllableFilter}/>
                        <TextToChange userText={userText} onTextChange={this.handleTextToChange}/>
                        <p> В тексте нет слов, которые надо менять. </p>
                    </div>
                )
            } else { // есть слова для замены
                let optionsWords = [];
                for (let currentWord of listToChange.keys()) {
                    let curWrd = listToChange.get(currentWord);
                    optionsWords.push(<option value={currentWord} key={curWrd.id}> {currentWord} </option>);
                }
                return (
                    <div>
                        <SyllableFilter filterStr={filterStr} onSyllableFilterChange={this.handleSyllableFilter}/>
                        <TextToChange userText={userText} onTextChange={this.handleTextToChange}/>
                        <WordToChange optionsWords={optionsWords} dic={listToChange} userText={userText}
                                      onWordChange={this.handleWordToChange}/>
                    </div>
                )
            }
        } else {// не сформирован набор букв для исключения или нет текста
            return (
                <div>
                    <SyllableFilter filterStr={filterStr} onSyllableFilterChange={this.handleSyllableFilter}/>
                    <TextToChange userText={userText} onTextChange={this.handleTextToChange}/>
                </div>
            )
        }
    }
}


export default SimpleWord;