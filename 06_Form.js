/**
 * ==========================================================
 * ASJ JOB SYSTEM V2
 * File : Form.gs
 * ==========================================================
 */

/*----------------------------------------------------------
HEADERS
----------------------------------------------------------*/

Form.headers = () => [

  HEADER.KATEGORI,

  HEADER.PEKERJAAN,

  HEADER.LOKASI,

  HEADER.GENDER,

  HEADER.STATUS,

  HEADER.SYARAT,

  HEADER.KETERANGAN

];

/*----------------------------------------------------------
LABEL
----------------------------------------------------------*/

Form.label = header =>

  Utils.text(header)
    .replace(/[🏷👔📍🗾♀♂🚦🈴💬]/gu, "")
    .trim();

/*----------------------------------------------------------
TYPE
----------------------------------------------------------*/

Form.type = (header, validation) => {

  if (!validation) {

    return header === HEADER.KETERANGAN
      ? "textarea"
      : "text";

  }

  const type = validation.getCriteriaType();

  switch (type) {

    case SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST:
    case SpreadsheetApp.DataValidationCriteria.VALUE_IN_RANGE:

      return "choice";

    default:

      return header === HEADER.KETERANGAN
        ? "textarea"
        : "text";

  }

};

/*----------------------------------------------------------
VALIDATION
----------------------------------------------------------*/

Form.validation = header => {

  const sh = Utils.sheet();

  return sh.getRange(
    CONFIG.DATA_START_ROW,
    Utils.col(header)
  ).getDataValidation();

};

/*----------------------------------------------------------
DROPDOWN
----------------------------------------------------------*/

Form.dropdownList = header => {

  const rule = Form.validation(header);

  if (!rule) return [];

  const type = rule.getCriteriaType();

  const values = rule.getCriteriaValues();

  switch (type) {

    case SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST:

      return values[0];

    case SpreadsheetApp.DataValidationCriteria.VALUE_IN_RANGE:

      return values[0]
        .getDisplayValues()
        .flat()
        .filter(String);

    default:

      return [];

  }

};

/*----------------------------------------------------------
SERIALIZE
----------------------------------------------------------*/

Form.serialize = data => {

  const result = {};

  Object.keys(data).forEach(key => {

    const value = data[key];

    if (Array.isArray(value)) {

      result[key] = value.map(v => Utils.text(v));

    } else {

      result[key] = Utils.text(value);

    }

  });

  return result;

};