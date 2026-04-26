import { ref, computed } from "vue";
import RACES from "../mockup/race.json";
import CLASSES from "../mockup/classes.json";
import ALIGNMENTS from "../mockup/alignments.json";
import ITEMS from "../mockup/items.json";

type Step =
  | "race"
  | "subrace"
  | "classes"
  | "subclass"
  | "alignment"
  | "startitem";

export function useCharacterFlow() {
  const step = ref<Step>("race");

  // ===== STATE =====
  const selectedRaceKey = ref<string | null>(null);
  const selectedSubraceKey = ref<string | null>(null);
  const selectedClassKey = ref<string | null>(null);
  const selectedSubclassKey = ref<string | null>(null);
  const selectedAlignmentKey = ref<string | null>(null);

  // 🔥 NEW
  const selectedLoadoutKey = ref<string | null>(null);

  // ===== DATA =====
  const raceData = RACES as Record<string, any>;
  const classData = CLASSES as Record<string, any>;
  const alignmentData = ALIGNMENTS as string[];
  const itemData = ITEMS as Record<string, any>;

  // ===== LIST =====
  const raceList = computed(() => Object.entries(raceData));
  const classList = computed(() => Object.entries(classData));

  const alignmentList = computed<[string, any][]>(() =>
    alignmentData.map((name) => [name, {}])
  );

  // ===== SELECTED =====
  const selectedRace = computed(() =>
    selectedRaceKey.value ? raceData[selectedRaceKey.value] : null
  );

  const selectedClass = computed(() =>
    selectedClassKey.value ? classData[selectedClassKey.value] : null
  );

  const selectedAlignment = computed(() => selectedAlignmentKey.value);

  // ===== SUB LIST =====
  const subraceList = computed(() => {
    if (!selectedRace.value) return [];

    const sub = selectedRace.value.subRaces;

    if (
      !sub ||
      (Array.isArray(sub) && sub.length === 0) ||
      (!Array.isArray(sub) && Object.keys(sub).length === 0)
    ) {
      return [];
    }

    return Array.isArray(sub) ? [] : Object.entries(sub);
  });

  const subClassList = computed<[string, any][]>(() => {
    if (!selectedClass.value) return [];

    const sub = selectedClass.value.subClasses;

    if (
      !sub ||
      (Array.isArray(sub) && sub.length === 0) ||
      (!Array.isArray(sub) && Object.keys(sub).length === 0)
    ) {
      return [];
    }

    if (Array.isArray(sub)) {
      return sub.map((name: string) => [name, {}]);
    }

    return Object.entries(sub) as [string, any][];
  });

  // ===== 🔥 STARTING LOADOUT =====
  const startingLoadoutList = computed<[string, any][]>(() => {
    if (!selectedClass.value) return [];

    const loadout = selectedClass.value.base?.startingLoadout;

    if (!loadout) return [];

    return Object.entries(loadout).map(([key, itemIds]) => [
      key,
      {
        items: itemIds.map((id: string) => itemData[id] || { id }),
      },
    ]);
  });

  // ===== SELECT FUNCTIONS =====
  function selectRace(key: string) {
    selectedRaceKey.value = key;
    selectedSubraceKey.value = null;
  }

  function selectSubrace(key: string) {
    selectedSubraceKey.value = key;
  }

  function selectClass(key: string) {
    selectedClassKey.value = key;
    selectedSubclassKey.value = null;
    selectedLoadoutKey.value = null; // reset
  }

  function selectSubclass(key: string) {
    selectedSubclassKey.value = key;
  }

  function selectAlignment(key: string) {
    selectedAlignmentKey.value = key;
  }

  function selectLoadout(key: string) {
    selectedLoadoutKey.value = key;
  }

  // ===== NEXT =====
  function next() {
    if (step.value === "race") {
      if (!selectedRace.value) return;
      step.value = "subrace";
      return;
    }

    if (step.value === "subrace") {
      if (subraceList.value.length > 0 && !selectedSubraceKey.value) return;
      step.value = "classes";
      return;
    }

    if (step.value === "classes") {
      if (!selectedClass.value) return;
      step.value = "subclass";
      return;
    }

    if (step.value === "subclass") {
      if (subClassList.value.length > 0 && !selectedSubclassKey.value) return;
      step.value = "alignment";
      return;
    }

    if (step.value === "alignment") {
      if (!selectedAlignment.value) return;
      step.value = "startitem"; // 🔥 ไป step ใหม่
      return;
    }

    if (step.value === "startitem") {
      if (startingLoadoutList.value.length > 0 && !selectedLoadoutKey.value) {
        return;
      }

      // 🔥 future: summary
      return;
    }
  }

  // ===== BACK =====
  function back() {
    if (step.value === "subrace") {
      step.value = "race";
      return;
    }

    if (step.value === "classes") {
      step.value = "subrace";
      return;
    }

    if (step.value === "subclass") {
      step.value = "classes";
      return;
    }

    if (step.value === "alignment") {
      step.value = "subclass";
      return;
    }

    if (step.value === "startitem") {
      step.value = "alignment";
      return;
    }
  }

  return {
    step,

    raceList,
    selectedRaceKey,
    selectedSubraceKey,
    selectedRace,
    subraceList,

    classList,
    selectedClassKey,
    selectedSubclassKey,
    selectedClass,
    subClassList,

    alignmentList,
    selectedAlignmentKey,
    selectedAlignment,

    startingLoadoutList,
    selectedLoadoutKey,

    selectRace,
    selectSubrace,
    selectClass,
    selectSubclass,
    selectAlignment,
    selectLoadout,

    next,
    back,
  };
}