const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    console.log(`${validator.type} == ${VALIDATOR_TYPE_REQUIRE}`)
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      console.log(
        `${value.trim()} has length: ${value.trim().length}`
      );
      console.log(
        `so value.trim().length > 0 is ${value.trim().length > 0}`
      );
      isValid = value.trim().length > 0;
      console.log(
        `so isValid is ${value.trim().length > 0}`
      );
      console.log(
        `,but isValid = ${isValid}`
      );
    }
    else if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = value.trim().length >= validator.val;
    }
    else if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = value.trim().length <= validator.val;
    }
    else if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = +value >= validator.val;
    }
    else if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = +value <= validator.val;
    }
    else if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = /^\S+@\S+\.\S+$/.test(value);
    }

    if (!isValid) break;
  }
  return isValid;
};