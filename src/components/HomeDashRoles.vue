<template>
  <div class="container">
    <Breadcrumb :to="to" />
    <div class="card">
      <div class="header">
        <Button class="add-btn" content="添加角色" @click="add.handleAddrole" />
      </div>
      <Table
        class="table"
        :head="head"
        :tableData="tableData"
        :dropDown="true"
        @delete="del.handleDelete"
        @change="change.handleChange"
        @assign="assign.handleAssign"
      >
        <template #default="{ data, index }">
          <TreeBtns @delete="handleDelete" :index="index" :treeData="data" />
        </template>
      </Table>
    </div>
  </div>
  <ModelAddRole
    :show="add.show.value"
    @close="add.handleClose"
    @confirm="add.handleConfirm"
  />
  <ModelChangeRole
    :show="change.show.value"
    @close="change.handleClose"
    @confirm="change.handleConfirm"
  />
  <ModelAssignRole
    :show="assign.show.value"
    :checkedIds="assign.checkedIds.value"
    @close="assign.handleClose"
    @confirm="assign.handleConfirm"
    @add="assign.handleAdd"
    @remove="assign.handleRemove"
  />
  <Model
    @close="del.handleClose"
    @confirm="del.handleConfirm"
    :show="del.show.value"
    header="删除角色"
    :disable="false"
  >
    <p class="model-del">确定要删除该角色信息么?</p>
  </Model>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

import {
  getRolesList as getList,
  addRole,
  delRole,
  changeRole,
  assignRight,
  deleteRight,
} from "../server/ajax.js";

import ModelAddRole from "../modal/ModelAddRole.vue";
import ModelChangeRole from "../modal/ModelChangeRole.vue";
import ModelAssignRole from "../modal/ModelAssignRole.vue";

const { to } = useBreadcrumb();
const { head, tableData, getRolesList } = useTable();
const add = useModelAdd();
const del = useModelDelete();
const change = useModelChange();
const assign = useModelAssign();
const { handleDelete } = useDeleteRole();

watchEffect(function () {
  getRolesList();
});

function useBreadcrumb() {
  const to = [
    { path: "/home", name: "首页" },
    { name: "权限管理" },
    { name: "角色列表" },
  ];
  return {
    to,
  };
}
function useTable() {
  const head = [
    {
      prop: "roleName",
      label: "角色名称",
    },
    {
      prop: "roleDesc",
      label: "角色描述",
    },
  ];
  const tableData = ref([]);

  async function getRolesList() {
    const res = await getList();
    if (res.data.data) {
      tableData.value = res.data.data;
    }
  }

  return {
    head,
    tableData,
    getRolesList,
  };
}
function useModelAdd() {
  const show = ref(false);

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm(roleName, roleDesc) {
    const res = await addRole(roleName, roleDesc);
    if (res.data.data) {
      getRolesList();
    }
    show.value = false;
  }

  function handleAddrole(e) {
    show.value = true;
  }

  return { show, handleClose, handleConfirm, handleAddrole };
}
function useModelDelete() {
  const show = ref(false);
  let currIndex = -1;

  function handleDelete(index) {
    show.value = true;
    currIndex = index;
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm() {
    const { id } = tableData.value[currIndex];
    const res = await delRole(id);
    if (res) {
      getRolesList();
    }
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
  const show = ref(false);
  let currIndex = -1;

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm(roleName, roleDesc) {
    const { id } = tableData.value[currIndex];
    const res = await changeRole(id, roleName, roleDesc);
    getRolesList();
    show.value = false;
  }

  function handleChange(index) {
    currIndex = index;
    show.value = true;
  }

  return {
    show,
    handleClose,
    handleConfirm,
    handleChange,
  };
}
function useModelAssign() {
  const show = ref();
  let currIndex = -1;
  const checkedIds = ref([]);

  function initCheckedIds(tree, checkedIds) {
    for (let item of tree) {
      checkedIds.value.push(item.id);
      if (item.children) {
        initCheckedIds(item.children, checkedIds);
      }
    }
  }

  function handleAssign(index) {
    currIndex = index;
    show.value = true;
    const treeId = tableData.value[currIndex].children;
    checkedIds.value = [];
    initCheckedIds(treeId, checkedIds);
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm() {
    const { id } = tableData.value[currIndex];
    const res = await assignRight(id, checkedIds.value);
    getRolesList();
    show.value = false;
  }

  function handleAdd(id) {
    const index = checkedIds.value.indexOf(id);
    if (index === -1) {
      checkedIds.value.push(id);
    }
  }

  function handleRemove(id) {
    const index = checkedIds.value.indexOf(id);
    if (index !== -1) {
      checkedIds.value.splice(index, 1);
    }
  }

  return {
    show,
    checkedIds,
    handleAssign,
    handleClose,
    handleConfirm,
    handleAdd,
    handleRemove,
  };
}
function useDeleteRole() {
  async function handleDelete(index, id) {
    const roleId = tableData.value[index].id;
    const data = await del(roleId, id);
    tableData.value[index].children = data;
  }

  async function del(roleId, id) {
    const res = await deleteRight(roleId, id);
    const data = res.data.data;
    if (data) {
      const ret = [];
      findNoChild(data, ret);
      if (ret[0]) {
        return await del(roleId, ret[0]);
      } else {
        return data;
      }
    }
  }

  function findNoChild(data, ret) {
    for (let item of data) {
      if (item.children && item.children.length < 1) {
        ret.push(item.id);
      } else if (item.children) {
        findNoChild(item.children, ret);
      }
    }
  }

  return {
    handleDelete,
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
.model-del {
  margin: 2rem 4rem;
}
</style>