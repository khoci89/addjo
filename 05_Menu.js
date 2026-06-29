/**
 * ==========================================================
 * ASJ JOB SYSTEM V2
 * File : 05_Menu.gs
 * ==========================================================
 */

/*----------------------------------------------------------
ON OPEN
----------------------------------------------------------*/

function onOpen() {

  SpreadsheetApp.getUi()

    .createMenu("🌸 ASJ")

    .addItem(
      "➕ Tambah Job",
      "showJobForm"
    )

    .addSeparator()

    .addItem(
      "🔄 Refresh Header",
      "refreshHeader"
    )

    .addToUi();

}

/*----------------------------------------------------------
SHOW FORM
----------------------------------------------------------*/

function showJobForm() {

  const html = HtmlService

    .createTemplateFromFile("JobForm") // ganti "JobForm" jika nanti nama HTML diubah

    .evaluate()

    .setWidth(CONFIG.FORM_WIDTH)

    .setHeight(CONFIG.FORM_HEIGHT);

  SpreadsheetApp

    .getUi()

    .showModalDialog(
      html,
      Job.FORM.TITLE
    );

}

/*----------------------------------------------------------
INCLUDE HTML
----------------------------------------------------------*/

function include(file) {

  return HtmlService

    .createHtmlOutputFromFile(file)

    .getContent();

}

/*----------------------------------------------------------
REFRESH HEADER
----------------------------------------------------------*/

function refreshHeader() {

  Utils.reloadHeader();

}

/*----------------------------------------------------------
LOAD FORM
----------------------------------------------------------*/

function loadForm() {

  return Form.load();

}

/*----------------------------------------------------------
SUBMIT FORM
----------------------------------------------------------*/

function submitForm(data) {

  return Form.submit(data);

}