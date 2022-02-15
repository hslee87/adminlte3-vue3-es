
export default {
  methods: {
    scrollToTarget(id) {
      let elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({
            block: "start",
            behavior: "smooth",
        });
      }
    },
    scroll(id, headerOffset=80) {
      let elem = document.getElementById(id);
      if (elem) {
        const bodyTop = document.body.getBoundingClientRect().top;
        const elementTop = elem.getBoundingClientRect().top;
        const elemPos = elementTop - bodyTop;
        let offset = elemPos - headerOffset;

        window.scrollTo({
          behavior: "smooth",
          top: offset,
        });
      }
    },
  },
};

