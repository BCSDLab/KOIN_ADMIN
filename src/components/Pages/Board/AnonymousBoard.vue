<template>
  <public-table
    data-type="anonymous"/>
</template>

<script>
  import PublicTable from "../../SharedPart/PublicTable/PublicTable";

  export default {
    name: "AnonymousBoard",
    components: {
      'public-table': PublicTable
    }
  }
</script>

<style scoped>

</style>
