<template>
  <div class="container">
    <Breadcrumb :to="to" />
    <div class="card">
      <div class="header">
        <Search class="search" v-model="searchValue" @search="handleSearch" />
        <Button class="add-btn" content="添加用户" @click="add.handleAdduser" />
      </div>
      <Table
        :tableData="tableData"
        :head="head"
        class="table"
        @state="handleStateChange"
        @change="change.handleChangeuser"
        @delete="del.handleDelete"
        @assign="assign.handleAssign"
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
  <ModelAdduser
    :show="add.show.value"
    @close="add.handleClose"
    @confirm="add.handleConfirm"
  />
  <ModelChangeuser
    :show="change.show.value"
    :id="change.currentId.value"
    @close="change.handleClose"
    @confirm="change.handleConfirm"
  />

  <ModelAssignuser
    :show="assign.show.value"
    :info="assign.info"
    @close="assign.handleClose"
    @confirm="assign.handleConfirm"
  />
  <Model
    @close="del.handleClose"
    @confirm="del.handleConfirm"
    :show="del.show.value"
    header="删除用户"
    :disable="false"
  >
    <p class="model-del">确定要删除该用户么?</p>
  </Model>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

import ModelAdduser from "../modal/ModelAddUser.vue";
import ModelChangeuser from "../modal/ModelChangeUser.vue";
import ModelAssignuser from "../modal/ModelAssignUser.vue";

import {
  getUsers,
  changeUserState,
  deleteUser,
  assignUser,
} from "../server/ajax.js";

const page = reactive({
  num: 1,
  size: 5,
});
const total = ref(5);

const { head, tableData, getUserList } = useTable();
const { searchValue, handleSearch } = useSearch();
const { to } = useBreadcrumb();
const { handleStateChange } = useChangeState();
const add = useModelAdd();
const change = useModelChange();
const del = useModelDelete();
const assign = useModelAssign();

watchEffect(function () {
  getUserList(page);
});

function useSearch() {
  const searchValue = ref("");
  function handleSearch() {
    getUserList(page, searchValue.value);
    searchValue.value = "";
  }

  return {
    searchValue,
    handleSearch,
  };
}
function useBreadcrumb() {
  const to = [
    { path: "/home", name: "首页" },
    { name: "用户管理" },
    { name: "用户列表" },
  ];
  return {
    to,
  };
}
function useTable() {
  const head = [
    {
      prop: "role_name",
      label: "角色",
    },
    {
      prop: "username",
      label: "用户名",
    },
    {
      prop: "mobile",
      label: "电话",
    },
    {
      prop: "email",
      label: "邮箱",
    },

    {
      prop: "mg_state",
      label: "状态",
    },
  ];
  const tableData = ref([]);
  async function getUserList(page, query = "") {
    const res = await getUsers(page.num, page.size, query);
    const { users, total: all } = res.data.data;
    total.value = all;
    tableData.value = users;
  }

  return {
    head,
    tableData,
    getUserList,
  };
}
function useChangeState() {
  async function handleStateChange(index) {
    const uid = tableData.value[index].id,
      state = !tableData.value[index].mg_state;
    const res = await changeUserState(uid, state);
    const user = res.data.data;
    if (user) {
      getUserList(page);
    }
  }

  return {
    handleStateChange,
  };
}
function useModelAdd() {
  const show = ref(false);

  function handleClose() {
    show.value = false;
  }

  function handleConfirm() {
    show.value = false;
    getUserList(page);
  }

  function handleAdduser(e) {
    show.value = true;
  }

  return { show, handleClose, handleConfirm, handleAdduser };
}
function useModelChange() {
  const show = ref(false);
  const currentId = ref(-1);
  let currIndex = -1;

  function handleClose() {
    show.value = false;
  }

  function handleConfirm() {
    getUserList(page);
    show.value = false;
  }

  function handleChangeuser(index) {
    currIndex = index;
    currentId.value = tableData.value[index].id;
    show.value = true;
  }

  return {
    currentId,
    show,
    handleClose,
    handleConfirm,
    handleChangeuser,
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
    const res = await deleteUser(tableData.value[delIndex].id);
    getUserList(page);
    show.value = false;
  }

  return {
    show,
    handleDelete,
    handleClose,
    handleConfirm,
  };
}
function useModelAssign() {
  const show = ref();
  const info = {
    username: "",
    role: "",
  };
  let currIndex = -1;

  function handleAssign(index) {
    currIndex = index;
    info.username = tableData.value[index].username;
    info.role = tableData.value[index].role_name;
    show.value = true;
  }

  function handleClose() {
    show.value = false;
  }

  async function handleConfirm(rid) {
    const res = await assignUser(tableData.value[currIndex].id, rid);
    if (res.data.data) {
      getUserList(page);
    }
    show.value = false;
  }

  return {
    show,
    info,
    handleAssign,
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
.model-del {
  margin: 2rem 4rem;
}
</style>