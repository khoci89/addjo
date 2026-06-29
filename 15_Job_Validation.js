/**
 * ==========================================================
 * ASJ JOB SYSTEM V2
 * File : 15_Job_Validation.gs
 * ==========================================================
 */

/*----------------------------------------------------------
VALIDATE DATA
----------------------------------------------------------*/

Job.validate = data => {

  const row = Form.buildRow(data);

  Job.validateRow(row);

  return data;

};

/*----------------------------------------------------------
VALIDATE ROW
----------------------------------------------------------*/

Job.validateRow = row => {

  if (!Array.isArray(row)) {

    throw new Error(
      "Data baris tidak valid."
    );

  }

  Form.headers().forEach(header => {

    const col = Utils.col(header) - 1;

    let value = row[col];

    if (Array.isArray(value)) {

      value = value.join(", ");

    }

    value = Utils.text(value);

    if (

      Form.required(header) &&

      value === ""

    ) {

      throw new Error(

        Form.label(header) +

        " wajib diisi."

      );

    }

  });

  return row;

};

/*----------------------------------------------------------
JOIN SYARAT
----------------------------------------------------------*/

Job.joinSyarat = syarat => {

  if (Array.isArray(syarat)) {

    return syarat.join(", ");

  }

  return Utils.text(syarat);

};