import fs from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import { createVNode } from 'vue'
import { legacyLogicalPropertiesTransformer, StyleProvider, ConfigProvider } from 'ant-design-vue'
import { extractStyle } from 'ant-design-vue/lib/_util/static-style-extract/index.js'
import { token } from '../src/static/style/antdv/token.js'
const extractAntdvStyle = () => {
  const css = extractStyle(node =>
    // same as App.vue
    createVNode(ConfigProvider, { hashed: false, token }, () =>
      createVNode(StyleProvider, { transformers: [legacyLogicalPropertiesTransformer] }, () => node),
    ),
  )
  const md5 = createHash('md5')
  const hash = md5.update(css).digest('hex')
  const fileName = `/dist/assets/antdv.min.${hash.substring(0, 8)}.css`
  fs.writeFileSync(path.join(import.meta.dirname, '..', fileName), css)
  return {
    fileName,
  }
}

extractAntdvStyle()
