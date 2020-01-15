<template>
  <div class="card">
    <div class="market-table">
      <table>
        <thead>
        <tr>
          <th>방이름</th>
          <th>방 종류</th>
          <th>관리비</th>
          <th>방 크기</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <!--디스플레잉 네임-->
          <td>
            <input
              class="form-control"
              type="text"
              v-model="roomData.name">
          </td>

          <!-- 방 종류 -->
          <td class="state">
            <input
              class="form-control"
              type="text"
              v-model="roomData.room_type">
          </td>

          <!-- 고유링크 -->
          <td class="state">
            <input
              class="form-control"
              type="text"
              v-model="roomData.management_fee">
          </td>

          <!-- 방 크기 -->
          <td class="state">
            <input
              class="form-control"
              type="number"
              v-model="roomData.size">
          </td>

        </tr>
        </tbody>
      </table>


      <table>
        <thead>
        <tr>
          <th class="monthly">월세 ex: 250(6개월)</th>
          <th>전세</th>
          <th class="">위도</th>
          <th class="">경도</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <!--월세-->
          <td>
            <input
              class="form-control monthly"
              type="text"
              v-model="roomData.monthly_fee">
          </td>

          <!-- 전세 -->
          <td class="state">
            <input
              class="form-control"
              type="number"
              v-model="roomData.charter_fee">
          </td>
          <!-- 위도 -->
          <td class="state">
            <input
              class="form-control "
              type="number"
              v-model="roomData.latitude">
          </td>
          <!-- 경도 -->
          <td class="state">
            <input
              class="form-control "
              type="number"
              v-model="roomData.longitude">
          </td>
        </tr>
        </tbody>
      </table>


      <table>
        <thead>
        <tr>
          <th>보증금</th>
          <th>층수</th>
          <th>전화번호</th>
          <th>주소</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <!--보증금-->
          <td>
            <input
              class="form-control"
              type="number"
              v-model="roomData.deposit">
          </td>
          <!--층수-->
          <td>
            <input
              class="form-control"
              type="number"
              v-model="roomData.floor">
          </td>
          <!--전화번호-->
          <td>
            <input
              class="form-control"
              type="text"
              v-model="roomData.phone">
          </td>

          <!-- 주소 -->
          <td class="state">
            <input
              class="form-control"
              type="text"
              v-model="roomData.address">
          </td>
        </tr>
        </tbody>
      </table>


      <table>
        <thead>
        <tr>
          <th>설명</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <textarea class="form-control" cols="30" rows="10" v-model="roomData.description">
            </textarea>
          </td>
        </tr>
        </tbody>
      </table>

      <table>
        <thead>
        <tr>
          <th>옵션</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            냉장고
            <input
              class="option"
              v-model="roomData.opt_refrigerator"
              type="checkbox">
            <span
              v-if="roomData.opt_refrigerator">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            옷장
            <input
              class="option"
              v-model="roomData.opt_closet"
              type="checkbox">
            <span
              v-if="roomData.opt_closet">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            tv
            <input
            class="option"
            v-model="roomData.opt_tv"
            type="checkbox">
            <span
              v-if="roomData.opt_tv">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            전자레인지
            <input
            class="option"
            v-model="roomData.opt_microwave"
            type="checkbox">
            <span
              v-if="roomData.opt_microwave">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            가스레인지
            <input
              class="option"
              v-model="roomData.opt_gas_range"
              type="checkbox">
            <span
              v-if="roomData.opt_gas_range">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            인덕션
            <input
              class="option"
              v-model="roomData.opt_induction"
              type="checkbox">
            <span
              v-if="roomData.opt_induction">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
        </tr>
        <tr>
          <td>
            정수기
            <input
              class="option"
              v-model="roomData.opt_water_purifier"
              type="checkbox">
            <span
              v-if="roomData.opt_water_purifier">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            에어컨
            <input
              class="option"
              v-model="roomData.opt_air_conditioner"
              type="checkbox">
            <span
              v-if="roomData.opt_air_conditioner">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            세탁기
            <input
              class="option"
              v-model="roomData.opt_washer"
              type="checkbox">
            <span
              v-if="roomData.opt_washer">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            침대
            <input
              class="option"
              v-model="roomData.opt_bed"
              type="checkbox">
            <span
              v-if="roomData.opt_bed">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            책상
            <input
              class="option"
              v-model="roomData.opt_desk"
              type="checkbox">
            <span
              v-if="roomData.opt_desk">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            신발장
            <input
              class="option"
              v-model="roomData.opt_shoe_closet"
              type="checkbox">
            <span
              v-if="roomData.opt_shoe_closet">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
        </tr>

        <tr>
          <td>
            도어락
            <input
              class="option"
              v-model="roomData.opt_electronic_door_locks"
              type="checkbox">
            <span
              v-if="roomData.opt_electronic_door_locks">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            비데
            <input
              class="option"
              v-model="roomData.opt_bidet"
              type="checkbox">
            <span
              v-if="roomData.opt_bidet">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            베란다
            <input
              class="option"
              v-model="roomData.opt_veranda"
              type="checkbox">
            <span
              v-if="roomData.opt_veranda">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>
            엘베
            <input
              class="option"
              v-model="roomData.opt_elevator"
              type="checkbox">
            <span
              v-if="roomData.opt_elevator">
              있음
            </span>
            <span
              class="text-red"
              v-else>
              없음
            </span>
          </td>
          <td>

          </td>
          <td>

          </td>
        </tr>
        </tbody>
      </table>

      <table>
        <thead>
        <tr>
          <th>방사진</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <input
              accept="image/*"
              enctype='multipart/form-data'
              type="file"
              @change="roomImageUpload($event.target.name, $event.target.files)">
            <div
              v-for="(image, index) in roomData.image_urls">
              {{ image }}
              <button
                @click="removeImage(index)"
                class="badge badge-sm badge-danger">
                삭제
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div>
        <button
          @click="submit()"
          class="btn btn-primary btn-block">{{ btnName }}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../../../api/api';

  export default {
    name: 'RoomForm',
    props: {
      roomData: null,
      btnName: String
    },
    data() {
      return {
        thumbnail: [],
      }
    },
    methods: {
      removeImage: function (index) {
        this.roomData.image_urls.splice(index, 1);
      },
      roomImageUpload(name, file) {
        let formData = new FormData();
        formData.append('image[]', file[0]);
        api.uploadImage(this.$session.get('token'), formData).then(res => {
          console.log(res.data);
          this.roomData.image_urls.push(res.data.url[0]);
        }, error => {
          alert('이미지의 크기가 너무 큽니다.');
          return;
        })
      },
      submit: function() {
        this.$emit('submit');
      }
    },
    created() {
    }
  }
</script>

<style scoped>
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

  .option {
    margin-left: 10px;
  }

  .text-red {
    color: #cc0000
  }

  td span {
    color: #0000cc;
  }

  .position {
    width: 250px;
  }

  .monthly {

  }
</style>
