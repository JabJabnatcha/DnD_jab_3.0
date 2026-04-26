import { ref, computed } from "vue";

import RACES from "../mockup/race.json";
import CLASSES from "../mockup/classes.json";
import ALIGNMENTS from "../mockup/alignments.json";
import ITEMS from "../mockup/items.json";

import { useCharacterNavigation } from "./character/useCharacterNevigation";

type Step =
  | "race"
  | "subrace"
  | "classes"
  | "subclass"
  | "startitem"
  | "alignment";

export function useCharacterFlow() {
  const step = ref<Step>("race");

  // ===== STATE =====
  const selectedRaceKey = ref<string | null>(null);
  const selectedSubraceKey = ref<string | null>(null);
  const selectedClassKey = ref<string | null>(null);
  const selectedSubclassKey = ref<string | null>(null);
  const selectedAlignmentKey = ref<string | null>(null);

  const selectedLoadout = ref<Record<string, string>>({});

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
    if (!sub) return [];
    return Array.isArray(sub) ? [] : Object.entries(sub);
  });

  const subClassList = computed<[string, any][]>(() => {
    if (!selectedClass.value) return [];
    const sub = selectedClass.value.subClasses;
    if (!sub) return [];

    return Array.isArray(sub)
      ? sub.map((name: string) => [name, {}])
      : Object.entries(sub);
  });

  // ===== ✅ STARTING LOADOUT (FIXED) =====
  const startingLoadoutList = computed<[string, any][]>(() => {
    console.log("===== LOADOUT DEBUG =====");
    console.log("selectedClass:", selectedClass.value);

    const loadout =
      selectedClass.value.base?.startingEquipment ??
      selectedClass.value.base?.startingLoadout;

    console.log("resolved loadout:", loadout);

    const result: [string, any][] = Object.entries(loadout).map(
      ([key, group]: [string, any]) => {
        const options = (group.options || []).map((opt: any) => {
          const item = itemData[opt.itemId];

          return {
            ...opt,
            item: item || {
              id: opt.itemId,
              name: opt.itemId,
            },
          };
        });

        return [
          key,
          {
            choose: group.choose,
            options,
          },
        ];
      }
    );
    
    return result;
  });

  // ===== ACTIONS =====
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
    selectedLoadout.value = {};
  }

  function selectSubclass(key: string) {
    selectedSubclassKey.value = key;
  }

  function selectAlignment(key: string) {
    selectedAlignmentKey.value = key;
  }

  function selectLoadout(groupKey: string, itemId: string) {
    selectedLoadout.value[groupKey] = itemId;
  }

  // ===== NAVIGATION =====
  const { next, back } = useCharacterNavigation({
    step,
    selectedRace,
    selectedSubraceKey,
    subraceList,
    selectedClass,
    selectedSubclassKey,
    subClassList,
    startingLoadoutList,
    selectedLoadout,
    selectedAlignment,
  });

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
    selectedLoadout,

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