<template>
    <div>

    </div>
</template>

<script>
import { getCookie, clearCookie } from "../../utils/cookies";
export default {
  data() {
    return {};
  },
  mounted() {
    if (getCookie("ZW-G-isTk")) {
      clearCookie("ZW-G-isTk");
      sessionStorage.clear();
      location.reload();
    } else {
      this.$router.push({
        name: "login"
      });
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>