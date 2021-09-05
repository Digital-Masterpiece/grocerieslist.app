<template>
  <div v-if="list">
    <h1>{{ list.name }}</h1>
    <div v-for="item in list.items" :key="item.id">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: null
    }
  },
  mounted () {
    this.list = this.$store.getters.getListFromId(this.$route.params.id)
  }
}
</script>
