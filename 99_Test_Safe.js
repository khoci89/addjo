/**
 * ==========================================================
 * ASJ JOB SYSTEM V3
 * File : 99_Test_Safe.gs
 * ==========================================================
 */

/*----------------------------------------------------------
 SAFE TEST
----------------------------------------------------------*/

function testConfig() {
  Logger.log(CONFIG);
}

function testHeader() {

  Logger.log("===== HEADER =====");

  Object.values(HEADER).forEach(h => {

    Logger.log(h + " => " + Utils.col(h));

  });

}

function testUtils() {

  Logger.log(Utils.sheet().getName());

  Logger.log(Utils.headerMap());

}

function testSchema() {

  Form.schema().forEach(f => Logger.log(f));

}

function testDropdown() {

  Form.headers().forEach(h => {

    Logger.log(h);

    Logger.log(Form.dropdownList(h));

  });

}

function testGenerateCode() {

  Logger.log(Job.generateCode());

}

function testUI() {

  UI.apply();

}

function testBorder() {

  Job.updateBorder();

}

function testSort() {

  Job.sort();

}

/*----------------------------------------------------------
 SAFE ALL
----------------------------------------------------------*/

function testSafe() {

  Logger.log("===== CONFIG =====");
  testConfig();

  Logger.log("===== HEADER =====");
  testHeader();

  Logger.log("===== UTILS =====");
  testUtils();

  Logger.log("===== SCHEMA =====");
  testSchema();

  Logger.log("===== DROPDOWN =====");
  testDropdown();

  Logger.log("===== CODE =====");
  testGenerateCode();

  Logger.log("===== UI =====");
  testUI();

  Logger.log("===== BORDER =====");
  testBorder();

  Logger.log("===== SORT =====");
  testSort();

  Logger.log("===== SAFE TEST PASS =====");

}
