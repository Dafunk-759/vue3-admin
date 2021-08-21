<template>
  <div class="container">
    <Breadcrumb :to="to" />
    <div class="card">
      <div class="header">
        <TreeSelectCat
          :depth="3"
          @selected="(selected) => (id = selected[2].cat_id)"
        />
      </div>
      <div class="nav">
        <span @click="sel = 'many'" :class="{ active: sel === 'many' }"
          >动态参数</span
        >
        <span @click="sel = 'only'" :class="{ active: sel === 'only' }"
          >静态参数</span
        >
      </div>
      <Button class="add-btn" content="添加参数" @click="add.handleAdd" />
      <Table
        class="table"
        :head="head"
        :tableData="tableData"
        :assignBtn="false"
        :dropDown="true"
        @delete="del.handleDelete"
        @change="change.handleChange"
      >
        <template #default="{ index }">
          <TagList
            @change="
              (attr_vals) =>
                changeParam(
                  id,
                  tableData[index].attr_id,
                  tableData[index].attr_name,
                  sel,
                  attr_vals
                )
            "
            :tagStr="tableData[index].attr_vals"
          />
        </template>
      </Table>
    </div>
  </div>
  <Model
    @close="add.handleClose"
    @confirm="add.handleConfirm"
    :show="add.show.value"
    header="添加参数"
    :disable="false"
  >
    <Input
      v-model="add.attrnameInput.value.value"
      :name="add.attrnameInput.name"
      :placeholder="add.attrnameInput.placeholder"
      :validate="add.attrnameInput.validator"
      @validated="add.attrnameInput.handleValidated"
      :label="true"
      labelName="参数名称"
    />
  </Model>
  <Model
    @close="change.handleClose"
    @confirm="change.handleConfirm"
    :show="change.show.value"
    header="修改参数"
    :disable="false"
  >
    <Input
      v-model="change.attrnameInput.value.value"
      :name="change.attrnameInput.name"
      :placeholder="change.attrnameInput.placeholder"
      :validate="change.attrnameInput.validator"
      @validated="change.attrnameInput.handleValidated"
      :label="true"
      labelName="参数名称"
    />
  </Model>
  <Model
    @close="del.handleClose"
    @confirm="del.handleConfirm"
    :show="del.show.value"
    header="删除参数"
    :disable="false"
  >
    <p>确定要删除该参数么?</p>
  </Model>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed, watch, watchEffect } from "@vue/runtime-core";

import {
  getCateList,
  getParamList,
  addParam,
  changeParam,
  deleteParam,
} from "../server/ajax.js";

import InputUse from "../common/InputUse.js";

const { to } = useBreadcrumb();
const { treeData, getCate } = useTreeData();
const id = ref(-1);
const { sel, head, tableData, getParam } = useTable();
const del = useModelDelete();
const add = useModelAdd();
const change = useModelChange();

watch([id, sel], () => {
  getParam(id.value, sel.value);
});

function useTable() {
  const sel = ref("many");

  const head = [
    {
      prop: "attr_name",
      label: "参数名称",
    },
  ];
  const tableData = ref([]);

  async function getParam(id, sel) {
    const res = await getParamList(id, sel);
    console.log(res);
    if (res.data.data) {
      tableData.value = res.data.data;
    }
  }

  return {
    sel,
    head,
    tableData,
    getParam,
  };
}
function useBreadcrumb() {
  const to = [
    { path: "/home", name: "首页" },
    { name: "商品管理" },
    { name: "参数列表" },
  ];
  return {
    to,
  };
}
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
function useModelAdd() {
  const show = ref(false);
  const attr_name = ref("");

  const attrnameInput = new InputUse({
    name: "attr_name",
    value: attr_name,
    placeholder: "请输入参数名称",
    option: {
      fn: (val) => val.length > 0,
      detail: "参数名称不能为空",
    },
  });

  function handleAdd() {
    show.value = true;
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm() {
    const res = await addParam(id.value, attr_name.value, sel.value);
    if (res.data.data) {
      getParam(id.value, sel.value);
    }
    attr_name.value = "";
    show.value = false;
  }

  return {
    show,
    handleAdd,
    handleClose,
    handleConfirm,
    attrnameInput,
  };
}
function useModelChange() {
  const show = ref(false);
  let currIndex = -1;
  const attr_name = ref("");

  const attrnameInput = new InputUse({
    name: "attr_name",
    value: attr_name,
    placeholder: "请输入参数名称",
    option: {
      fn: (val) => val.length > 0,
      detail: "参数名称不能为空",
    },
  });

  function handleChange(index) {
    currIndex = index;
    show.value = true;
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm() {
    const attrId = tableData.value[currIndex].attr_id;
    const res = await changeParam(id.value, attrId, attr_name.value, sel.value);
    if (res.data.data) {
      getParam(id.value, sel.value);
    }
    attr_name.value = "";
    show.value = false;
  }

  return {
    show,
    handleChange,
    handleClose,
    handleConfirm,
    attrnameInput,
  };
}
function useModelDelete() {
  const show = ref(false);
  let currIndex = -1;

  function handleDelete(index) {
    currIndex = index;
    show.value = true;
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm() {
    const arrtId = tableData.value[currIndex].attr_id;
    const res = await deleteParam(id.value, arrtId);
    getParam(id.value, sel.value);
    show.value = false;
  }

  return {
    show,
    handleDelete,
    handleClose,
    handleConfirm,
  };
}
</script>

<style scoped>
.card {
  align-self: stretch;
  margin: 2rem 0rem;
  border-radius: 0.5rem;
  background: var(--dk-dark-bg);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 2rem;
  overflow-x: auto;
}
.header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.add-btn {
  margin-top: 0.4rem;
  padding: 0.4rem;
  align-self: flex-start;
}
.table {
  margin-top: 2rem;
}
.page {
  margin-top: 1rem;
}
.nav {
  padding: 1rem 1rem 1rem 0;
  border-bottom: 0.1rem solid var(--dk-gray-400);
}
.nav span {
  cursor: pointer;
  user-select: none;
}
.nav span.active {
  font-weight: 600;
}
.nav span:nth-child(2) {
  margin-left: 1rem;
}
</style>