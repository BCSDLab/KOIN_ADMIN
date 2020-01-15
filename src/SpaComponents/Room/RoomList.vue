<template>
  <div class="col-sm-12">

    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0">Room</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a>Home</a>
          </li>
          <li class="breadcrumb-item">
            <a>Room</a>
          </li>
          <li class="breadcrumb-item">
            <a>List (전체 옵션보기는 수정하기를 눌러 확인)</a>
          </li>
        </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-create fa-pull-right" @click="createRoom">원룸 생성</a>
      </div>
    </div>


    <div class="card">
      <div class="faq-table">
        <table>
          <thead>
          <tr>
            <th class="id">uid</th>
            <th class="name">이름</th>
            <th class="month">월세</th>
            <th class="charter">전세</th>
            <th class="latitude">위도</th>
            <th class="longitude">경도</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="room in roomList" :key="room.id" @click="">
            <td
              :class="{'no-data': room.id === null }"
              class="id">
              {{ returnNo(room.id) }}
            </td>
            <td
              :class="{'no-data': room.name === null }"
              class="name">
              {{ returnNo(room.name) }}
            </td>
            <td
              :class="{'no-data': room.monthly_fee === null }"
              class="month">
              {{ returnNo(room.monthly_fee) }}
            </td>
            <td
              :class="{'no-data': room.charter_fee === null }"
              class="charter">
              {{ returnNo(room.charter_fee) }}
            </td>
            <td
              :class="{'no-data': room.latitude === null }"
              class="latitude">
              {{ returnNo(room.latitude) }}
            </td>
            <td
              :class="{'no-data': room.longitude === null }"
              class="longitude">
              {{ returnNo(room.longitude) }}
            </td>
            <td>
              <span
                @click="adjustRoom(room.id)"
                class="badge badge-info badge-sm">
                수정하기
              </span>
            </td>
            <td>
              <span
                @click="deleteRoom(room.id)"
                class="badge badge-danger badge-sm">
                삭제하기
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'RoomList',
    data() {
      return {
        faqs: '',
        pageNum: 1,
      }
    },
    computed: {
      ...mapGetters({
        roomList: "roomList",
      }),
    },
    methods: {
      returnNo: function(val) {
        if(val===null){
          return "정보없음"
        }
        return val;
      },
      createRoom: function() {
        this.$router.push("/rooms/register");
      },
      adjustRoom: function(id){
        this.$router.push("/rooms/adjust/" + id);
      },
      deleteRoom: function(id){
        if (confirm("정말 삭제하시겠습니까??") === true){
          this.$store.dispatch("deleteRoom", {
            token: this.$session.get("token"),
            id: id
          })
        }else{
          return;
        }
      },
      getRoomList: function(pageNum) {
        this.$store.dispatch("getRoomList", {
          pageNum: pageNum
        })
      },
      setPage (n) {
        this.pageNum = n;
        this.$session.set('nowPageNum', this.pageNum);
        this.getRoomList(n);
      },
      prev () {
        if(this.pageNum===1){
          alert("첫 페이지 입니다.")
        }
        else {
          this.pageNum = this.pageNum--;
          this.$session.set('nowPageNum', this.pageNum);
          this.getRoomList(n);
        }
      },
      next () {
        if(this.pageNum===this.roomTotalPageNum-1){
          alert("마지막 페이지 입니다.")
        }
        else {
          this.pageNum = this.pageNum++;
          this.$session.set('nowPageNum', this.pageNum);
          this.getRoomList(n);
        }
      },
    },
    created() {
      this.pageNum = this.$session.get('nowPageNum') === undefined || this.$session.get('nowPageNum') === null ? 1 : this.$session.get('nowPageNum');
      this.getRoomList(this.pageNum);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .breadcrumb {
    background: transparent;
    padding-left: 0;
  }

  .card {
    margin-top: 20px;
  }

  .faq-table {
    background-color: #fff;
    padding: 20px;
  }

  .pagination {
    margin: 20px auto;
    justify-content: center;
  }

  .arrow {
    width: 60px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #666666;
    color: #666666;
    cursor: pointer;
    font-size: 13px;
  }

  .num {
    margin: 0 1px;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #666666;
    color: #666666;
    cursor: pointer;
    font-size: 13px;
  }

  .active {
    background-color: #175c8e !important;
    color: #fff !important;
  }

  table {
    width: 100%;
    text-align: center;
  }

  thead tr th:first-child {
    width: 30px;
  }

  thead tr th:nth-child(1n + 2) {
    width: 60px;
  }

  table th, table td {
    padding: 10px 5px;
  }

  table td {
    border-top: 1px solid #eceeef;
  }

  table tbody tr {
    cursor: pointer;
  }

  table tbody tr:hover {
    background: #dbdcdd;
  }

  .btn-create {
    background: #ff7f00;
    color: #fff !important;
    border: 1px solid #ff7f00;
  }

  .btn-create:hover {
    background: transparent;
    color: #ff7f00 !important;
  }
  .no-data {
    color: #ff0000;
  }

</style>
