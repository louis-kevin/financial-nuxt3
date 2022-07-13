<template>
  <v-card>
    <v-card-title class="justify-space-between">
      <span>Total a Pagar</span>
      <span> R$ {{ billStore.totalToPay }}</span>
    </v-card-title>
  </v-card>
</template>

<script lang="ts" setup>
import { useBillStore } from '~/stores/billsStore'

const billStore = useBillStore()
</script>
