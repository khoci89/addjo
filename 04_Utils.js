/**
 * ==========================================================
 * File : 03_Utils.gs
 * ==========================================================
 */

Utils._headerCache = null;

/*----------------------------------------------------------
SHEET
----------------------------------------------------------*/

Utils.sheet = () => {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  return ss.getSheetByName(CONFIG.SHEET_NAME)
      || ss.getActiveSheet();

};

/*----------------------------------------------------------
TEXT
----------------------------------------------------------*/

Utils.text = value => {

  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();

};

/*----------------------------------------------------------
HEADER MAP
----------------------------------------------------------*/

Utils.headerMap = () => {

  if (Utils._headerCache) {
    return Utils._headerCache;
  }

  const sh = Utils.sheet();

  const headers = sh.getRange(
    CONFIG.HEADER_ROW,
    1,
    1,
    sh.getLastColumn()
  ).getDisplayValues()[0];

  const map = {};

  headers.forEach((header, index) => {

    map[Utils.text(header)] = index + 1;

  });

  Utils._headerCache = map;

  return map;

};

/*----------------------------------------------------------
RELOAD HEADER
----------------------------------------------------------*/

Utils.reloadHeader = () => {

  Utils._headerCache = null;

  return Utils.headerMap();

};

/*----------------------------------------------------------
COLUMN
----------------------------------------------------------*/

Utils.col = header => {

  const sh = Utils.sheet();

  const headers = sh
    .getRange(
      CONFIG.HEADER_ROW,
      1,
      1,
      sh.getLastColumn()
    )
    .getDisplayValues()[0];

  const normalize = text =>

    String(text || "")

      // hapus emoji / simbol di depan
      .replace(/^[^\p{L}\p{N}]+/gu, "")

      // rapikan spasi
      .replace(/\s+/g, " ")

      .trim()

      .toUpperCase();

  const target = normalize(header);

  for (let i = 0; i < headers.length; i++) {

    if (normalize(headers[i]) === target) {

      return i + 1;

    }

  }

  throw new Error(
    "Header tidak ditemukan : " + header
  );

};

/*----------------------------------------------------------
SPREADSHEET
----------------------------------------------------------*/

Utils.ss = () => SpreadsheetApp.getActiveSpreadsheet();

/*----------------------------------------------------------
ACTIVE SHEET
----------------------------------------------------------*/

Utils.activeSheet = () => SpreadsheetApp.getActiveSheet();

/*----------------------------------------------------------
HEADERS
----------------------------------------------------------*/

Utils.headers = () => {

  const sh = Utils.sheet();

  return sh.getRange(
    CONFIG.HEADER_ROW,
    1,
    1,
    sh.getLastColumn()
  ).getDisplayValues()[0];

};

/*----------------------------------------------------------
NORMALIZE
----------------------------------------------------------*/

Utils.normalize = value => {

  return String(value || "")
    .replace(/^[^\p{L}\p{N}]+/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

};

/*----------------------------------------------------------
FOOTER ROW
----------------------------------------------------------*/

Utils.footerRow = () => {

  const sh = Utils.sheet();

  const values = sh
    .getRange(1,1,sh.getLastRow(),1)
    .getDisplayValues()
    .flat();

  const row = values.findIndex(v => Utils.text(v) === "👉👉");

  return row < 0 ? sh.getLastRow()+1 : row+1;

};

/*----------------------------------------------------------
LAST DATA ROW
----------------------------------------------------------*/

Utils.lastDataRow = () => {

  return Utils.footerRow() - 1;

};

/*----------------------------------------------------------
REFRESH
----------------------------------------------------------*/

Utils.refresh = () => {

  if (typeof Job.updateBorder === "function") {
    Job.updateBorder();
  }

  if (typeof UI !== "undefined" &&
      typeof UI.apply === "function") {
    UI.apply();
  }

  SpreadsheetApp.flush();

};

/*----------------------------------------------------------
CLEAR CACHE
----------------------------------------------------------*/

Utils.clearCache = () => {

  Utils._headerCache = null;

};
