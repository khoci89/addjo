/**
 * ==========================================================
 * File : 07_Form_Submit.gs
 * ==========================================================
 */

Form.submit = data => {

  data = Form.serialize(data);

  Job.validateRow(
    Form.buildRow(data)
  );

  return Job.save(data);

};