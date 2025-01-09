declare module 'vite-plugin-eslint' {
  import { PluginOption } from 'vite'
  const eslintPlugin: (options?: Record<string, any>) => PluginOption
  export default eslintPlugin
}
