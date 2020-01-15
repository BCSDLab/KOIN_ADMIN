<template>
  <div>
    <public-table
      v-if="services"
      data-type="board"
      :service-type="services"/>
    <b-button
      variant="outline-secondary"
      @click="popBoardsDetail('more', $event.target)">
      게시판 정보
    </b-button>
    <b-button
      variant="outline-info"
      @click="popBoardsDetail('create', $event.target)">
      새 게시판
    </b-button>
    <boards-detail
      :initial-mode="mode"/>
  </div>
</template>

<script>
  import  { mapGetters, mapActions } from 'vuex'
  import PublicTable from "../../SharedPart/PublicTable/PublicTable";
  import BoardsDetail from "../../SharedPart/PublicTable/components/BoardsDetail";

  export default {
    name: "Board",
    data() {
      return {
        mode: 'more'
      }
    },
    methods: {
      ...mapActions({
        setParentBoardOptions: 'board/setParentBoardOptions'
      }),
      async popBoardsDetail(mode, button) {
        this.mode = mode;
        this.$nextTick().then(
          () => {
            this.$root.$emit('bv::show::modal', 'boards-modal', button);
          }
        )
      }
    },
    computed: {
      ...mapGetters({
        services: 'board/getParentBoardOptions'
      })
    },
    watch: {
      '$route.path'(value) {
        this.setParentBoardOptions(Number(value.split('/')[2]));
      }
    },
    components: {
      'public-table': PublicTable,
      'boards-detail': BoardsDetail
    },
    created() {
      this.setParentBoardOptions(Number(this.$route.path.split('/')[2]));
    }
  }
</script>

<style scoped>

</style>
