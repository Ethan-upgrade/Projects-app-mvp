# 景点收藏本（Projects-app-mvp）

一个用 Expo + React Native 写的纯客户端移动端 MVP：浏览上海的几个代表性景点、查看详情，并把喜欢的景点加入收藏。

这个项目的主要目的是验证一套 Claude Code 移动端 agent 预设（`app-frontend-dev` 负责实现，`app-reviewer` 负责只读审查）在真实 Expo 项目上的开发与审查流程。因此功能刻意保持很小：没有后端，数据是静态 TypeScript 模块。

## 功能

- **景点列表**（`app/index.tsx`）：卡片展示 6 个上海景点（外滩、豫园、东方明珠塔、上海博物馆、田子坊、静安寺），含图片、中英文名和分类标签；支持按中英文名搜索、按分类筛选（两者可叠加），无结果时显示空状态；右上角“收藏”按钮进入收藏页。
- **景点详情**（`app/spot/[id].tsx`）：大图、简介，以及“收藏 / 已收藏”切换按钮；ID 不存在时显示兜底提示。
- **我的收藏**（`app/bookmarks.tsx`）：列出已收藏的景点，空列表时显示引导文案。

> 收藏状态只存在内存里，重启 App 后会清空。这是 MVP 有意省略的部分（未接 AsyncStorage），不是 bug。

## 技术栈

| 项 | 版本 / 说明 |
|----|-------------|
| Expo SDK | 57 |
| React Native | 0.86 |
| React | 19.2 |
| 路由 | expo-router（基于 `app/` 目录的文件路由，Stack 导航） |
| 语言 | TypeScript（strict） |
| 状态管理 | React Context + `useReducer`（`context/BookmarksContext.tsx`） |
| 样式 | `StyleSheet` |

景点图片通过 Wikimedia Commons 的 `Special:FilePath` 链接加载，需要联网。

## 目录结构

```
app/
  _layout.tsx        # 根布局：BookmarksProvider + Stack 导航
  index.tsx          # 景点列表
  spot/[id].tsx      # 景点详情（动态路由）
  bookmarks.tsx      # 我的收藏
context/
  BookmarksContext.tsx  # 收藏状态（内存）
data/
  spots.ts           # 静态景点数据与 Spot 类型
assets/              # 图标与启动图
```

## 本地运行

需要 Node.js，以及 Expo Go（真机）或 iOS 模拟器 / Android 模拟器。

```bash
npm install
npm start          # 启动 Expo 开发服务器，扫码用 Expo Go 打开
npm run android    # 直接在 Android 模拟器打开
npm run ios        # 直接在 iOS 模拟器打开（需要 macOS）
npm run web        # 浏览器预览
```

类型检查与 lint：

```bash
npx tsc --noEmit
npm run lint       # 即 npx expo lint（eslint-config-expo）
```

## 后续可做

- 用 AsyncStorage 持久化收藏
- 接入真实数据源替代 `data/spots.ts`

## 许可

MIT，见 [LICENSE](LICENSE)（沿用 Expo 模板的许可文件）。
