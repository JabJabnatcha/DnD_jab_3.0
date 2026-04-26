<script setup lang="ts">
type Profile = {
  age: number;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
};

const model = defineModel<Profile>({
  default: () => ({
    age: 0,
    height: "",
    weight: "",
    eyes: "",
    skin: "",
    hair: "",
  }),
});
</script>

<template>
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-bold">Character Profile</h2>

    <!-- AGE -->
    <div class="space-y-1">
      <label class="block">Age</label>
      <input
        type="number"
        v-model.number="model.age"
        class="border p-2 rounded w-full"
      />
    </div>

    <!-- HEIGHT -->
    <div class="space-y-1">
      <label class="block">Height</label>
      <select v-model="model.height" class="border p-2 rounded w-full">
        <option value="">Select</option>
        <option>Short</option>
        <option>Average</option>
        <option>Tall</option>
        <option>Very Tall</option>
      </select>
    </div>

    <!-- WEIGHT -->
    <div class="space-y-1">
      <label class="block">Weight</label>
      <select v-model="model.weight" class="border p-2 rounded w-full">
        <option value="">Select</option>
        <option>Light</option>
        <option>Normal</option>
        <option>Heavy</option>
        <option>Muscular</option>
      </select>
    </div>

    <!-- EYES -->
    <div class="space-y-1">
      <label class="block">Eyes</label>
      <select v-model="model.eyes" class="border p-2 rounded w-full">
        <option value="">Select</option>
        <option>Brown</option>
        <option>Blue</option>
        <option>Green</option>
        <option>Black</option>
        <option>Red (rare)</option>
      </select>
    </div>

    <!-- SKIN -->
    <div class="space-y-1">
      <label class="block">Skin</label>
      <select v-model="model.skin" class="border p-2 rounded w-full">
        <option value="">Select</option>
        <option>Fair</option>
        <option>Tan</option>
        <option>Dark</option>
        <option>Pale</option>
      </select>
    </div>

    <!-- HAIR -->
    <div class="space-y-1">
      <label class="block">Hair</label>
      <select v-model="model.hair" class="border p-2 rounded w-full">
        <option value="">Select</option>
        <option>Black</option>
        <option>Brown</option>
        <option>Blonde</option>
        <option>White</option>
        <option>Red</option>
      </select>
    </div>
  </div>
</template>