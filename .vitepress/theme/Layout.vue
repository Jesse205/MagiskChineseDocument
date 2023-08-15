<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
const { Layout } = DefaultTheme

const router = useRouter()

</script>

<template>
    <Layout :class="{ delta: router.route.path.includes('/delta/') }">
    </Layout>
</template>