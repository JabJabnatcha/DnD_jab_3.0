<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
  active: boolean;
}>();
</script>

<template>
  <div
    class="p-4 rounded-xl border cursor-pointer transition"
    :class="active ? 'border-purple-600 shadow-xl' : 'border-gray-200'"
  >
    <h2 class="text-xl font-bold">{{ title }}</h2>

    <p v-if="description" class="text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>