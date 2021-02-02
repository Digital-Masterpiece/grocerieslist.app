<template>
  <form @submit.prevent="createList(name)" class="new-list-form">
    <div class="new-list-form__field">
      <label for="name" class="new-list-form__field__label sr-only">List Name</label>
      <input type="text" id="name" v-model="name" class="new-list-form__field__input" placeholder="List Name" required/>
    </div>
    <button type="submit" class="new-list-form__submit">Create</button>
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
      this.$store.dispatch('updateList',
          new List(this.name, [])
      ).then(() => {
        this.$router.push('/' + this.$store.state.lists[this.$store.state.lists.length - 1].id)
      })
    }
  }
}
</script>

<style lang="scss">
.new-list-form {
  @apply flex justify-center items-center;

  &__field {
    @apply flex justify-center items-center;

    &__input {
      @apply rounded shadow py-2 px-3 text-gray-900 leading-none w-full;
    }
  }

  &__submit {
    @apply ml-2 p-2 bg-green-700 border border-green-600 rounded shadow-md;
  }
}
</style>