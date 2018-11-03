import React, { Component } from 'react';
import SynonymsChoise from './SynonymsChoise';

class WordToChange extends React.Component {// выбор слова на замену и синонима, на который его надо заменить

    constructor (props) {
        super (props);
        this.state = {wordIndex: 0};
        this.handleWordChoise = this.handleWordChoise.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        let optionsWords = this.props.optionsWords;
        let newOptionsWords = nextProps.optionsWords;

        if (optionsWords.length !== newOptionsWords.length) return this.setState({wordIndex: 0});

        for (let i=0; i<optionsWords.length; i++) {
            if (optionsWords[i].props.children[1] !== newOptionsWords[i].props.children[1])
                return this.setState({wordIndex: 0});
        }
    }

    handleWordChoise (e) {
        const index = e.target.selectedIndex;
        this.setState({wordIndex: index});
    }

    render () {
        const onWordChange = this.props.onWordChange;
        const userText = this.props.userText;
        const dic = this.props.dic;
        const optionsWords = this.props.optionsWords;
        const index = this.state.wordIndex;
        const choosenWord = optionsWords[index].props.children[1];
        const synArr = dic.get(choosenWord).syn;
        const isNoSyn = synArr.length == 0;

        if (isNoSyn) {
            return (
                <div>
                    <p> Слова на замену: </p>
                    <select id="words" value={choosenWord} onChange={this.handleWordChoise}>
                        {optionsWords}
                    </select>
                    <p>Для выбранного слова нет синонимов.</p>
                </div>
            )
        } else {
            let optArr = [<option value={0} key={0}> Оставить без изменения </option>];
            for (let i=0; i<synArr.length; i++) optArr.push(<option value={synArr[i]} key={i+1}> {synArr[i]} </option>); // формирует новый список синонимов по выбранноу слову
            return (
                <div class = "element">
                    <p> Слова на замену: </p>
                    <select id="words" value={choosenWord} onChange={this.handleWordChoise}>
                        {optionsWords}
                    </select>
                    Варианты ====>
                    <SynonymsChoise optArr={optArr} choosenWord={choosenWord} userText={userText} onWordChange={onWordChange}/>
                </div>
            )

        }

    }

}


export default WordToChange;