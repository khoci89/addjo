/**
 * ==========================================================
 * ASJ JOB SYSTEM V2
 * File : 16_Job_Save.gs
 * ==========================================================
 */

/*----------------------------------------------------------
SAVE
----------------------------------------------------------*/

Job.save = data => {

  const lock = LockService.getDocumentLock();

  lock.waitLock(30000);

  try {

    data = Job.validate(data);

    const sh = Utils.sheet();

    const row = Job.insertRow();

    sh.insertRowsBefore(row, 1);

    Job.copyFormat(row);

    const rowData = Form.buildRow(data);

    rowData[
      Utils.col(HEADER.CODE_JOB) - 1
    ] = Job.generateCode();

    sh.getRange(
      row,
      1,
      1,
      rowData.length
    ).setValues([rowData]);

    SpreadsheetApp.flush();

    if (typeof Job.sort === "function") {

      Job.sort();

    }

    return true;

  } finally {

    lock.releaseLock();

  }

};

/*----------------------------------------------------------
INSERT ROW
----------------------------------------------------------*/

Job.insertRow = () => {

  const sh = Utils.sheet();

  const start = CONFIG.DATA_START_ROW;

  const last = sh.getLastRow();

  const marker = "👉👉";

  const values = sh.getRange(
    start,
    1,
    last - start + 1,
    1
  ).getDisplayValues();

  let endRow = last + 1;

  for (let i = 0; i < values.length; i++) {

    const text = Utils.text(values[i][0]);

    if (text.includes(marker)) {

      endRow = start + i;

      break;

    }

  }

  const statusCol = Utils.col(HEADER.STATUS);

  const status = sh.getRange(
    start,
    statusCol,
    endRow - start,
    1
  ).getDisplayValues();

  for (let i = 0; i < status.length; i++) {

    if (
      Utils.text(status[i][0])
        .toUpperCase()
        .includes("CLOSE")
    ) {

      return start + i;

    }

  }

  return endRow;

};

/*----------------------------------------------------------
COPY FORMAT
----------------------------------------------------------*/

Job.copyFormat = row => {

  const sh = Utils.sheet();

  const source = Math.max(
    CONFIG.DATA_START_ROW,
    row - 1
  );

  const from = sh.getRange(
    source,
    1,
    1,
    sh.getLastColumn()
  );

  const to = sh.getRange(
    row,
    1,
    1,
    sh.getLastColumn()
  );

  from.copyTo(
    to,
    SpreadsheetApp.CopyPasteType.PASTE_FORMAT,
    false
  );

  from.copyTo(
    to,
    SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION,
    false
  );

};