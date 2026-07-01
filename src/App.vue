<template>
  <div class="flex items-center justify-center gap-10 py-2">
    <img src="./assets/LogoPokemon.png" alt="Logo-Poke" width="220" height="100">
    <img src="./assets/logo.svg" alt="Vue logo" width="70" height="100">
  </div>
  <main>
    <RouterView />
  </main>
</template>

<script>
export default {
  name: 'App',
}
</script>