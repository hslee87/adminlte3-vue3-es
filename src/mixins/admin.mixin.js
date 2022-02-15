
import { storeComputed, storeMethods } from "@/store/store-helper";
// Smart contract implementations
// ----------------------------------------
const log = require('debug')('admin:mixin');

// ----------------------------------------

export default {
  setup() {
  },
  computed: {
    ...storeComputed,
  },
  watch: {
  },
  unmounted() {
  },
  data() {
    return {
      mounted: false,
      permitted: false,
      hasOpRole: false,
    };
  },
  async mounted() {
    let vm = this;
    vm.mounted = true;
  },
  methods: {
    ...storeMethods,
  },
};

