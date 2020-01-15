<template>
  <DataTable
    data-type="used"
    :service-type="serviceType"/>
</template>

<script>
  import DataTable from "../../SharedPart/PublicTable/PublicTable";

  export default {
    name: 'Used',
    data() {
      return {
        serviceType: [
          {value: 1, text: "삽니다"},
          {value: 0, text: "팝니다"}
        ]
      }
    },
    components: {
      DataTable
    }
  }
</script>

<style scoped>

</style>
