let childComponent = Vue.extend({
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
});

let parentComponent = Vue.extend({
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
});

new Vue({
  el: '#app',
  components: {
    parent: parentComponent
  }
});
