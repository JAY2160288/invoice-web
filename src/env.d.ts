declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NOTION_API_KEY?: string
    readonly NOTION_DATABASE_ID?: string
    readonly ADMIN_PASSWORD?: string
    readonly NEXT_PUBLIC_APP_URL?: string
    readonly VERCEL_URL?: string
  }
}
