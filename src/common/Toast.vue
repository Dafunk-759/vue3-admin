<template>
  <div
    :class="{
      container: true,
      success: state === 'success',
      error: state === 'error',
      show: show,
    }"
  >
    <Icon :type="state" v-if="state.length > 0" class="icon" />
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "@vue/runtime-core";
import Icon from "../common/Icon.vue";

const props = defineProps({
  state: {
    type: String,
    required: true,
    default: "",
  },
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
  msg: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["close"]);

const text = computed(() => {
  if (props.msg) {
    return props.msg;
  } else {
    switch (props.state) {
      case "":
        return "";
      case "success":
        return "操作成功🎉";
      case "error":
        return "操作失败🤔";
    }
  }
});

watch(
  () => props.show,
  (newValue, prevValue) => {
    setTimeout(() => {
      emits("close");
    }, 1500);
  }
);
</script>

<style scoped>
.container {
  position: absolute;
  left: calc(50% - 10rem);
  top: -10%;
  width: 20rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  opacity: 0;
}
.container .icon {
  flex: 1;
}
.container span {
  flex: 4;
  padding: 0 2rem;
}

.container.show {
  top: 7%;
  opacity: 1;
}
.container.error {
  background: var(--dk-gray-400);
}
.container.success {
  background: var(--dk-gray-900);
}
</style>