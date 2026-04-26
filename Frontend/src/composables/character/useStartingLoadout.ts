// C:\Users\Laptop-JAB\Desktop\Learn\DnD_jab_3.0\Frontend\src\composables\character\useStartingLoadout.ts
import { computed } from "vue";

type LoadoutGroup = {
  choose: number;
  options: { itemId: string; qty: number }[];
};

export function useStartingLoadout(selectedClass: any, itemData: any) {
  const startingLoadoutList = computed<[string, any][]>(() => {
    if (!selectedClass.value) return [];

    const loadout =
      selectedClass.value.base?.startingLoadout as
        | Record<string, LoadoutGroup>
        | undefined;

    if (!loadout) return [];

    return Object.entries(loadout).map(([key, group]) => {
      const mapped = {
        choose: group.choose,
        options: group.options.map((opt) => {
          const item = itemData[opt.itemId];

          return {
            ...opt,
            item: item || {
              id: opt.itemId,
              name: opt.itemId,
            },
          };
        }),
      };

      return [key, mapped] as [string, any]; // 🔥 FIX สำคัญ
    });
  });

  return { startingLoadoutList };
}