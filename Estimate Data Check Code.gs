function estimates_PHD_Check() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName('estimates_PHD');
  var inputSheetData = ss.getSheetByName('estimates_PHD_data');
  
  var data_inputSheet = inputSheet.getRange("A1:BZ1500").getValues(); // data from IT version of worksheet
  var data_inputSheetData = inputSheetData.getRange("A1:BZ1500").getValues(); // data from PHD version of worksheet
  var sRow = 2;
  var sCol = 2;
  var wValue = [];
  var rValue = [];
  var address2 = [];
  for (j = 0; j < data_inputSheet[0].length; j++) {
    for (i = 0; i < data_inputSheet.length; i++) {
      if (data_inputSheet[i][j] != data_inputSheetData[i][j]) {
        address2 = address2.concat([[inputSheet.getSheetName() + '!' + inputSheet.getRange(i+1, j+1).getA1Notation()]]);
        wValue = wValue.concat([[data_inputSheet[i][j]]]);
        rValue = rValue.concat([[data_inputSheetData[i][j]]]);
      }
    }
  }
  estimates_PHD_Check_sendEmail('Important Notice for MSDAT estimate data: ', address2,wValue,rValue);

}

function estimates_PHD_Check_sendEmail(title, address2,wValue,rValue) {
  var recipients = "manaraph225@gmail.com";
  var cc = PropertiesService.getScriptProperties().getProperty('cc');
  var bcc = PropertiesService.getScriptProperties().getProperty('bcc');
//  var cc = "martynscn@gmail.com,imeasangansi@gmail.com,abegundebisola.e4e@gmail.com,mibwalla@ehealth4everyone.com,bariyat.likita@e4email.net";
//  var bcc = "m.nwaokocha@ehealth4everyone.com,martynscn@gmail.com";
  var address2 = address2.map(String);
  var header = ['Cell reference','Wrong Value','Right Value'];
  var reptChar = '=';
  var msgLength = 204000;
  var bodyCalc = ''
   
  if(address2.length == 0) {
    var subject = 'Good. estimates_PHD and estimates_PHD_data are in sync'
    var body = 'Congratulations the sheets estimates_PHD and estimates_PHD_data are in sync with each other. No further action necessary';
  } else if (address2.length > 0) {
      for(k = 0; k < address2.length; k++) {
        bodyCalc = bodyCalc + 'Cell reference: ' + address2[k] + '\n' + 'Wrong Value: ' + wValue[k] + '\n' + 'Right Value: ' + rValue[k] + '\n\n';
      }
      if(bodyCalc.length > msgLength) {
        var body = 'The number of errors in estimates_PHD GSheet is too much to be sent in a mail.\nPls Manasseh, kindly check your sheet as there are major changes to the estimates_PHD GSheet causing this much Error.';
        var subject = 'Too much error in the CAR Estimate data Sheet';
      } else if (bodyCalc.length <= msgLength) {
        var body = title + '\nThe value of the following is not in sync' + '\n\n\n' + bodyCalc;
        var subject = title + 'Error in CAR Estimate data Sheet';
      }
    }
  sendHttpPost(subject, body);
  MailApp.sendEmail(recipients, subject, body,{
                  cc: cc,
                  bcc: bcc});
}

// Add back if this causes an error
//
//function repeatString(string,count) {
//  var repeated = '';
//  for (i = 0; i < count; i++) {
//    repeated = repeated + string ;
//  }
//  return ' ' + repeated;
//}

// Add back if this causes an error
//function testRepeat() {
//  var recipient = 'martynscn@gmail.com';
//  var subject = 'Sample Subject';
//  var body = repeatString('T',204800);
//  Logger.log('Length of body is ' + body.length);
//  MailApp.sendEmail(recipient, subject, body);
//}

