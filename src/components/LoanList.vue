<template>
  <section>
    <div
      class="mb-4 flex flex-col md:flex-row item-start md:items-center gap-4 justify-between"
    >
      <h1 class="text-2xl font-bold">Loan List</h1>
      <div class="flex flex-col items-start md:flex-row md:items-center">
        <!-- FILTER BERDASAR KAN SPESIFIK ATRIBUT -->
        <label for="filter" class="block text-sm font-medium text-gray-700 me-2"
          >Filter:</label
        >
        <select
          v-model="filterBy"
          @change="applyFiltersAndSorting"
          class="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Default</option>
          <option value="amount">Amount</option>
          <option value="interestRate">Interest Rate</option>
          <option value="term">Term</option>
        </select>

        <!-- FILTER TERKECIL/TERBESAR -->
        <label
          for="sortOrder"
          class="block text-sm font-medium text-gray-700 mt-4 md:mt-0 md:ms-6 me-2"
          >Sort:</label
        >
        <select
          v-model="sortOrder"
          @change="applyFiltersAndSorting"
          :disabled="!filterBy"
          class="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
    <div class="overflow-x-auto">
      <Table :data="filteredLoans" />
    </div>
    <Pagination
      v-if="loans.length"
      class="mt-3"
      :current-page="currentPage"
      :total-page="totalPage"
      @navigate="setPage"
    />
  </section>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Table from "@/components/Table.vue";

export default {
  props: {
    loans: {
      type: Array,
      required: true,
    },
  },
  components: {
    Pagination,
    Table,
  },
  data() {
    return {
      filterBy: "",
      sortOrder: "asc",
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    filteredLoans() {
      let loans = [...this.loans];

      // Apply filter berdasarkan filterBy
      //   (Amount, Interest Rate, Term)
      if (this.filterBy) {
        loans = loans.filter((loan) => loan[this.filterBy]);
      }

      // Jika filterBy dan sortOrder terisi, lakukan sorting
      //   (Ascending dan Descending)
      if (this.filterBy) {
        loans.sort((a, b) => {
          const valA = a[this.filterBy];
          const valB = b[this.filterBy];
          if (this.sortOrder === "asc") {
            return valA > valB ? 1 : -1;
          } else {
            return valA < valB ? 1 : -1;
          }
        });
      }

      // Return loans yang sudah difilter dan diurutkan
      return loans.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
    totalPage() {
      // Total Page dari data Loans yang telah dibagi 5 (data per page)
      return Math.ceil(this.loans.length / this.perPage);
    },
  },
  methods: {
    applyFiltersAndSorting() {
      // Reset currentPage ke 1 ketika filter atau sort berubah
      this.currentPage = 1;
    },
    setPage(page) {
      // Jika button pagination diclick, maka currentPage pindah ke nomor urut yang tadi diclick
      this.currentPage = page;
    },
  },
};
</script>
