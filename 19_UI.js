/**
 * ==========================================================
 * ASJ JOB SYSTEM V3
 * File : 19_UI.gs
 * ==========================================================
 */

/*----------------------------------------------------------
APPLY
----------------------------------------------------------*/

UI.apply = () => {

  UI.sheet();

  UI.freeze();

  UI.banner();

  UI.header();

  UI.table();

  UI.zebra();

  UI.status();

  UI.autoSize();

  UI.rowHeight();

  UI.align();

  UI.footer();

};

/*----------------------------------------------------------
SHEET
----------------------------------------------------------*/

UI.sheet = () => {

  const sh = Utils.sheet();

  sh.setHiddenGridlines(true);

  sh.setTabColor("#14532D");

};

/*----------------------------------------------------------
FREEZE
----------------------------------------------------------*/

UI.freeze = () => {

  Utils.sheet()

    .setFrozenRows(CONFIG.HEADER_ROW);

};


/*----------------------------------------------------------
BANNER
----------------------------------------------------------*/

UI.banner = () => {

  const sh = Utils.sheet();

  sh.setRowHeight(1,32);

  sh.setRowHeight(2,30);

  sh.setRowHeight(3,28);

  sh.setRowHeight(4,24);

  sh.setRowHeight(5,12);

  sh.getRange("A1:H5")

    .setVerticalAlignment("middle")

    .setHorizontalAlignment("center");

};


/*----------------------------------------------------------
HEADER
----------------------------------------------------------*/

UI.header = () => {

  const sh = Utils.sheet();

  const range = sh.getRange(
    CONFIG.HEADER_ROW,
    1,
    1,
    sh.getLastColumn()
  );

  range
    .setBackground("#14532D")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold")
    .setFontFamily("Aptos")
    .setFontSize(11)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")

  sh.setRowHeight(CONFIG.HEADER_ROW, 30);

};

/*----------------------------------------------------------
TABLE
----------------------------------------------------------*/

UI.table = () => {

  const sh = Utils.sheet();

  const start = CONFIG.DATA_START_ROW;

  const lastRow = sh.getLastRow();

  if(lastRow < start) return;

  const lastCol = sh.getLastColumn();

  const rg = sh.getRange(
      start,
      1,
      lastRow-start+1,
      lastCol
  );

  rg

    .setFontFamily("Aptos")

    .setFontSize(10)

    .setFontColor("#222222")

    .setVerticalAlignment("middle")

    .setWrap(true);

};

/*----------------------------------------------------------
ZEBRA
----------------------------------------------------------*/

UI.zebra = () => {

  const sh = Utils.sheet();

  const start = CONFIG.DATA_START_ROW;

  const lastRow = sh.getLastRow();

  if(lastRow < start) return;

  const lastCol = sh.getLastColumn();

  for(let r=start;r<=lastRow;r++){

      sh.getRange(r,1,1,lastCol)

      .setBackground(

          r%2==0

          ? "#FFFFFF"

          : "#FCFDFC"

      );

  }

};

/*----------------------------------------------------------
STATUS
----------------------------------------------------------*/

UI.status = () => {

  const sh = Utils.sheet();

  const start = CONFIG.DATA_START_ROW;

  const lastRow = sh.getLastRow();

  if(lastRow < start) return;

  const statusCol = Utils.col(HEADER.STATUS);

  for(let r=start;r<=lastRow;r++){

    const cell = sh.getRange(r,statusCol);

    const value = String(cell.getValue()).trim().toUpperCase();

    switch(value){

      case "OPEN":

        cell

          .setBackground("#DCFCE7")

          .setFontColor("#166534")

          .setFontWeight("bold")

          .setHorizontalAlignment("center");

      break;

      case "URGENT":

        cell

          .setBackground("#FEF3C7")

          .setFontColor("#B45309")

          .setFontWeight("bold")

          .setHorizontalAlignment("center");

      break;

      case "CLOSE":

        cell

          .setBackground("#E5E7EB")

          .setFontColor("#374151")

          .setFontWeight("bold")

          .setHorizontalAlignment("center");

      break;

    }

  }

};

/*----------------------------------------------------------
AUTO SIZE
----------------------------------------------------------*/

UI.autoSize = () => {

  const sh = Utils.sheet();

  const width = {

    1:100, // CODE
    2:130, // KATEGORI
    3:260, // PEKERJAAN
    4:170, // LOKASI
    5:90,  // GENDER
    6:100, // STATUS
    7:260, // SYARAT
    8:320  // KETERANGAN

  };

  Object.keys(width).forEach(col=>{

      sh.setColumnWidth(

          Number(col),

          width[col]

      );

  });

};

/*----------------------------------------------------------
FOOTER
----------------------------------------------------------*/

UI.footer = () => {

  const sh = Utils.sheet();

  const marker = "👉👉";

  const values = sh

    .getRange(

      1,

      1,

      sh.getLastRow(),

      1

    )

    .getValues()

    .flat();

  const row = values.findIndex(v=>v===marker);

  if(row<0) return;

  const rg = sh.getRange(

      row+1,

      1,

      sh.getLastRow()-row,

      sh.getLastColumn()

  );

  rg

    .setBackground("#F7FBF8")

    .setFontFamily("Aptos")

    .setFontSize(10)

    .setFontColor("#444")

    .setWrap(true);

};

/*----------------------------------------------------------
ROW HEIGHT
----------------------------------------------------------*/

UI.rowHeight = () => {

  const sh = Utils.sheet();

  const start = CONFIG.DATA_START_ROW;

  const last = sh.getLastRow();

  if(last < start) return;

  for(let r=start; r<=last; r++){

    sh.setRowHeight(r, 28);

  }

}

/*----------------------------------------------------------
ALIGN
----------------------------------------------------------*/

UI.align = () => {

  const sh = Utils.sheet();

  const start = CONFIG.DATA_START_ROW;

  const last = sh.getLastRow();

  if(last < start) return;

  // CODE
  sh.getRange(start,1,last-start+1,1)
    .setHorizontalAlignment("center");

  // GENDER
  sh.getRange(start,5,last-start+1,1)
    .setHorizontalAlignment("center");

  // STATUS
  sh.getRange(start,6,last-start+1,1)
    .setHorizontalAlignment("center");

};