function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('CAR Data Notification Custom Menu')
    .addItem('Step1: Check masterSheet_PHD', 'masterSheet_PHD_Check')
    .addToUi();
}

function getQuota() {
  var remainder = MailApp.getRemainingDailyQuota();
  Logger.log('remainder is ' + remainder);
}

function sendHttpPost(subject, body) {
  var postUrl = "https://hooks.slack.com/services/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";
  var subject = subject || "No subject";
  var body = body || "No body";
  var message = subject + '\n\n' + body;
  var jsonData =
  {
     "text" : message
  };
  var payload = JSON.stringify(jsonData);
  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(postUrl, options);
}