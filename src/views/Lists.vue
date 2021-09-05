<template>
  <div>
    <div v-for="list in $store.state.lists" :key="list.id">
      <router-link
        :to="{name: 'List', params: {id: list.id}}">{{ list.name }}</router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>
