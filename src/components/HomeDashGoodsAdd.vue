<template>
  <div class="container">
    <Breadcrumb :to="to" />
    <div class="card">
      <div class="header">
        <span
          v-for="(step, index) of steps"
          :class="{ active: currIndex === index }"
        >
          {{ step }}
        </span>
      </div>
      <div class="form-body">
        <div class="sidebar">
          <span
            v-for="(step, index) of steps"
            :class="{ active: currIndex === index }"
            @click="currIndex = index"
          >
            {{ step }}
          </span>
        </div>
        <div class="form-container">
          <div class="base-info" v-show="currIndex === 0">
            <TreeSelectCat
              :depth="3"
              content="点击选择商品分类"
              @selected="handleSelect"
            />
            <Input
              v-model="goodnameInput.value.value"
              :name="goodnameInput.name"
              :placeholder="goodnameInput.placeholder"
              :validate="goodnameInput.validator"
              @validated="goodnameInput.handleValidated"
              :label="true"
              labelName="商品名称"
            />
            <Input
              v-model="goodpriceInput.value.value"
              :name="goodpriceInput.name"
              :placeholder="goodpriceInput.placeholder"
              :validate="goodpriceInput.validator"
              @validated="goodpriceInput.handleValidated"
              :label="true"
              labelName="商品价格"
            />
            <Input
              v-model="goodweightInput.value.value"
              :name="goodweightInput.name"
              :placeholder="goodweightInput.placeholder"
              :validate="goodweightInput.validator"
              @validated="goodweightInput.handleValidated"
              :label="true"
              labelName="商品重量"
            />
            <Input
              v-model="goodnumInput.value.value"
              :name="goodnumInput.name"
              :placeholder="goodnumInput.placeholder"
              :validate="goodnumInput.validator"
              @validated="goodnumInput.handleValidated"
              :label="true"
              labelName="商品数量"
            />
          </div>
          <div class="param" v-show="currIndex === 1">
            <div v-if="!attrMany || attrMany.length < 1">请选择商品分类</div>
            <div v-for="(attr, index) of attrMany">
              <span>{{ attr.attr_name }}</span>
              <TagList
                :showAdd="false"
                :tagStr="attr.attr_vals"
                @change="(attr_vals) => handleAttrManyChange(index, attr_vals)"
              />
            </div>
          </div>
          <div class="attr" v-show="currIndex === 2">
            <div v-if="!attrMany || attrMany.length < 1">请选择商品分类</div>
            <div v-for="(attr, index) of attrOnly">
              <span>{{ attr.attr_name }}</span>
              <TagList
                :showAdd="false"
                :tagStr="attr.attr_vals"
                @change="(attr_vals) => handleAttrOnlyChange(index, attr_vals)"
              />
            </div>
          </div>
          <div class="img" v-show="currIndex === 3">
            <Button content="点击上传图片" @click="handleUpload" />
            <input
              type="file"
              name="file"
              ref="fileInput"
              style="display: none"
              @change="handleFileChange"
            />
            <div class="img-filed">
              <img :src="fileSrc" alt="img" />
            </div>
            <span> {{ fileName }}/{{ fileSize }} </span>
          </div>
          <div class="content" v-show="currIndex === 4">
            <textarea
              name="content"
              cols="30"
              rows="10"
              placeholder="请输入商品内容"
              v-model="goodsIntroduce"
            ></textarea>
            <Button content="提交" @click="handleSubmit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";

import { useRouter } from "vue-router";

import { getParamList, addGood } from "../server/ajax.js";

import InputUse from "../common/InputUse.js";

const steps = ["基本信息", "商品参数", "商品属性", "商品图片", "商品内容"];
const currIndex = ref(0);

const { to } = useBreadcrumb();
const {
  goodname,
  goodnameInput,
  goodprice,
  goodpriceInput,
  goodweight,
  goodweightInput,
  goodnum,
  goodnumInput,
} = useInput();
const { goodCat, handleSelect } = useSelect();
const {
  attrMany,
  attrOnly,
  attrs,
  handleAttrManyChange,
  handleAttrOnlyChange,
  getParam,
} = useAttr();
const {
  fileInput,
  fileSize,
  fileName,
  fileSrc,
  handleUpload,
  handleFileChange,
} = useUpload();
const goodsIntroduce = ref("");
const router = useRouter();

watch(goodCat, () => {
  getParam();
});

async function handleSubmit() {
  const res = await addGood(
    goodname.value,
    goodCat.value,
    goodprice.value,
    goodnum.value,
    goodweight.value,
    goodsIntroduce.value,
    [],
    attrs.value
  );

  if (res.data.data) {
    router.push("/home/goods");
  }
}
function useBreadcrumb() {
  const to = [
    { path: "/home", name: "首页" },
    { name: "商品管理" },
    { path: "/home/goods", name: "商品列表" },
    { name: "添加商品" },
  ];
  return {
    to,
  };
}
function useInput() {
  const goodname = ref("");
  const goodnameInput = new InputUse({
    name: "goodname",
    value: goodname,
    placeholder: "请输入商品名称",
    option: {
      fn: (val) => {
        return val.length > 0;
      },
      detail: "请输入商品名称",
    },
  });

  const goodprice = ref("");
  const goodpriceInput = new InputUse({
    name: "goodprice",
    value: goodprice,
    placeholder: "请输入商品价格",
    option: {
      fn: (val) => {
        return +val > 0;
      },
      detail: "请输入商品价格（大于零的数字）",
    },
  });

  const goodweight = ref("");
  const goodweightInput = new InputUse({
    name: "goodweight",
    value: goodweight,
    placeholder: "请输入商品重量",
    option: {
      fn: (val) => {
        return +val > 0;
      },
      detail: "请输入商品重量（大于零的数字）",
    },
  });

  const goodnum = ref("");
  const goodnumInput = new InputUse({
    name: "goodnum",
    value: goodnum,
    placeholder: "请输入商品数量",
    option: {
      fn: (val) => {
        return +val > 0;
      },
      detail: "请输入商品数量（大于零的数字）",
    },
  });

  return {
    goodname,
    goodnameInput,
    goodprice,
    goodpriceInput,
    goodweight,
    goodweightInput,
    goodnum,
    goodnumInput,
  };
}
function useSelect() {
  const goodCat = ref("");
  function handleSelect(selected) {
    goodCat.value = selected.map((item) => item.cat_id).join(",");
  }

  return {
    goodCat,
    handleSelect,
  };
}
function useAttr() {
  const attrMany = ref([]);
  const attrOnly = ref([]);
  const attrs = computed(() =>
    [...attrMany.value, ...attrOnly.value].map(({ attr_id, attr_vals }) => ({
      attr_id,
      attr_vals,
    }))
  );

  function handleAttrManyChange(index, attr_vals) {
    const old = attrMany.value[index];
    old.attr_vals = attr_vals;
    attrMany.value[index] = old;
  }

  function handleAttrOnlyChange(index, attr_vals) {
    const old = attrOnly.value[index];
    old.attr_vals = attr_vals;
    attrOnly.value[index] = old;
  }

  async function getParam(params) {
    const ids = goodCat.value.split(",");
    const selectedId = ids[ids.length - 1];
    if (selectedId != -1) {
      const res = await Promise.all([
        getParamList(ids[ids.length - 1], "many"),
        getParamList(ids[ids.length - 1], "only"),
      ]);

      if (res[0].data.data) {
        attrMany.value = res[0].data.data;
      }
      if (res[1].data.data) {
        attrOnly.value = res[1].data.data;
      }
    }
  }

  return {
    attrMany,
    attrOnly,
    attrs,
    handleAttrManyChange,
    handleAttrOnlyChange,
    getParam,
  };
}
function useUpload() {
  const fileInput = ref(null);
  const fileSize = ref("");
  const fileName = ref("");
  const fileSrc = ref("");

  function getImageUrl(name) {
    if (URL) {
      return new URL(`../assets/${name}.png`, import.meta.url).href;
    }
  }

  onMounted(() => {
    const placeholder = getImageUrl("placeholder_img");
    if (placeholder) {
      fileSrc.value = placeholder;
    }
  });

  function handleUpload() {
    if (fileInput.value) {
      fileInput.value.click();
    }
  }

  function toSizeStr(size) {
    if (size >= 1048576) {
      return `${(size / 1048576).toFixed(1)}mb`;
    } else if (size < 1048576) {
      return `${(size / 1024).toFixed(1)}kb`;
    }
  }

  function handleFileChange(e) {
    // 利用fileReader对象获取file
    const file = e.target.files[0];
    if (file) {
      fileSize.value = toSizeStr(file.size);
      fileName.value = file.name;
      // 2,621,440   2M
      if (fileSize.value > 2101440) {
        // 图片大于2MB
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        const imgcode = e.target.result;
        // this.formInline.img = imgcode;
        fileSrc.value = imgcode;
      };
    }
  }

  return {
    fileInput,
    fileSize,
    fileName,
    fileSrc,
    handleUpload,
    handleFileChange,
  };
}
</script>

<style scoped>
.card {
  margin: 2rem 0rem;
  border-radius: 0.5rem;
  background: var(--dk-dark-bg);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 2rem;
}
.header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  margin: 1rem 0;
}
.header span.active {
  color: var(--bs-orange);
}
.form-body {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}
.sidebar {
  flex: 1;
  padding: 0.5rem;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
}
.sidebar span {
  margin-bottom: 1rem;
  cursor: pointer;
  user-select: none;
}
.sidebar span.active {
  color: var(--bs-orange);
}
.sidebar span:hover {
  color: var(--bs-orange);
}
.form-container {
  flex: 6;
  padding: 0.5rem;
}
.btn {
  margin-left: auto;
}
.img-filed {
  width: 10rem;
  height: 10rem;
  display: inline-block;
}
.img-filed img {
  max-width: 100%;
}
</style>