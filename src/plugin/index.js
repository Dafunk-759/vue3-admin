import Avator from "../common/Avator.vue";
import Breadcrumb from "../common/Breadcrumb.vue";
import Button from "../common/Button.vue";
import Icon from "../common/Icon.vue";
import Input from "../common/Input.vue";
import Model from "../common/Model.vue";
import Pagenition from "../common/Pagenition.vue";
import Search from "../common/Search.vue";
import StateBtn from "./../common/StateBtn.vue";
import Table from "./../common/Table.vue";
import TagList from "./../common/TagList.vue";
import Toast from "./../common/Toast.vue";
import Tooltip from "./../common/Tooltip.vue";
import TreeBtns from "./../common/TreeBtns.vue";
import TreeMultiple from "./../common/TreeMultiple.vue";
import TreeSelect from "./../common/TreeSelect.vue";
import TreeSelectCat from "./../common/TreeSelectCat.vue";
import TreeTable from "./../common/TreeTable.vue";
import TreeTableTbody from "./../common/TreeTableTbody.vue";

const map = new Map([
  ["Avator", Avator],
  ["Breadcrumb", Breadcrumb],
  ["Button", Button],
  ["Icon", Icon],
  ["Input", Input],
  ["Model", Model],
  ["Pagenition", Pagenition],
  ["Search", Search],
  ["StateBtn", StateBtn],
  ["Table", Table],
  ["TagList", TagList],
  ["Toast", Toast],
  ["Tooltip", Tooltip],
  ["TreeBtns", TreeBtns],
  ["TreeMultiple", TreeMultiple],
  ["TreeSelect", TreeSelect],
  ["TreeSelectCat", TreeSelectCat],
  ["TreeTable", TreeTable],
  ["TreeTableTbody", TreeTableTbody],
]);

export default {
  install(app, option) {
    for (const [key, value] of map) {
      app.component(key, value);
    }
  },
};
