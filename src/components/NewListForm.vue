<template>
  <form @submit.prevent="createList(name)">
    <label for="name">List Name</label>
    <input type="text" id="name" v-model="name" class="text-black" required>
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
        this.$router.push('/')
      })
    }
  }
}
</script>