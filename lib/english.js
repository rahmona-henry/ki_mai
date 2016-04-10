var fs = require('fs')
var _ = require('lodash')
var path = require('path')

var englishDictionary = []
var count = 1

const DATA_DIR = path.join(__dirname, '/data_english')

var allWords = fs.readFileSync(path.join(DATA_DIR, 'english.json'), 'utf8')
englishDictionary = JSON.parse(allWords)

function getWord(searchTerm){
	var re = RegExp(searchTerm)
	var result = _.filter(englishDictionary, function(term) {
		return term.english_search === searchTerm
	})
	return result
}

function addWordToDictionary(wordObject){
	if(englishDictionary.indexOf(wordObject) === -1){
			englishDictionary.push(wordObject)
	}
}

function newAddWordToDictionary(wordObject){
	var arrayResult = englishDictionary.filter(function(word){
		return word.maori_search === wordObject.maori_search && word.english_search === wordObject.english_search
	})
	if (arrayResult.length === 0){
		englishDictionary.push(wordObject)
	}
}

module.exports = {
	getWord: getWord
}