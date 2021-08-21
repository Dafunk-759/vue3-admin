<template>
  <Model
    @close="emit('close')"
    @confirm="emit('confirm', catname, pid, level)"
    :show="show"
    header="添加分类"
    :disable="!catnameInput.valid.value"
  >
    <div class="form">
      <Input
        v-model="catnameInput.value.value"
        :name="catnameInput.name"
        :placeholder="catnameInput.placeholder"
        :validate="catnameInput.validator"
        @validated="catnameInput.handleValidated"
        :label="true"
        labelName="分类名称"
      />
      <TreeSelectCat
        :depth="2"
        content="点击选择父级分类"
        @selected="handleSelect"
      />
    </div>
  </Model>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";

import InputUse from "../common/InputUse.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close", "confirm"]);

const { catname, catnameInput } = useInput();
const { pid, level, handleSelect } = useSelect();

function useInput() {
  const catname = ref("");
  const catnameInput = new InputUse({
    name: "catname",
    value: catname,
    placeholder: "请输入分类名称",
    option: {
      fn: (val) => {
        return val.length > 0;
      },
      detail: "请输入分类名称",
    },
  });

  return {
    catname,
    catnameInput,
  };
}
function useTreeData() {
  const treeData = ref([]);
  async function getList() {
    const res = await getCateList();
    if (res.data.data) {
      treeData.value = res.data.data;
    }
  }

  return { treeData, getList };
}
function useSelect() {
  const pid = ref(0);
  const level = ref(0);

  function handleSelect(selected) {
    console.log(selected);
    for (let i = selected.length - 1; i >= 0; i--) {
      if (selected[i].cat_id !== -1) {
        pid.value = selected[i].cat_id;
        level.value = i + 1;
        break;
      }
    }
  }

  return {
    pid,
    level,
    handleSelect,
  };
}
</script>
