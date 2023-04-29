<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>

    <PageTools :show-before="true">
      <template v-slot:before>
        <el-button>321</el-button>
      </template>
      <template v-slot:after>
        <el-button>123</el-button>
      </template>
    </PageTools>

    <ImageUpload />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
