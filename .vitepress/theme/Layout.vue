<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute, withBase } from 'vitepress'
import { computed, watch } from 'vue'
const { Layout } = DefaultTheme

const route = useRoute()
const isDeltaUrl = computed(() => route.path.startsWith(withBase('/delta')))

// 搜索框等元素可能不在 Layout 中
if (!import.meta.env.SSR) {
  watch(
    isDeltaUrl,
    () => {
      const { classList } = document.documentElement
      const contains = classList.contains('delta')
      if (isDeltaUrl.value && !contains) classList.add('delta')
      else if (contains) classList.remove('delta')
    },
    { immediate: true },
  )
}
</script>

<template>
  <Layout :class="{ delta: isDeltaUrl }"></Layout>
</template>

<style>
.footer {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
