let PlanPickerItemComponent = {
  template: "#plan-picker-item-template",
  props: {
    name: {
      type: String,
      required: true
    },
    price: Number,
    selectedPlan: {
      type: String
    }
  },
  computed: {
    isSelected() {
      return this.name === this.selectedPlan;
    }
  },
  methods: {
    select() {
      this.$emit("select", this.name);
    }
  }
};

let PlanPickerComponent = {
  template: "#plan-picker-template",
  components: {
    "plan-picker-item": PlanPickerItemComponent
  },
  data() {
    return {
      plans: getPlansFromServer(),
      selectedPlan: null
    };
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan;
    }
  }
};

function getPlansFromServer() {
  return [
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
  ];
}

new Vue({
  el: "#app",
  components: {
    "plan-picker": PlanPickerComponent
  }
});
