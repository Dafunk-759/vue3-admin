<template>
  <div class="container">
    <Breadcrumb :to="to" />
    <div class="card">
      <div class="header">
        <Search class="search" v-model="searchValue" />
        <Button class="add-btn" content="添加商品" @click="handleAddGoods" />
      </div>
      <Table
        class="table"
        :head="head"
        :tableData="tableData"
        :assignBtn="false"
        :changeBtn="false"
        @delete="del.handleDelete"
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
    header="删除商品"
    :disable="false"
  >
    <p>确定要删除该商品么?</p>
  </Model>
</template>

<script setup>
import { reactive, ref, watchEffect } from "@vue/runtime-core";

import { getGoodsList as getList, deleteGood } from "../server/ajax.js";

import { useRouter } from "vue-router";

const router = useRouter();
const searchValue = ref("");
const page = reactive({
  num: 1,
  size: 5,
});
const total = ref(5);

const { to } = useBreadcrumb();
const { head, tableData, getGoodsList } = useTable();
const del = useModelDelete();

watchEffect(() => {
  getGoodsList(page.num, page.size, searchValue.value);
});

function handleAddGoods() {
  router.push("goods/add");
}
function useBreadcrumb() {
  const to = [
    { path: "/home", name: "首页" },
    { name: "商品管理" },
    { name: "商品列表" },
  ];
  return {
    to,
  };
}
function useTable() {
  const head = [
    {
      prop: "goods_name",
      label: "商品名称",
    },
    {
      prop: "goods_price",
      label: "商品价格（元）",
    },
    {
      prop: "goods_weight",
      label: "商品重量（kg）",
    },
    {
      prop: "upd_time",
      label: "创建时间",
    },
  ];
  const tableData = ref([]);

  async function getGoodsList(pagenum, pagesize, query = "") {
    const res = await getList(pagenum, pagesize, query);
    if (res.data.data) {
      tableData.value = res.data.data.goods;
      total.value = res.data.data.total;
    }
  }

  return {
    head,
    tableData,
    getGoodsList,
  };
}
function useModelDelete() {
  const show = ref(false);
  let delIndex = -1;

  function handleDelete(index) {
    show.value = true;
    delIndex = index;
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm() {
    const id = tableData.value[delIndex].goods_id;
    const res = await deleteGood(id);
    getGoodsList(page.num, page.size, searchValue.value);
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
  margin-left: 3rem;
  padding: 0.4rem;
}
.table {
  margin-top: 2rem;
}
.page {
  margin-top: 1rem;
}
</style>