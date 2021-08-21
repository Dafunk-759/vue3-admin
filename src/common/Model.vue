<template>
  <teleport to="body">
    <div
      id="outside"
      class="container"
      @click="handleClick"
      v-show="show"
      ref="model"
    >
      <div class="card">
        <div class="header">
          <span>{{ header }}</span>
          <Icon class="close" type="close" @click="emit('close')" />
        </div>
        <slot></slot>
        <div class="btns">
          <Button content="取消" type="cancel" @click="emit('close')" />
          <Button
            content="确认"
            :type="disable ? 'disabled' : 'primary'"
            @click="emit('confirm')"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeUpdate, onMounted } from "@vue/runtime-core";
import Icon from "../common/Icon.vue";
import Button from "../common/Button.vue";

const props = defineProps({
  header: {
    type: String,
    default: "提示",
  },
  show: {
    type: Boolean,
    default: true,
  },
  disable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close", "confirm"]);

const close = ref(false);
const model = ref(null);

onMounted(() => {
  window.addEventListener("beforeunload", () => {
    document.body.style.overflow = "";
  });
});

onBeforeUpdate(() => {
  if (!props.show) {
    document.body.style.overflow = "";
  } else {
    document.body.style.overflow = "hidden";
    if (model.value) {
      model.value.style.top = `${document.documentElement.scrollTop}px`;
    }
  }
});

function handleClick(e) {
  if (e.target.id !== "outside") return;
  emit("close");
}
</script>

<style scoped>
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  overflow: auto;
}
.card {
  margin: auto;
  background: var(--dk-darker-bg);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: space-between;
}
.header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}
.close {
  cursor: pointer;
}
.btns {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.btns * {
  padding: 0.5rem;
}
.btns *:nth-child(1) {
  margin-left: auto;
}
.btns *:nth-child(2) {
  margin-left: 2rem;
}
</style>