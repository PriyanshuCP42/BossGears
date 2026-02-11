# How to Activate Google Sheets Enquiry System

Since your website is static (no backend), we will use **Google Apps Script** to send form data directly to your Google Sheet.

## Step 1: Create the Google Sheet
1.  Go to [Google Sheets](https://sheets.google.com) and create a new sheet.
2.  Name it "BossGears Enquiries".
3.  In the first row, add these headers:
    -   A1: `timestamp`
    -   B1: `name`
    -   C1: `email`
    -   D1: `phone`
    -   E1: `message`

## Step 2: Add the Script
1.  In your Google Sheet, click **Extensions** > **Apps Script**.
2.  Delete any code in `Code.gs` and paste this:

```javascript
var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

## Step 3: Deploy the Script
1.  Save the project.
2.  Run the function `intialSetup` **once** (Select it from top toolbar -> Run).
    -   It will ask for permissions. Review & Allow.
3.  Click **Deploy** > **New deployment**.
4.  Select Type: **Web app**.
5.  Description: "Enquiry Form".
6.  Execute as: **Me**.
7.  Who has access: **Anyone** (Important!).
8.  Click **Deploy**.
9.  Copy the **Web App URL**.

## Step 4: Connect to Website
1.  Open `bossgears/script.js` on your computer.
2.  Find line ~83: `const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3.  Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your copied Web App URL.
4.  Save the file.

Now, when someone fills the form, the data will instantly appear in your Google Sheet!
