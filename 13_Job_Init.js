/**
 * ==========================================================
 * File : 05_Job_Init.gs
 * ==========================================================
 */

/*----------------------------------------------------------
 INIT
----------------------------------------------------------*/

Job.init = () => {

  Job.checkSheet();

  Job.checkHeader();

  return true;

};

/*----------------------------------------------------------
 CHECK SHEET
----------------------------------------------------------*/

Job.checkSheet = () => {

  const sh = Utils.sheet();

  if (!sh) {
    throw new Error(
      "Sheet '" + CONFIG.SHEET_NAME + "' tidak ditemukan."
    );
  }

  return sh;

};

/*----------------------------------------------------------
 CHECK HEADER
----------------------------------------------------------*/

Job.checkHeader = () => {

  [
    HEADER.CODE_JOB,
    HEADER.KATEGORI,
    HEADER.PEKERJAAN,
    HEADER.LOKASI,
    HEADER.GENDER,
    HEADER.STATUS,
    HEADER.SYARAT,
    HEADER.KETERANGAN
  ].forEach(Utils.col);

  return true;

};

/*----------------------------------------------------------
 START
----------------------------------------------------------*/

Job.start = () => {

  Job.init();

  if (typeof Job.sort === "function") {
    Job.sort();
  }

  if (typeof Job.updateBorder === "function") {
    Job.updateBorder();
  }

  return true;

};

/*----------------------------------------------------------
 VERSION
----------------------------------------------------------*/

Job.version = () => App.VERSION;