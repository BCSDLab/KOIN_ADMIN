<template>
  <div class="col-sm-12">

    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0">Room Register</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a>Home</a>
          </li>
          <li class="breadcrumb-item">
            <a>Room</a>
          </li>
          <li class="breadcrumb-item">
            <a>Register</a>
          </li>
        </ol>
      </div>
    </div>

    <room-form
      btnName="원룸 생성"
      @submit="registerRoom"
      :room-data="roomData"></room-form>

  </div>
</template>

<script>
  import RoomForm from './Components/RoomForm';

  export default {
    name: 'RoomRegister',
    components: {
      'room-form': RoomForm
    },
    data() {
      return {
        roomData: {
          "name": null,
          "size": null,
          "room_type": null,
          "latitude": null,
          "longitude": null,
          "phone": null,
          "image_urls": [],
          "address": null,
          "description": null,
          "floor": null,
          "deposit": null,
          "monthly_fee": null,
          "charter_fee": null,
          "management_fee": null,
          "opt_refrigerator": false,
          "opt_closet": false,
          "opt_tv": false,
          "opt_microwave": false,
          "opt_gas_range": false,
          "opt_induction": false,
          "opt_water_purifier": false,
          "opt_air_conditioner": false,
          "opt_washer": false,
          "opt_bed": false,
          "opt_desk": false,
          "opt_shoe_closet": false,
          "opt_electronic_door_locks": false,
          "opt_bidet": false,
          "opt_veranda": false,
          "opt_elevator": false,
        }
      }
    },
    methods: {
      registerRoom: function () {
        if (confirm("정말 등록하시겠습니까??") === true) {
          if (this.roomData.name === null || this.roomData.name === "") {
            alert("방이름은 필수 입력입니다.");
            return;
          }
          for (let key in this.roomData) {
            if (this.roomData[key] === null) {
              delete this.roomData[key];
            }
            if (this.roomData[key] === false) {
              this.roomData[key] = 0;
            }
            if (this.roomData[key] === true) {
              this.roomData[key] = 1;
            }

          }
          if (this.roomData['image_urls'].length === 0) {
            delete this.roomData['image_urls'];
          }
          else {
            this.roomData['image_urls'] = JSON.stringify(this.roomData['image_urls']);
          }

          this.$store.dispatch("registerRoom", {
            token: this.$session.get("token"),
            roomData: this.roomData
          }).then((resolve) => {
            this.$router.go(-1);
          })
        }
        else {
          return
        }
      }
    },
    created() {
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

  .market-table {
    background-color: #fff;
    padding: 20px;
  }

  table {
    width: 100%;
  }

  .state input[type=radio] {
    display: none;
  }

  .state .active {
    font-weight: 700;
    background: #ffa500;
    color: #ffffff;
  }

  .state label {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ffa500;
    color: #ffa500;
  }

  input[type=checkbox] {
    display: none;
  }

  input[type=checkbox] + label {
    display: inline-block;
    cursor: pointer;
    position: relative;
    padding-left: 7%;
  }

  input[type=checkbox] + label:before {
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    bottom: 1px;
    background-color: #ffffff;
    border: 1px solid #d2dae2;
    line-height: 13px;
  }

  input[type=checkbox]:checked + label:before {
    content: "";
    background-image: url("./../../assets/check.png");
    background-size: cover;
  }

  .card table:first-child thead tr th:first-child {
    width: 40%
  }

  .card table:nth-child(2) thead tr th:first-child {
    width: 50%
  }

  table th, table td {
    padding: 1rem 2rem;
  }

  table td {
    border-top: 1px solid #eceeef;
  }

  textarea {
    resize: none;
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
</style>
