import modalBus from "../components/SharedPart/PublicTable/components/modalBus";

export const defaultModal = {
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
      )
      return options[index].text
    }
  }
};
