const priceMappings = {
  'Cerberus ScrewGate Carabiner - Blue - $7.00 ea.': 7,
  'Cerberus ScrewGate Carabiner - Pink - $7.00 ea.': 7,
  'Cheakamus ScrewGate Carabiner - Blue - $7.00 ea.': 7,
  'Cheakamus ScrewGate Carabiner - Red - $7.00 ea.': 7,
  'Cheakamus ScrewGate Carabiner - Pink - $7.00 ea.': 7,
  'GrandWall 16mm Nylon Sling - 120cm - $5.40 ea.': 5.4,
  'GrandWall 16mm Nylon Sling - 60cm - $4.20 ea.': 4.2,
  'GrandWall Dyneema 10.0mm Sling - 30cm - $4.50ea.': 4.5,
  'GrandWall Dyneema 10.0mm Sling - 120cm - $9.00 ea.': 9,
  'GrandWall Dyneema 10.0mm Sling - 60cm - $6.60 ea.': 6.6,
  'GrandWall Dyneema 12.0mm DogBone - 12cm - $3.60 ea.': 3.6,
  'GrandWall Dyneema 12.0mm DogBone - 17cm - $3.60 ea.': 3.6,
  'GrandWall 16mm Nylon DogBone - 11cm - $3.60 ea.': 3.6,
  'GrandWall 16mm Nylon DogBone - 16cm - $3.60 ea.': 3.6,
  'Figure 8 Descender - $6.60 ea.': 6.6,
  'GrandWall Belay Device - Orange - $7.00 ea.': 7,
  'GrandWall Belay Device - Burgundy - $7.00 ea.': 7,
  'Ascender - Left (Orange) - $33.00 ea.': 33,
  'Ascender - Right (Grey) - $33.00 ea.': 33,
  'Ascender Set (Left & Right) - $59.00 ea.': 59,
  'Swivel - Grey/Orange - $23.00 ea.': 23,
  'Squamish Cam Hook Large with sling - $8.00 ea.': 8,
  'Squamish Cam Hook Narrow with sling - $7.00 ea.': 7,
  'Squamish Cam Hook Small with sling - $7.00 ea.': 7,
  'Squamish Cam Hook Wide with sling - $7.00 ea.': 7,
  'Squamish Cam Hook Set with Slings - $29.00 ea.': 29,
  'uAdjust - Adjustable strap for aid climbing  - $17.00 ea.': 17,
  'uAscend (small ascender) - $41.00': 41,
  'Wedgemount Nut Set (Sizes 1-12) incl. one GrandWall Nut Tool - $59.00 ea.': 59,
  'Wedgemount Nut Set (Sizes 4-12) incl. one GrandWall Nut Tool - $47.00 ea.': 47,
  'Stainless Steel Bolt Hanger with Ring - $7.00 ea.': 7,
  'GrandWall Nut Tool - $7.00 ea.': 7,
  'Stainless Steel Asymmetrical Belay Station - $20.00 ea.': 20,
  'Stainless Steel 10mm Rap Ring - $3.55 ea.': 3.55,
  'CrossFish Mountaineering Ice Axe Straight Shaft - 65cm with leash - $41.00 ea.': 41,
  'CrossFish Mountaineering Ice Axe Straight Shaft - 70cm with leash - $41.00 ea.': 41,
  'CrossFish Mountaineering Ice Axe Straight Shaft - 50cm with leash - $41.00 ea.': 41
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
