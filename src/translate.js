var socket = require('./socket')
var phrase = require('./phrase')
var wordsArray = []
var translatedWords = []
var definitionArray = []

function update(message){
  message = message.split(' ')
  message.map(function(word){
    word = word.toLowerCase()
    if (word.endsWith('$') && wordsArray.indexOf(word) === -1) {
      wordsArray.push(word)
      socket.sendTranslate(word, addTranslation)
    }
  })
}

function addTranslation(data){
  console.log('data', data)
  if (data.length > 0){
    var definition = createDefinition(data)
    var word = createWord(data)
    $('#search-pane').append(definition)
    $('#word-list').append(word)
    definitionArray.push(definition)
    var element = document.getElementById('search-pane')
    element.scrollTop += 1000
  }
}

//creating an element for the translation and returning it
function createDefinition(wordsObject){
  //outside tag
  var definitionDiv = document.createElement('div')
  definitionDiv.className = 'overall-definition animated fadeIn'
  definitionDiv.id = wordsObject[0].english_search

  wordsObject.map(function(theWord){
    var singleWordDiv = document.createElement('button')
    singleWordDiv.className = 'single-definition btn btn-default'
    singleWordDiv.addEventListener('click', replaceWord)
    var word = document.createElement('p')
    word.innerHTML = theWord.english_search + " > " + theWord.maori_search
    singleWordDiv.setAttribute("maori_word", theWord.maori_search.split(",")[0].trim())
    singleWordDiv.setAttribute("english_word", theWord.english_search.split(",")[0].trim())
    singleWordDiv.appendChild(word)
    var englishSentence = document.createElement('p')
    englishSentence.innerHTML = theWord.english_sentence
    singleWordDiv.appendChild(englishSentence)
    var maoriSentence = document.createElement('p')
    maoriSentence.innerHTML = theWord.maori_sentence
    singleWordDiv.appendChild(maoriSentence)
    definitionDiv.appendChild(singleWordDiv)
  })
  return definitionDiv
}

function replaceWord(event){
  var newWord = event.currentTarget.getAttribute('maori_word')
  var oldWord = event.currentTarget.getAttribute('english_word')
  //get string
  var chatPhrase = $("#m").val()
  chatPhrase = chatPhrase.replace(oldWord+"$",newWord)
  $('#m').val(chatPhrase)
  phrase.update($('#m').val())
}
function showDef(event){
  var wordToMatch = event.currentTarget.innerText
  $('#search-pane').scrollTop(0)
  var positionDifference = $("#"+wordToMatch).position().top - $('#search-pane').scrollTop()
  $('#search-pane').scrollTop(positionDifference)
}

function createWord(wordsObject){
  var wordDiv = document.createElement('button')
  wordDiv.className = 'word btn btn-default'
  var word = document.createElement('p')
  var theWord = wordsObject[0].english_search
  word.innerHTML = theWord
  wordDiv.addEventListener('click', showDef)
  wordDiv.appendChild(word)
  return wordDiv
}


module.exports = {
  update: update
}