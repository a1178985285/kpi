<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.commit("modifyindexSi", "3-4");
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import url("../../assets/utils.less");
</style>