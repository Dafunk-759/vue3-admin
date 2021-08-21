<template>
  <div class="container">
    <div class="link-list">
      <HomeSidebarItem v-for="item of data" :item="item" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import HomeSidebarItem from "./HomeSidebarItem.vue";

import { getMenus } from "../server/ajax.js";

function useGetMenus() {
  const map = new Map([
    ["users", "user"],
    ["rights", "authority"],
    ["goods", "good"],
    ["orders", "order"],
    ["reports", "data"],
  ]);
  return async function () {
    const res = await getMenus();
    const data = res.data.data;
    return data.map((item) => {
      const { id, authName: name, path, children: oldChildren } = item;

      const children = oldChildren.map(
        ({ id, authName: name, path, order }) => ({
          id,
          name,
          path,
          order,
        })
      );

      return {
        id,
        name,
        path,
        iconType: map.get(path),
        children,
      };
    });
  };
}

const data = ref([]);

onBeforeMount(async () => {
  data.value = await useGetMenus()();
});
</script>

<style scoped>
.container {
  background: var(--sidebar-bg-color);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
}
.link-list {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

@media (max-width: 640px) {
  .link-list {
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;
  }
}
</style>