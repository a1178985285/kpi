<template>
  <div class="index-box">
    
    <headerMe></headerMe>

    <router-view></router-view>

  </div>
</template>

<script>
import headerMe from "../components/headerMe";
export default {
  data() {
    return {};
  },
  mounted() {
    
  },
  components: {
    headerMe,
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/utils.less");
.index-box {
  padding-top: 50px;
  background: @color1;
   display: -webkit-flex;      /* OLD - iOS 6-, Safari 3.1-6 */      /* OLD - Firefox 19- (buggy but mostly works) */ /* TWEENER - IE 10 */ /* NEW - Chrome */
  display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
</style>
