<script setup lang="ts">
import OptionCard from "./OptionCard.vue";

defineProps<{
  alignments: [string, any][];
  selected: string | null;
}>();

const emit = defineEmits(["select", "next", "back"]);
</script>

<template>
  <div>
    <button @click="$emit('back')" class="mb-4 underline">← Back</button>

    <h1 class="text-3xl mb-4">Select Alignment</h1>

    <div class="grid grid-cols-3 gap-4">
      <OptionCard
        v-for="[key] in alignments"
        :key="key"
        :title="key"
        :active="selected === key"
        @click="$emit('select', key)"
      />
    </div>

    <button
      :disabled="!selected"
      @click="$emit('next')"
      class="mt-6 px-4 py-2 bg-black text-white rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>