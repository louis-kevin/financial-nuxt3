<template>
  <div></div>
  <v-row align="center" justify="center">
    <v-btn
        v-if="!show"
        class="ma-5"
        color="primary"
        @click="show = true">
      Adicionar
    </v-btn>
    <v-col v-else cols="12">
      <v-card>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
                v-model="bill.name"
                :rules="nameRules"
                :counter="30"
                label="Bill name"
                required
            />
            <v-text-field
                v-model="bill.amount"
                :rules="amountRules"
                label="Amount"
                required
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn outlined @click="close">Cancelar</v-btn>
          <v-btn @click="save" :loading="loading" color="primary" :disabled="!valid">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { Ref } from "@vue/reactivity";
import { Bill } from "~/types";
import { useBillStore } from "~/stores/billsStore";

type Validation = (v: String) => boolean | String;

const billStore = useBillStore();

const bill: Ref<Bill> = ref({
  name: null,
  amount: null,
});

const valid: Ref<boolean> = ref(false);
const show: Ref<boolean> = ref(false);
const form = ref(null);
const loading = ref(false);
const error = ref(null);

const nameRules: Array<Validation> = [
  v => !!v || 'Name is required',
  v => v.length <= 30 || 'Name must be less than 30 characters',
];
const amountRules: Array<Validation> = [
  v => !!v || 'Amount is required',
  v => !!parseFloat(v.toString()) || 'Amount needs to be a number',
];

const close = () => {
  bill.value = { name: null, amount: null, };
  show.value = false;
  error.value = null;
  loading.value = false;
};

const save = async () => {
  if (!form.value?.validate() || loading.value) return;
  loading.value = true;
  try{
    await billStore.addBill({ ...bill.value });
    close();
  } catch(e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}
</script>

