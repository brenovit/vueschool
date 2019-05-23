let PlanItemComponent = {
  template: "#plan-item-template",
  props: {
    name: {
      type: String,
      required: true
    },
    price: Number
  }
};

let PlanPickerComponent = {
  template: "#plan-picker-template",
  components: {
    plan: PlanItemComponent
  },
  data() {
    return {
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
    };
  }
};

new Vue({
  el: "#app",
  components: {
    "plan-picker": PlanPickerComponent
  }
});
