<script setup lang="ts">
import { useCharacterFlow } from "../composables/useCharacterFlow.ts"; // ✅ แก้ path

import RaceStep from "../components/RaceStep.vue";
import SubraceStep from "../components/SubRaceStep.vue"; // ✅ ให้ตรงชื่อไฟล์

const flow = useCharacterFlow();
</script>

<template>
  <div class="p-6">
    <RaceStep
  v-if="flow.step.value === 'race'"
  :races="flow.raceList.value"
  :selected="flow.selectedRaceKey.value"
  @select="flow.selectRace"
  @next="flow.next"
/>

<SubraceStep
  v-else
  :race="flow.selectedRace.value"
  :subraces="flow.subraceList.value"
  @back="flow.back"
/>
  </div>
</template>