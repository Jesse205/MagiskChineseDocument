<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
import { ref, watchEffect } from 'vue'
const { Layout } = DefaultTheme

const router = useRouter()
const isDeltaUrl = ref(false)

watchEffect(() => {
  isDeltaUrl.value = router.route.path.includes('/delta/')
})
// Delta 主题
if (!import.meta.env.SSR) {
  watchEffect(() => {
    const classList = document.documentElement.classList
    const contains = classList.contains('delta')
    if (isDeltaUrl.value && !contains) classList.add('delta')
    else if (contains) classList.remove('delta')
  })
}
</script>

<template>
  <Layout :class="{ delta: isDeltaUrl }"> </Layout>
</template>
