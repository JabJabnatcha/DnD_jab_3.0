<script setup lang="ts"></script>

<template>
  <div>
    <!-- navigation -->
    <nav class="p-4 flex gap-4 bg-black text-white">
      <router-link to="/">Home</router-link>
      <router-link to="/create">Create Character</router-link>
    </nav>

    <!-- page render -->
    <router-view />
  </div>
</template>