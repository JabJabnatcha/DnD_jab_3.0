<script setup lang="ts">
import OptionCard from "./OptionCard.vue";

defineProps<{
  subclasses: [string, any][];
  selected: string | null;
}>();

const emit = defineEmits(["select", "back", "next"]);
</script>

<template>
  <div>
    <button @click="$emit('back')" class="mb-4 underline">← Back</button>

    <h1 class="text-3xl mb-4">Select Subclass</h1>

    <!-- 🔥 ไม่มี subclass -->
    <div v-if="subclasses.length === 0">
      <p class="mb-4 text-gray-500">
        ยังไม่มี Subclass สำหรับคลาสนี้ กรุณากด Next เพื่อไปต่อ
      </p>

      <button
        @click="$emit('next')"
        class="px-4 py-2 bg-black text-white rounded"
      >
        Next
      </button>
    </div>

    <!-- 🔥 มี subclass -->
    <div v-else>
      <div class="grid grid-cols-2 gap-4">
        <OptionCard
          v-for="[key] in subclasses"
          :key="key"
          :title="key"
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
  </div>
</template>