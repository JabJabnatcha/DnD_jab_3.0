export function useCharacterNavigation(ctx: {
  step: any;
  selectedRace: any;
  selectedSubraceKey: any;
  subraceList: any;
  selectedClass: any;
  selectedSubclassKey: any;
  subClassList: any;
  startingLoadoutList: any;
  selectedLoadout: any;
  selectedAlignment: any;

  // 🆕 profile (optional future-safe)
  profile?: any;
}) {
  function next() {
    const {
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
    } = ctx;

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
      step.value = "startitem";
      return;
    }

    if (step.value === "startitem") {
      const groups = startingLoadoutList.value;

      const allSelected = groups.every(
        ([key]: any) => selectedLoadout.value[key]
      );

      if (!allSelected) return;
      step.value = "alignment";
      return;
    }

    if (step.value === "alignment") {
      if (!selectedAlignment.value) return;
      step.value = "profile"; // ✅ NEW STEP
      return;
    }

    if (step.value === "profile") {
      // ตอนนี้ยังไม่มี validation
      // จะข้ามไป finish หรือ summary ในอนาคต
      return;
    }
  }

  function back() {
    const { step } = ctx;

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

    if (step.value === "startitem") {
      step.value = "subclass";
      return;
    }

    if (step.value === "alignment") {
      step.value = "startitem";
      return;
    }

    if (step.value === "profile") {
      step.value = "alignment"; // ✅ NEW BACKFLOW
      return;
    }
  }

  return { next, back };
}