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
    "github-profile-user-card": GitHubProfileUserCardComponent
  },
  data() {
    return {
      apiUrl: "https://api.github.com/users/",
      users: []
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
          alert("User not found");
          console.log(error);
        })
        .finally(() => {
          console.log(userData);
          if (userData !== null) {
            let user = this.getUserFromResponseData(userData);
            this.users.push(user);
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
    clearList() {
      this.users = [];
    }
  }
};

let vue = new Vue({
  el: "#root",
  components: {
    "github-profile-search": GitHubProfileSearchComponent
  }
});
