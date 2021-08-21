<template>
  <Model
    @close="emit('close')"
    @confirm="emit('confirm')"
    :show="show"
    header="分配权限"
    :disable="false"
  >
    <TreeMultiple
      :treeData="treeData"
      :checkedIds="checkedIds"
      @add="(id) => emit('add', id)"
      @remove="(id) => emit('remove', id)"
    />
  </Model>
</template>

<script setup>
import { ref, watchEffect } from "@vue/runtime-core";

import { getRightTree } from "../server/ajax.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  checkedIds: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm", "add", "remove"]);

const treeData = ref([]);

watchEffect(async () => {
  const res = await getRightTree();
  if (res.data.data) {
    treeData.value = res.data.data;
  }
});
</script>

<style scoped>
p {
  margin: 2rem 4rem;
}
</style>