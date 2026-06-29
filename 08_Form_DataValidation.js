/**
 * ==========================================================
 * File : 06_Form_DataValidation.gs
 * ==========================================================
 */

Form.required = function(header){

  const required = {};

  required[HEADER.KATEGORI]   = true;
  required[HEADER.PEKERJAAN]  = true;
  required[HEADER.LOKASI]     = true;
  required[HEADER.GENDER]     = true;
  required[HEADER.STATUS]     = false;
  required[HEADER.SYARAT]     = false;
  required[HEADER.KETERANGAN] = false;

  return required[header] === true;

};

Job.validate = data => {

  const row = Form.buildRow(data);

  Job.validateRow(row);

  return data;

};