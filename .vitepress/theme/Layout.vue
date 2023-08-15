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

watchEffect(() => {
    if (isDeltaUrl.value)
        document.documentElement.classList.add('delta')
    else
        document.documentElement.classList.remove('delta')
})

</script>

<template>
    <Layout>
    </Layout>
</template>