<p align="center">
  <img src="./assets/midway-logo.png">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@midwayjs/hooks">
    <img src="https://img.shields.io/npm/v/@midwayjs/hooks/latest?style=for-the-badge">
  </a>
  <img src="https://img.shields.io/github/workflow/status/midwayjs/hooks/Node.js%20CI/master?style=for-the-badge">
  <a href="https://codecov.io/gh/midwayjs/hooks">
    <img src="https://img.shields.io/codecov/c/github/midwayjs/hooks?style=for-the-badge">
  </a>
  <img src="https://img.shields.io/npm/l/@midwayjs/hooks?style=for-the-badge">
</p>

# 更快的全栈框架

Docs：[Getting Started - 新云端一体解决方案](https://www.yuque.com/midwayjs/faas/quickstart_integration)

## ✨ 特性

- ☁️&nbsp;&nbsp;全栈，在 src 一个目录中开发前后端代码
- 🌈&nbsp;&nbsp;"零" API，从后端 import 函数，调用时自动转换为 API 请求
- 🌍 使用 "React Hooks | Vue composition" 开发后端
- 📦 跨前端框架. 支持 React / Vue3 / ICE.js
- ⚙️ 基于 [Midway](https://github.com/midwayjs/midway), 提供 Web 及 Serverless 场景下的完整支持.
- 🛡 完善的 TypeScript 支持

## 🌰 Demo

### 后端 API 与前端调用

> backend api
> src/apis/lambda/index.ts

```typescript
import { useContext } from '@midwayjs/hooks'

export async function getPath() {
  // 获取请求 HTTP Context
  const ctx = useContext()
  return ctx.path
}
```

> frontend
> src/page/index.tsx

```typescript
import { getPath } from './apis/lambda'

getPath().then((path) => {
  // 发送 GET 请求到 /api/getPath
  // 返回值: /api/getPath
  console.log(path)
})
```

## 🚀 快速开始

请先安装 faas-cli.

```bash
$ npm i @midwayjs/cli -g
```

### 创建

```bash
mw new my-app
```

### 运行

```bash
$ npm run dev
```

### 部署至服务器

```bash
$ node boot.js
```

### 部署至 Serverless

```bash
$ npm run deploy
```

## Contribute

1. Fork 仓库!
2. 创建分支: `git checkout -b my-new-feature`
3. 提交改动: `git commit -am 'Add some feature'`
4. 推送到刚才创建的分支: `git push origin my-new-feature`
5. 提交 Pull Request :D

我们使用 yarn + lerna 管理项目

- install dependencies

```bash
$ yarn
```

- build

```bash
$ yarn build
```

- watch

```bash
$ yarn watch
```

- test

```bash
$ yarn test
```

## 开源协议

Midway Serverless based [MIT licensed](./LICENSE).

## 关于我们

[Alibaba Open Source](https://opensource.alibaba.com/)
