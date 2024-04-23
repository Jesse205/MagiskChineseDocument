import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Layout from './Layout.vue'
import './styles/custom.scss'

export default {
  Layout: Layout,
  extends: DefaultTheme,
  enhanceApp(ctx) {},
} satisfies Theme
