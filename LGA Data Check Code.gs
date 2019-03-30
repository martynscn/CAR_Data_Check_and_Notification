function LGA_Dataset_Check() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName('LGA Dataset');
  var inputSheetData = ss.getSheetByName('LGA Dataset_data');
  
  var data_inputSheet = inputSheet.getRange("A1:AZ5000").getValues(); // data from IT version of worksheet
  var data_inputSheetData = inputSheetData.getRange("A1:AZ5000").getValues(); // data from PHD version of worksheet
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
  LGA_Dataset_Check_sendEmail('Important Notice for MSDAT LGA data: ', address2,wValue,rValue);

}

function LGA_Dataset_Check_sendEmail(title, address2,wValue,rValue) {
  var recipients = "manaraph225@gmail.com";
  var cc = PropertiesService.getScriptProperties().getProperty('cc');
  var bcc = PropertiesService.getScriptProperties().getProperty('bcc');
  var address2 = address2.map(String);
  var header = ['Cell reference','Wrong Value','Right Value'];
  var reptChar = '=';
  var msgLength = 204000;
  var bodyCalc = ''
   
  if(address2.length == 0) {
    var subject = 'Good. LGA Dataset and LGA Dataset_data are in sync'
    var body = 'Congratulations the sheets LGA Dataset and LGA Dataset_data are in sync with each other. No further action necessary';
  } else if (address2.length > 0) {
      for(k = 0; k < address2.length; k++) {
        bodyCalc = bodyCalc + 'Cell reference: ' + address2[k] + '\n' + 'Wrong Value: ' + wValue[k] + '\n' + 'Right Value: ' + rValue[k] + '\n\n';
      }
      if(bodyCalc.length > msgLength) {
        var body = 'The number of errors in LGA Dataset GSheet is too much to be sent in a mail.\nPls Manasseh, kindly check your sheet as there are major changes to the LGA Dataset GSheet causing this much Error.';
        var subject = 'Too much error in the CAR LGA Dataset Sheet';
      } else if (bodyCalc.length <= msgLength) {
        var body = title + '\nThe value of the following is not in sync' + '\n\n\n' + bodyCalc;
        var subject = title + 'Error in CAR LGA Dataset Sheet';
      }
    }
  sendHttpPost(subject, body);
  MailApp.sendEmail(recipients, subject, body,{
                  cc: cc,
                  bcc: bcc});
}

