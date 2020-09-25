window.addEventListener('load', function () {
checkIfLoggedIn()

})
function adminsignin(){
  sessionStorage.setItem('myUserEntity',"admin");
  loggedIn()
}
//Google Sign In Button
var googleUser;
var auth2;
var startApp = function() {
  gapi.load('auth2', function(){
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: '200579288184-pc5odbit1bduskobrae8no4orhaoa6jl.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    attachSignin(document.getElementById('customBtn'));
  });
};

function attachSignin(element) {
  auth2.attachClickHandler(element, {},
      function(googleUser) {
          onSignIn(googleUser)

      }, function(error) {
      });
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var myUserEntity = {};
  myUserEntity.Id = profile.getId();
  myUserEntity.Name = profile.getName();
  sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
  loggedIn()
  }

  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      sessionStorage.clear();
      console.log('User signed out.');
      location.reload();
    });
  }

 


  function checkIfLoggedIn()
  {
    if(sessionStorage.getItem('myUserEntity') == null){
      loggedOut()
    } else {
      loggedIn()
    }
  }

function loggedIn(){
  var userEntity = {};
  userEntity = sessionStorage.getItem('myUserEntity');
  console.log(userEntity)
  document.getElementById("loggedOut").style.visibility = "hidden";
  document.getElementById("loggedOut").style.display = "none";
  document.getElementById("loggedIn").style.display= "";
  document.getElementById("signOutButton").style.display= "";
  document.getElementById("loggedIn").style.visibility = "visible";
  document.getElementById("signOutButton").style.visibility = "visible";

}

function loggedOut(){
   console.log("not signed in")
   document.getElementById("signOutButton").style.visibility = "hidden";
   document.getElementById("signOutButton").style.display= "none";
   document.getElementById("loggedIn").style.visibility = "hidden";
   document.getElementById("loggedIn").style.display= "none";
   document.getElementById("loggedOut").style.visibility = "visible";

}

