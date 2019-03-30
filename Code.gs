function masterSheet_PHD_Check() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName('masterSheet_PHD');
  var inputSheetData = ss.getSheetByName('masterSheet_PHD_data');
  var Result = ss.getSheetByName('Result');
  
  var data_inputSheet = inputSheet.getRange("A1:GZ1500").getValues();
  var data_inputSheetData = inputSheetData.getRange("A1:GZ1500").getValues();
  var sRow = 2;
  var sCol = 2;
  var wValue = [];
  var rValue = [];
  var address2 = [];
  for (j = 0; j < data_inputSheet[0].length; j++) {
    for (i = 0; i < data_inputSheet.length; i++) {
      if (data_inputSheet[i][j] != data_inputSheetData[i][j]) {
        address2 = address2.concat([[inputSheet.getSheetName() + '!' + Result.getRange(i+1, j+1).getA1Notation()]]);
        wValue = wValue.concat([[data_inputSheet[i][j]]]);
        rValue = rValue.concat([[data_inputSheetData[i][j]]]);
      }
    }
  }
  sendEmail('Important Notice: ', address2,wValue,rValue);

}


function sendEmail(title, address2,wValue,rValue) {
  var recipients = "manaraph225@gmail.com";
  var cc = PropertiesService.getScriptProperties().getProperty('cc');
  var bcc = PropertiesService.getScriptProperties().getProperty('bcc');
//  var cc = "imeasangansi@gmail.com,claire.e4e@gmail.com,mibwalla@ehealth4everyone.com,bariyat.likita@e4email.net,ofilifavour.e4e@gmail.com";
//  var bcc = "m.nwaokocha@ehealth4everyone.com";
  var address2 = address2.map(String);
  var header = ['Cell reference','Wrong Value','Right Value'];
  var reptChar = '=';
  var msgLength = 204000;
  var bodyCalc = ''
  
  Logger.log('address length is ' + address2.length);
  
  if(address2.length == 0) {
    var subject = 'Good. masterSheet_PHD and masterSheet_PHD_data are in sync'
    var body = 'Congratulations the sheets masterSheet_PHD and masterSheet_PHD_data are in sync with each other. No further action necessary';
  } else if (address2.length > 0) {
      for(k = 0; k < address2.length; k++) {
        bodyCalc = bodyCalc + 'Cell reference: ' + address2[k] + '\n' + 'Wrong Value: ' + wValue[k] + '\n' + 'Right Value: ' + rValue[k] + '\n\n';
      }
      
      Logger.log('The bodyCalc length is ' + bodyCalc.length);
      if(bodyCalc.length > msgLength) {
        var body = 'The number of errors is too much to be sent in a mail.\nPls Manasseh, kindly check your sheet as there are major changes to the sheet causing this much Error.';
        var subject = 'Too much error in the CAR data';
      } else if (bodyCalc.length <= msgLength) {
        var body = title + '\nThe value of the following is not in sync' + '\n\n\n' + bodyCalc;
        var subject = title + 'Error in CAR dashboard data';
      }
    }
  sendHttpPost(subject, body);
  MailApp.sendEmail(recipients, subject, body,{
                  cc: cc,
                  bcc: bcc});
}

function repeatString(string,count) {
  var repeated = '';
  for (i = 0; i < count; i++) {
    repeated = repeated + string ;
  }
  return ' ' + repeated;
}

function testRepeat() {
  var recipient = 'martynscn@gmail.com';
  var subject = 'Sample Subject';
  var body = repeatString('T',204800);
  Logger.log('Length of body is ' + body.length);
  MailApp.sendEmail(recipient, subject, body);
}

