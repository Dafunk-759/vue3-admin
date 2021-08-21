<template>
  <div class="container">
    <div class="card">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  background: var(--dk-dark-bg);
  display: flex;
  justify-content: flex-start;
}
.card {
  padding: 1rem;
  width: 100%;
  color: var(--dk-gray-300);
  background: var(--dk-gray-700);
  border-radius: 0.5rem;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
</style>