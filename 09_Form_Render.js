/**
 * ==========================================================
 * File : 09_Form_Render.gs
 * ==========================================================
 */

Form.field = header => {

  const validation = Form.validation(header);

  const map = {

    [HEADER.KATEGORI]   : FIELD.KATEGORI,
    [HEADER.PEKERJAAN]  : FIELD.PEKERJAAN,
    [HEADER.LOKASI]     : FIELD.LOKASI,
    [HEADER.GENDER]     : FIELD.GENDER,
    [HEADER.STATUS]     : FIELD.STATUS,
    [HEADER.SYARAT]     : FIELD.SYARAT,
    [HEADER.KETERANGAN] : FIELD.KETERANGAN

  };

  if (!(header in map)) {

    throw new Error(
      "Header belum dimapping : " + header
    );

  }

  return {

    id       : map[header],

    header   : header,

    label    : Form.label(header),

    type     : Form.type(header, validation),

    required : Form.required(header),

    multiple :

      header === HEADER.LOKASI ||

      header === HEADER.SYARAT,

    options  : Form.dropdownList(header),

    default  :

      header === HEADER.STATUS

        ? Job.DEFAULT.STATUS

        : ""

  };

};