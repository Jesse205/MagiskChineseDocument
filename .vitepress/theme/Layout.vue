<script setup lang="ts">
import { useRoute, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, watchEffect } from 'vue'
const { Layout } = DefaultTheme

const route = useRoute()
const isDeltaUrl = computed(() => route.path.startsWith(withBase('/archive/delta')))

// 搜索框等元素可能不在 Layout 中
onMounted(() => {
  watchEffect(() => {
    document.documentElement.classList.toggle('delta', isDeltaUrl.value)
  })
})
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
