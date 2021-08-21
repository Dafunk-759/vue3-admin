<template>
  <div class="input_container">
    <label v-if="label">{{ labelName || labelMap.get(name) }}</label>
    <input
      autocomplete="off"
      :type="type"
      @input="handleInput"
      :value="modelValue"
      :placeholder="placeholder"
      :class="{
        focus: isFocus,
        username: name === 'username',
        password: name === 'password',
        email: name === 'email',
        phone: name === 'phone',
        invalid: validateRet.show,
      }"
      @focus="isFocus = true"
      @blur="handleBlur"
    />
    <span :class="{ show: validateRet.show }">
      {{ validateRet.show ? validateRet.detail : "" }}
    </span>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "@vue/runtime-core";

const labelMap = new Map([
  ["username", "用户名"],
  ["password", "密码"],
  ["email", "邮箱"],
  ["phone", "手机号"],
  ["roleName", "角色名称"],
  ["roleDesc", "角色描述"],
  ["text", "文本"],
]);

const props = defineProps({
  name: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "请输入内容",
  },
  modelValue: {
    type: [String, undefined],
    default: undefined,
  },
  validate: {
    type: Function,
    default: (value) => ({
      isValid: true,
      detail: "defalut",
    }),
  },
  label: {
    type: Boolean,
    default: false,
  },
  labelName: {
    type: [String, undefined],
    default: undefined,
  },
});

const emit = defineEmits(["update:modelValue", "validated"]);

const type = computed(() => (props.name === "password" ? "password" : "text"));
const isFocus = ref(false);

//确保自定义组件也能使用v-model
function handleInput(e) {
  const value = e.target.value;

  emit("update:modelValue", value);
}

//根据输入检测结果，控制input失焦时的样式
const validateRet = reactive({
  show: false,
  detail: "",
});

function handleBlur(e) {
  const { isValid, detail } = props.validate(e.target.value);
  emit("validated", isValid);
  validateRet.show = !isValid;
  validateRet.detail = detail;
  isFocus.value = false;
}
</script>

<style scoped>
.input_container {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: space-between;
}

.input_container > label {
  padding: 1rem 0rem;
}
.input_container > input {
  color: var(--dk-gray-100);
  border-radius: 0.4rem;
  border: 0.1rem solid var(--dk-gray-100);
  height: 4rem;
  line-height: 4rem;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.input_container > input.username,
.input_container > input.password,
.input_container > input.email,
.input_container > input.phone {
  background-size: 1.5rem 1.5rem;
  background-position: 1.5rem 1rem;
  background-repeat: no-repeat;
  padding: 1rem 4rem;
}

.input_container > input.username {
  background-image: url(../assets/icon_user.png);
}
.input_container > input.password {
  background-image: url(../assets/icon_lock.png);
}
.input_container > input.email {
  background-image: url(../assets/icon_email.png);
}
.input_container > input.phone {
  background-image: url(../assets/icon_phone.png);
}
.input_container > input.focus {
  border-color: var(--bs-yellow);
}
.input_container > input.invalid {
  border-color: var(--bs-orange);
}

.input_container > span {
  display: inline-block;
  color: var(--bs-orange);
  padding: 0.2rem 0rem;
  opacity: 0;
  transition: all 0.2s;
}
.input_container > span.show {
  opacity: 1;
  transform: translateY(0.2rem);
}
</style>