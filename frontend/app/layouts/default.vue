<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />
    <AppCartDrawer />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
