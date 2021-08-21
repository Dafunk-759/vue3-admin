<template>
  <span :class="{ btn: true, active: active }" @click="emit('changeState')">
  </span>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["changeState"]);
</script>

<style scoped>
.btn {
  width: 2rem;
  height: 1rem;
  background: var(--dk-gray-500);
  border-radius: 1rem;
  cursor: pointer;

  position: relative;
}
.btn::before {
  content: "";
  width: 1rem;
  height: 1rem;

  position: absolute;
  background: var(--dk-gray-100);
  border-radius: 50%;
  left: 0;
  top: 0;
  transition: left 0.3s ease;
}
.active::before {
  left: 1rem;
}
.active {
  background: var(--dk-gray-800);
}
</style>