/*
* @author Ben Hogoboom <bjhogoboom@gmail.com>
* @version 3/15/2017
* @summary Core js code for Chinese Department Site
*/

//Information about the vocab
var vocabObj;

//Info About the quiz word
var pathname;
var pathArr;
var book;
var lesson;
var word;
var character;

//Function that first runs when the page loads
function pageLoad(){

  //Set the global variables
  pathname = window.location.pathname;
  pathArr = pathname.split("/");
  book = pathArr[2];
  lesson = pathArr[3];
  word = pathArr[4].substring(0,3);

  if(infoCheck()){//Global variables are set
    //Get numerical versions of the lesson and word numbers for JSON parsing
    var lessonNum = parseInt(pathArr[3], 10) - 1;
    var wordNum = parseInt(pathArr[4].substring(0,3), 10) - 1;

    //Get the vocab word from the correct book
    if(book === "ICL1"){//Book 1
      character = vocabObj.ICL1.lessons[lessonNum].characters[wordNum];
    }
    else if(book === "ICL2"){//Book 2
      character = vocabObj.ICL2.lessons[lessonNum].characters[wordNum];
    }else{//Something went wrong with the book name
      window.alert("Couldn't find the right book");
      window.history.back();
    }

    //Load the character into the page
    $("#title").append(character);
    $("#question").append("<br>" + character + "?");

  }else{//Something went wrong with the global variables
    window.alert("Check to make sure the pathname is correct");
    window.history.back();
  }
}

//Checks to make sure that global variables are set
function infoCheck(){
  return typeof lesson != "undefined"
      && typeof word != "undefined"
      && typeof book != "undefined";
}


// Function used to shuffle an array.
// Source: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Load the quiz onto the page
function quizLoad(){


  //Check that all the global variables are set
  if(infoCheck()){

    //Convert the lesson and words to numbers (for JSON parsing)
    var lessonNum = parseInt(pathArr[3], 10) - 1;
    var wordNum = parseInt(pathArr[4].substring(0,3), 10) - 1;

    //Get vocab from the right book
    if(book === "ICL1"){//Book 1
      var fileEnding = vocabObj.ICL1.lessons[lessonNum].fileEndings[wordNum];
    }
    else if(book === "ICL2"){//Book 2
      var fileEnding = vocabObj.ICL2.lessons[lessonNum].fileEndings[wordNum];
    }else{//Something went wrong with the book name
      window.alert("Couldn't find the right book");
      window.history.back();
    }
    var audioElementArray = [];
    for(var i = 0; i < 4; i++){
      var fileName = book + lesson + fileEnding;
      if(i != 0){
        fileName = fileName + i.toString();
      }
      fileName = fileName + ".mp3";
      var src = "/audio/" + book + "/" + lesson + "/" + lesson + word + "/" + fileName;
      var toPush = `<audio controls>
                     <source src="` + src + `" type="audio/mpeg">
                     Your browser does not support the audio element.
                   </audio>`;
      audioElementArray.push([toPush,fileName]);
    }

    audioElementArray = shuffle(audioElementArray);

    for(var i = 0; i < 4; i++){
      var appElement = "#audio" + i.toString();
      $("#input" + i.toString()).val(audioElementArray[i][1]);
      $(appElement).append(audioElementArray[i][0]);
    }

  }else{//Something went wrong with the global variables
    window.alert("Couldn't find the audio files!");
    window.history.back();
  }
}

function checkAnswer(){
  var checked = $("input[name='audio']:checked");
  var radioValue = checked.val();
  if(typeof radioValue === "undefined"){
    window.alert("Please pick an answer");
    return;
  }else{
    var reg = new RegExp('^[0-9]$');
    if(!reg.test(radioValue.charAt(radioValue.length - 5))){
      window.alert("Correct!");
    }else{
      window.alert("Incorrect!");
    }
    $(".glyphicon").remove();
    displayAnswers();
  }
}

function displayAnswers(){
  var reg = new RegExp('^[0-9]$');
  var inputs= $("input[name='audio']");
  for(var i = 0; i < inputs.length; i++){
    var inputVal = inputs[i].value;
    if(reg.test(inputVal.charAt(inputVal.length - 5))){
      $(inputs[i].parentElement).append(`<span class="glyphicon glyphicon-remove"
                                        style="vertical-align:super"></span>`);
    }else{
      $(inputs[i].parentElement).append(`<span class="glyphicon glyphicon-ok"
                                        style="vertical-align:super"></span>`);
    }
  }
  $("#buttonRow").html(`<div class="col-sm-4">
                        </div>
                        <div class="col-sm-4">
                          <button class="btn btn-info center-block" onclick="location.reload();">
                            Retry
                          </button>
                        </div>
                        <div class="col-sm-4">
                        </div>`)


}

function returnToLesson(){
  window.location.pathname = "/vocab/" + book + "/" + lesson + "/lesson" + lesson + ".html";
}

$(document).ready(function(){

  //Fetch data from the vocab file
  $.getJSON( "/answers.json", function( data ) {
    vocabObj = data;
    pageLoad();
    quizLoad();
  });

});
