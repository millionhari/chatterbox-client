var msgUsername = window.location.search.replace("?username=", "").replace("%20", " ");

var msgText = "";
var msgRoom = "";
var app = {};

//JQuery
$(document).ready(function(){
  //On click 1
  $('.sendmessage').click(function(){
    msgText = $(".messagetext").val();
    app = {
      'username': msgUsername,
      'text': msgText,
      'roomname': 'poopface'
    };
    sendMessages();
    $(".messagetext").val("");
  });

  //On click lobby
  $('.lobby').click(function(){
    func = getRooms;
  });
});

var sendMessages = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(app),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

var getMessages = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    // data: {order:'-createdAt'},
    // data: 'where={"username":"fartmonkey"}',
    contentType: 'application/json',
    success: function (data) {
      //_.each(data['results'], function(x){
      $(".chat ul").empty();
      _.each(data['results'], function(x){
        var data = _.escape(x.username+" : "+x.text);
        $(".chat ul").append("<li>"+ data +"</li>");
      })
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};



var getRooms = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    // data: {order:'-createdAt'},
    data: 'where={"room": "4chan"}',
    contentType: 'application/json',
    success: function (data) {
      //_.each(data['results'], function(x){
      $(".chat ul").empty();
      _.each(data['results'], function(x){
        var data = _.escape(x.username+" : "+x.text);
        $(".chat ul").append("<li>"+ data +"</li>");
      })
    },
    error: function (data) {
      console.error('chatterbox: Failed to get message');
    }
  });
};

//Initially set to getMessages
var func = getMessages;

getMessages();
setInterval(function(){
  func();
}, 1000);
