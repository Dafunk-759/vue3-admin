<template>
  <div class="container">
    <HomeHeader class="header" />
    <div class="body">
      <HomeSidebar class="sidebar" />
      <HomeDashboard class="dashboard">
        <router-view></router-view>
      </HomeDashboard>
    </div>
  </div>
</template>

<script setup>
import HomeHeader from "./HomeHeader.vue";
import HomeSidebar from "./HomeSidebar.vue";
import HomeDashboard from "./HomeDashboard.vue";
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
}
.container .body {
  flex: 1;

  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
}

.container .body .sidebar {
  flex: 1;
}

.container .body .dashboard {
  flex: 6;
  max-width: 86%;
  padding: 1rem;
}

/* 移动端布局 */
@media (max-width: 640px) {
  .container .body {
    flex-flow: column nowrap;
  }
  .container .body .sidebar {
    flex: 0 1 auto;
  }
  .container .body .dashboard {
    max-width: 100%;
  }
}
</style>