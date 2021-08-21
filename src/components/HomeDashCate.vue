<template>
  <div class="container">
    <Breadcrumb :to="to" />
    <div class="card">
      <div class="header">
        <Button class="add-btn" content="添加分类" @click="add.handleAdd" />
      </div>
      <TreeTable
        class="table"
        :head="head"
        :tableData="tableData"
        @delete="del.handleDelete"
        @change="change.handleChange"
      />
      <Pagenition
        class="page"
        :pageIndex="page.num"
        :pageSize="page.size"
        :total="total"
        @change="(index) => (page.num = index)"
      />
    </div>
  </div>
  <Model
    @close="del.handleClose"
    @confirm="del.handleConfirm"
    :show="del.show.value"
    header="删除分类"
    :disable="false"
  >
    <p>确定要删除该分类么?</p>
  </Model>
  <Model
    @close="change.handleClose"
    @confirm="change.handleConfirm"
    :show="change.show.value"
    header="编辑分类"
    :disable="false"
  >
    <Input
      v-model="change.catnameInput.value.value"
      :name="change.catnameInput.name"
      :placeholder="change.catnameInput.placeholder"
      :validate="change.catnameInput.validator"
      @validated="change.catnameInput.handleValidated"
      :label="true"
      labelName="分类名称"
    />
  </Model>
  <ModalAddCate
    @close="add.handleClose"
    @confirm="add.handleConfirm"
    :show="add.show.value"
  />
</template>

<script setup>
import { reactive, ref, watchEffect } from "@vue/runtime-core";

import {
  getCateList as getList,
  getCateById,
  deleteCate,
  changeCate,
  addCate,
} from "../server/ajax.js";

import InputUse from "../common/InputUse.js";

import ModalAddCate from "../modal/ModalAddCate.vue";

const { to } = useBreadcrumb();
const { head, tableData, getCateList } = useTable();
const del = useModelDelete();
const change = useModelChange();
const add = useModelAdd();

const page = reactive({
  num: 1,
  size: 5,
});
const total = ref(5);

watchEffect(function () {
  getCateList(page.num, page.size, 0);
});

function useBreadcrumb() {
  const to = [
    { path: "/home", name: "首页" },
    { name: "商品管理" },
    { name: "商品分类" },
  ];
  return {
    to,
  };
}
function useTable() {
  const head = [
    {
      prop: "cat_name",
      label: "分类名称",
    },
    {
      prop: "cat_level",
      label: "排序",
    },
  ];
  const tableData = ref([]);

  async function getCateList(pagenum, pagesize) {
    const res = await getList(pagenum, pagesize);
    if (res.data.data) {
      tableData.value = res.data.data.result;
      total.value = res.data.data.total;
    }
  }

  return {
    head,
    tableData,
    getCateList,
  };
}
function useModelDelete() {
  const show = ref(false);
  let currId = -1;

  function handleDelete(id) {
    show.value = true;
    currId = id;
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm() {
    const res = await deleteCate(currId);
    getCateList(page.num, page.size);
    show.value = false;
  }

  return {
    show,
    handleDelete,
    handleClose,
    handleConfirm,
  };
}
function useModelChange() {
  const cat_name = ref("");

  const catnameInput = new InputUse({
    name: "cat_name",
    value: cat_name,
    placeholder: "请输入分类名称",
    option: {
      fn: (val) => true,
      detail: "",
    },
  });
  const show = ref(false);
  let currId = -1;

  async function handleChange(id) {
    show.value = true;
    currId = id;
    const res = await getCateById(id);
    if (res.data.data) {
      cat_name.value = res.data.data.cat_name;
    }
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm() {
    const res = await changeCate(currId, cat_name.value);
    if (res.data.data) {
      getCateList(page.num, page.size);
    }
    cat_name.value = "";
    show.value = false;
  }

  return {
    show,
    handleChange,
    handleClose,
    handleConfirm,
    catnameInput,
  };
}
function useModelAdd() {
  const show = ref(false);

  function handleAdd(id) {
    show.value = true;
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm(catname, pid, level) {
    console.log(catname, pid, level);
    const res = await addCate(pid, catname, level);
    if (res.data.data) {
      getCateList(page.num, page.size, 0);
    }
    show.value = false;
  }

  return {
    show,
    handleAdd,
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
  padding: 0.4rem;
}
.table {
  margin-top: 2rem;
}
.page {
  margin-top: 1rem;
}
</style>