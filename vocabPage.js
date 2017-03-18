/*
* @author Ben Hogoboom <bjhogoboom@gmail.com>
* @version 3/15/2017
* @summary Core js code for Chinese Department Site
*/

//Information about the vocab
var vocabObj =
{
  "ICL1":{
      "lessons":[
        {
          "characters":[
            "你"
          ],
          "fileEndings":[
            "n"
          ]
        }
      ]
    },
  "ICL2":{}
};

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
    $("#question").append(character + "?");

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

    }else{//Something went wrong with the book name
      window.alert("Couldn't find the right book");
      window.history.back();
    }

    for(var i = 0; i < 4; i++){
      var fileName = book + lesson + fileEnding;
      if(i != 0){
        fileName = fileName + i.toString();
      }
      fileName = fileName + ".mp3";
      var src = "/audio/" + book + "/" + lesson + "/" + lesson + word + "/" + fileName;
      var toApp = `<audio controls>
                     <source src="` + src + `" type="audio/mpeg">
                     Your browser does not support the audio element.
                   </audio>`;

      var appElement = "#audio" + i.toString();
      $(appElement).append(toApp);

    }

  }else{//Something went wrong with the global variables
    window.alert("Couldn't find the audio files!");
    window.history.back();
  }
}

$(document).ready(function(){
  pageLoad();
  quizLoad();
});
