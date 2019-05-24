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
    "github-profile-user-card": GitHubProfileUserCardComponent,
    "github-profile-input": GitHubProfileInputComponent,
    "github-profile-clear-button": GitHubProfileClearButtonComponent
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
      let user = null;
      axios
        .get(apiUrlUser)
        .then(function(response) {
          if (response.status === 200) {
            user = getUserFromResponseData(response.data);
          }
        })
        .catch(function(error) {
          alert("User not found");
          console.log(error);
        });
      if (user !== null) {
        this.users.push(user);
      }
    },
    getUserFromResponseData(responseData) {
      let userData = responseData;
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

new Vue({
  el: "#app",
  components: {
    "github-profile-search": GitHubProfileSearchComponent
  }
});
