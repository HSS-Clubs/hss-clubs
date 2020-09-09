window.addEventListener('load', function () {
  
    checkIfLoggedIn()
    })
    
    //Google Sign In Button
    
  
    


      
      function signOut() {
          sessionStorage.clear();
          console.log('User signed out.');
          location.reload();
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
      userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
      console.log(userEntity)
      document.getElementById("signOutButton").style.display= "";
      document.getElementById("signOutButton").style.visibility = "visible";
    
    }
    
    function loggedOut(){
       console.log("not signed in")
       document.getElementById("signOutButton").style.visibility = "hidden";
       document.getElementById("signOutButton").style.display= "none";
       
    
    }
    
    