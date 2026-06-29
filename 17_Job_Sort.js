/**
 * ==========================================================
 * ASJ JOB SYSTEM V3
 * File : 17_Job_Sort.gs
 * ==========================================================
 */

Job.sort = () => {

  const sh = Utils.sheet();

  const start = CONFIG.DATA_START_ROW;
  const lastRow = sh.getLastRow();

  if (lastRow < start) return true;

  const lastCol = sh.getLastColumn();

  const marker = "👉👉";
  let endRow = lastRow + 1;

  const rows = sh.getRange(
    start,
    1,
    lastRow - start + 1,
    lastCol
  ).getDisplayValues();

  for (let i = 0; i < rows.length; i++) {

    if (rows[i].join(" ").includes(marker)) {
      endRow = start + i;
      break;
    }

  }

  if (endRow <= start) return true;

  const statusCol = Utils.col(HEADER.STATUS);

  const range = sh.getRange(
    start,
    1,
    endRow - start,
    lastCol
  );

  const values = range.getValues();

  const openRows = [];
  const closeRows = [];

  values.forEach(row => {

    const status = Utils.text(
      row[statusCol - 1]
    ).toUpperCase();

    if (!status) return;

    if (
      status.includes("URGENT") ||
      status.includes("OPEN")
    ) {

      openRows.push(row);

    } else if (
      status.includes("CLOSE")
    ) {

      closeRows.push(row);

    }

  });

  const result = openRows.concat(closeRows);

  range.clearContent();

  if (result.length) {

    sh.getRange(
      start,
      1,
      result.length,
      lastCol
    ).setValues(result);

  }

  SpreadsheetApp.flush();

  if (typeof Job.updateBorder === "function") {
    Job.updateBorder();
  }

  if (typeof UI !== "undefined" &&
      typeof UI.apply === "function") {
    UI.apply();
  }

  return true;

};