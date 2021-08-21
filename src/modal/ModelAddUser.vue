<template>
  <Model
    @close="emit('close')"
    @confirm="handleConfirm"
    :show="show"
    header="添加用户"
    :disable="
      !(
        usernameInput.valid.value &&
        passwordInput.valid.value &&
        emailInput.valid.value &&
        phoneInput.valid.value
      )
    "
  >
    <div class="form">
      <Input
        v-model="usernameInput.value.value"
        :name="usernameInput.name"
        :placeholder="usernameInput.placeholder"
        :validate="usernameInput.validator"
        @validated="usernameInput.handleValidated"
        :label="true"
      />
      <Input
        v-model="passwordInput.value.value"
        :name="passwordInput.name"
        :placeholder="passwordInput.placeholder"
        :validate="passwordInput.validator"
        @validated="passwordInput.handleValidated"
        :label="true"
      />
      <Input
        v-model="emailInput.value.value"
        :name="emailInput.name"
        :placeholder="emailInput.placeholder"
        :validate="emailInput.validator"
        @validated="emailInput.handleValidated"
        :label="true"
      />
      <Input
        v-model="phoneInput.value.value"
        :name="phoneInput.name"
        :placeholder="phoneInput.placeholder"
        :validate="phoneInput.validator"
        @validated="phoneInput.handleValidated"
        :label="true"
      />
    </div>
  </Model>
</template>

<script setup>
import { ref } from "@vue/reactivity";

import InputUse from "../common/InputUse.js";

import { addUser } from "../server/ajax.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close", "confirm"]);

const username = ref(""),
  password = ref(""),
  email = ref(""),
  phone = ref("");

const usernameInput = new InputUse({
  name: "username",
  value: username,
  placeholder: "请输入用户名",
  option: {
    fn: (val) => {
      return val.length >= 5 && val.length <= 10;
    },
    detail: "长度应为5至10位",
  },
});
const passwordInput = new InputUse({
  name: "password",
  value: password,
  placeholder: "请输入密码",
  option: {
    fn: (val) => {
      return val.length >= 6 && val.length <= 10;
    },
    detail: "长度应为6至10位",
  },
});
const emailInput = new InputUse({
  name: "email",
  value: email,
  placeholder: "请输入邮箱",
  option: {
    fn: (val) => {
      const reg =
        /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      return reg.test(val);
    },
    detail: "邮箱不合法",
  },
});
const phoneInput = new InputUse({
  name: "phone",
  value: phone,
  placeholder: "请输入手机号码",
  option: {
    fn: (val) => {
      return /^1[3-9]\d{9}$/.test(val);
    },
    detail: "手机号码不合法",
  },
});

async function handleConfirm() {
  await addUser(username.value, password.value, email.value, phone.value);
  username.value = password.value = email.value = phone.value = "";
  emit("confirm");
}
</script>
