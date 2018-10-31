'use strict'
	/* В гостях у Красного Фрегата.
	Сколько прогнозов 
    открытий 	делалось всегда! 
    где-то как-то -все
           Володя*/

let charFilter = new Set(),
	userFilteredWord = new Set(),
	dic = new Map ();

const FILTER_SYM = /[а-яё]+/mg, // буквы и буквосочетания русского алфавита 
	  WORD_LOWERCASE = /[а-яё\-]+/igm; // слово: русские буквы в любом регистре и дефис 
	
    workPlace.addEventListener ('change', changesOnWorkPlace);
	changes.addEventListener ('change', setSynonymsList);
    choosenItemSynonyms.addEventListener ('change', changeToSynonym);
	
	
	function changesOnWorkPlace (event) {
	if (event.target.id == "exclude" || event.target.id == "userText") setUserFilter();
	}	
	
	function setUserFilter () {
		
		let a = exclude.value.toLowerCase().match(FILTER_SYM);
		
			if (a == null) {
				exclude.value = '';
				nothingToChange.hidden = false;
				changes.hidden = true;
			}	
			else {
				if (charFilter.size > 0) charFilter.clear();
				for (let i=0; i<a.length; i++) charFilter.add(a[i]);
				a = [];
				for (let s of charFilter.values()) a.push(s);  
				exclude.value = a.join(' ');
				setListToChange(); 
			}	
	}

	function setListToChange () {
		let a = userText.value.match(WORD_LOWERCASE);
		if (a !== null) {
			if (userFilteredWord.size > 0) {
				userFilteredWord.clear();
				dic.clear();
				let len = listToChange.length;
				for (let i=0; i<len; i++) listToChange.removeChild (listToChange.firstElementChild);
			}	
			for (let i=0; i<a.length; i++) {
			   let currentWord = a[i];
			   if (userFilteredWord.has(currentWord)) continue;
			   let currentWordFilterIndex = getFilterIndex (currentWord);
			   if (currentWordFilterIndex == 0) continue;
			   // временная заглушка для генерации синонимов
			   let newDicItem = {word: currentWord, syn:[]};
			   getSyn(newDicItem);
			   dic.set(newDicItem.word, newDicItem.syn);
			   //***
			   if (!dic.get(currentWord).length) continue;
			   userFilteredWord.add({name: currentWord, index: currentWordFilterIndex});
			   let newOption = document.createElement('option');
			   newOption.innerHTML = currentWord;
			   listToChange.appendChild(newOption);
			}
			if (listToChange.length) {
				listToChange.options[0].selected = true;
				setSynonymsList ();
				nothingToChange.hidden = true;
				changes.hidden = false;
			} else 	hideChanges ();
		} else hideChanges ();
	};

	function setSynonymsList () {
		let choosenWord = listToChange.options[listToChange.selectedIndex].value, // или innerHTML???
			synArr = dic.get(choosenWord).slice(),
			a = choosenItemSynonyms.length;
			
		if (a > 0) {
			for (let i=1; i<a; i++) {
				choosenItemSynonyms.removeChild (choosenItemSynonyms.firstElementChild.nextSibling);
			}	
		}
		
		for (let i=0; i<synArr.length; i++) {
			let newOption = document.createElement('option');
			newOption.innerHTML = synArr[i];
			choosenItemSynonyms.appendChild(newOption);
		}
		choosenItemSynonyms.options[0].selected = true;
	};

	function changeToSynonym () {
		if (!choosenItemSynonyms.selectedIndex) return;
		let wordToChange = listToChange.options[listToChange.selectedIndex].value,
			newWord = choosenItemSynonyms.options[choosenItemSynonyms.selectedIndex].value,
			pattern = wordToChange + "([^а-яё\-])",
			re = new RegExp (pattern, "mig");
		let a = userText.value;
		userText.value = a.replace(re, smartReplacer);
		setListToChange ();
		
		function smartReplacer (w1, lab1, offset,  tagStr) {
			let testWord = w1.toUpperCase();
			if (testWord == w1) newWord = newWord.toUpperCase();
			else if (testWord.charAt(0) == w1.charAt(0)) {
				let a = newWord.charAt(0).toUpperCase();
				newWord = a + newWord.substring(1);
			}	
			return newWord + lab1;
		}	
	 };


function getFilterIndex (word) {
  let res = 0;
  word = word.toLowerCase();
  for (let excl of charFilter) {
     let initpos = 0;
     while (true) {
        let a = word.indexOf(excl, initpos);
        if (a == -1) break;
        res++;
        initpos = a+1;
     }
  }
  return res;
}

function getSyn (a) {
	let word = a.word.toLowerCase();
	for (let i=0; i<word.length; i++) {
		let randSyn = new Array(3+Math.round(10*Math.random())).join(word[i]);
		a.syn.push(randSyn);
	}
}

function hideChanges () {
	nothingToChange.hidden = false;
	changes.hidden = true;			
	
}	