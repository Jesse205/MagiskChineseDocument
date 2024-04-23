import type { DefaultTheme } from 'vitepress/theme'
export interface OriginDocumentConfig {
  date: string
  commit: string
  url: string
}
export interface ThemeConfig extends DefaultTheme.Config {
  originDocument?: Record<string, OriginDocumentConfig>
}
