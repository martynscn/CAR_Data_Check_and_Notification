function Deprecated_20181015_get_convert_values() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName('masterSheet_PHD');
  var inputSheetData = ss.getSheetByName('masterSheet_PHD_data');
  var Result = ss.getSheetByName('Result');
  
  var data_inputSheet = inputSheet.getRange("A1:GE1500").getValues();
  var data_inputSheetData = inputSheetData.getRange("A1:GE1500").getValues();
  var sRow = 2;
  var sCol = 2;
//  Logger.log('data_inputSheet value is ' + data_inputSheet);
//  Logger.log('data_inputSheetData value is ' + data_inputSheetData[i][j]);  
  
  
 
//  var address = [];
  var wValue = [];
  var rValue = [];
  var address2 = [];
  for (j = 0; j < data_inputSheet[0].length; j++) {
    for (i = 0; i < data_inputSheet.length; i++) {
//      Logger.log('j is ' + j + ' and i is ' + i);
//      Logger.log('data_inputSheet value is ' + data_inputSheet[i][j]);
//      Logger.log('data_inputSheetData value is ' + data_inputSheetData[i][j] + '\n');
      if (data_inputSheet[i][j] != data_inputSheetData[i][j]) {
//        address = address.concat([[i,j]]);
        address2 = address2.concat([[inputSheet.getSheetName() + '!' + Result.getRange(i+1, j+1).getA1Notation()]]);
        wValue = wValue.concat([[data_inputSheet[i][j]]]);
        rValue = rValue.concat([[data_inputSheetData[i][j]]]);
      }
    }
  }
  
//  Logger.log('The addresses are ' + address);
//  Result.getRange(2,2,address.length, address[0].length).setValues(address);

//  Result.getRange(sRow,sCol,address2.length, address2[0].length).setValues(address2);
//  Result.getRange(sRow,sCol + 1,wValue.length, wValue[0].length).setValues(wValue);
//  Result.getRange(sRow,sCol + 2,rValue.length, rValue[0].length).setValues(rValue);
 
  if(address2.length > 0) {
    Logger.log('Entering function to send mail');
    sendEmail('Important Notice: ', address2,wValue,rValue);
  }
  
  Logger.log('Finished function');
}

function Deprecated_20181015_sendEmail(title, address2,wValue,rValue) {
  var recipients = "manaraph225@gmail.com";
  var cc = "martynscn@gmail.com";
  var bcc = "m.nwaokocha@ehealth4everyone.com,martynscn@gmail.com";
  var recipient = 'martynscn@gmail.com';
  var subject = title + 'Error in CAR dashboard data';
  var body = title + '\nThe value of the following is not in sync' + '\n\n\n';
  var address2 = address2.map(String);
  var header = ['Cell reference','Wrong Value','Right Value'];
  var reptChar = '=';
  var msgLength = 204000;
//  body = body + header[0] + '\n' + header[1] + '\n' + header[2] + '\n' + '\n\n\n';
//  body = body + header[0] + repeatString(reptChar,25 - header[0].length) + ' || ' + header[1] + repeatString(reptChar, 15 - header[1].length) + ' || ' + header[2] + '\n' + repeatString(repeatString(reptChar,3),15) + '\n\n\n';
  for(k = 0; k < address2.length; k++) {
//    body = body + address2[k][0] + repeatString('-',25 - address2[k][0].length) + ' || ' + wValue[k][0] + repeatString('-',15 - wValue[k][0].length) + ' || ' + rValue[k][0] + '\n';
//    body = body + address2[k] + repeatString(reptChar,25 - address2[k][0].length) + ' || ' + wValue[k] + repeatString(reptChar,15 - wValue[k].length) + ' || ' + rValue[k] + '\n\n';
    body = body + 'Cell reference: ' + address2[k] + '\n' + 'Wrong Value: ' + wValue[k] + '\n' + 'Right Value: ' + rValue[k] + '\n\n';

  }
  
  Logger.log('The Body length is ' + body.length);
  
  
  if(body.length > msgLength) {
    var msgbody = 'The number of errors is too much to be sent in a mail.\nPls Manasseh, kindly check your sheet as there are major changes to the sheet causing this much Error.';
    var msgsubject = 'Too much error in the CAR data';
  } else if (body.length <= msgLength) {
    var msgbody = body;
    var msgsubject = subject;
  }
  MailApp.sendEmail(recipients, msgsubject, msgbody,{
                  cc: cc,
                  bcc: bcc});
}

function Deprecated_20181015_repeatString(string,count) {
  var repeated = '';
  for (i = 0; i < count; i++) {
    repeated = repeated + string ;
  }
  return ' ' + repeated;
}

function Deprecated_20181015_testRepeat() {
//  Logger.log(repeatString('M',5));
//  Logger.log('Mails remaining ' + MailApp.getRemainingDailyQuota());
  var recipient = 'martynscn@gmail.com';
  var subject = 'Sample Subject';
  var body = repeatString('T',204800);
  Logger.log('Length of body is ' + body.length);
  MailApp.sendEmail(recipient, subject, body);
}

