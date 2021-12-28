import omit from 'lodash/omit'
import { createUnplugin, UnpluginOptions } from 'unplugin'
import {
  AbstractRouter,
  ApiRoute,
  EXPORT_DEFAULT_FUNCTION_ALIAS,
  loadApiRoutesFromFile,
} from '@midwayjs/hooks-core'

interface BundlerConfig {
  name: string
  router: AbstractRouter
}

export abstract class AbstractBundlerAdapter {
  constructor(private config: BundlerConfig) {}

  getName() {
    return this.config.name
  }

  getRouter() {
    return this.config.router
  }

  getUnplugin(): Partial<UnpluginOptions> {
    return {}
  }

  transformApiRoutes(apis: ApiRoute[]) {
    return apis
  }

  generateClient(apis: ApiRoute[]) {
    let fetcherId = 0
    const importClient = new Map<string, [string, string, number]>()

    const importCodes = new Set<string>()
    const functionCodes = []

    for (const {
      trigger,
      functionName,
      functionId,
      useInputMetadata,
    } of apis) {
      if (!trigger.requestClient) continue
      const { fetcher, client } = trigger.requestClient

      const clientId = `${client}_${fetcher}`
      if (!importClient.has(clientId)) {
        importClient.set(clientId, [client, fetcher, fetcherId++])
      }

      const [clientName, fetcherName, idx] = importClient.get(clientId)
      const uniqueFetcher = `rpc$${idx}`
      importCodes.add(
        `import { ${fetcherName} as ${uniqueFetcher} } from '${clientName}'`
      )

      const exportModifier =
        functionName === EXPORT_DEFAULT_FUNCTION_ALIAS ? 'default' : ''
      functionCodes.push(`
        export ${exportModifier} function ${functionName} (...args) {
          const route = ${functionName}.route;
          return ${uniqueFetcher}(...args, route)
        };
        ${functionName}.route = {
          trigger: ${JSON.stringify(omit(trigger, 'requestClient'))},
          functionId: '${functionId}',
          useInputMetadata: ${!!useInputMetadata},
        };
      `)
    }

    const code = [
      '// This file is auto-generated by @midwayjs/bundler. Any changes will be overwritten.',
      ...importCodes,
      ...functionCodes,
    ].join('\n')
    return this.formatCode(code)
  }

  private formatCode(code: string) {
    try {
      const prettier = require('prettier')
      return prettier.format(code, {
        semi: true,
        singleQuote: true,
        parser: 'babel',
      })
    } catch (e) {
      console.log('format code error', e)
      return code
    }
  }
}

export function createBundlerPlugin(adapter: AbstractBundlerAdapter) {
  return createUnplugin((options) => {
    return {
      name: adapter.getName(),
      enforce: 'pre',
      transformInclude(id: string) {
        return adapter.getRouter().isApiFile(id)
      },
      async transform(code: string, id: string) {
        const apis = loadApiRoutesFromFile(require(id), id, adapter.getRouter())
        const transformedApis = adapter.transformApiRoutes(apis)
        return adapter.generateClient(transformedApis)
      },
      ...adapter.getUnplugin(),
    }
  })
}
