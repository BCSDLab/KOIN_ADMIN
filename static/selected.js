export default {
  user : {
    field: ['id', 'name', 'nickname', 'major', 'condition'],
    editableData: ['portal_account', 'password', 'name', 'nickname', 'student_number',
      'major', 'identity', 'is_graduated', 'phone_number', 'gender', 'is_authed'],
    child: 'permission'
  },
  shop : {
    field: ['id', 'name', 'phone', 'opening_time','condition'],
    editableData: ['name', 'category', 'phone', 'open_time', 'close_time',
       'address', 'description', 'delivery', 'delivery_price',
      'pay_card', 'pay_bank', 'is_event', 'remarks', 'is_deleted'],
    child: 'menu'
  },
  menu: {
    editableData: ['name', 'price_type']
  },
  boards: {
    editableData: ['name', 'is_anonymous', 'is_notice', 'seq', 'tag',
      'is_deleted', 'parent_id']
  },
  board : {
    field: ['id', 'nickname', 'title'],
    editableData: ['board_id', 'title', 'content', 'is_solved', 'is_deleted'],
    child: 'comments'
  },
  comments: {
    editableData: ['content', 'is_deleted']
  },
  anonymous : {
    field: ['id', 'nickname', 'title'],
    editableData: ['title', 'content', 'nickname', 'password'],
    child: 'anonymousComments'
  },
  anonymousComments: {
    editableData: ['content', 'nickname']
  },
  circle: {
    field: ['id', 'name', 'category', 'location', 'professor', 'condition'],
    editableData: ['name', 'category', 'line_description', 'logo_url', 'description',
      'background_img_url', 'professor', 'location', 'major_business',
      'introduce_url', 'is_deleted']
  },
  used: {
    field: ['id', 'nickname', 'title', 'price', 'condition'],
    editableData: ['title', 'content', 'type', 'state', 'price', 'phone',
      'is_phone_open', 'thumbnail', 'is_deleted'],
    child: 'comments'
  },
  lost: {
    field: ['id', 'nickname', 'title', 'location', 'condition'],
    editableData: ['type', 'title', 'location', 'date', 'content', 'state', 'phone',
      'is_phone_open', 'thumbnail', 'is_deleted'],
    child: 'comments'
  },
  callvan: {
    field: ['id', 'name', 'condition'],
    editableData: ['name', 'phone', 'pay_card', 'pay_bank', 'is_deleted']
  },
  faq: {
    field: ["id", "question", "condition"],
    editableData: ["question", "answer", "circle_id", "is_deleted"]
  },
  land: {
    field: ["id", "name", "monthly_fee", "charter_fee", "location"],
    editableData: [ "name", "size", "room_type", "floor", "latitude", "longitude",
      "phone", "image_urls", "address", "description", "deposit", "monthly_fee",
      "charter_fee", "management_fee", "opt_refrigerator", "opt_closet",
      "opt_tv", "opt_microwave", "opt_gas_range", "opt_induction", "opt_water_purifier",
      "opt_air_conditioner", "opt_washer", "opt_bed", "opt_desk", "opt_shoe_closet",
      "opt_electronic_door_locks", "opt_bidet", "opt_veranda", "opt_elevator"],

    furnitureList: [{value: "refrigerator", text: "냉장고"},
      {value: "closet", text: "옷장"}, {value: "tv", text: "TV"},
      {value: "microwave", text: "전자렌지"}, {value: "gas_range", text: "가스렌지"},
      {value: "induction", text: "인덕션"}, {value: "water_purifier", text: "정수기"},
      {value: "air_conditioner", text: "공기청정기"}, {value: "washer", text: "세탁기"},
      {value: "bed", text: "침대"}, {value: "desk", text: "책상"},
      {value: "shoe_closet", text: "신발장"}, {value: "electronic_door_locks", text: "신발장"},
      {value: "bidet", text: "비데"}, {value: "veranda", text: "베란다"},
      {value: "elevator", text: "엘레베이터"}]
  },
  version: {
    field: ['id', 'version', 'type', 'updated_at'],
    editableData: ['version']
  },
  permission: {
    editableData: ['grant_callvan', 'grant_user', 'grant_shop',
      'grant_community', 'grant_version', 'grant_bcsdlab', 'grant_circle',
      'grant_land', 'grant_lost', 'grant_survey', 'grant_market',
      'is_deleted']
  }
}
