<template>
  <div>
    <h1>Welcome!</h1>
    <p>Create a new list to get started!</p>
    <new-list-form />
  </div>
</template>

<script>
import NewListForm from "@/components/NewListForm";
export default {
  components: {NewListForm},
  data() {
    return {

    }
  }
}
</script>