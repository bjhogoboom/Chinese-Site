<td>你</td>
<td>pr</td>
<td>
  <a href="/vocab/ICL1/01/001.html"> Pronunciation Quiz </a>
</td>
//Info About the quiz word
var pathname;
var pathArr;
var book;
var lesson;

//Function that first runs when the page loads
function pageLoad(){

  //Set the global variables
  pathname = window.location.pathname;
  pathArr = pathname.split("/");
  book = pathArr[2];
  lesson = pathArr[3];

  if(infoCheck()){//Global variables are set
    //Get numerical versions of the lesson and word numbers for JSON parsing
    var lessonNum = parseInt(pathArr[3], 10) - 1;

    //Get the vocab word from the correct book
    if(book === "ICL1"){//Book 1
      for(var i = 0; i < lessons[lessonNum].length)
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
    $("#question").append(character + "?");

  }else{//Something went wrong with the global variables
    window.alert("Check to make sure the pathname is correct");
    window.history.back();
  }
}

function buildRow(character, partOfSpeech, link){

  <td>你</td>
  <td>pr</td>
  <td>
    <a href="/vocab/ICL1/01/001.html"> Pronunciation Quiz </a>
  </td>
  $("#lessonBody").append("
  ")
}
//Checks to make sure that global variables are set
function infoCheck(){
  return typeof lesson != "undefined"
      && typeof word != "undefined"
      && typeof book != "undefined";
}

$(document).ready(function(){

  //Fetch data from the vocab file
  $.getJSON( "/answers.json", function( data ) {
    vocabObj = data;
    pageLoad();
    quizLoad();
  });

});
