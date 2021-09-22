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
      v-if=" list.items.length !== 0
      && list.items.filter(item => item.deleted).length !== list.items.length"
      class="items">
      <div
        v-if="list.items.filter(i => !i.deleted && i.checked).length && list.items.filter(i => !i.deleted && !i.checked).length === 0"
        class="all-checked">😃 You've checked off all your items, great job!
      </div>
      <div v-for="item in list.items.filter(i => !i.deleted && !i.checked)" :key="item.id">
        <div class="item">
          <label :for="item.name" class="sr-only">{{ item.name }} Checked</label>
          <input type="checkbox" :id="item.name" :checked="item.checked" @input="toggleItemCheckedStatus(item.id)"
                 class="item__checkbox"/>
          <font-awesome-icon icon="check" class="item__checkbox__icon"/>
          <div class="item__container">
            <div contenteditable
                 inputmode="decimal"
                 class="item__quantity"
                 @blur="modifyItemQuantity($event, item.id)"
                 @keypress.enter="modifyItemQuantity($event, item.id)">
              {{ item.quantity }}
            </div>
            <div contenteditable
                 class="item__name"
                 @blur="modifyItemName($event, item.id)"
                 @keypress.enter="modifyItemName($event, item.id)">
              {{ item.name }}
            </div>
            <button @click="deleteItem(item.id)"
                    :title="'Remove ' + item.name + ' from this list.'"
                    class="item__icon--delete">
              <font-awesome-icon icon="times-circle"/>
            </button>
          </div>
        </div>
      </div>
      <h2 v-if="list.items.filter(i => !i.deleted && i.checked).length" class="items__h2">Checked Items</h2>
      <div v-for="item in list.items.filter(i => !i.deleted && i.checked)" :key="item.id" class="items__checked">
        <div class="item">
          <label :for="item.name" class="sr-only">{{ item.name }} Checked</label>
          <input type="checkbox" :id="item.name" :checked="item.checked" @input="toggleItemCheckedStatus(item.id)"
                 class="item__checkbox"/>
          <font-awesome-icon icon="check" class="item__checkbox__icon item__checkbox__icon--checked"/>
          <div class="item__container">
            <div contenteditable
                 inputmode="decimal"
                 class="item__quantity"
                 @blur="modifyItemQuantity($event, item.id)"
                 @keypress.enter="modifyItemQuantity($event, item.id)">
              {{ item.quantity }}
            </div>
            <div contenteditable
                 class="item__name"
                 @blur="modifyItemName($event, item.id)"
                 @keypress.enter="modifyItemName($event, item.id)">
              {{ item.name }}
            </div>
            <button @click="deleteItem(item.id)"
                    :title="'Remove ' + item.name + ' from this list.'"
                    class="item__icon--delete">
              <font-awesome-icon icon="times-circle"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list.items.filter(i => !i.deleted).length === 0" class="no-items">Add items to this list above.</div>
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
      return this.list.items.find(i => i.id === id)
    },
    updateLocalList () {
      this.list = this.$store.getters.getListFromId(this.$route.params.id)
    },
    addItemToList () {
      const item = new Item(this.name, this.quantity)
      this.list.items.push(item)
      this.$store.dispatch('updateList', this.list).then(() => {
        this.name = null
        this.quantity = 1
        this.updateLocalList()
      })
    },
    modifyItemQuantity (event, id) {
      const item = this.findItem(id)
      if (event.target.innerText && !isNaN(event.target.innerText)) {
        item.quantity = event.target.innerText
        item.updated = new Date().getTime()
        this.$store.dispatch('updateList', this.list).then(() => this.updateLocalList())
      } else {
        event.target.innerText = item.quantity
      }
      event.target.blur()
    },
    modifyItemName (event, id) {
      if (event.target.innerText) {
        const item = this.findItem(id)
        item.name = event.target.innerText
        item.updated = new Date().getTime()
        this.$store.dispatch('updateList', this.list).then(() => this.updateLocalList())
      }
      event.target.blur()
    },
    deleteItem (id) {
      const item = this.findItem(id)
      if (item) {
        item.deleted = new Date().getTime()
        this.list.items.sort((a, b) => a.deleted > b.deleted ? 1 : -1)
        this.$store.dispatch('updateList', this.list)
      }
    },
    toggleItemCheckedStatus (id) {
      const item = this.findItem(id)
      if (item) {
        item.checked = !item.checked
        this.$store.dispatch('updateList', this.list)
      }
    }
  },
  mounted () {
    this.updateLocalList()
  }
}
</script>

<style lang="scss">
.new-item {
  @apply flex justify-center items-center space-x-4;

  &__input {
    @apply w-56 bg-white px-3 py-2 rounded border border-gl-lightblue transition duration-200 ease-in-out outline-none;

    &:focus {
      @apply border-blue-300 ring-4 ring-blue-300 ring-opacity-50 outline-none;
    }

    &--number {
      @apply w-20;
    }
  }

  &__button {
    @apply bg-gray-100 px-3 py-2 rounded border border-gl-lightblue transition duration-200 ease-in-out;

    &:hover {
      @apply bg-blue-50;
    }

    &:focus {
      @apply border-blue-300 ring-4 ring-blue-300 ring-opacity-50 outline-none;
    }
  }
}

.item {
  @apply flex justify-start items-center w-full;

  &__container {
    @apply flex justify-start items-center bg-white rounded border border-gl-lightblue h-14 flex-grow;
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
    @apply relative h-8 w-8 bg-white border border-gl-lightblue outline-none appearance-none rounded mr-2 cursor-pointer transition duration-200 ease-in-out;

    &:checked {
      @apply bg-gl-lightblue;
    }

    &:focus {
      @apply border-blue-300 ring-4 ring-blue-300 ring-opacity-50 outline-none;
    }

    &__icon {
      @apply absolute opacity-10 ml-2 pointer-events-none text-gl-darkgray;

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
    @apply grid place-items-center w-14 text-center border-r border-gl-lightblue rounded-l;
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
