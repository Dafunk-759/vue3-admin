<template>
  <div class="item-container">
    <div class="item" @click="show = !show">
      <Icon :type="item.iconType" />
      <span>{{ item.name }}</span>
      <Icon type="arrow" :class="{ arrow: true, rotate: show }" />
    </div>
    <div class="item-child-container">
      <div class="item-child" v-if="show" v-for="child of item.children">
        <Icon type="listitem" />
        <router-link :to="'/home/' + child.path" class="link">
          {{ child.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const show = ref(false);
</script>

<style scoped>
.item-container {
  margin-bottom: 2rem;
}
.item-child-container {
  margin-top: 0.5rem;
}
.item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.5rem 1rem;
  user-select: none;
}
.item span {
  margin-left: 1rem;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s ease;
}
.arrow.rotate {
  transform: rotate(180deg);
}

.item-child {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  user-select: none;
}

.item-child .link {
  margin-left: 1rem;
}

.item:hover,
.item-child:hover {
  background: var(--dk-gray-900);
}

@media (max-width: 640px) {
  .item-container {
    margin-bottom: 0;
  }
}
</style>