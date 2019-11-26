<template>
  <section class="app-main">
     <!-- <nx-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></nx-hamburger> -->
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import nxHamburger from "@/components/nx-hamburger";
export default {
  components: {
    nxHamburger
  },
  name: "AppMain",
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"]),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    }
  }
};
</script>
