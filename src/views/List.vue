<template>
  <div v-if="list">
    <h1>{{ list.n }}</h1>

    <form class="new-item" @submit.prevent="addItemToList">
      <label for="name" class="sr-only">Item Name</label>
      <input v-model="name" required
             class="new-item__input"
             ref="item_name"
             type="text" id="name" placeholder="Item Name" autofocus/>

      <label for="quantity" class="sr-only">Quantity</label>
      <input v-model="quantity" required
             class="new-item__input new-item__input--number"
             min="1" max="2147483647"
             type="number" id="quantity"/>

      <button type="submit" class="new-item__button">Add</button>
    </form>

    <!-- Only display the list items if they are present and not all soft deleted. -->
    <div
      v-if=" list.i.length !== 0
      && list.i.filter(item => item.d).length !== list.i.length"
      class="items">
      <div
        v-if="list.i.filter(i => !i.d && i.c === 0).length && list.i.filter(i => !i.d && i.c === 0).length === 0"
        class="all-checked">😃 You've checked off all your items, nice!
      </div>
      <div v-for="item in list.i.filter(i => !i.d && !i.c)" :key="item.id">
        <div class="item">
          <label :for="item.n" class="sr-only">{{ item.n }} Checked</label>
          <input type="checkbox" :id="item.n" :checked="item.c" @input="toggleItemCheckedStatus(item.id)"
                 class="item__checkbox"/>
          <font-awesome-icon icon="check" class="item__checkbox__icon"/>
          <div class="item__container">
            <div contenteditable
                 inputmode="decimal"
                 class="item__quantity"
                 @blur="modifyItemQuantity($event, item.id)"
                 @keypress.enter="modifyItemQuantity($event, item.id)">
              {{ item.q }}
            </div>
            <div contenteditable
                 class="item__name"
                 @blur="modifyItemName($event, item.id)"
                 @keypress.enter="modifyItemName($event, item.id)">
              {{ item.n }}
            </div>
            <button @click="deleteItem(item.id)"
                    :title="'Remove ' + item.n + ' from this list.'"
                    class="item__icon--delete">
              <font-awesome-icon icon="times-circle"/>
            </button>
          </div>
        </div>
      </div>

      <h2 v-if="list.i.filter(i => !i.d && i.c === 1).length" class="items__h2">Checked Items</h2>
      <div v-for="item in list.i.filter(i => !i.d && i.c === 1)" :key="item.id" class="items__checked">
        <div class="item">
          <label :for="item.n" class="sr-only">{{ item.n }} Checked</label>
          <input type="checkbox" :id="item.n" :checked="item.c" @input="toggleItemCheckedStatus(item.id)"
                 class="item__checkbox"/>
          <font-awesome-icon icon="check" class="item__checkbox__icon item__checkbox__icon--checked"/>
          <div class="item__container">
            <div contenteditable
                 inputmode="decimal"
                 class="item__quantity"
                 @blur="modifyItemQuantity($event, item.id)"
                 @keypress.enter="modifyItemQuantity($event, item.id)">
              {{ item.q }}
            </div>
            <div contenteditable
                 class="item__name"
                 @blur="modifyItemName($event, item.id)"
                 @keypress.enter="modifyItemName($event, item.id)">
              {{ item.n }}
            </div>
            <button @click="deleteItem(item.id)"
                    :title="'Remove ' + item.n + ' from this list.'"
                    class="item__icon--delete">
              <font-awesome-icon icon="times-circle"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list.i.filter(i => !i.d).length === 0" class="no-items">Add items to this list above.</div>
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
    findItem (id) {
      return this.list.i.find(i => i.id === id)
    },
    updateLocalList () {
      this.list = this.$store.getters.getListFromId(this.$route.params.id)
    },
    addItemToList () {
      const item = new Item(this.name, this.quantity)
      this.list.i.push(item)
      this.$store.dispatch('updateList', this.list).then(() => {
        this.name = null
        this.quantity = 1
        this.updateLocalList()
      })
      this.$refs.item_name.focus()
    },
    modifyItemQuantity (event, id) {
      const item = this.findItem(id)
      if (event.target.innerText && !isNaN(event.target.innerText)) {
        item.q = event.target.innerText
        item.u = new Date().getTime()
        this.$store.dispatch('updateList', this.list).then(() => this.updateLocalList())
      } else {
        event.target.innerText = item.q
      }
      event.target.blur()
    },
    modifyItemName (event, id) {
      if (event.target.innerText) {
        const item = this.findItem(id)
        item.n = event.target.innerText
        item.u = new Date().getTime()
        this.$store.dispatch('updateList', this.list).then(() => this.updateLocalList())
      }
      event.target.blur()
    },
    deleteItem (id) {
      const item = this.findItem(id)
      if (item) {
        item.u = new Date().getTime()
        item.d = 1
        this.list.i.sort((a, b) => a.d > b.d ? 1 : -1)
        this.$store.dispatch('updateList', this.list)
      }
    },
    toggleItemCheckedStatus (id) {
      const item = this.findItem(id)
      if (item) {
        item.c = item.c === 0 ? 1 : 0
        item.u = new Date().getTime()
        this.$store.dispatch('updateList', this.list)
      }
    }
  },
  mounted () {
    this.updateLocalList()
    document.title = this.list.n + ' List | Groceries List'
  }
}
</script>

<style lang="scss">
.new-item {
  @apply flex justify-center items-center;

  &__input {
    @apply relative w-48 bg-white px-3 py-2 rounded outline-none transition duration-200 ease-in-out border border-gl-gray;
    @apply dark:border-gl-deep-blue dark:bg-gl-deep-blue dark:bg-opacity-50 dark:text-gray-200;

    &:hover, &:focus {
      @apply ring-4 ring-gl-blueberry ring-opacity-50 z-10;
    }

    &--number {
      @apply w-16 ml-2 mr-4;
    }
  }

  &__button {
    @apply relative bg-gl-lightgreen px-3 py-2 rounded transition duration-200 ease-in-out border border-gl-green outline-none text-gray-800;
    @apply dark:bg-gl-green dark:border-gl-lightgreen dark:text-gray-200;

    &:hover, &:focus {
      @apply bg-green-300 ring-4 ring-gl-lightgreen ring-opacity-50 z-10;
      @apply dark:ring-gl-green dark:bg-green-800 dark:ring-opacity-30;
    }
  }
}

.item {
  @apply flex justify-start items-center w-full;

  &__container {
    @apply flex justify-start items-center bg-white rounded border border-gl-gray h-14 flex-grow;
    @apply dark:border-gl-deep-blue dark:bg-gl-deep-blue dark:bg-opacity-25 dark:text-gray-200;
  }

  &s {
    @apply grid w-full gap-4 mt-8;

    &__h2 {
      @apply font-bold text-center text-lg mt-12;
    }

    &__checked {
      @apply opacity-50;
    }
  }

  &__checkbox {
    @apply relative h-8 w-8 bg-white border border-gl-gray outline-none appearance-none rounded mr-2 cursor-pointer transition duration-200 ease-in-out;
    @apply dark:border-gl-deep-blue dark:bg-gl-deep-blue dark:bg-opacity-25 dark:text-gray-200;

    &:checked {
      @apply bg-gl-lightblue;
      @apply dark:bg-gl-darkblue;
    }

    &:focus {
      @apply border-blue-300 ring-4 ring-blue-300 ring-opacity-50 outline-none;
    }

    &__icon {
      @apply absolute opacity-10 ml-2 pointer-events-none;

      &--checked {
        @apply opacity-100;
      }
    }
  }

  &__quantity, &__name {
    @apply px-4 h-full transition duration-200 ease-in-out;

    &:focus {
      @apply border-blue-300 ring-4 ring-blue-300 ring-opacity-50 outline-none;
    }
  }

  &__quantity {
    @apply grid place-items-center w-14 text-center border-r border-gl-gray rounded-l;
    @apply dark:border-gl-deep-blue;
  }

  &__name {
    @apply flex justify-start items-center flex-grow;
  }

  &__icon {
    &--delete {
      @apply text-xl ml-auto px-4 py-3;

      &:hover, &:focus {
        @apply text-red-700;
      }
    }
  }
}

.no-items {
  @apply font-light text-center mt-4;
}

.all-checked {
  @apply text-center;
}
</style>
