const priceMappings = {
  'Cerberus ScrewGate Carabiner - Blue - $7.00 ea.': 7,
  'Cerberus ScrewGate Carabiner - Pink - $7.00 ea.': 7
};

function onFormSubmit(e) {
  var items = e.response.getItemResponses();
  var respondentEmail = e.response.getRespondentEmail();

  var template = HtmlService.createTemplateFromFile('email');
  template.name = items[0].getResponse();
  template.total = calculateTotal(items);
  template.itemList = getItemList(items);

  var message = template.evaluate().getContent();

  MailApp.sendEmail({
    to: respondentEmail,
    subject: 'Your VOC GrandWall Order',
    htmlBody: message
  });
}

function calculateTotal(items) {
  var total = 0;
  for (item of items) {
    let title = item.getItem().getTitle();
    if (priceMappings[title]) {
      let quantity = item.getResponse();
      if (quantity) {
        total += priceMappings[title] * quantity;
      }
    }
  }
  return total.toFixed(2);
}

function getItemList(items) {
  var itemList = [];
  for (item of items) {
    let title = item.getItem().getTitle();
    if (priceMappings[title]) {
      let quantity = item.getResponse();
      if (quantity) {
        itemList.push(title + ': ' + quantity);
      }
    }
  }
  return itemList
}
