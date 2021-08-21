<template>
  <Model
    @close="emit('close')"
    @confirm="handleConfirm"
    :show="show"
    header="编辑角色信息"
    :disable="!(roleNameInput.valid.value && roleDescInput.valid.value)"
  >
    <div class="form">
      <Input
        v-model="roleNameInput.value.value"
        :name="roleNameInput.name"
        :placeholder="roleNameInput.placeholder"
        :validate="roleNameInput.validator"
        @validated="roleNameInput.handleValidated"
        :label="true"
      />
      <Input
        v-model="roleDescInput.value.value"
        :name="roleDescInput.name"
        :placeholder="roleDescInput.placeholder"
        :validate="roleDescInput.validator"
        @validated="roleDescInput.handleValidated"
        :label="true"
      />
    </div>
  </Model>
</template>

<script setup>
import { ref } from "@vue/reactivity";

import InputUse from "../common/InputUse.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close", "confirm"]);

const roleName = ref(""),
  roleDesc = ref("");

const roleNameInput = new InputUse({
  name: "roleName",
  value: roleName,
  placeholder: "请输入角色名称",
  option: {
    fn: (val) => {
      return val.length >= 3 && val.length <= 10;
    },
    detail: "长度应为3至10位",
  },
});
const roleDescInput = new InputUse({
  name: "roleDesc",
  value: roleDesc,
  placeholder: "请输入角色描述",
  option: {
    fn: (val) => true,
    detail: "",
  },
});

function handleConfirm() {
  emit("confirm", roleName.value, roleDesc.value);
  roleName.value = roleDesc.value = "";
}
</script>