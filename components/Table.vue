<template>
  <table class="table-auto w-full text-start mt-10 p-3 mb-40">
    <thead class="bg-orange-700 text-white">
      <tr>
        <th class="text-start p-4" v-for="column in columns" :key="column.id">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-slate-300" v-for="item in data" :key="item.id">
        <td class="p-4 border-b-1" v-for="column in columns" :key="column.id">
          {{ item[column.field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Classes } from "~~/store/class";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";

export default defineComponent({
  props: {
    columns: [],
    data: [],
  },
  setup() {},
});
</script>
