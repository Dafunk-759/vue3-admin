<template>
  <Model
    @close="emit('close')"
    @confirm="emit('confirm', rid)"
    :show="show"
    header="分配角色"
    :disable="false"
  >
    <div class="container">
      <div class="current">
        <span>当前用户:</span><span>{{ info.username }}</span>
      </div>
      <div class="current">
        <span>当前角色:</span><span>{{ info.role }}</span>
      </div>
      <div class="assign">
        <span>分配新角色:</span>
        <select v-model="rid">
          <option value="30">超级管理员</option>
        </select>
      </div>
    </div>
  </Model>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  info: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close", "confirm"]);

const rid = ref(30);
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: stretch;
}
.container div {
  padding: 1rem;
}
.current,
.assign {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}
.current > span:nth-child(2) {
  margin-left: auto;
}
.assign > select {
  margin-left: 1rem;
  background: transparent;
  color: var(--dk-gray-100);
  border-radius: 0.2rem;
}
</style>