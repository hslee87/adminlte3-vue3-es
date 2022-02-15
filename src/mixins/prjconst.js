import ProjectConstants from '@/config/constants.js'

export default {
  methods: {
    prjConst(field) {
      if (ProjectConstants && ProjectConstants[`${field}`]) {
              return ProjectConstants[`${field}`];
          }
      return '';
    },
  }
}