import ts from 'typescript'
import { CompileError } from './Compile'
import { BuiltinHooks } from '../const'
import { getSourceFilePath } from '../util'

export class BuiltinHooksError extends CompileError {
  constructor(ref: ts.Identifier) {
    const messages = [
      `编译模式下仅支持转换以下内置 Hooks：${BuiltinHooks.join(',')}`,
      `引用变量：${ref.getText()}`,
      `文件地址：${getSourceFilePath(ref)}`,
    ]
    super(messages.join('\n'))
    this.name = 'BuiltinHooksError'
  }
}
