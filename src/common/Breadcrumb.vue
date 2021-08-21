<template>
  <div class="container">
    <div v-for="(item, index) of to" class="item">
      <router-link
        v-if="item.path"
        :class="{ link: item.path }"
        :to="item.path"
      >
        {{ item.name }}
      </router-link>
      <span v-else>{{ item.name }}</span>
      <Icon v-if="index < to.length - 1" type="arrow_right" />
    </div>
  </div>
</template>

<script setup>
import Icon from "./Icon.vue";

const props = defineProps({
  to: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.link {
  color: var(--bs-orange);
}
</style>