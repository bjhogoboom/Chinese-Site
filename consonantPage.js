/*
* @author Ben Hogoboom <bjhogoboom@gmail.com>
* @version 5/12/2017
* @summary Consonant js code for Chinese Department Site
*/

//Info About the quiz word
var pathname;
var pathArr;
var consonant;

//Function that first runs when the page loads
function pageLoad(){

  //Set the global variables
  pathname = window.location.pathname;
  pathArr = pathname.split("/");
  consonant = pathArr[3].substring(0, pathArr[3].length - 5);

  //Load the character into the page
  $("#title").append(consonant);
  $("#question").append(consonant);
}

//Load the quiz onto the page
function audioLoad(){
  var fileEnding = consonant;
  var audioElementArray = [];
  for(var i = 1; i < 5; i++){
    var fileName = fileEnding + i.toString() + ".mp3";
    var src = "/audio/pinyin/Consonants/" + consonant + "/" + fileName;
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
  window.location.pathname = "/CVE/consonants/consonants.html";
}

$(document).ready(function(){
  pageLoad();
  audioLoad();
});
