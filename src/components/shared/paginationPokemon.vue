<template>
  <nav class="flex flex-col items-center p-5">
    <ul class="flex items-center gap-xs">
      <li>
        <button @click="firstPage" aria-label="First"
          :class="[firstButtonClass, 'w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-blue-900 hover:text-white transition-all text-on-surface-variant cursor-pointer']">
          <span class="material-symbols-outlined">first_page</span>
        </button>
      </li>
      <li>
        <button @click="prevPage" aria-label="Previous"
          :class="[prevButtonClass, 'w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-blue-900 hover:text-white transition-all text-on-surface-variant cursor-pointer']">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
      </li>
      <li v-for="itemPages in pages" :key="itemPages">
        <button @click="selectPage(itemPages)" 
          :class="['page-link numberPage w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-blue-900 hover:text-white transition-all font-label-bold cursor-pointer', { colorSelectFocus: itemPages === (actualPage + 1) }]">
          {{ itemPages }}
        </button>
      </li>
      <li>
        <button @click="nextPage" aria-label="Next" 
          :class="[nextButtonClass, 'w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-blue-900 hover:text-white transition-all text-on-surface-variant cursor-pointer']">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </li>
      <li>
        <button @click="lastPage" aria-label="Last" 
          :class="[lastButtonClass, 'w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-blue-900 hover:text-white transition-all text-on-surface-variant cursor-pointer']">
          <span class="material-symbols-outlined">last_page</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginationPokemon",
  props: {
    PokemonCount: {
      type: Number,
      required: true
    },
    Limit: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pages: [1, 2, 3, 4, 5],
      actualPage: 0,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.PokemonCount / this.Limit);
    },
    isFirstPage() {
      return this.actualPage === 0;
    },
    isLastPage() {
      return this.actualPage >= this.totalPage - 1;
    },
    prevButtonClass() {
      return this.isFirstPage ? "page-item disabled" : "page-item";
    },
    nextButtonClass() {
      return this.isLastPage ? "page-item disabled" : "page-item";
    },
    firstButtonClass() {
      return this.prevButtonClass;
    },
    lastButtonClass() {
      return this.nextButtonClass;
    },
  },
  methods: {
    generatePageWindow(startPage) {
      const windowSize = 5;
      const maxPages = Math.min(windowSize, this.totalPage);
      const start = Math.max(1, Math.min(startPage, this.totalPage - maxPages + 1));
      return Array.from({ length: maxPages }, (_, i) => start + i);
    },
    navigateTo(pageIndex) {
      this.actualPage = pageIndex;
      this.ensurePageInWindow();
      const event = pageIndex === 0 ? "goHome" : "goToPage";
      this.$emit(event, pageIndex);
    },
    firstPage() {
      this.navigateTo(0);
    },
    prevPage() {
      if (this.actualPage > 0) {
        this.navigateTo(this.actualPage - 1);
      } else {
        this.$emit("goHome", 0);
      }
    },
    nextPage() {
      if (this.actualPage < this.totalPage - 1) {
        this.navigateTo(this.actualPage + 1);
      }
    },
    lastPage() {
      this.navigateTo(this.totalPage - 1);
    },
    selectPage(pageNumber) {
      const pageIndex = Number(pageNumber) - 1;
      this.navigateTo(pageIndex);
    },
    ensurePageInWindow() {
      const pageNum = this.actualPage + 1;
      const threshold = 3;
      const tailThreshold = this.totalPage - 2;
      // If near the start
      if (pageNum <= threshold) {
        this.pages = this.generatePageWindow(1);
      }
      // If near the end
      else if (pageNum >= tailThreshold) {
        this.pages = this.generatePageWindow(this.totalPage - 4);
      }
      // Otherwise, center the selected page in the window
      else {
        this.pages = this.generatePageWindow(pageNum - 2);
      }
    },
  },
};
</script>

<style scoped>
.colorSelectFocus {
  background-color: blue;
  color: white;
}
</style>