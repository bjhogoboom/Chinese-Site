
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

    //Update title of the page and the table
    $("#pageTitle").append(lesson);
    $("#tableTitle").append("Lesson " + lesson + " Vocabulary");

    //Get numerical versions of the lesson and word numbers for JSON parsing
    var lessonNum = parseInt(pathArr[3], 10) - 1;

    var lessonObj;
    var characterNum;
    var character;
    var partOfSpeech;
    var link;

    //Get the vocab word from the correct book
    if(book === "ICL1"){//Book 1
      lessonObj = vocabObj.ICL1.lessons[lessonNum];
      for(var i = 0; i < lessonObj.characters.length; i++){
        character = lessonObj.characters[i];

        if(i < 9){
          characterNum = "00" + (i + 1).toString();
        }else{
          characterNum = "0" + (i + 1).toString();
        }

        partOfSpeech = lessonObj.partsOfSpeech[i];

        link = "/vocab/ICL1/" + lesson + "/" + characterNum + ".html";
        buildRow((i+1).toString(),character, characterNum, partOfSpeech, link);
      }
    }
    else if(book === "ICL2"){//Book 2
      lessonObj = vocabObj.ICL2.lessons[lessonNum];
      for(var i = 0; i < lessonObj.characters.length; i++){
        character = lessonObj.characters[i];

        if(i < 9){
          characterNum = "00" + (i + 1).toString();
        }else{
          characterNum = "0" + (i + 1).toString();
        }

        partOfSpeech = lessonObj.partsOfSpeech[i];

        link = "/vocab/ICL2/" + lesson + "/" + characterNum + ".html";
        buildRow((i+1).toString(),character, characterNum, partOfSpeech, link);
      }
    }else{//Something went wrong with the book name
      window.alert("Couldn't find the right book");
      window.history.back();
    }

    //Load the character into the page

    $("#question").append(character + "?");

  }else{//Something went wrong with the global variables
    window.alert("Check to make sure the pathname is correct");
    window.history.back();
  }
}

function buildRow(num, character, characterNum, partOfSpeech, link){
  var data1 = "<td>" + num + "</td>";
  var data2 = "<td>" + character + "</td>";
  var data3 = "<td>" + partOfSpeech + "</td>";
  var data4 = `<td><a href="`+ link + `"> ` + character + ` Pronunciation Quiz </a></td>`;
  var row = "<tr>" + data1 + data2 + data3 + data4 + "</tr>";
  $("#lessonBody").append(row);
}
//Checks to make sure that global variables are set
function infoCheck(){
  return typeof lesson != "undefined"
      && typeof book != "undefined";
}

function returnToList(){
  window.location.pathname = "/vocab/" + book + ".html";
}

$(document).ready(function(){
  //Fetch data from the vocab file
  $.getJSON( "/vocabulary.json", function( data ) {
    vocabObj = data;
    pageLoad();
  });

});
