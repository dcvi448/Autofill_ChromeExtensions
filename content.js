// Send a message containing the page details back to the event page
// chrome.runtime.sendMessage({
//     'title': document.title,
//     'url': window.location.href,
//     'summary': window.getSelection().toString()
// });
console.log('Da load content.js');
//request this mean user data

//request [0]: user data, request [1]: id on server
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request) {
      //Step 1: For loop user data = request[0] and run script with param idOnServer = request[1] euqal request[0]
      var userDataReceived = request[0];
      var idOnServerReceived = request[1];
      console.log(userDataReceived);
      console.log(idOnServerReceived);
      for (var property in userDataReceived) {
        //objRegister_GraduatedUniversity
        
        document.getElementById(idOnServerReceived[property]).value = userDataReceived[property];
        
          console.log(idOnServerReceived[property] + "=" + userDataReceived[property]);
      }
    }
  }
);


