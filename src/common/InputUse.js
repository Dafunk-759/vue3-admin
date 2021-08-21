import { ref } from "@vue/reactivity";

class Input {
  valid = ref(false);
  /**
   * @description:
   * @param {String} name
   * @param {Ref} value
   * @param {String} placeholder
   * @param {Object: {
   *   max: Number,
   *   min: Number
   * }} option
   *
   */
  constructor({ name, value, placeholder, option }) {
    this.name = name;
    this.value = value;
    this.placeholder = placeholder;
    this.option = option;
    this.validator = this.validator.bind(this);
    this.handleValidated = this.handleValidated.bind(this);
  }
  /**
   * @description:
   * @param {Boolean} isValid
   * @return {*}
   */
  handleValidated(isValid) {
    this.valid.value = isValid;
  }

  validator() {
    const value = this.value.value;
    const isValid = typeof value === "string" && this.option.fn(value);

    return isValid
      ? {
          isValid,
          detail: "",
        }
      : {
          isValid,
          detail: this.option.detail,
        };
  }
}

export default Input;
