<template>
  <section class="w-full h-screen flex items-center justify-center p-4">
    <Card class="text-left">
      <h1 class="text-lg md:text-2xl font-bold mb-2 md:mb-4">Loan Details</h1>
      <div
        v-if="loan"
        class="loan-detail__card border p-4 rounded shadow mb-3 md:mb-6 flex flex-col"
      >
        <!-- LOAN INFORMATION -->
        <section class="loan__information pb-4 border-b-2 border-dashed">
          <h3
            class="loan__information--title text-sm md:text-lg font-semibold mb-2"
          >
            Loan Information
          </h3>
          <p class="loan__information--left-1 text-xs md:text-base">
            <strong>Amount</strong>
          </p>
          <p class="loan__information--right-1 text-xs md:text-base">
            <strong>:</strong> {{ loan.amount }}
          </p>

          <p class="loan__information--left-2 text-xs md:text-base">
            <strong>Interest Rate</strong>
          </p>
          <p class="loan__information--right-2 text-xs md:text-base">
            <strong>:</strong> {{ loan.interestRate }}
          </p>

          <p class="loan__information--left-3 text-xs md:text-base">
            <strong>Term</strong>
          </p>
          <p class="loan__information--right-3 text-xs md:text-base">
            <strong>:</strong> {{ loan.term }}
          </p>

          <p class="loan__information--left-4 text-xs md:text-base">
            <strong>Purpose</strong>
          </p>
          <p class="loan__information--right-4 text-xs md:text-base">
            <strong>:</strong> {{ loan.purpose }}
          </p>

          <p class="loan__information--left-5 text-xs md:text-base">
            <strong>Risk Rating</strong>
          </p>
          <p class="loan__information--right-5 text-xs md:text-base">
            <strong>:</strong> {{ loan.riskRating }}
          </p>
        </section>
        <!-- END LOAN INFORMATION -->

        <!-- BORROWER -->
        <section class="loan__borrower py-4 border-b-2 border-dashed">
          <h3 class="text-sm md:text-lg font-semibold">Borrower Information</h3>
          <ul class="list-disc list-inside">
            <li class="text-xs md:text-base">
              <strong>Name:</strong> {{ loan.borrower.name }}
            </li>
            <li class="text-xs md:text-base">
              <strong>Email:</strong> {{ loan.borrower.email }}
            </li>
            <li class="text-xs md:text-base">
              <strong>Credit Score:</strong> {{ loan.borrower.creditScore }}
            </li>
          </ul>
        </section>
        <!-- END BORROWER -->

        <!-- REPAYMENT SCHEDULE -->
        <section class="loan__repayment-schedule pt-4">
          <h3 class="text-sm md:text-lg font-semibold">Repayment Schedule</h3>
          <ul class="list-disc list-inside">
            <li
              v-for="(installment, index) in loan.repaymentSchedule
                .installments"
              :key="index"
              class="text-xs md:text-base"
            >
              <strong>Due Date:</strong> {{ installment.dueDate }} -
              <strong>Amount Due:</strong> ${{ installment.amountDue }}
            </li>
          </ul>
        </section>
        <!-- END REPAYMENT SCHEDULE -->
      </div>
      <router-link
        to="/"
        class="text-blue-500 hover:underline text-xs md:text-base"
        >Back to Loan List</router-link
      >
    </Card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "LoanDetailView",
  components: {
    Card,
  },
  computed: {
    ...mapGetters(["loanById"]),

    // Ambil data loan berdasarkan id dari parameter route
    loan() {
      return this.loanById(this.$route.params.id);
    },
  },
  created() {
    // CHECK CACHE DATA
    // Jika data loan belum ada di Vuex state, maka fetch data loan
    if (!this.loan) {
      this.fetchLoans();
    }
  },
  methods: {
    ...mapActions(["fetchLoans"]),
  },
};
</script>

<style scoped>
.loan__information {
  display: grid;
  grid-template-areas:
    "title ."
    "left1 right1"
    "left2 right2"
    "left3 right3"
    "left4 right4"
    "left5 right5";
}

.loan__information--title {
  grid-area: title;
}

.loan__information--left-1 {
  grid-area: left1;
}

.loan__information--right-1 {
  grid-area: right1;
}

.loan__information--left-2 {
  grid-area: left2;
}

.loan__information--right-2 {
  grid-area: right2;
}

.loan__information--left-3 {
  grid-area: left3;
}

.loan__information--right-3 {
  grid-area: right3;
}

.loan__information--left-4 {
  grid-area: left4;
}

.loan__information--right-4 {
  grid-area: right4;
}

.loan__information--left-5 {
  grid-area: left5;
}

.loan__information--right-5 {
  grid-area: right5;
}
</style>
