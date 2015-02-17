var username = window.location.search.replace("?username=", "").replace("%20", " ");

var app = {
  'username': 'fart monkey',
  'text': 'how are you hr24?',
  'roomname': '4chan'
};

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
      for(var i = 0; i < data['results'].length; i++){
        var data = _.escape(data['results'][i].username+" : "+data['results'][i].text)
        $(".chat ul").prepend("<li>"+ data +"</li>");
      }
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

setInterval(getMessages, 1000);
