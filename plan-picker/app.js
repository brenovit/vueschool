Vue.component("plan", {
  template: "#plan-template",
  props: {
    name: {
      type: String,
      required: true
    },
    price: Number
  }
});

new Vue({
  el: "#app",
  data: {
    plans: [
      {
        name: "The Hacker",
        price: 5.0
      },
      {
        name: "The Single",
        price: 10.0
      },
      {
        name: "The Curios",
        price: 12.0
      },
      {
        name: "The Addict",
        price: 17.0
      }
    ]
  }
});
