// Send a message containing the page details back to the event page
// chrome.runtime.sendMessage({
//     'title': document.title,
//     'url': window.location.href,
//     'summary': window.getSelection().toString()
// });
console.log('Da load content.js');



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request) {console.log(request);
      console.log(sender);
         }
  }
);



// var port = chrome.runtime.connect({name: "my-channel"});
// port.postMessage("Life-time connecting...");
// port.onMessage.addListener(function(msg) {
//   if (msg){
//    console.log(msg);
//    alert(msg);
// }
// });

// var port = chrome.runtime.connect({name: "my-channel2"});
// port.postMessage("Life-time connecting...");
// port.onMessage.addListener(function(msg) {
//   if (msg){
//    console.log(msg);
//    alert(msg);
// }
// });

// //alert(document.getElementById('formLuuThongTin').hoten.value);
// document.getElementById('objRegister_FullName').value = 'Hoàng Ngọc Sỹ';
// document.getElementById('objRegister_DateOfBirth').value = '15/07/1992';
// document.getElementById('objRegister_Email').value = 'syhoang.chem@gmail.com';
// document.getElementById('objRegister_Sex').value = '1';
// document.getElementById('objRegister_Phone').value = '0935975124';
// document.getElementById('objRegister_Marriage').value = '3';
// document.getElementById('objRegister_PermanentResidence').value = 'Thôn Rẫy';
// document.getElementById('slPref_cd').value = '24172';
// document.getElementsByName('cusinfor[sofax]')[0].value = 'Bố Trạch';
// document.getElementById('objRegister_CommuneText').value = 'Tây Trạch';
// document.getElementById('objRegister_CurrentPlaceAddress').value = '';
// document.getElementById('objRegister_Passport').value = 'C5730980';
// document.getElementById('objRegister_PassportPlace').value = 'Cục Quản lý Xuất nhập cảnh';
// document.getElementById('objRegister_PassportFromDate').value = '24/07/2018';
// document.getElementById('objRegister_PassportToDate').value = '24/07/2028';
// document.getElementById('objRegister_Graduated').value = '1';
// document.getElementById('objRegister_GraduatedUniversity').value = 'Trường Đại học Khoa học Huế';
// document.getElementById('objRegister_GraduatedFormal').value = '5';
// document.getElementById('objRegister_GraduatedStudentCode').value = 'E0104924';
// document.getElementById('objRegister_PassportToDate').value = '24/07/2028';
// document.getElementById('objRegister_GraduatedFromYear').value = '2012';
// document.getElementById('objRegister_GraduatedToYear').value = '2016';
// document.getElementById('objRegister_GraduatedNum').value = '4';
// document.getElementById('objRegister_GraduatedYear').value = '2016';
// document.getElementById('objRegister_PassportToDate').value = '24/07/2028';
// document.getElementById('objRegister_ContactPerson').value = 'Dương Thị Ơn';
// document.getElementById('objRegister_ContactPhone').value = '0378352868';
// document.getElementById('objRegister_ContactAddress').value = 'Thôn Rẫy, xã Tây Trạch, huyện Bố Trạch, tỉnh Quảng Bình';

