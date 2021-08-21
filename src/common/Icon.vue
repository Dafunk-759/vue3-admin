<template>
  <div class="icon">
    <img :src="src" :alt="type" />
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import icons from "./Icons.js";

const props = defineProps({
  type: {
    validator(value) {
      // 这个值必须匹配下列字符串中的一个
      return icons.indexOf(value) !== -1;
    },
    required: true,
  },
});

const src = computed(() => getImageUrl(props.type));

function getImageUrl(name) {
  if (URL) {
    return new URL(`../assets/icon_${name}.png`, import.meta.url).href;
  }
}
</script>

<style scoped>
.icon {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon img {
  max-width: 100%;
  max-height: 100%;
}
</style>