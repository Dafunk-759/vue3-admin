<template>
  <Model
    @close="emit('close')"
    @confirm="handleConfirm"
    :show="show"
    header="修改用户信息"
    :disable="
      !(
        usernameInput.valid.value &&
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
import { watch } from "@vue/runtime-core";

import InputUse from "../common/InputUse.js";

import { getUserById, changeUser } from "../server/ajax.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
  },
});
const emit = defineEmits(["close", "confirm"]);

const username = ref(""),
  email = ref(""),
  phone = ref("");

watch(
  () => props.show,
  async () => {
    if (!props.show) return;
    if (props.id === -1) return;
    const res = await getUserById(props.id);
    if (res.data.data) {
      const { username: name, email: mail, mobile } = res.data.data;
      username.value = name;
      email.value = mail;
      phone.value = mobile;
    }
  }
);

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
  const res = await changeUser(props.id, email.value, phone.value);
  if (res.data.data) {
    username.value = email.value = phone.value = "";
    emit("confirm");
  }
}
</script>
