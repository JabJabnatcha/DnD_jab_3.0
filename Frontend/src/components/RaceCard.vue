<script setup lang="ts">
defineProps<{
  name: string;
  data: any;
  active: boolean;
}>();
</script>

<template>
  <div
    class="p-4 rounded-xl border cursor-pointer transition"
    :class="active ? 'border-purple-600 shadow-xl' : 'border-gray-200'"
  >
    <h2 class="text-xl font-bold">{{ name }}</h2>

    <p class="text-sm text-gray-500">
      {{ data.base?.features?.slice(0, 2).join(", ") }}
    </p>
  </div>
</template>