/*
$(document).ready(function() {
  getWeather();
});
*/

$(document).ready(function() {
  getPosts();
});

function handleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  console.log(user.email);
};

function addMessage(postTitle, postBody) {
  let postData = {
    title: postTitle,
    body: postBody
  }
  let database = firebase.database().ref('posts');

  let newPostRef = database.push();
  newPostRef.set(postData, function(error) {
    if (error) {
      console.log('write failed');
    } else {
      window.location.reload();
    }
  });
};

function getWeather(searchQuery) {
  let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchQuery + '&units=imperial&APPID=' + apiKey;
  $('.city').text("");
  $('.temp').text("");
  $('.error-message').text("");
  $.ajax(url, {
    success: function (data) {
      console.log(data);
      $('.city').text(data.name);
      $('.temp').text(data.main.temp);
    }, error: function (error) {
      $('.error-message').text('An error occured.');
    }
  })
};

function searchWeather() {
  let searchQuery = $('.search').val();
  getWeather(searchQuery);
};

function handleMessageFormSubmit() {
  let postTitle = $("#post-title").val();
  let postBody = $("#post-body").val();
  console.log(postBody);
  addMessage(postTitle, postBody);
};

function getPosts() {
  return firebase.database().ref('posts').once('value').then(function(snapshot) {
    let posts = snapshot.val();
    console.log(posts);

    for (let postKey in posts) {
      let post = posts[postKey];
      $("#post-listing").append("<div class='post'>"+post.title+" - "+post.body+"</div>");
    }
  })
};

function showPicture(){
  // use jQuery ($ is shorthand) to find the div on the page and then change the html
  // 'rounded-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
  $("#image").append('<img class="rounded-circle" src="images/high-five.gif"/>');
  $("p").html("High five! You're building your first web app!");

  // jQuery can do a lot of crazy stuff, so make sure to Google around to find out more
  
};