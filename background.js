// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
var config = {
  apiKey: "AIzaSyD4KpCoB0BGx0eEPDgsOeDrPyBAC_ZhqrM",
  authDomain: "tudongdien-7d35d.firebaseapp.com",
  databaseURL: "https://tudongdien-7d35d.firebaseio.com",
  projectId: "tudongdien-7d35d",
  storageBucket: "tudongdien-7d35d.appspot.com",
  messagingSenderId: "439290333260",
  appId: "1:439290333260:web:9e9c36a720817a56754ce9",
  measurementId: "G-MJQ78LS48M"
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
  firebase.auth().onAuthStateChanged(function (user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
}

window.onload = function () {
  initApp();
};

// chrome.tabs.onUpdated.addListener(function(tab) {

//   chrome.tabs.executeScript({
//       file: 'content.js'
//   }); 

// });



chrome.runtime.onConnect.addListener(function (port) {
  if (port.name == "my-channel") {
    port.onMessage.addListener(function (msg) {
      port.postMessage("send from background");
    });
  }
});

chrome.runtime.onInstalled.addListener(function (object) {
  chrome.tabs.create({ url: "./update.html" }, function (tab) {

  });
  chrome.tabs.create({ url: "./howtopurchase.html" }, function (tab) {

  });
});