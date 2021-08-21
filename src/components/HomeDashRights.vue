<template>
  <div class="container">
    <Breadcrumb :to="to" />
    <div class="card">
      <Table
        :tableData="tableData"
        :head="head"
        class="table"
        :oprate="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

import { getRightList as getList } from "../server/ajax.js";

const { to } = useBreadcrumb();
const { head, rightMap, tableData, getRightList } = useTable();

watchEffect(function () {
  getRightList();
});

function useBreadcrumb() {
  const to = [
    { path: "/home", name: "首页" },
    { name: "权限管理" },
    { name: "权限列表" },
  ];
  return {
    to,
  };
}
function useTable() {
  const head = [
    {
      prop: "authName",
      label: "权限名称",
    },
    {
      prop: "path",
      label: "路径",
    },
    {
      prop: "level",
      label: "权限等级",
    },
  ];
  const rightMap = ["一级权限", "二级权限", "三级权限"];
  const tableData = ref([]);

  async function getRightList() {
    const res = await getList();
    if (res.data.data) {
      const list = res.data.data;
      const paths = Array.from(
        new Set(list.map(({ authName, path, level }) => path))
      );
      tableData.value = paths
        .map((path) => list.filter(({ path: p }) => path === p))
        .reduce((acc, curr) => acc.concat(curr), [])
        .map(({ authName, path, level }) => ({
          authName,
          path,
          level: rightMap[level],
        }));
    }
  }

  return {
    head,
    rightMap,
    tableData,
    getRightList,
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
.table {
  margin-top: 2rem;
}
</style>