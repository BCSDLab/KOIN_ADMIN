<template>
  <public-table
    data-type="used"
    :service-types="marketOptions"/>
</template>

<script>
  import PublicTable from "../../SharedPart/PublicTable/PublicTable";

  export default {
    name: "Used",
    data() {
      return {
        marketOptions: [
          {value: 0, text: '팝니다'},
          {value: 1, text: '삽니다'}
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
