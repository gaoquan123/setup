import { Button, Input, Radio, Table, Form } from "element-ui";

const coms = [Button, Input, Radio, Table, Form];

export default {
  install(Vue) {
    coms.map((c) => {
      Vue.component(c.name, c);
    });
  },
};
