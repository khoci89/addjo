/**
 * ==========================================================
 * ASJ JOB SYSTEM V3
 * File : 99_Test_Dev.gs
 * ==========================================================
 */

/*----------------------------------------------------------
 INSERT
----------------------------------------------------------*/

function testInsertRow() {

  return Job.insertRow();

}

/*----------------------------------------------------------
 SAVE
----------------------------------------------------------*/

function testSave() {

  const data = {};

  data[FIELD.KATEGORI]   = Form.dropdownList(HEADER.KATEGORI)[0] || "";
  data[FIELD.PEKERJAAN]  = "TEST JOB";
  data[FIELD.LOKASI]     = Form.dropdownList(HEADER.LOKASI)[0] || "";
  data[FIELD.GENDER]     = Form.dropdownList(HEADER.GENDER)[0] || "";
  data[FIELD.STATUS]     = Job.STATUS.OPEN;
  data[FIELD.SYARAT]     = [];
  data[FIELD.KETERANGAN] = "AUTO TEST";

  return Job.save(data);

}

/*----------------------------------------------------------
 DEV
----------------------------------------------------------*/

function testDev() {

  throw new Error(
    "Mode DEV. Jalankan testInsertRow() atau testSave() secara manual."
  );

}
