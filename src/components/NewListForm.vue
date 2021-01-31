<template>
  <form @submit.prevent="createList(name)">
    <h2>Create a new List</h2>
    <label for="name">List Name</label>
    <input type="text" id="name" v-model="name" class="text-black">
    <button type="submit">Create</button>
  </form>
</template>

<script>
import List from "@/classes/List";

export default {
  data() {
    return {
      name: null
    }
  },
  methods: {
    createList() {
      console.log(this.name);
      this.$store.dispatch('createList',
          new List(this.name, [])
      ).then(() => {
        console.log(this.$store.state.lists);
      })
    }
  },
  mounted() {
    console.log(this.$store.state.lists);
  }
}
</script>