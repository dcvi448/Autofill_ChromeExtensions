// Send a message containing the page details back to the event page
// chrome.runtime.sendMessage({
//     'title': document.title,
//     'url': window.location.href,
//     'summary': window.getSelection().toString()
// });
//request this mean user data

//request [0]: user data, request [1]: id on server
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    try {
      console.log('Site được hỗ trợ: ' + request[2]);
      if (request) {
        //Step 1: For loop user data = request[0] and run script with param idOnServer = request[1] euqal request[0]
        var userDataReceived = request[0];
        var idOnServerReceived = request[1];
        for (var property in userDataReceived) {
          if (request[2] == 'laodongkynghi.info') {
            //objRegister_GraduatedUniversity
            if (document.getElementById(idOnServerReceived[property]) === null && property != 'hocvan' & property!='quanhuyenthanhpho') {

            } else {
              if (property.includes('ngay'))
                document.getElementById(idOnServerReceived[property]).value = new Date(userDataReceived[property]).toLocaleDateString('en-GB');
              else if (property == 'quanhuyenthanhpho'){
                if (document.getElementsByName(idOnServerReceived[property]).length > 0){
                  document.getElementsByName(idOnServerReceived[property])[0].value = userDataReceived[property];
                }
              }
              else if (property == 'hocvan') {
                if (document.getElementsByName(idOnServerReceived[property]).length != 0) {
                  if (userDataReceived[property] == 1) {
                    document.getElementsByName(idOnServerReceived[property])[1].click();
                  }
                  else {

                    document.getElementsByName(idOnServerReceived[property])[0].click();
                  }
                }
              }
              else
                document.getElementById(idOnServerReceived[property]).value = userDataReceived[property];
            }
          }
          else {
            if (document.getElementById(idOnServerReceived[property]) === null && property != 'hocvan') {

            } else {
              if (property.includes('ngay'))
                document.getElementById(idOnServerReceived[property]).value = new Date(userDataReceived[property]).toLocaleDateString('en-GB');
              else if (property == 'hocvan') {
                if (document.getElementsByName(idOnServerReceived[property]).length != 0) {
                  if (userDataReceived[property] == 1) {
                    document.getElementsByName(idOnServerReceived[property])[1].click();
                  }
                  else {

                    document.getElementsByName(idOnServerReceived[property])[0].click();
                  }
                }
              }
              else
                document.getElementById(idOnServerReceived[property]).value = userDataReceived[property];
            }
          }
        }
      }

    }

    catch (err) {
      console.log(err);
    }
  }
);


