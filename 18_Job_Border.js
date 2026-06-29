/**
 * ==========================================================
 * ASJ JOB SYSTEM V3
 * File : 18_Job_Border.gs
 * ==========================================================
 */

/*----------------------------------------------------------
 UPDATE BORDER
----------------------------------------------------------*/

Job.updateBorder = () => {

  const sh = Utils.sheet();

  const start = CONFIG.DATA_START_ROW;
  const lastRow = sh.getLastRow();

  if (lastRow < start) return true;

  const lastCol = sh.getLastColumn();
  const statusCol = Utils.col(HEADER.STATUS);

  // Hapus hanya border atas & bawah
  sh.getRange(
    start,
    1,
    lastRow - start + 1,
    lastCol
  ).setBorder(
    false,  // top
    null,   // left (tetap)
    false,  // bottom
    null,   // right (tetap)
    null,   // vertical (tetap)
    null    // horizontal (tetap)
  );

  const values = sh.getRange(
    start,
    statusCol,
    lastRow - start + 1,
    1
  ).getDisplayValues();

  let firstClose = -1;

  for (let i = 0; i < values.length; i++) {

    const status = Utils.text(values[i][0]).toUpperCase();

    if (status.includes("CLOSE")) {

      firstClose = start + i;
      break;

    }

  }

  // Garis pemisah OPEN → CLOSE
  if (firstClose > 0) {

    sh.getRange(
      firstClose,
      1,
      1,
      lastCol
    ).setBorder(
       true,
       false,
       false,
       false,
       false,
       false,
       "#14532D",
       SpreadsheetApp.BorderStyle.SOLID_THICK
    );

  }

  // Garis footer 👉👉
  const marker = "👉👉";

  const colA = sh
    .getRange(1, 1, sh.getLastRow(), 1)
    .getDisplayValues()
    .flat();

  const footerIndex = colA.findIndex(v => String(v).trim() === marker);

  if (footerIndex >= 0) {

    const footerRow = footerIndex + 1;

    sh.getRange(
      footerRow,
      1,
      1,
      lastCol
    ).setBorder(

      true,
      false,
      false,
      false,
      false,
      false,

      "#14532D",

      SpreadsheetApp.BorderStyle.SOLID_THICK

    );

  }

  return true;

};