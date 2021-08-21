<!--
 * @Author: your name
 * @Date: 2021-07-26 11:58:25
 * @LastEditTime: 2021-07-26 11:58:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-admin\src\common\Button.vue
-->
<template>
  <button
    :class="{
      primary: type === 'primary',
      info: type === 'info',
      disabled: type === 'disabled',
      delete: type === 'delete',
      change: type === 'change',
      assign: type === 'assign',
      cancel: type === 'cancel',
    }"
    :disabled="type === 'disabled'"
  >
    <span>
      {{ content }}
    </span>
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "primary",
  },
});
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: 0.1s;
  border-radius: 0.4rem;
  padding: 1.2rem;
  font-weight: 500;
}

button.primary {
  color: #fff;
  background-color: var(--dk-gray-700);
  border-color: var(--dk-gray-700);
}

button.info {
  color: #fff;
  background-color: var(--dk-gray-700);
  border-color: var(--dk-gray-700);
}

button.disabled {
  color: #fff;
  background-color: var(--dk-gray-300);
  border-color: var(--dk-gray-300);
}
button.delete {
  color: #fff;
  background-color: var(--bs-red);
  border-color: var(--bs-red);
}
button.change {
  color: #fff;
  background-color: var(--bs-yellow);
  border-color: var(--bs-yellow);
}
button.assign {
  color: #fff;
  background-color: var(--bs-orange);
  border-color: var(--bs-orange);
}
button.cancel {
  color: #fff;
  background-color: var(--dk-gray-500);
  border-color: var(--dk-gray-500);
}
</style>