<script setup lang="ts">
import { ref, computed } from "vue";

type Step = "race" | "subrace";

type Subrace = {
  id: string;
  name: string;
  description: string;
};

type Race = {
  id: string;
  name: string;
  description: string;
  traits: string[];
  lore: string;
  subraces: Subrace[];
};

const step = ref<Step>("race");
const selectedRace = ref<Race | null>(null);
const selectedSubrace = ref<Subrace | null>(null);

const races: Race[] = [
  {
    id: "human",
    name: "Human",
    description: "ยืดหยุ่น ปรับตัวเก่ง",
    traits: ["+1 ทุก Stat", "Versatile", "Fast Learner"],
    lore: "มนุษย์เป็นเผ่าพันธุ์ที่แพร่หลายที่สุด ปรับตัวได้ในทุกสภาพแวดล้อม",
    subraces: [
      { id: "noble", name: "Noble", description: "มีอำนาจและทรัพยากร" },
      { id: "commoner", name: "Commoner", description: "อยู่รอดเก่ง" },
    ],
  },
  {
    id: "elf",
    name: "Elf",
    description: "ว่องไว ฉลาด มีอายุยืน",
    traits: ["DEX +2", "Darkvision", "Keen Senses"],
    lore: "เผ่าพันธุ์โบราณที่เชื่อมโยงกับธรรมชาติและเวทมนตร์",
    subraces: [
      { id: "high-elf", name: "High Elf", description: "เชี่ยวชาญเวทย์" },
      { id: "wood-elf", name: "Wood Elf", description: "เคลื่อนไหวเร็วในป่า" },
    ],
  },
  {
    id: "dwarf",
    name: "Dwarf",
    description: "ถึก ทน แข็งแกร่ง",
    traits: ["CON +2", "Stonecunning", "Poison Resistance"],
    lore: "นักขุดเหมืองและช่างตีเหล็ก ผู้มีชีวิตใต้ภูเขา",
    subraces: [
      { id: "hill-dwarf", name: "Hill Dwarf", description: "อึดเป็นพิเศษ" },
      { id: "mountain-dwarf", name: "Mountain Dwarf", description: "นักรบเกราะหนัก" },
    ],
  },
];

const subraces = computed(() => selectedRace.value?.subraces ?? []);

function selectRace(race: Race) {
  selectedRace.value = race;
  step.value = "subrace";
}

function selectSubrace(sub: Subrace) {
  selectedSubrace.value = sub;
}

function back() {
  if (step.value === "subrace") step.value = "race";
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

    <!-- STEP: RACE -->
    <transition name="slide" mode="out-in">
      <div v-if="step === 'race'" key="race" class="w-full max-w-3xl">
        <h1 class="text-3xl font-bold mb-6">Select Race</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="race in races"
            :key="race.id"
            class="bg-white p-4 rounded-xl shadow hover:shadow-xl cursor-pointer transition"
            @click="selectRace(race)"
          >
            <h2 class="text-xl font-semibold">{{ race.name }}</h2>
            <p class="text-sm text-gray-600">{{ race.description }}</p>

            <ul class="mt-2 text-sm">
              <li v-for="t in race.traits" :key="t">• {{ t }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- STEP: SUBRACE -->
      <div v-else key="subrace" class="w-full max-w-3xl">
        <button class="mb-4 text-sm underline" @click="back">← Back</button>

        <h1 class="text-3xl font-bold mb-6">
          Select Subrace ({{ selectedRace?.name }})
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="sub in subraces"
            :key="sub.id"
            class="bg-white p-4 rounded-xl shadow hover:shadow-xl cursor-pointer transition"
            @click="selectSubrace(sub)"
          >
            <h2 class="text-xl font-semibold">{{ sub.name }}</h2>
            <p class="text-sm text-gray-600">{{ sub.description }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>