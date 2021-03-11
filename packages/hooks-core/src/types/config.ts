export interface InternalConfig {
  source?: string
  routes: ServerRoute[]
  middleware?: any[]
  build?: {
    viteOutDir: string
    outDir: string
  }
}

export type ServerRoute = {
  baseDir: string
  basePath: string
}

export interface UserConfig extends Omit<InternalConfig, 'build'> {}
