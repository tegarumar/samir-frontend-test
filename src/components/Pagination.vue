<template>
  <div class="grid grid-cols-[1fr_auto] text-[black] text-left text-xs;">
    <p class="col-[1] text-[black] text-xs md:text-base">
      {{ currentPage }} of {{ totalPage }} entries
    </p>

    <button
      class="col-[2] text-xs text-[black] mr-1.5 border-[none];"
      @click="handleNavigatePrevious"
      :disabled="currentPage == 1"
    >
      Prev
    </button>

    <div
      class="page-container col-[3] max-w-[40vw] flex items-center gap-1 overflow-auto px-1 py-0"
    >
      <button
        v-for="page in totalPage"
        :key="page"
        :class="{
          selected: currentPage == page,
        }"
        class="h-5 w-5 text-center text-[black] text-xs rounded-sm"
        @click="handleNavigateTo(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="col-[4] text-xs text-[black] mr-1.5 border-[none];"
      @click="handleNavigateNext"
      :disabled="currentPage == totalPage"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationView",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    handleNavigatePrevious() {
      // NAvigasi ke halaman table sebelumnya
      const next = this.currentPage - 1;
      if (next > 0) {
        this.$emit("navigate", next);
      }
    },
    handleNavigateTo(page) {
      // Navigasi ke halaman table yang dipilih
      this.$emit("navigate", page);
    },
    handleNavigateNext() {
      // Navigasi ke halaman table selanjutnya
      const next = this.currentPage + 1;
      if (next <= this.totalPage) {
        this.$emit("navigate", next);
      }
    },
  },
};
</script>

<style scoped>
.page-container::-webkit-scrollbar {
  display: none;
}

.selected {
  background: #6d75f6;
  color: white !important;
}
</style>
