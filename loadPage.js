var vocabObj =
{
  "book1":{
      "lessons":[
        {
          "characters":[
            "你"
          ]
        }
      ]
    },
  "book2":{}
};


$(document).ready(function(){
  var pathname = window.location.pathname;
  var pathArr = pathname.split("/");
  var book = pathArr[2];
  var lesson = parseInt(pathArr[3], 10) - 1;
  var word = parseInt(pathArr[4].substring(0,3), 10) - 1;
  var chatacter = vocabObj.book1.lessons[lesson].characters[word];
  window.alert(character);
  $("#title").append(word);
});
