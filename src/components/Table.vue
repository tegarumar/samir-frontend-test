<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Purpose
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Amount
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Interest Rate
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Term
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Details
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="loan in data" :key="loan.id">
        <td class="px-6 py-4 whitespace-nowrap text-left">
          {{ loan.purpose }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-left">
          {{ loan.amount }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-left">
          {{ loan.interestRate }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-left">
          {{ loan.term }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-left">
          <router-link
            :to="{ name: 'LoanDetail', params: { id: loan.id } }"
            class="text-blue-500 hover:underline"
            >Details</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableView",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
