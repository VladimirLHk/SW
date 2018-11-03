import React from 'react';
const filterSym = /[а-яё]+/mg; // буквы и буквосочетания русского алфавита
const wordLowercase = /[а-яё-]+/igm; // слово: русские буквы в любом регистре и дефис;

function adjustFilterString (s) { // возвращает набор разрешенных букв и/или буквосочетаний по строке == "набор элементов"

    let a = s.toLowerCase().match(filterSym); // взять из строки все элементы
    if (a == null) return ""; // если элементов в строке не было, то вернуть пустую строку

    let lastSym = s[s.length-1].toLowerCase();
    let isAddSpace = (lastSym === " ") || (!filterSym.test(lastSym) && s.length > 1 && s[s.length-2] === " ");
    // является ли последний символ пробелом или неразрешенным символом, перед которым стоит пробел? = "нужно ли в конце строки добавлять пробел?"

    let lastElm = a.length > 1 && !isAddSpace ? a.pop() : "";
    // в строке больше одного элемента и пробел в конце добавлять не надо (= "ввод полседнего элемента, возможно, не закончился") === последний элемент не надо проверять на наличие дубля среди остальных элементов из строки.

    let filterStr = new Set ();
    for (let i=0; i<a.length; i++) filterStr.add(a[i]); // отбросить дубли

    // создает сроку с отброшенными дублями и только с разрешенными элементами, разделенными пробелами, добавляя в конце, если нужно - пробел или пробел с элементом, ввод которого, возможно, не окончен
    a = [];
    for (let s of filterStr.values()) a.push(s);
    return a.join(' ') + (isAddSpace ? " " : "") + (lastElm === "" ? "" : " " + lastElm);

}

function getWordsToChange (filterStr, userText) {
    /*
    возвращает набор слов, в которых есть буквы и буквосочетания, которые надо замениить на синонимы;
    кроме того для каждого слова, содержащего сложные буквы и сочетания, возвращает  набор парамтеров:
    - index: количество сложных букв и сочетаний в слове;
    - id: порядковый номер обнаруженного слова;
    - syn: набор синонимов;
    предполагается, что:
        строка с фильтром - filterStr - не пустая и корректная;
        текст - userText - не пустой, но может не содержать ни одного русского слова или ни одного слова, которое надо заменить;
    в этом случае возвращается пустой набор;
    */
    let a = userText.toLowerCase().match(wordLowercase); //разбиваем текст на слова

    if (a == null) return new Map();

    // создать набор букв и буквосочетаний для проверки на наличие в словах
    let charFilter = getFilterFromString(filterStr);

    // создать набор слов, для которых нужно искать синонимы
    let userFilteredWord = new Map();
    let num = 0;
    for (let i=0; i<a.length; i++) {
        let currentWord = cutBorderDashes(a[i]);
        if (userFilteredWord.has(currentWord)) continue; // слово уже есть в списке на замену
        let currentWordFilterIndex = getFilterIndex(currentWord, charFilter);
        if (currentWordFilterIndex !== 0) {//в слове есть хотя бы одна сложная буква или сочетание
            num++;
            userFilteredWord.set(currentWord, {index: currentWordFilterIndex, id: num, syn: getSyn(currentWord)});
        }
    }

    return userFilteredWord;

    //если есть, то убирает дефисы в начале и в конце слова
    function cutBorderDashes(word) {
        let start = 0; //указатель на первый элемент в изначальной строке, отличный от дефиса
        while (word[start] === "-") start++;
        let end = word.length-1; //указатель на ппоследний элемент в изначальной строке, отличный от дефиса
        while (word[end] === "-") end--;
        return word.slice(start, end+1);
    }

}


function getFilterIndex (word, fltr) {
// считает, сколько в слове букв и буквосочетаний, которые установлены в фильтре
    let res = 0;
    word = word.toLowerCase();
    for (let elm of fltr) {
        let initpos = 0;
        while (true) {
            let a = word.indexOf(elm, initpos);
            if (a == -1) break;
            res++;
            initpos = a+1;
        }
    }
    return res;
}

// возвращает набор букв и буквосочетаний по строке c корректными символами;
// убирает дубли;
// корректные символы находятся в константе filterSym
function getFilterFromString (s) {
    let a = s.toLowerCase().match(filterSym);
    let filterStr = new Set ();

    if (a !== null) {
        for (let i=0; i<a.length; i++) filterStr.add(a[i]);
    }
    return filterStr;
}

function getStringByFilter (filterStr) { //возвращает строку, сформированную из входного набора букв и буквосочетаний через одиночный пробел
    if (filterStr.size == 0) return "";
    let a = [];
    for (let s of filterStr.values()) a.push(s);
    return a.join(' ');
}


function getSyn (a) {//генерация синонимов: слов случайной длины от 3 до 13 одинаковых символов для каждого символа исходного слова
    const word = a.toLowerCase();
    let syn = [];
    for (let i=0; i<word.length; i++) {
        let randSyn = new Array(3+Math.round(10*Math.random())).join(word[i]);
        syn.push(randSyn);
    }
    return syn;
}

export {adjustFilterString, getWordsToChange, getFilterIndex, getFilterFromString, getStringByFilter, getSyn};
