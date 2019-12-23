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
var userId = "";
function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      userId = uid;
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Đăng xuất';
      document.getElementById('quickstart-sign-in-status').textContent = 'Đã đăng nhập';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      document.getElementById('quickstart-account-fullName').textContent = user.displayName;
      document.getElementById('quickstart-account-email').textContent = user.email;
      document.getElementById('quickstart-account-photoAcc').src = user.photoURL;
      //readUserData();
    readUserDataOnCloudStorage();

      // [END_EXCLUDE]
    } else {
      // Let's try to get a Google auth token programmatically.
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Đăng nhập bằng Google';
      document.getElementById('quickstart-sign-in-status').textContent = 'Chưa đăng nhập';
      document.getElementById('quickstart-account-details').textContent = '';
      document.getElementById('quickstart-account-fullName').textContent = '';
      document.getElementById('quickstart-account-email').textContent = '';
      document.getElementById('quickstart-account-photoAcc').src = '';
      // [END_EXCLUDE]
    }
    document.getElementById('quickstart-button').disabled = false;
  });
  // [END authstatelistener]

  document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);
  // document.getElementById('quickstart-button-facebook').addEventListener('click', startSignInByFacebook, false);
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive, authenBy = 'google') {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({ interactive: !!interactive }, function (token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      var credential = {}
      // Authorize Firebase with the OAuth Access Token.
      if (authenBy == 'google') {
        credential = firebase.auth.GoogleAuthProvider.credential(null, token);
        firebase.auth().signInWithCredential(credential).catch(function (error) {
          // The OAuth token might have been invalidated. Lets' remove it from cache.
          if (error.code === 'auth/invalid-credential') {
            chrome.identity.removeCachedAuthToken({ token: token }, function () {
              startAuth(interactive);
            });
          }
        });
      }
      else {
        credential = new firebase.auth.FacebookAuthProvider();
        credential.setCustomParameters({
          'display': 'popup' //Login dưới dạng popup
        });
        firebase.auth().signInWithPopup(credential).then(function (result) {
          var token = result.credential.accessToken; //Token facebook của user
          var user = result.user; //Thông tin của user
          console.log(user)
        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      }

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
  // document.getElementById('quickstart-button-facebook').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
    document.getElementById('formLuuThongTin').reset();
  } else {
    startAuth(true);
  }
}

function startSignInByFacebook() {
  document.getElementById('quickstart-button').disabled = true;
  // document.getElementById('quickstart-button-facebook').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
    document.getElementById('formLuuThongTin').reset();
  } else {
    startAuth(true, 'facebook');
  }
}



window.onload = function () {
  initApp();

};



// When the popup HTML has loaded
window.addEventListener('load', function (evt) {
  // Handle the bookmark form submit event with our addBookmark function
  document.getElementById('formLuuThongTin').addEventListener('submit', luuThongTin);

  document.getElementById('btnTuDongDienThongTin').addEventListener("click", function () {

    var formThongTinNguoiDung = document.getElementById('formLuuThongTin');
    var thongTinNguoiDung = [];

    for (var item of formThongTinNguoiDung.elements) {
      var userKey = { [item.id]: item.value }
      thongTinNguoiDung.push(userKey);
    }
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, thongTinNguoiDung);
    });
    readAndFillData(thongTinNguoiDung);
  })
});






// Get the event page
// chrome.runtime.getBackgroundPage(function(eventPage) {
//     // Call the getPageInfo function in the event page, passing in 
//     // our onPageDetailsReceived function as the callback. This injects 
//     // content.js into the current tab's HTML
//     eventPage.getPageDetails(onPageDetailsReceived);
// });
//});

// function onPageDetailsReceived(pageDetails)  { 
//   document.getElementById('title').value = pageDetails.title; 
//   document.getElementById('url').value = pageDetails.url; 
//   document.getElementById('summary').innerText = pageDetails.summary; 
// } 


function luuThongTin() {
  event.preventDefault();

  if (firebase.auth().currentUser === null) {
    alert('Bạn phải đăng nhập tài khoản Google mới có thể lưu thông tin');
    return;
  }
  else {
    var formThongTinNguoiDung = document.getElementById('formLuuThongTin');
    var thongTinNguoiDung = {};

    for (var item of formThongTinNguoiDung.elements) {
      thongTinNguoiDung[item.id] = item.value
    }

    // var jthongTinNguoiDung = JSON.stringify(thongTinNguoiDung);
    // Get a reference to the database service
    var database = firebase.database();
    //writeUserData(thongTinNguoiDung);
    writeUserDataOnCloudStorage(thongTinNguoiDung);
    //readUserData();
    readUserDataOnCloudStorage();
  }
}

function writeUserData(thongTinNguoiDung) {
  firebase.database().ref(userId).set(
    thongTinNguoiDung).then(function () {
      alert("Lưu thông tin thành công!");
    })
    .catch(function (error) {
      console.error("Lỗi khi lưu thông tin. Mô tả lỗi: ", error);
    });
}



function readUserData() {
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref(userId).once('value').then(function (snapshot) {

    var thongTinNguoiDungTrenMayChu = snapshot.val();
    if (thongTinNguoiDungTrenMayChu) {
      var formThongTinNguoiDung = document.getElementById('formLuuThongTin');
      for (var item of formThongTinNguoiDung.elements) {

        item.value = thongTinNguoiDungTrenMayChu.find(function (i) {
          return i.hasOwnProperty(item.id);
        })[item.id];
      }
      // formThongTinNguoiDung.elements.hoten.value =thongTinNguoiDungTrenMayChu.find(function(item){
      //   return item.hasOwnProperty('hoten');
      // })['hoten']
    }

    // ...
  });
}

function readUserDataOnCloudStorage() {
  if (userId) {
    var db = firebase.firestore();
    db.collection("users").doc(userId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          var thongTinNguoiDungTrenMayChu = doc.data();
          if (thongTinNguoiDungTrenMayChu) {
            var formThongTinNguoiDung = document.getElementById('formLuuThongTin');
            for (var item of formThongTinNguoiDung) {

              item.value = thongTinNguoiDungTrenMayChu[item.id];
            }
          }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Lỗi khi đọc thông tin. Mô tả lỗi: ", error);
      });
  }
}

function writeUserDataOnCloudStorage(thongTinNguoiDung) {
  // firebase.database().ref(userId).set(
  //   thongTinNguoiDung);

  //Add a new document in collection "cities"
  var db = firebase.firestore();

  db.collection("users").doc(userId).set(thongTinNguoiDung).then(function () {
    alert("Lưu thông tin thành công!");
  })
    .catch(function (error) {
      console.error("Lỗi khi lưu thông tin. Mô tả lỗi: ", error);
    });

}

function readAndFillData(thongTinNguoiDung) {
  var db = firebase.firestore();
  db.collection("web").where("laodongkynghi.info", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}


