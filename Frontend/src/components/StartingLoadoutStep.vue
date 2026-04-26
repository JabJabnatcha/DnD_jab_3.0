<script setup lang="ts">
import OptionCard from "./OptionCard.vue";

const props = defineProps<{
  loadouts: [string, any][];
  selected: Record<string, string>;
}>();

const emit = defineEmits(["select", "next", "back"]);
</script>

<template>
  <div>
    <button @click="$emit('back')" class="mb-4 underline">← Back</button>

    <h1 class="text-3xl mb-6">Select Starting Loadout</h1>

    <div v-for="[groupKey, group] in loadouts" :key="groupKey" class="mb-6">
      <h2 class="text-xl font-bold mb-2">
        Choice {{ groupKey }} (choose {{ group.choose }})
      </h2>

      <div class="grid grid-cols-2 gap-4">
        <OptionCard
          v-for="opt in group.options"
          :key="opt.itemId"
          :title="opt.item.name"
          :description="`x${opt.qty}`"
          :active="selected[groupKey] === opt.itemId"
          @click="$emit('select', groupKey, opt.itemId)"
        />
      </div>
    </div>

    <button
      @click="$emit('next')"
      class="mt-6 px-4 py-2 bg-black text-white rounded"
    >
      Next
    </button>
  </div>
</template>