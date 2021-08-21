<template>
  <table>
    <thead>
      <tr>
        <th v-if="dropDown"><div></div></th>
        <th><div>#</div></th>
        <th v-for="label of labels">
          <div>{{ label }}</div>
        </th>
        <th v-if="oprate"><div>操作</div></th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(tr, index) of tableData">
        <tr>
          <td v-if="dropDown" @click="show[index] = !show[index]">
            <div>
              <Icon
                :class="{ arrow: true, rotate: show[index] }"
                type="arrow"
              />
            </div>
          </td>
          <td>
            <div>{{ index + 1 }}</div>
          </td>
          <template v-for="(value, key) in tr">
            <td v-if="attrs.includes(key)">
              <div v-if="typeof value === 'boolean'">
                <StateBtn :active="value" @changeState="emit('state', index)" />
              </div>
              <div v-else>
                {{ value }}
              </div>
            </td>
          </template>
          <td v-if="oprate" class="oprate">
            <div>
              <Button
                v-if="deleteBtn"
                class="button"
                content="删除"
                type="delete"
                @click="emit('delete', index)"
              />
              <Button
                v-if="changeBtn"
                class="button"
                content="修改"
                type="change"
                @click="emit('change', index)"
              />
              <Button
                v-if="assignBtn"
                class="button"
                content="分配"
                type="assign"
                @click="emit('assign', index)"
              />
            </div>
          </td>
        </tr>
        <tr v-if="dropDown" v-show="show[index]">
          <td :colspan="oprate ? head.length + 3 : head.length + 2">
            <slot :data="dropDownData[index]" :index="index"></slot>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
 
<script setup>
import { computed, ref, watchEffect } from "@vue/runtime-core";

import Button from "./Button.vue";
import StateBtn from "./StateBtn.vue";
import Icon from "./Icon.vue";

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  head: {
    type: Array,
    required: true,
  },
  oprate: {
    type: Boolean,
    default: true,
  },
  dropDown: {
    type: Boolean,
    default: false,
  },
  deleteBtn: {
    type: Boolean,
    default: true,
  },
  changeBtn: {
    type: Boolean,
    default: true,
  },
  assignBtn: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["delete", "change", "assign", "state"]);

const attrs = computed(() => props.head.map(({ prop }) => prop));
const labels = computed(() => props.head.map(({ label }) => label));
const dropDownData = computed(() =>
  props.tableData.map(({ children }) => children)
);

const show = ref([]);

watchEffect(() => {
  for (let i = 0; i < props.tableData.length; i++) {
    show.value[i] = false;
  }
});
</script>

<style scoped>
table {
  border-top: 0.1rem solid var(--dk-gray-400);
  border-left: 0.1rem solid var(--dk-gray-400);
  border-spacing: 0;
}

th,
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
td div,
th div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
td.oprate div {
  justify-content: space-around;
}
.button {
  padding: 0.5rem;
}
.arrow {
  transition: transform 0.3s ease;
  user-select: none;
}
.rotate {
  transform: rotate(180deg);
}
</style>