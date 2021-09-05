<template>
  <div v-if="list">
    <h1>{{ list.name }}</h1>

    <form class="new-item" @submit.prevent="addItemToList">
      <label for="name" class="sr-only">Item Name</label>
      <input v-model="name" required
             class="new-item__input"
             type="text" id="name" placeholder="Item Name"/>

      <label for="quantity" class="sr-only">Quantity</label>
      <input v-model="quantity" required
             class="new-item__input new-item__input--number"
             min="1" max="2147483647"
             type="number" id="quantity"/>

      <button type="submit" class="new-item__button">Add</button>
    </form>

    <!-- Only display the list items if they are present and not all soft deleted. -->
    <div
      v-if="list
      && list.items.length !== 0
      && list.items.filter(item => item.deleted).length !== list.items.length">
      <div v-for="(item, index) in list.items" :key="index">
        <div v-if="!item.deleted">
          <div contenteditable
               inputmode="decimal"
               @blur="modifyItemQuantity($event, index)"
               @keypress.enter="modifyItemQuantity($event, index)">
            {{ item.quantity }}
          </div>
          <div contenteditable
               @blur="modifyItemName($event, index)"
               @keypress.enter="modifyItemName($event, index)">
            {{ item.name }}
          </div>
          <button @click="deleteItem(index)">Delete</button>
        </div>
      </div>
    </div>
    <div v-else class="no-items">Add items to this list above.</div>

  </div>
</template>

<script>
import Item from '@/classes/Item.js'

export default {
  data () {
    return {
      list: null,
      name: null,
      quantity: 1
    }
  },
  methods: {
    retrieveList () {
      this.list = this.$store.getters.getListFromId(this.$route.params.id)
    },
    addItemToList () {
      const item = new Item(this.name, this.quantity)
      this.list.items.push(item)
      this.$store.dispatch('updateList', this.list).then(() => {
        this.name = null
        this.quantity = 1
        this.retrieveList()
      })
    },
    modifyItemQuantity (event, index) {
      if (event.target.innerText && !isNaN(event.target.innerText)) {
        const item = this.list.items[index]
        item.quantity = event.target.innerText
        item.updated = new Date().getTime()
        this.$store.dispatch('updateList', this.list).then(() => this.retrieveList())
      } else {
        event.target.innerText = this.list.items[index].quantity
      }
      event.target.blur()
    },
    modifyItemName (event, index) {
      if (event.target.innerText) {
        const item = this.list.items[index]
        item.name = event.target.innerText
        item.updated = new Date().getTime()
        this.$store.dispatch('updateList', this.list).then(() => this.retrieveList())
      }
      event.target.blur()
    },
    deleteItem (index) {
      this.list.items[index].deleted = new Date().getTime()
      this.list.items.sort((a, b) => a.deleted > b.deleted ? 1 : -1)
      this.$store.dispatch('updateList', this.list)
    }
  },
  mounted () {
    this.retrieveList()
  }
}
</script>

<style lang="scss">
.new-item {
  @apply flex justify-center items-center space-x-4;

  &__input {
    @apply w-56 bg-white px-3 py-2 rounded shadow outline-none;

    &--number {
      @apply w-20;
    }
  }

  &__button {
    @apply bg-gray-100 px-3 py-2 rounded shadow transition duration-200 ease-in-out;

    &:hover, &:focus {
      @apply bg-green-100;
    }
  }
}

.no-items {
  @apply font-light text-center mt-4;
}
</style>
