<template>
  <div class="container">
    <Breadcrumb :to="to" />
    <h1>Welcome</h1>
  </div>
</template>

<script setup>
import Breadcrumb from "../common/Breadcrumb.vue";

const to = [{ path: "/home", name: "首页" }, { name: "欢迎" }];
</script>

<style scoped>
.container h1 {
  margin-top: 1rem;
}
</style>
