<template>
  <div
    class="dashboard row no-gutters justify-content-center overflow-scroll">
    <div class="col-4">
      <simple-card
        :index="0"
        key="2">
        <template #header>
          현재
        </template>
        <template #number>
          준비
        </template>
        <template #footer>
          중입니다.
        </template>
      </simple-card>
      <simple-card
        :index="1"
        key="4">
        <template #header>
          현재
        </template>
        <template #number>
          준비
        </template>
        <template #footer>
          중입니다.
        </template>
      </simple-card>
    </div>
    <list-card
      :table-data="page === 1 ? table : table2"
      v-model="page"
      :total-page="2">
      현재 일어나고 있습니다
    </list-card>
    <graph-card
      :data="graphData"
      :graph-type="'area-spline'">
      <template #title>
        현재 API 구현중입니다.
      </template>
    </graph-card>
    <graph-card
      :data="graphData2"
      :graph-type="'donut'"
      title="준비 중입니다"/>
    <div class="col-4">
      <simple-card
        :index="0"
        key="2">
        <template #header>
          현재
        </template>
        <template #number>
          준비
        </template>
        <template #footer>
          중입니다.
        </template>
      </simple-card>
      <simple-card
        :index="1"
        key="4">
        <template #header>
          현재
        </template>
        <template #number>
          준비
        </template>
        <template #footer>
          중입니다.
        </template>
      </simple-card>
    </div>
  </div>
</template>

<script>
  import DashBoardSimpleCard from "./components/DashBoardSimpleCard";
  import DashBoardListCard from "./components/DashBoardListCard";
  import DashBoardGraphCard from "./components/DashBoardGraphCard";

  export default {
    name: 'Dashboard',
    data () {
      return {
        table: [{ isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }],
        table2: [{ isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdasdfld' },
          { isActive: false, age: 21, first_name: 'Lasdf', last_name: 'asdf' },
          { isActive: false, age: 89, first_name: 'Geasdfa', last_name: 'Wasdfn' },
          { isActive: true, age: 38, first_name: 'Jaasdfai', last_name: 'Casdfney' },
          { isActive: true, age: 38, first_name: 'Jsdf', last_name: 'Carasdfey' }],
        page: 1,
        graphData: {
          columns: [["data1", 30, 200, 100, 400, 150, 250]]
        },
        graphData2: {
          columns: [
            ["data1", 30],
            ["data2", 70]
          ]
        }
      }
    },
    methods: {

    },
    components: {
      'simple-card': DashBoardSimpleCard,
      'list-card': DashBoardListCard,
      'graph-card': DashBoardGraphCard
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dashboard {
    display: flex;
  }
  .overflow-scroll {
    overflow: hidden;
  }
</style>
