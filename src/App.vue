<template>
  <Toast
    :state="ToastUse.state.state"
    :show="ToastUse.state.show"
    :msg="ToastUse.state.msg"
    @close="ToastUse.handleClose"
  />
  <router-view class="body"> </router-view>
</template>

<script setup>
import Toast from "./common/Toast.vue";
import ToastUse from "./common/ToastUse.js";
</script>

<style>
@import url(./style/color.css);
@import url(./style/normal.css);
</style>
