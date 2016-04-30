import Vue from './vue/dist/vue.common.js';
import { compileToFunctions } from './vue/dist/compiler.common.js';
import createRenderer from './vue/dist/server-renderer';
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
  <p>I am {{ name }}<br>
  message from parent: {{ message }}</p>
</div>
  `,
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

console.log(renderToString(new Vue(compileTemplate({
  template: `<root><root>`,
  components: {
    root: rootComponent
  }
}))));
