<template>
  <div>
    <h1 class="new-list-header">New List</h1>
    <new-list-form />
  </div>
</template>

<script>
import NewListForm from '../components/NewListForm'
export default {
  components: {NewListForm}
}
</script>

<style lang="scss">
.new-list-header {
  @apply text-2xl font-medium text-center mb-2;
}
</style>