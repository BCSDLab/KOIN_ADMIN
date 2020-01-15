import modalBus from "../components/SharedPart/PublicTable/components/modalBus";

export const defaultModal = {
  props: {
    initialMode: String
  },
  data() {
    return {
      //more: 일시 상세정보, edit: input form을 띄움
      mode: '',
      phoneRegex: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/
    }
  },
  methods: {
    hideModal() {
      modalBus.$emit('modal-hide');
      this.mode = 'more'
    }
  },
  computed: {
    isMoreMode() {
      return this.mode === 'more'
    }
  },
  filters: {
    convertString(value, options) {
      if(value == null)
        return "없음";
      let index = options.findIndex(
        val => {
          return val.value === value
        }
      );
      return options[index].text
    }
  }
};
