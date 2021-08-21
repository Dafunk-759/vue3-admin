<template>
  <div class="container">
    <div :class="itemClass" v-for="item of treeData">
      <div class="btn">
        {{ item.authName
        }}<Icon
          type="close"
          class="close"
          @click="emit('delete', index, item.id)"
        />
      </div>
      <div class="children" v-if="item.children && item.children.length > 0">
        <TreeBtns
          @delete="(index, id) => emit('delete', index, id)"
          :index="index"
          :level="level + 1"
          :treeData="item.children"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";

import Icon from "./Icon.vue";

const props = defineProps({
  treeData: {
    type: Array,
    default: [],
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  index: {
    type: Number,
    default: -1,
    required: true,
  },
});

const emit = defineEmits(["delete"]);

const itemClass = computed(() => ({
  item: true,
  [`level-${props.level}`]: true,
}));
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
}
.item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.btn {
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}
.close {
  transition: transform 0.3s ease;
  cursor: pointer;
}
.close:hover {
  transform: scale(1.5);
}
.level-0 {
  border-bottom: 0.1rem solid var(--bs-yellow);
}

.level-0 .btn {
  background: var(--bs-red);
}
.level-1 .btn {
  background: var(--bs-orange);
}
.level-2 .btn {
  background: var(--bs-yellow);
}
.level-0 .container {
  margin: 1rem;
}
.level-1 .container {
  display: flex;
  flex-flow: column wrap;
  margin: 1rem;
}
.level-1 .container .btn {
  margin-bottom: 0.2rem;
}
</style>