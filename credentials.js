// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDmvFlYKdmLgvWg2_8u0qFrkDW6wMTZB9M",
    databaseURL: "https://heroic-vial-261514.firebaseio.com",
    storageBucket: "heroic-vial-261514.appspot.com",
};
firebase.initializeApp(config);

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Đăng xuất';
      document.getElementById('quickstart-sign-in-status').textContent = 'Đã đăng nhập';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      document.getElementById('quickstart-account-fullName').textContent= user.displayName;
      document.getElementById('quickstart-account-email').textContent= user.email;
      document.getElementById('quickstart-account-photoAcc').src = user.photoURL;

      // [END_EXCLUDE]
    } else {
      // Let's try to get a Google auth token programmatically.
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Đăng nhập bằng Google';
      document.getElementById('quickstart-sign-in-status').textContent = 'Chưa đăng nhập';
      document.getElementById('quickstart-account-details').textContent = '';
      document.getElementById('quickstart-account-fullName').textContent= '';
      document.getElementById('quickstart-account-email').textContent= '';
      document.getElementById('quickstart-account-photoAcc').src = '';
      // [END_EXCLUDE]
    }
    document.getElementById('quickstart-button').disabled = false;
  });
  // [END authstatelistener]

  document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      // Authorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token: token}, function() {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
  document.getElementById('quickstart-button').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
}



window.onload = function() {
  initApp();
  
};



// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
  // Handle the bookmark form submit event with our addBookmark function
  document.getElementById('formLuuThongTin').addEventListener('submit', luuThongTin);
  // Get the event page
  chrome.runtime.getBackgroundPage(function(eventPage) {
      // Call the getPageInfo function in the event page, passing in 
      // our onPageDetailsReceived function as the callback. This injects 
      // content.js into the current tab's HTML
      eventPage.getPageDetails(onPageDetailsReceived);
  });
});

function onPageDetailsReceived(pageDetails)  { 
  document.getElementById('title').value = pageDetails.title; 
  document.getElementById('url').value = pageDetails.url; 
  document.getElementById('summary').innerText = pageDetails.summary; 
} 


function luuThongTin(){
  event.preventDefault();
  var formThongTinNguoiDung =document.getElementById('formLuuThongTin').ELEMENT_NODE();
  //alert(JSON.parse( formThongTinNguoiDung));

  // fetch reference database
  //var database = firebase.database();


}

function writeUserData(userId, name, email, imageUrl, persionalInformation) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl

  });
}
