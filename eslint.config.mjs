import nextConfig from 'eslint-config-next/core-web-vitals'
import prettierConfig from 'eslint-config-prettier'

const eslintConfig = [
  ...nextConfig,
  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
]

export default eslintConfig
