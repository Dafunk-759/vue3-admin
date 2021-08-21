<template>
  <ul>
    <li
      v-for="(item, index) of treeData"
      @click="(currIndex = index), emit('select', item)"
      :class="{
        select: currIndex === index,
        next: item.children && item.cat_level + 1 < depth,
      }"
    >
      {{ item.cat_name }}
    </li>
  </ul>
  <TreeSelect
    v-if="
      treeData[currIndex] &&
      treeData[currIndex].cat_level + 1 < depth &&
      treeData[currIndex].children
    "
    :treeData="treeData[currIndex].children"
    :depth="depth"
    @select="(item) => emit('select', item)"
  />
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

const props = defineProps({
  treeData: {
    type: Array,
    required: true,
  },
  depth: {
    type: Number,
    default: +Infinity,
  },
});

const emit = defineEmits(["select"]);

const currIndex = ref(-1);
watch(
  () => props.treeData,
  () => {
    currIndex.value = -1;
  }
);
</script>

<style scoped>
ul {
  max-height: 10rem;
  overflow-y: scroll;
  padding-left: 0.5rem;
}
ul li {
  padding: 0.2rem;
  margin-top: 0.1rem;
  border: 0.1rem solid var(--dk-gray-400);
  min-width: max-content;
  cursor: pointer;
  user-select: none;
}
ul li.next::after {
  content: ">";
  padding-left: 0.2rem;
}
ul li:hover {
  background: var(--dk-gray-700);
}
.select:hover,
.select {
  background: var(--bs-orange);
}
</style>