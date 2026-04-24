import { ref, computed } from "vue";
import RACES from "../mockup/race.json";
import CLASSES from "../mockup/classes.json";
import ALIGNMENTS from "../mockup/alignments.json";

type Step = "race" | "subrace" | "classes" | "subclass" | "alignment";

export function useCharacterFlow() {
  const step = ref<Step>("race");

  // ===== STATE =====
  const selectedRaceKey = ref<string | null>(null);
  const selectedSubraceKey = ref<string | null>(null);
  const selectedClassKey = ref<string | null>(null);
  const selectedSubclassKey = ref<string | null>(null);
  const selectedAlignmentKey = ref<string | null>(null); // ✅ เพิ่ม

  // ===== DATA =====
  const raceData = RACES as Record<string, any>;
  const classData = CLASSES as Record<string, any>;
  const alignmentData = ALIGNMENTS as string[];

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

  const selectedAlignment = computed(() => selectedAlignmentKey.value); // ✅ fix

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
  }

  function selectSubclass(key: string) {
    selectedSubclassKey.value = key;
  }

  function selectAlignment(key: string) {
    selectedAlignmentKey.value = key;
  }

  // ===== NEXT =====
  function next() {
    // RACE → SUBRACE
    if (step.value === "race") {
      if (!selectedRace.value) return;
      step.value = "subrace";
      return;
    }

    // SUBRACE → CLASSES
    if (step.value === "subrace") {
      if (subraceList.value.length > 0 && !selectedSubraceKey.value) return;
      step.value = "classes";
      return;
    }

    // CLASSES → SUBCLASS
    if (step.value === "classes") {
      if (!selectedClass.value) return;
      step.value = "subclass";
      return;
    }

    // SUBCLASS → ALIGNMENT
    if (step.value === "subclass") {
      if (subClassList.value.length > 0 && !selectedSubclassKey.value) return;
      step.value = "alignment"; // ✅ fix สำคัญ
      return;
    }

    // ALIGNMENT → END
    if (step.value === "alignment") {
      if (!selectedAlignment.value) return;
      return; // ยังไม่มี summary
    }
  }

  // ===== BACK =====
  function back() {
    if (step.value === "subrace") {
      step.value = "race";
      return;
    }

    if (step.value === "classes") {
      step.value = "subrace"; // ✅ กลับเสมอ
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
  }

  // ===== RETURN =====
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

    selectRace,
    selectSubrace,
    selectClass,
    selectSubclass,
    selectAlignment,

    next,
    back,
  };
}