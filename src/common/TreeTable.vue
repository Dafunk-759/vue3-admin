<template>
  <table>
    <thead>
      <tr>
        <th><div>#</div></th>
        <th v-for="label of labels">
          <div>{{ label }}</div>
        </th>
        <th><div>操作</div></th>
      </tr>
    </thead>
    <tbody>
      <TreeTableTbody
        @change="(id) => emit('change', id)"
        @delete="(id) => emit('delete', id)"
        :tableData="tableData"
        :attrs="attrs"
      />
    </tbody>
  </table>
</template>
 
<script setup>
import { computed, ref, watchEffect } from "@vue/runtime-core";

import TreeTableTbody from "./TreeTableTbody.vue";

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  head: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["delete", "change"]);

const attrs = computed(() => props.head.map(({ prop }) => prop));
const labels = computed(() => props.head.map(({ label }) => label));
</script>

<style scoped>
table {
  border-top: 0.1rem solid var(--dk-gray-400);
  border-left: 0.1rem solid var(--dk-gray-400);
  border-spacing: 0;
}

th {
  padding: 0.5rem;
  border-bottom: 0.1rem solid var(--dk-gray-400);
  border-right: 0.1rem solid var(--dk-gray-400);
}

tr:nth-child(2n) {
  background: var(--dk-gray-700);
}
tr:hover {
  background: var(--dk-gray-600);
}
th div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

td.oprate div {
  justify-content: space-around;
}
.button {
  padding: 0.5rem;
}
.arrow {
  transition: transform 0.3s ease;
  user-select: none;
}
.rotate {
  transform: rotate(180deg);
}
</style>