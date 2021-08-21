<template >
  <template v-for="(tr, index) of tableData">
    <tr>
      <td>
        <div v-if="tr.cat_level === 0">{{ index + 1 }}</div>
      </td>
      <template v-for="(value, key) in tr">
        <td v-if="attrs.includes(key)">
          <div
            @click="showList[index] = !showList[index]"
            v-if="key === 'cat_name'"
            :class="{
              [`level-${tr.cat_level}`]: true,
              open: !showList[index],
              close: showList[index],
            }"
          >
            {{ value }}
          </div>
          <div v-else>
            {{ value }}
          </div>
        </td>
      </template>
      <td class="oprate">
        <div>
          <Button
            class="button"
            content="删除"
            type="delete"
            @click="emit('delete', tr.cat_id)"
          />
          <Button
            class="button"
            content="修改"
            type="change"
            @click="emit('change', tr.cat_id)"
          />
        </div>
      </td>
    </tr>
    <TreeTableTbody
      v-if="tr.children && showList[index]"
      :tableData="tr.children"
      :attrs="attrs"
      @delete="(id) => emit('delete', id)"
      @change="(id) => emit('change', id)"
    />
  </template>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";

import Button from "./Button.vue";

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  attrs: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["delete", "change"]);

const showList = ref([]);
watchEffect(() => {
  for (let i = 0; i < props.tableData.length; i++) {
    showList.value[i] = false;
  }
});
</script>

<style scoped>
td {
  padding: 0.5rem;
  border-bottom: 0.1rem solid var(--dk-gray-400);
  border-right: 0.1rem solid var(--dk-gray-400);
}

tr:nth-child(2n) {
  background: var(--dk-gray-700);
}
tr:hover {
  background: var(--dk-gray-600);
}
td div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.open::before {
  content: "+";
  cursor: pointer;
  margin-right: 0.2rem;
  border: 0.1rem solid var(--dk-gray-400);
}
.close::before {
  content: "-";
  cursor: pointer;
  margin-right: 0.2rem;
  border: 0.1rem solid var(--dk-gray-400);
}
.level-1 {
  margin-left: 2rem;
}
.level-2 {
  margin-left: 4rem;
}
.level-2::before {
  content: "";
  border: none;
}
td.oprate div {
  justify-content: space-around;
}
.button {
  padding: 0.5rem;
}
</style>