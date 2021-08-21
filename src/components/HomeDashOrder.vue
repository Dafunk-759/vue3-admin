<template>
  <div class="container">
    <Breadcrumb :to="to" />
    <div class="card">
      <div class="header">
        <Search class="search" v-model="searchValue" />
      </div>
      <Table
        class="table"
        :head="head"
        :tableData="tableData"
        :assignBtn="false"
        :deleteBtn="false"
        @change=""
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
</template>

<script setup>
import { reactive, ref, watchEffect } from "@vue/runtime-core";

import { getOrders, deleteGood } from "../server/ajax.js";

const searchValue = ref("");
const page = reactive({
  num: 1,
  size: 5,
});
const total = ref(5);

const { to } = useBreadcrumb();
const { head, tableData, getOrderList } = useTable();

watchEffect(() => {
  getOrderList(page.num, page.size, searchValue.value);
});

function useBreadcrumb() {
  const to = [
    { path: "/home", name: "首页" },
    { name: "订单管理" },
    { name: "订单列表" },
  ];
  return {
    to,
  };
}
function useTable() {
  const head = [
    {
      prop: "order_number",
      label: "订单编号",
    },
    {
      prop: "order_price",
      label: "订单价格（元）",
    },
    {
      prop: "order_pay",
      label: "是否付款",
    },
    {
      prop: "is_send",
      label: "是否发货",
    },
    {
      prop: "update_time",
      label: "下单时间",
    },
  ];
  const tableData = ref([]);

  async function getOrderList(pagenum, pagesize, query = "") {
    const res = await getOrders(pagenum, pagesize, query);
    if (res.data.data) {
      tableData.value = res.data.data.goods.map((good) => {
        if (good.order_pay == 1) {
          good.order_pay = "已付款";
        } else if (good.order_pay == 0) {
          good.order_pay = "未付款";
        }
        good.update_time = new Date(good.update_time).toLocaleString();
        return good;
      });
      total.value = res.data.data.total;
    }
  }

  return {
    head,
    tableData,
    getOrderList,
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