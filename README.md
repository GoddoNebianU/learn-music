# Learn Music

音乐学习工具集。音感训练 + 实时音高检测。

## 功能

### 音感训练 (`/pitch-practice`)
播放随机音符，训练音高辨识能力。播放 C5–C6 范围内所有音符后，用「根音-根音-目标音」模式测试。多谐波合成音色（triangle + sine 泛音 + ADSR 包络），跟踪每个音名（C–B）的 EMA 正确率。

### Pitch Echo (`/pitch-echo`)
通过麦克风实时检测音高，钢琴键可视化 + 下落音符块。使用 [pitchy](https://github.com/ianprime0509/pitchy) 进行音高检测。

## 技术栈

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router v7** · **Zustand** · **React Compiler**
- **Web Audio API**（多谐波合成 + ADSR 包络，无采样）

## 快速开始

```bash
pnpm install
pnpm dev
```

打开 http://localhost:5173

## 项目结构

```
src/
├── main.tsx                # 路由入口 + Toaster
├── index.css               # Tailwind 导入
├── globalStore.ts           # Zustand（分贝阈值）
├── lib/
│   ├── audio.ts            # 音符播放（多谐波 + ADSR）
│   ├── piano.ts            # 钢琴键频率表 & 查找
│   ├── canvas.ts           # Canvas 下落音符绘制
│   ├── config.ts           # 所有可调参数
│   ├── math.ts             # EMA 平滑
│   ├── utils.ts            # delay 工具
│   ├── cn.ts               # clsx + tailwind-merge
│   ├── useMicPitch.ts      # 麦克风音高检测 hook
│   └── useAudioFilePitch.ts # 音频文件音高分析 hook
├── components/
│   ├── Piano.tsx            # 响应式钢琴键盘
│   ├── MyCanvas.tsx         # Canvas 组件（CSS 缩放）
│   └── AccuracyForm.tsx     # 正确率 7 列网格
└── pages/
    ├── PitchEchoPage.tsx    # 音高检测页
    └── PitchPracticePage.tsx # 音感训练页
```

## License

AGPL-3.0-only
