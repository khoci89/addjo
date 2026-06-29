/**
 * ==========================================================
 * ASJ JOB SYSTEM V2
 * File : 07_Form_Init.gs
 * ==========================================================
 */

/*----------------------------------------------------------
SHOW
----------------------------------------------------------*/

Form.show = () => {

  const html = HtmlService
    .createTemplateFromFile("JobForm")
    .evaluate()
    .setWidth(CONFIG.FORM_WIDTH)
    .setHeight(CONFIG.FORM_HEIGHT);

  SpreadsheetApp
    .getUi()
    .showModalDialog(
      html,
      Job.FORM.TITLE
    );

};

/*----------------------------------------------------------
LOAD
----------------------------------------------------------*/

Form.load = () => {

  return {

    version : App.VERSION,

    title : Job.FORM.TITLE,

    schema : Form.schema()

  };

};

/*----------------------------------------------------------
SCHEMA
----------------------------------------------------------*/

Form.schema = () =>

  Form.headers()
      .map(Form.field)
      .filter(Boolean);