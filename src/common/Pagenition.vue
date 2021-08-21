<template>
  <div class="page">
    <div
      :class="{ prev: true, disabled: pageIndex === 1 }"
      @click="pageIndex > 1 ? emit('change', pageIndex - 1) : ''"
    >
      上一页
    </div>
    <div
      :class="{ first: true, disabled: pageIndex === 1 }"
      @click="pageIndex > 1 ? emit('change', 1) : ''"
    >
      第一页
    </div>
    <div v-if="pagers[0] !== 1">...</div>
    <div
      :class="['page-item', { current: pager === pageIndex }]"
      v-for="pager of pagers"
      @click="emit('change', pager)"
    >
      {{ pager }}
    </div>
    <div v-if="pagers[pagers.length - 1] !== pages">...</div>
    <div
      :class="{ last: true, disabled: pageIndex === pages }"
      @click="pageIndex < pages ? emit('change', pages) : ''"
    >
      最后一页
    </div>
    <div
      :class="{ next: true, disabled: pageIndex === pages }"
      @click="pageIndex < pages ? emit('change', pageIndex + 1) : ''"
    >
      下一页
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";

const props = defineProps({
  perPages: {
    type: Number,
    default: 5,
  },
  //当前页码
  pageIndex: {
    type: Number,
    default: 1,
  },
  //每页显示条数
  pageSize: {
    type: Number,
    default: 10,
  },
  //总条数
  total: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["change"]);

const pages = computed(() => Math.ceil(props.total / props.pageSize));
//要由页面可见页码perPages和总页数pages 计算出要显示的页码
const pagers = computed(() => {
  const index = props.pageIndex,
    perPages = props.perPages;
  const first = index % perPages === 0 ? index : index - (index % perPages) + 1;
  const arr = [];

  for (let i = first; i < first + perPages; i++) {
    if (i > pages.value) break;
    arr.push(i);
  }

  return arr;
});
</script>

<style scoped>
.page {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
}
.page div {
  padding: 0.5rem;
  border: 0.1rem solid var(--dk-gray-400);
  cursor: pointer;
}
.page div:hover {
  background: var(--dk-gray-600);
}
.current {
  background: var(--dk-gray-500);
}
.disabled {
  cursor: not-allowed !important;
  opacity: 0.75;
}
</style>