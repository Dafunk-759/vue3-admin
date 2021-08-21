<template>
  <div class="container">
    <form>
      <Avator class="avator" />

      <Input
        v-model="usernameInput.value.value"
        :name="usernameInput.name"
        :placeholder="usernameInput.placeholder"
        :validate="usernameInput.validator"
        @validated="usernameInput.handleValidated"
        :label="true"
        class="input"
      />

      <Input
        v-model="passwordInput.value.value"
        :name="passwordInput.name"
        :placeholder="passwordInput.placeholder"
        :validate="passwordInput.validator"
        @validated="passwordInput.handleValidated"
        :label="true"
        class="input"
      />

      <div class="btn_container">
        <Button
          @click="handleSubmit"
          content="登录"
          :type="
            usernameInput.valid.value && passwordInput.valid.value
              ? 'primary'
              : 'disabled'
          "
        />
        <Button @click="handleReset" content="重置" type="info" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { login } from "../server/ajax.js";

import InputUse from "../common/InputUse.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const { username, password, handleSubmit, handleReset } = useLogin();

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

function useLogin() {
  const username = ref("");
  const password = ref("");

  async function submit(e) {
    e.preventDefault();
    let res = null;
    try {
      res = await login({
        username: username.value,
        password: password.value,
      });
    } catch (error) {}

    return res;
  }

  async function handleSubmit(e) {
    const res = await submit(e);
    const { status, msg } = res.data.meta;
    if (res.data.data) {
      const { token } = res.data.data;
      if (status === 200) {
        sessionStorage.setItem("token", token);
        router.push("/home");
      }
    }
  }

  function handleReset(e) {
    e.preventDefault();
    username.value = "";
    password.value = "";
  }

  return {
    username,
    password,
    handleSubmit,
    handleReset,
  };
}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background: var(--dk-gray-700);
  display: flex;
  flex-flow: column;
}
.container .avator {
  margin: 2.5rem 0;
}
.container form {
  padding: 1rem 3rem;
  background: var(--dk-darker-bg);
  box-shadow: 0 0 1rem var(--dk-darker-bg);
  border-radius: 0.4rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  margin: auto;
}

.btn_container {
  display: flex;
  align-items: center;
  width: 100%;
}
.btn_container > button {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.btn_container > button:nth-child(1) {
  margin-left: auto;
}
.btn_container > button:nth-child(2) {
  margin: 0 1rem;
}

.input {
  align-self: start;
}

/* 移动端布局 */
@media (max-width: 640px) {
  .container form {
    max-width: 90%;
  }
}
</style>