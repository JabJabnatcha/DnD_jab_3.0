<script setup lang="ts">
defineProps<{
  race: any;
  subraces: [string, any][];
}>();

const emit = defineEmits(["back"]);
</script>

<template>
  <div>
    <button @click="$emit('back')" class="mb-4 underline">
      ← Back
    </button>

    <h1 class="text-3xl mb-4">Select Subrace</h1>

    <div v-if="subraces.length === 0">
      <p>No subrace</p>
    </div>

    <div v-else class="grid grid-cols-2 gap-4">
      <div
        v-for="[key, sub] in subraces"
        :key="key"
        class="p-4 bg-white rounded shadow"
      >
        <h2 class="font-semibold">{{ key }}</h2>
        <p class="text-sm text-gray-500">
          {{ sub.features?.join(", ") }}
        </p>
      </div>
    </div>
  </div>
</template>