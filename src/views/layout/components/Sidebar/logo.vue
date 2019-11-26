<template>
  <div class="logo">
    <transition name="fade">
      <span v-if="isCollapse" class="logo_title is-bold " key="0" :class="{'is-text':!type,'is-img':type}">
        <template v-if="type">
          <img :src="logoimg" width="30" height="30" />
        </template>
        <template v-else>
          <img :src="logoimg" width="30" height="30" />
        </template>
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!isCollapse">
        <span class="logo_title is-bold" key="1">
          <!-- <img :src="logoimg" width="180" height="50" style="object-fit:contain;margin-top:25px;"/> -->
          <!-- <span style="float:left;">{{website.title}} </span> -->
        </span>
      </template>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logoimg from "@/assets/images/home/logo2.png";
export default {
  name: "logo",
  data() {
    return {
      logoimg: logoimg
    };
  },
  props: ["isCollapse"],
  created() {},
  computed: {
    ...mapGetters(["website"]),
    type: function(val) {
      return this.website.logo.indexOf("static") !== -1;
    }
  },
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.logo {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 230px;
  height: 64px;
  line-height: 64px;
  background: #304156;
  color: #fdfdfd;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  box-sizing: border-box;
}
.logo_title {
  padding: 0 5px 0 0;
  color: #21baa9;
  font-size: 20px;
  &.is-bold {
    font-weight: 700;
  }
}
.is-text {
  position: absolute;
  top: 0;
  // left: 20px;
}
.is-img {
  position: absolute;
  top: 10px;
  left: 10px;
}
.logo_subtitle {
  font-size: 16px;
  padding-top: 5px;
}
</style>