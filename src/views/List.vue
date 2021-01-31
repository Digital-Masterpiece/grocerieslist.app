<template>
  <div>
    <h1 class="list-name">{{ list.name }}</h1>
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

<style lang="scss">
.list-name {
  @apply text-xl font-normal;
}
</style>