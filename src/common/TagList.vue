<template>
  <div class="container">
    <template v-for="(tag, index) of tagList">
      <span class="tag" v-if="tag">
        {{ tag }}
        <Icon type="close" class="icon" @click="handleDel(index)" />
      </span>
    </template>

    <template v-if="showAdd">
      <span class="add-tag" @click="control = 'input'" v-if="control === 'btn'"
        >添加标签</span
      >
      <input
        type="text"
        v-model="tagname"
        placeholder="输入标签名"
        class="input"
        v-else-if="control === 'input'"
        @keyup.enter="handleAdd"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "@vue/runtime-core";

import Icon from "../common/Icon.vue";

const props = defineProps({
  tagStr: {
    type: String,
    default: "",
  },
  showAdd: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["change"]);

const tagList = ref([]);
watchEffect(() => {
  tagList.value = props.tagStr.split(" ");
});

const control = ref("btn");
const tagname = ref("");

watch(tagList, () => {
  emit("change", tagList.value.join(" "));
});

function handleDel(index) {
  tagList.value = tagList.value.filter((_, i) => i !== index);
}
function handleAdd() {
  control.value = "btn";
  tagList.value = [...tagList.value, tagname.value];
  tagname.value = "";
}
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
.tag,
.add-tag,
.input {
  padding: 0.5rem;
  border: 0.1rem solid var(--dk-gray-400);
  border-radius: 0.5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.add-tag {
  cursor: pointer;
}
.input {
  color: var(--dk-gray-200);
}
.icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}
.icon:hover {
  transform: scale(1.2);
}
</style>