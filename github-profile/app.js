let GitHubProfileCardComponent = {
  template: "#github-profile-card-template",
  data() {
    return {
      apiUrl: "https://api.github.com/users/",
      name: "Breno Nunes",
      login: "brenovit",
      avatar_url: "https://avatars0.githubusercontent.com/u/15836714?v=4",
      bio:
        "C#, Java, Spring, ReactJS, VueJS, JavaScript, HTML, MySQL, SQL Server, Oracle, Unity, Git, Maven, Docker, Jenkins, Ant",
      public_repos: 48,
      following: 40,
      created_at: "2015-11-13T17:19:39Z",
      login_url: "https://github.com/brenovit"
    };
  },
  computed: {
    createdAtDate() {
      return moment(String(this.created_at)).format("MM/DD/YYYY hh:mm");
    }
  },
  methods: {
    searchUser(login) {
      let apiUrlUser = this.apiUrl + this.userLogin;
      axios
        .get(apiUrlUser)
        .then(function(response) {
          if (response.status === 200) {
            console.log(response.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
    searchUser() {}
  }
};

let GitHubProfileSearchComponent = {
  template: "#github-profile-search-template",
  components: {
    "github-user-card": GitHubProfileCardComponent,
    "github-profile-input": GitHubProfileInputComponent
  }
};

new Vue({
  el: "#app",
  components: {
    "github-profile-search": GitHubProfileSearchComponent
  }
});
