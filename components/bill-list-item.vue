<template>
  <v-list-item class="accent mb-3" lines="two">
    <v-row align="center">
      <v-col cols="1" sm="1">
        <v-checkbox :model-value="bill.done" @click="toggle" color="primary" hide-details />
      </v-col>
      <v-col cols="11">
        <v-row justify="space-between" class="pl-3 pl-lg-0">
          <v-col>{{ bill.name }}</v-col>
          <v-col cols="1">{{ bill.amount }}</v-col>
        </v-row>
        <v-row align="end" class="pl-3 pl-lg-0">
          <v-col>{{ bill.createdAt }}</v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-list-item>


</template>

<script lang="ts" setup>
import { Bill } from "@/types";
import { useBillStore } from "@/stores/billsStore";

interface Props {
  bill: Required<Bill>;
}

const props = defineProps<Props>()
const billStore = useBillStore();

const toggle = () => {
  billStore.toggleBill(props.bill)
}

</script>
