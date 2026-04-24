<script setup lang="ts">
import OptionCard from "./OptionCard.vue";
defineProps<{
  races: [string, any][];
  selected: string | null;
}>();

const emit = defineEmits(["select", "next"]);
</script>

<template>
  <div>
    <h1 class="text-3xl mb-4">Select Race</h1>

    <div class="grid grid-cols-2 gap-4">
      <OptionCard v-for="[key, race] in races" :key="key" :title="key" :description="race.base?.features?.slice(0, 2).join(', ')" :active="selected === key"
        @click="$emit('select', key)" />
    </div>

    <button v-if="selected" @click="$emit('next')" class="mt-6 px-4 py-2 bg-black text-white rounded">
      Next
    </button>
  </div>
</template>