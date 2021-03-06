import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Bans from "./views/Bans.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/bans",
      name: "bans",
      component: Bans
    }
  ]
});

// This method is run before each route request is served.
router.beforeEach((to, from, next) => {
  const publicPages = ["/"]; // List of publicly accessable pages. These do not require authentication.
  const authRequired = !publicPages.includes(to.path); // All the pages that do require authentication.
  const loggedIn = localStorage.user; // Fetches the user that is logged in. Null if user is not authenticated.

  // If the page requires authentication and the user is not logged in.
  if (authRequired && !loggedIn) {
    return next("/"); // Send user to login.
  }
  return next(); // Send user to the requested route.
});

export default router;
