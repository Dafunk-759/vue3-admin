import { reactive } from "@vue/reactivity";

const state = reactive({
  state: "",
  show: false,
  msg: "",
});

function handleClose() {
  state.show = false;
}

function success(msg) {
  state.state = "success";
  state.show = true;
  state.msg = msg;
}

function error(msg) {
  state.state = "error";
  state.show = true;
  state.msg = msg;
}

export default {
  state,
  handleClose,
  success,
  error,
};
