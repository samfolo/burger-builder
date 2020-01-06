const checkValidity = (fieldValue, rules) => {
  let isValid = true ;
  let trueFieldValue = fieldValue.trim();

  if (rules.required) { isValid = isValid && trueFieldValue !== ''; }
  if (rules.minLength) { isValid = isValid && trueFieldValue.length >= rules.minLength }
  if (rules.maxLength) { isValid = isValid && trueFieldValue.length <= rules.maxLength }
  if (rules.format) { isValid = isValid && rules.format.test(trueFieldValue); }

  return isValid
}

export default checkValidity;
