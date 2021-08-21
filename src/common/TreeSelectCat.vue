<template>
  <Tooltip>
    <template #default>
      <div
        :class="{ 'select-btn': true, active: selectBtnActive }"
        @click="selectBtnActive = !selectBtnActive"
      >
        {{ content }}
      </div>
      <div v-if="selectCatName">
        {{ selectCatName }}
      </div>
      <div v-else>...</div>
    </template>
    <template #content>
      <TreeSelect @select="handleSelect" :treeData="treeData" :depth="depth" />
    </template>
  </Tooltip>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

import { getCateList } from "../server/ajax.js";

import TreeSelect from "./TreeSelect.vue";
import Tooltip from "./Tooltip.vue";

const props = defineProps({
  depth: {
    type: Number,
    default: 3,
  },
  content: {
    type: String,
    default: "点击选择商品分类",
  },
});

const emit = defineEmits(["selected"]);

const { treeData, getCate } = useTreeData();
const { id, selectCatName, handleSelect, selectBtnActive } = useSelect();

watchEffect(() => {
  getCate();
});

function useTreeData() {
  const treeData = ref([]);
  async function getCate() {
    const res = await getCateList();
    if (res.data.data) {
      treeData.value = res.data.data;
    }
  }

  return {
    treeData,
    getCate,
  };
}
function useSelect() {
  const selectBtnActive = ref(false);

  function initSelected(depth) {
    const arr = [];
    for (let i = 0; i < depth; i++) {
      arr[i] = {
        cat_id: -1,
        cat_name: "",
      };
    }

    return arr;
  }

  const selected = initSelected(props.depth);

  const selectCatName = ref("");

  function handleSelect({ cat_level, cat_id, cat_name }) {
    selected[cat_level] = {
      cat_id,
      cat_name,
    };
    for (let i = cat_level + 1; i < selected.length; i++) {
      selected[i] = {
        cat_id: -1,
        cat_name: "",
      };
    }
    selectCatName.value = selected.map(({ cat_name }) => cat_name).join("/");
    emit("selected", selected);
  }

  return {
    selectCatName,
    handleSelect,
    selectBtnActive,
  };
}
</script>

<style scoped>
.select-btn {
  padding: 0.3rem;
  border: 0.1rem solid var(--dk-gray-400);
  border-radius: 0.3rem;
  cursor: pointer;
  user-select: none;
}
.select-btn::after {
  display: inline-block;
  content: ">";
  margin-left: 0.3rem;
  transition: transform 0.3s ease;
}
.select-btn.active::after {
  transform: rotate(90deg);
}
</style>