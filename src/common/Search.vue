<template>
  <form @submit.prevent="handleSubmit" class="search-form">
    <input
      type="text"
      @input="handleInput"
      :value="modelValue"
      placeholder="搜索内容..."
    />
    <button>搜索</button>
  </form>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, undefined],
    default: undefined,
  },
});

const emit = defineEmits(["update:modelValue", "search"]);
function handleSubmit(e) {
  emit("search");
}

function handleInput(e) {
  const value = e.target.value;
  emit("update:modelValue", value);
}
</script>

<style scoped>
.search-form {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}
input {
  color: var(--dk-gray-100);
  padding: 0.2rem 0.4rem;
  border: 0.1rem solid var(--dk-gray-400);
  border-radius: 0.2rem 0 0 0.2rem;
}
input:focus {
  border: 0.1rem solid var(--dk-gray-200);
}

button {
  color: var(--dk-gray-100);
  padding: 0.2rem 0.4rem;
  border: 0.1rem solid var(--dk-gray-400);
  border-left: none;
  border-radius: 0rem 0.2rem 0.2rem 0;
  cursor: pointer;
}
</style>