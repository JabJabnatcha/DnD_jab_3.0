<script setup lang="ts">
import OptionCard from "./OptionCard.vue";

defineProps<{
  classes: [string, any][];
  selected: string | null;
}>();

const emit = defineEmits(["select", "next", "back"]);
</script>

<template>
  <div>
    <button @click="$emit('back')" class="mb-4 underline">← Back</button>

    <h1 class="text-3xl mb-4">Select Class</h1>

    <div class="grid grid-cols-2 gap-4">
      <OptionCard
        v-for="[key, cls] in classes"
        :key="key"
        :title="key"
        :description="`${cls.base.PrimaryStat} / d${cls.base.HitDie}`"
        :active="selected === key"
        @click="$emit('select', key)"
      />
    </div>

    <!-- ต้องเลือกก่อน -->
    <button
      v-if="selected"
      @click="$emit('next')"
      class="mt-6 px-4 py-2 bg-black text-white rounded"
    >
      Next
    </button>
  </div>
</template>