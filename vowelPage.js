/*
* @author Ben Hogoboom <bjhogoboom@gmail.com>
* @version 5/12/2017
* @summary Vowel js code for Chinese Department Site
*/

//Info About the quiz word
var pathname;
var pathArr;
var vowel;

//Function that first runs when the page loads
function pageLoad(){

  //Set the global variables
  pathname = window.location.pathname;
  pathArr = pathname.split("/");
  arrLen = pathArr.length;
  vowel = pathArr[arrLen - 1].substring(0, pathArr[arrLen - 1].length - 5);

  //Load the character into the page
  $("#title").append(vowel);
  $("#question").append(vowel);
}

//Load the quiz onto the page
function audioLoad(){
  var fileEnding = vowel;
  var audioElementArray = [];
  for(var i = 1; i < 5; i++){
    var fileName = fileEnding + i.toString() + ".mp3";
    var src = "../../audio/pinyin/vowels/" + vowel + "/" + fileName;
    var toPush = `<audio controls>
                   <source src="` + src + `" type="audio/mpeg">
                   Your browser does not support the audio element.
                 </audio>`;
    audioElementArray.push([toPush,fileName]);
  }

  for(var i = 0; i < 4; i++){
    var appElement = "#audio" + i.toString();
    $("#input" + i.toString()).val(audioElementArray[i][1]);
    $(appElement).append(audioElementArray[i][0]);
  }
}

function returnToLesson(){
  window.history.back();
}

$(document).ready(function(){
  pageLoad();
  audioLoad();
});
