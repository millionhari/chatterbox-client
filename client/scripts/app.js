var msgUsername = window.location.search.replace("?username=", "").replace("%20", " ");

var msgText = "";
var msgRoom = "";
var app = {};
var sendRoomName;
var dynamicData = "";
var roomNameText = "";
var arrayOfFriends = [];
//JQuery
$(document).ready(function(){
  //On click room
  var roomName = $('.sidebar').on('click','li', function(){
    sendRoomName = $(this).text().replace("#","");
    $(".chatterbox-title").empty();
    $(".chatterbox-title").append('<a href="index.html">#chatterbox:#</a>'+sendRoomName);
  });

  //On click 1
  $('.sendmessage').click(function(){
    msgText = $(".messagetext").val();
    app = {
      'username': msgUsername,
      'text': msgText,
      'roomname': sendRoomName
    };
    sendMessages();
    $(".messagetext").val("");
  });

  //Set Room
  $('.new-room-text-button').click(function(){
    roomNameText = $('.new-room-text').val();
    // $(".new-room-text").empty();
    app = {
      'username': 'Room Guardian',
      'text': 'Welcome to your new room!',
      'roomname' : roomNameText
    };
    sendMessages();
    $(".new-room-text").val("");
    console.log(roomNameText);
  });

  //On click name, bold
  $('.chat').on('click', '.friends', function(){
    var friendsName = $(this).text();
    if (arrayOfFriends.indexOf(friendsName) === -1){
      arrayOfFriends.push(friendsName);
    }
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
  if(sendRoomName){
    dynamicData = 'where={"roomname":"'+sendRoomName+'"}';
  }

  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    data: dynamicData,
    contentType: 'application/json',
    success: function (data) {
      $(".chat ul").empty();
      _.each(data['results'], function(x){
        var escapedUsername = _.escape(x.username);
        var escapedText = _.escape(" : "+x.text);
        if (arrayOfFriends.indexOf(escapedUsername) !== -1){
          $(".chat ul").append("<li class='friends-bold'>"+ "<span class='friends'>"+escapedUsername+"</span>" + escapedText +"</li>");
        } else {
          $(".chat ul").append("<li>"+ "<span class='friends'>"+escapedUsername+"</span>" + escapedText +"</li>");
        }
        var arrayOfRooms = $('.sidebar li').text().split("#");
        if (arrayOfRooms.indexOf(x.roomname) === -1 && x.roomname !== undefined){
          $('.sidebar ul').append("<li class='room'>#"+x.roomname+"</li>");
        }

      });
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

//Initially set to getMessages

getMessages();
setInterval(function(){
  getMessages();
}, 1000);
