<template>
  <section>
    <div
      class="flex flex-col md:flex-row item-start md:items-center justify-between gap-4"
    >
      <h1 class="text-2xl font-bold">Loan Chart</h1>
      <!-- CHART TYPE SELECT -->
      <div
        class="mb-4 flex flex-col items-start md:flex-row md:items-center gap-1"
      >
        <label for="chartType" class="block text-sm font-medium text-gray-700"
          >Chart Type:</label
        >
        <select
          v-model="chartType"
          @change="updateChart"
          class="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
        </select>
      </div>
      <!-- END CHART TYPE SELECT -->
    </div>

    <!-- APEX CHART -->
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <!-- END APEX CHART -->
  </section>
</template>

<script>
import ApexCharts from "apexcharts";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "ChartView",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    loans: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartType: "line",
      chartOptions: {
        chart: {
          id: "loanchart",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [],
    };
  },
  watch: {
    loans: {
      handler() {
        // Ketika data loans didapat atau diperbarui, re-render Data Chart, IMMEDIATE!
        this.prepareChartData();
      },
      immediate: true,
    },
  },
  methods: {
    prepareChartData() {
      const categories = this.loans.map((loan) => loan.purpose);
      const data = this.loans.map((loan) => loan.amount);

      this.chartOptions.xaxis.categories = categories;
      this.series = [
        {
          name: "Loan Amount",
          data: data,
        },
      ];
    },
    updateChart() {
      // Update Chart type
      this.chartOptions.chart.type = this.chartType;

      // Perbarui/Re-Render Chart
      //                ID CHART    Methods Apex    New Chart Options
      ApexCharts.exec("loanchart", "updateOptions", this.chartOptions);
    },
  },
};
</script>
