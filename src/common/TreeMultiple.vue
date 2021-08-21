<template>
  <div class="container">
    <div class="item" v-for="item of treeData">
      <div class="control" v-if="show[item.id] !== undefined">
        <div
          v-if="!show[item.id]"
          @click="show[item.id] = !show[item.id]"
          class="show"
        >
          展开
        </div>
        <div v-else @click="show[item.id] = !show[item.id]" class="hide">
          收起
        </div>
      </div>

      <label>{{ item.authName }}</label>
      <input
        type="checkbox"
        name="auth"
        :value="item.id"
        :checked="checkedIds.includes(item.id)"
        :id="item.id"
        @change="handleItemChange(item)"
      />
      <div
        class="children"
        v-if="item.children && item.children.length > 0"
        v-show="show[item.id]"
      >
        <TreeMultiple
          :treeData="item.children"
          :checkedIds="props.checkedIds"
          @add="(id) => handleAdd(id, item)"
          @remove="(id) => handleRemove(id, item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from "@vue/runtime-core";

const props = defineProps({
  treeData: {
    type: Array,
    required: true,
  },
  checkedIds: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["add", "remove"]);

const show = reactive({});
watchEffect(() => {
  for (let item of props.treeData) {
    if (item.children) {
      show[item.id] = false;
    }
  }
});

function handleItemChange(item) {
  if (props.checkedIds.includes(item.id)) {
    dfs(item, "remove");
  } else {
    dfs(item, "add");
  }

  function dfs(item, method) {
    if (!item) return;
    emit(method, item.id);

    if (item.children) {
      for (let child of item.children) {
        dfs(child, method);
      }
    }
  }
}

function handleAdd(id, item) {
  emit("add", id);
  emit("add", item.id);
}

function handleRemove(id, item) {
  emit("remove", id);
  if (item.children.every(({ id }) => !props.checkedIds.includes(id)))
    emit("remove", item.id);
}
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  border-left: 0.1rem solid var(--dk-gray-300);
}
.item {
  padding: 0.3rem 0.3rem 0.3rem 0.6rem;
}
/* .children {
  margin-left: 1rem;
} */
.item label {
  user-select: none;
}
.control {
  cursor: pointer;
  width: max-content;
}
.show {
  background: var(--dk-gray-600);
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
}
.hide {
  background: var(--dk-gray-400);
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
}
</style>