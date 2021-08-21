<template>
  <div>
    <img src="../assets/logo.png" alt="avator" />
  </div>
</template>

<style scoped>
div {
  height: 16rem;
  width: 16rem;
  border: 0.1rem solid var(--dk-gray-700);
  border-radius: 50%;
  padding: 0.1rem;
  box-shadow: 0 0 1rem var(--dk-gray-700);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

div > img {
  max-width: 100%;
}
</style>