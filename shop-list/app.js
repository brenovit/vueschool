Vue.component("click-counter", {
  template: "#click-counter-template",
  data() {
    return {
      count: 0
    };
  }
});

new Vue({
  el: "#root",
  data: {
    header: "shopping list",
    newItem: "",
    state: "default",
    shopItems: [
      {
        label: "10 cokes",
        purchased: false
      },
      {
        label: "5 hats",
        purchased: true
      },
      {
        label: "2 bananas",
        purchased: false
      }
    ]
  },
  computed: {
    reversedItems() {
      return this.shopItems.slice(0).reverse();
    }
  },
  methods: {
    addItem() {
      var item = {
        label: this.newItem,
        purchased: false
      };
      this.shopItems.push(item);
      this.cleanNewItem();
    },
    changeState(newState) {
      this.state = newState;
      this.cleanNewItem();
    },
    cleanNewItem() {
      this.newItem = "";
    },
    togglePurchased(item) {
      item.purchased = !item.purchased;
    }
  }
});
