<script setup lang="ts"></script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <h1 class="text-4xl font-bold mb-4">Home Page</h1>

    <router-link
      to="/create"
      class="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
    >
      ไปสร้างตัวละคร
    </router-link>
  </div>
</template>