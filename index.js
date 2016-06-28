import Vue from './vue/dist/vue.common.js';
import { compileToFunctions } from './vue/packages/vue-template-compiler';
import { createRenderer } from './vue/packages/vue-server-renderer';
const { renderToString } = createRenderer();

let compileTemplate = (options) => {
  const res = compileToFunctions(options.template, {
    preserveWhitespace: false
  });
  Object.assign(options, res);
  console.assert(typeof options.render === 'function');
  delete options.template;
  return options;
};

let childComponent = Vue.extend(compileTemplate({
  props: ['message'],
  template: `
<div>
  <p @click="hello">I am {{ name }}<br>
  message from parent: {{ message }}</p>
</div>
  `,
  methods: {
    hello: function() {
      console.log('hi');
    }
  },
  data: function() {
    return {
      name: 'child'
    };
  }
}));

let rootComponent = Vue.extend(compileTemplate({
  template: `
<div>
  <p>I am {{ name }}</p>
  <child :message="message"></child>
</div>
  `,
  data: function() {
    return {
      name: 'parent',
      message: 'hello!'
    };
  },
  components: {
    child: childComponent
  }
}));

renderToString(new Vue(compileTemplate({
  template: `<root><root>`,
  components: {
    root: rootComponent
  }
})), (err, res) => {
  console.log(err);
  console.log(res);
});

console.log(Vue.config._isServer);
