/**
 * ==========================================================
 * ASJ JOB SYSTEM V2
 * File : 99_Test.gs
 * ==========================================================
 */

/*----------------------------------------------------------
CONFIG
----------------------------------------------------------*/

function testConfig() {

  Logger.log(CONFIG);

}

/*----------------------------------------------------------
HEADER
----------------------------------------------------------*/

function testHeader() {

  Logger.log(HEADER);

  Form.headers().forEach(header => {

    Logger.log(
      header + " => " + Utils.col(header)
    );

  });

}

/*----------------------------------------------------------
UTILS
----------------------------------------------------------*/

function testUtils() {

  Logger.log(
    Utils.sheet().getName()
  );

  Logger.log(
    Utils.headerMap()
  );

}

/*----------------------------------------------------------
SCHEMA
----------------------------------------------------------*/

function testSchema() {

  Form.schema().forEach(field => {

    Logger.log(field);

  });

}

/*----------------------------------------------------------
DROPDOWN
----------------------------------------------------------*/

function testDropdown() {

  Form.headers().forEach(function(header) {

    Logger.log("===== " + header + " =====");

    const list = Form.dropdownList(header);

    Logger.log(
      JSON.stringify(list, null, 2)
    );

  });

}

/*----------------------------------------------------------
GENERATE CODE
----------------------------------------------------------*/

function testGenerateCode() {

  Logger.log(
    Job.generateCode()
  );

}

/*----------------------------------------------------------
INSERT ROW
----------------------------------------------------------*/

function testInsertRow() {

  Logger.log(
    Job.insertRow()
  );

}

/*----------------------------------------------------------
BORDER
----------------------------------------------------------*/

function testBorder() {

  Job.updateBorder();

  Logger.log("OK");

}

/*----------------------------------------------------------
SORT
----------------------------------------------------------*/

function testSort() {

  Job.sort();

  Logger.log("OK");

}

/*----------------------------------------------------------
FORM
----------------------------------------------------------*/

function testForm() {

  Logger.log(
    Form.load()
  );

}

/*----------------------------------------------------------
SAVE
----------------------------------------------------------*/

function testSave() {

  const data = {};

  const kategori = Form.dropdownList(HEADER.KATEGORI);
  const lokasi   = Form.dropdownList(HEADER.LOKASI);
  const gender   = Form.dropdownList(HEADER.GENDER);
  const status   = Form.dropdownList(HEADER.STATUS);
  const syarat   = Form.dropdownList(HEADER.SYARAT);

  data[FIELD.KATEGORI] =
    kategori.length ? kategori[0] : "";

  data[FIELD.PEKERJAAN] =
    "TEST JOB";

  data[FIELD.LOKASI] =
    lokasi.length ? lokasi[0] : "";

  data[FIELD.GENDER] =
    gender.length ? gender[0] : "";

  data[FIELD.STATUS] =
    status.length
      ? status[0]
      : Job.STATUS.OPEN;

  data[FIELD.SYARAT] =
    syarat.length
      ? [syarat[0]]
      : [];

  data[FIELD.KETERANGAN] =
    "AUTO TEST";

  Logger.log(

    Job.save(data)

  );

}

/*----------------------------------------------------------
UI
----------------------------------------------------------*/

function testUI(){

  UI.apply();

}

function testBanner(){

  UI.banner();

}

function testHeader(){

  UI.header();

}

function testTable(){

  UI.table();

}

function testStatus(){

  UI.status();

}

function testFooter(){

  UI.footer();

}

/*----------------------------------------------------------
ALL
----------------------------------------------------------*/

function testAll() {

  Logger.log("========== CONFIG ==========");
  testConfig();

  Logger.log("========== HEADER ==========");
  testHeader();

  Logger.log("========== UTILS ==========");
  testUtils();

  Logger.log("========== SCHEMA ==========");
  testSchema();

  Logger.log("========== DROPDOWN ==========");
  testDropdown();

  Logger.log("========== CODE ==========");
  testGenerateCode();

  Logger.log("========== INSERT ==========");
  testInsertRow();

  Logger.log("========== BORDER ==========");
  testBorder();

  Logger.log("========== SORT ==========");
  testSort();

  Logger.log("========== FORM ==========");
  testForm();

  Logger.log("========== SAVE ==========");
  testSave();

  Logger.log("========== DONE ==========");

}