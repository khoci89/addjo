/**
 * ==========================================================
 * ASJ JOB SYSTEM V2
 * File : 05_Job_GenerateCode.gs
 * ==========================================================
 */

Job.generateCode = () => {

  const sh = Utils.sheet();

  const col = Utils.col(HEADER.CODE_JOB);

  const start = CONFIG.DATA_START_ROW;

  const last = sh.getLastRow();

  if (last < start) {

    return (
      CONFIG.CODE_PREFIX +
      Utilities.formatString(
        "%0" + CONFIG.CODE_DIGIT + "d",
        1
      ) +
      CONFIG.CODE_SUFFIX
    );

  }

  const values = sh.getRange(
    start,
    col,
    last - start + 1,
    1
  ).getDisplayValues();

  let max = 0;

  for (const [value] of values) {

  const match = String(value)
    .trim()
    .match(Job.REGEX.CODE);

  if (!match) continue;

  const number = Number(match[1]);

  if (number > max) {

    max = number;

  }

}

  const next = max + 1;

  return (
    CONFIG.CODE_PREFIX +
    Utilities.formatString(
      "%0" + CONFIG.CODE_DIGIT + "d",
      next
    ) +
    CONFIG.CODE_SUFFIX
  );

};

/*----------------------------------------------------------
 NEXT NUMBER
----------------------------------------------------------*/

Job.nextNumber = () => {

  const code = Job.generateCode();

  const match = code.match(Job.REGEX.CODE);

  return match ? Number(match[1]) : 1;

};

/*----------------------------------------------------------
 VALID CODE
----------------------------------------------------------*/

Job.isValidCode = code =>

  Job.REGEX.CODE.test(
    String(code).trim()
  );

/*----------------------------------------------------------
 CODE TO NUMBER
----------------------------------------------------------*/

Job.codeNumber = code => {

  const match = String(code)
    .trim()
    .match(Job.REGEX.CODE);

  return match ? Number(match[1]) : 0;

};