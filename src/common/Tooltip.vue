<template>
  <div class="container">
    <div @click="show = !show">
      <slot></slot>
    </div>
    <div
      :class="{
        visible: show,
        tooltip: true,
      }"
    >
      <div class="tooltip-inner">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const show = ref(false);
</script>

<style scoped>
.tooltip {
  position: absolute;
  visibility: hidden;
  border: 0.1rem solid var(--dk-gray-400);
  background: var(--dk-gray-800);
  z-index: 2;
}
.tooltip.visible {
  visibility: visible;
}
.container {
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tooltip-inner {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
</style>