<template>
  <div>
    <h1>{{ list.name }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$store.state.lists[this.$route.params.index]
    }
  }
}
</script>