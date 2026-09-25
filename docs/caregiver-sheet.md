# Storing caregiver applications in a Google Sheet

1. Create a Google Sheet. In row 1 add these headers, in this order:
   `submittedAt, name, mobile, dob, languages, experience, start, currentAddress, permanentAddress`
2. Extensions → Apps Script, replace the code with:

   ```js
   function doPost(e) {
     const d = JSON.parse(e.postData.contents);
     const sh = SpreadsheetApp.getActiveSheet();
     const cols = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
     sh.appendRow(cols.map((c) => "'" + (d[c] ?? "")));
     return ContentService.createTextOutput("ok");
   }
   ```
3. Deploy → New deployment → type Web app → Execute as **Me**, access **Anyone** → Deploy. Copy the web app URL.
4. In Vercel → Project → Settings → Environment Variables add `SHEETS_WEBHOOK_URL` = that URL, then redeploy.

Keep the sheet private; the URL is the only thing that can write to it.
