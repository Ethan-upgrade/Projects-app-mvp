@AGENTS.md

# 项目说明

技术栈：Expo (SDK 57) + React Native 0.86 + expo-router（文件路由，`app/` 目录）+ TypeScript strict。这是一个纯客户端 MVP，用于验证 `app-frontend-dev`/`app-reviewer` 这套 Claude Code agent 预设——目前没有后端，数据用静态 TypeScript 模块 mock。

本项目开发/审查请用 `app-frontend-dev`（实现）/ `app-reviewer`（只读审查）；不要使用 `frontend-dev`/`backend-dev`/`fullstack-*`（那套假设 Next.js+Prisma）或 `spa-*`（那套假设 Vite Web SPA）——这是 Expo 移动端项目。

硬规则：验证改动用 `npx tsc --noEmit` / `npx eslint .`；不要在前台跑 `npx expo start` 或任何模拟器/真机调试命令，需要人工验证时必须 `run_in_background` 并在结束前 stop。

