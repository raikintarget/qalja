/**
 * QALJA — Google Apps Script (Google Sheets интеграциясы)
 *
 * ОРНАТУ ҚАДАМДАРЫ:
 * 1. Жаңа Google Sheets ашыңыз
 * 2. Extensions → Apps Script басыңыз
 * 3. Осы кодты толығымен қойыңыз
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Deploy басыңыз → URL-ді көшіріңіз
 * 6. index.html ішіндегі SHEETS_URL-ді осы URL-мен ауыстырыңыз
 *
 * Google Sheets бағандары:
 * A: Уақыт | B: Аты | C: Телефон | D: Қала
 */

const SHEET_NAME = 'Өтінімдер'; // парақ аты

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Бірінші рет: баған тақырыптарын қосу
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Уақыт', 'Аты-жөні', 'Телефон', 'Қала']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('ru-KZ'),
      data.name  || '',
      data.phone || '',
      data.city  || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Браузерден тексеру үшін (GET сұраны)
function doGet() {
  return ContentService
    .createTextOutput('Qalja Sheets API — жұмыс істеп тұр ✅')
    .setMimeType(ContentService.MimeType.TEXT);
}
