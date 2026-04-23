import { ref, computed } from "vue";
import RACES from "../mockup/race.json";

export function useCharacterFlow() {
  const step = ref<"race" | "subrace">("race");

  const selectedRaceKey = ref<string | null>(null);
  const selectedSubraceKey = ref<string | null>(null);

  // 🔧 แก้: cast type เพื่อให้ TS เข้าใจ
  const raceData = RACES as Record<string, any>;

  const raceList = computed(() => Object.entries(raceData));

  const selectedRace = computed(() =>
    selectedRaceKey.value ? raceData[selectedRaceKey.value] : null
  );

  const subraceList = computed(() => {
    if (!selectedRace.value) return [];

    const sub = selectedRace.value.subRaces;

    // 🔧 แก้: handle array vs object
    if (!sub || Array.isArray(sub)) return [];

    return Object.entries(sub);
  });

  function selectRace(key: string) {
    selectedRaceKey.value = key;
    selectedSubraceKey.value = null;
  }

  function next() {
    if (step.value === "race") step.value = "subrace";
  }

  function back() {
    if (step.value === "subrace") step.value = "race";
  }

  return {
    step,
    raceList,
    selectedRaceKey,
    selectedSubraceKey,
    selectedRace,
    subraceList,
    selectRace,
    next,
    back,
  };
}