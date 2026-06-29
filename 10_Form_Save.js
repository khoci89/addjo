/**
 * ==========================================================
 * File : 06_Form_Save.gs
 * ==========================================================
 */

Form.buildRow = data => {

  data = Form.serialize(data);

  const row = [];

  row[Utils.col(HEADER.CODE_JOB) - 1] = "";

  row[Utils.col(HEADER.KATEGORI) - 1] =
    data[FIELD.KATEGORI];

  row[Utils.col(HEADER.PEKERJAAN) - 1] =
    data[FIELD.PEKERJAAN];

  row[Utils.col(HEADER.LOKASI) - 1] =
    data[FIELD.LOKASI];

  row[Utils.col(HEADER.GENDER) - 1] =
    data[FIELD.GENDER];

  row[Utils.col(HEADER.STATUS) - 1] =
    data[FIELD.STATUS];

  row[Utils.col(HEADER.SYARAT) - 1] =
    Array.isArray(data[FIELD.SYARAT])
      ? data[FIELD.SYARAT].join(", ")
      : Utils.text(data[FIELD.SYARAT]);

  row[Utils.col(HEADER.KETERANGAN) - 1] =
    data[FIELD.KETERANGAN];

  return row;

};