<template>
  <div>
    <div v-for="list in $store.state.lists" :key="list.id">
      {{ list.name }}
    </div>
  </div>
</template>

<script>
export default {}
</script>
