let NotificationMessageComponente = {
  template: "#notification-message-template",
  props: {
    type: {
      type: String,
      default: "info"
    },
    header: {
      type: String,
      default: "Information"
    }
  },
  data() {
    return {
      hidden: false
    };
  },
  computed: {},
  methods: {
    hide() {
      this.hidden = true;
      this.$emit("hideNotification");
    }
  }
};

let GitHubProfileUserCardComponent = {
  template: "#github-profile-user-card-template",
  props: [
    "name",
    "login",
    "avatar_url",
    "bio",
    "public_repos",
    "following",
    "created_at"
  ],
  computed: {
    createdAtDate() {
      return moment(String(this.created_at)).format("MM/DD/YYYY hh:mm");
    },
    loginUrl() {
      return "https://github.com/" + this.login;
    }
  }
};

let GitHubProfileInputComponent = {
  template: "#github-profile-input-template",
  data() {
    return {
      userLogin: null
    };
  },
  methods: {
    searchByUserLogin() {
      this.$emit("searchUserByLogin", this.userLogin);
      this.userLogin = "";
    }
  }
};

let GitHubProfileClearButtonComponent = {
  template: "#github-profile-clear-button-template",
  methods: {
    clearList() {
      this.$emit("clearUserList");
    }
  }
};

let GitHubProfileSearchComponent = {
  template: "#github-profile-search-template",
  components: {
    "github-profile-input": GitHubProfileInputComponent,
    "github-profile-clear-button": GitHubProfileClearButtonComponent,
    "github-profile-user-card": GitHubProfileUserCardComponent,
    "notification-message": NotificationMessageComponente
  },
  data() {
    return {
      apiUrl: "https://api.github.com/users/",
      users: [],
      notificationMessage: null
    };
  },
  methods: {
    searchUser(userLogin) {
      let apiUrlUser = this.apiUrl + userLogin;
      let userData = null;
      axios
        .get(apiUrlUser)
        .then(response => {
          userData = response.data;
        })
        .catch(error => {
          this.notificationMessage = "User not found";
          console.log(error);
        })
        .finally(() => {
          if (userData !== null) {
            let userToAdd = this.getUserFromResponseData(userData);
            if (!this.users.some(user => user.login === userToAdd.login)) {
              this.users.push(userToAdd);
            }
          }
        });
    },
    getUserFromResponseData(userData) {
      return {
        name: userData.name,
        login: userData.login,
        avatar_url: userData.avatar_url,
        bio: userData.bio,
        public_repos: userData.public_repos,
        following: userData.following,
        created_at: userData.created_at
      };
    },
    hideNotification() {
      this.notificationMessage = null;
    },
    clearList() {
      this.users = [];
    }
  }
};

new Vue({
  el: "#root",
  components: {
    "github-profile-search": GitHubProfileSearchComponent
  }
});
