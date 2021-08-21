<template>
  <header>
    <div>admin</div>
    <Button content="登出" @click="handleLogout" />
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function handleLogout(e) {
  sessionStorage.clear();
  router.push("/login");
}
</script>

<style scoped>
header {
  height: 5rem;
  padding: 1rem;
  background: var(--navbar-bg-color);
  display: flex;
}

header button {
  margin-left: auto;
}
header div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}
</style>
