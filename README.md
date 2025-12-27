# Smart Compress (智能图片压缩工具)

这是一个基于 Web 的现代化图片压缩工具，旨在帮助用户精确控制输出文件的大小。所有的压缩处理完全在浏览器端本地完成，确保了处理速度和用户隐私安全。

<img width="1824" height="1014" alt="image" src="https://github.com/user-attachments/assets/76183e86-597d-409f-b9ab-2a853efe426e" />


## ✨ 主要特性

- **🎯 精准体积控制**: 用户可以直接指定期望的目标文件大小（例如 500KB），工具会自动寻找最佳参数。
- **🧠 智能压缩算法**: 
  - 优先调整 JPEG 质量参数（通过二分查找法确定最佳值）。
  - 如果仅降低质量无法满足要求，会自动智能缩小图片尺寸（分辨率）。
- **🔒 隐私优先**: 所有图片处理均使用 HTML5 Canvas API 在本地完成，**不会**上传到任何服务器。
- **⚡️ 实时预览**: 压缩完成后可立即预览效果，并直观对比原始大小与压缩后大小。
- **🖱️ 便捷交互**: 支持拖拽上传，界面简洁直观。

## 🛠 技术栈

- **前端框架**: [React 18](https://react.dev/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **图标库**: [Lucide React](https://lucide.dev/)
- **核心逻辑**: 原生 JavaScript / Canvas API

## 🚀 快速开始

### 环境要求
- Node.js (推荐 v16+)

### 安装步骤

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```
   启动后访问终端显示的本地地址（通常是 `http://localhost:5173`）。

3. **构建生产版本**
   ```bash
   npm run build
   ```
   构建产物将位于 `dist` 目录。

## 📂 项目结构

```
src/
├── components/          # UI 组件
│   ├── DropZone.jsx    # 文件拖拽上传区域
│   ├── Controls.jsx    # 压缩参数控制面板
│   └── Preview.jsx     # 图片预览组件
├── utils/
│   └── compress.js     # 核心压缩算法实现
├── App.jsx             # 主应用组件
├── main.jsx            # 入口文件
└── App.css             # 全局样式
```

## 💡 核心算法说明

`compress.js` 中的 `compressImage` 函数实现了核心逻辑：
1. 接收目标大小（KB）。
2. 在 0.0 到 1.0 的质量区间内进行**二分查找**，尝试匹配目标大小。
3. 如果最低质量（Quality 0）仍然超出目标大小，则启动**降维处理**，按 0.9 的比例逐级缩小图片长宽，直到满足体积要求。
