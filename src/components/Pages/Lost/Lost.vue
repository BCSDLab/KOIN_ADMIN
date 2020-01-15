<template>
  <public-table
    data-type="lost"
    :service-type="serviceType"/>
</template>

<script>
  import PublicTable from "../../SharedPart/PublicTable/PublicTable";

  export default {
    name: "Lost",
    data() {
      return {
        serviceType: [
          {value: 1, text: "습득"},
          {value: 0, text: "찾기"}
        ]
      }
    },
    components: {
      'public-table': PublicTable
    }
  }
</script>

<style scoped>

</style>
