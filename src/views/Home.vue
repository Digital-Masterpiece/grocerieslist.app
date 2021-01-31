<template>
  <div>
    <h1 class="sr-only">Welcome!</h1>
    <p v-if="lists.length === 0">Create a new list to get started!</p>
    <div v-else>
      <router-link v-for="(list, index) in lists" :key="index" :to="{name: 'List', params: {index: index}}">
        <div>{{ list.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    lists: state => state.lists
  })
}
</script>