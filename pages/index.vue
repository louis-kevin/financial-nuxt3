<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" md="4">
        <TotalToPay class="mb-4" />
<!--        <v-btn fab icon="mdi-refresh" @click="refresh" />-->
        <AddBill />

      </v-col>
      <v-col cols="8">
<!--        <div class="text-center" v-if="pending">-->
<!--          <v-progress-circular indeterminate color="primary" />-->
<!--        </div>-->
<!--        <span v-else-if="error">-->
<!--          {{ error }}-->
<!--        </span>-->
<!--        <div v-else>-->
          <BillListItem v-for="bill in billStore.toPayList" :key="bill.id" :bill="bill" />
          <v-col>
            <v-divider />
          </v-col>
          <BillListItem v-for="bill in billStore.payedList" :key="bill.id" :bill="bill" />
<!--        </div>-->

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useBillStore } from "@/stores/billsStore";

const billStore = useBillStore();

billStore.loadList();
</script>
