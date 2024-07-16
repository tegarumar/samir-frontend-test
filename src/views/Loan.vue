<template>
  <div class="container mx-auto p-4 flex flex-col gap-4">
    <Card>
      <!-- Component LOAN LIST TABLE -->
      <LoanList :loans="allLoans" />
    </Card>

    <Card>
      <!-- Component DATA CHART LOAN BERDASARKAN LOAN MOUNT DAN PURPOSE-->
      <Chart :loans="allLoans" />
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Chart from "@/components/Chart.vue";
import LoanList from "@/components/LoanList.vue";
import Card from "@/components/Card.vue";

export default {
  name: "LoanView",
  components: {
    Chart,
    LoanList,
    Card,
  },
  computed: {
    // Ambil data semua Loans dari Vuex state
    ...mapGetters(["allLoans"]),
  },
  created() {
    // Fetch loans ketika component di load
    this.fetchLoans();
  },
  methods: {
    // Fungsi ambil dara loans, Fungsi disimpan di actions vuex
    ...mapActions(["fetchLoans"]),
  },
};
</script>
