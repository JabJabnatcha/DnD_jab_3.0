<script setup lang="ts">
import { useCharacterFlow } from "../composables/useCharacterFlow";

import RaceStep from "../components/RaceStep.vue";
import SubraceStep from "../components/SubRaceStep.vue";
import ClassesStep from "../components/ClassesStep.vue";
import SubclassesStep from "../components/SubClassesStep.vue";
import AlignmentStep from "../components/AlignmentStep.vue";
import StartingLoadoutStep from "../components/StartingLoadoutStep.vue";
import ProfileStep from "../components/ProfileStep.vue"; // ✅ ADD

const flow = useCharacterFlow();
</script>

<template>
  <div class="p-6">

    <!-- RACE -->
    <RaceStep
      v-if="flow.step.value === 'race'"
      :races="flow.raceList.value"
      :selected="flow.selectedRaceKey.value"
      @select="flow.selectRace"
      @next="flow.next"
    />

    <!-- SUBRACE -->
    <SubraceStep
      v-else-if="flow.step.value === 'subrace'"
      :race="flow.selectedRace.value"
      :subraces="flow.subraceList.value"
      :selected="flow.selectedSubraceKey.value"
      @select="flow.selectSubrace"
      @back="flow.back"
      @next="flow.next"
    />

    <!-- CLASS -->
    <ClassesStep
      v-else-if="flow.step.value === 'classes'"
      :classes="flow.classList.value"
      :selected="flow.selectedClassKey.value"
      @select="flow.selectClass"
      @back="flow.back"
      @next="flow.next"
    />

    <!-- SUBCLASS -->
    <SubclassesStep
      v-else-if="flow.step.value === 'subclass'"
      :class="flow.selectedClass.value"
      :subclasses="flow.subClassList.value"
      :selected="flow.selectedSubclassKey.value"
      @select="flow.selectSubclass"
      @back="flow.back"
      @next="flow.next"
    />

    <!-- ALIGNMENT -->
    <AlignmentStep
      v-else-if="flow.step.value === 'alignment'"
      :alignments="flow.alignmentList.value"
      :selected="flow.selectedAlignmentKey.value"
      @select="flow.selectAlignment"
      @back="flow.back"
      @next="flow.next"
    />

    <!-- STARTING LOADOUT -->
    <StartingLoadoutStep
      v-else-if="flow.step.value === 'startitem'"
      :loadouts="flow.startingLoadoutList.value"
      :selected="flow.selectedLoadout.value"
      @select="flow.selectLoadout"
      @back="flow.back"
      @next="flow.next"
    />

    <!-- 🆕 PROFILE STEP -->
    <ProfileStep
      v-else-if="flow.step.value === 'profile'"
      v-model="flow.profile.value"
      @back="flow.back"
      @next="flow.next"
    />

  </div>
</template>