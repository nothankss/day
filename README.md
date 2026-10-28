# DAY

一套高品质连连看核心，支撑 Arcade、Clean、Story 三种产品体验。仓库根目录为 `DAY/day/`，这里也是唯一 Cocos 工程根目录。

## 当前阶段

工程工具初始化；尚无游戏规则实现、测试用例、可玩场景或云存档。先完成 Rule Core，再完成 Feel Demo。不同时铺开三种产品。

## 技术与架构

Cocos Creator 3.8 LTS + TypeScript，2D 竖屏。工程版本固定为 3.8.8，与当前可获取的编辑器版本保持一致，需用同版本编辑器首次导入验证；版本调整须同步 package.json 与本文。Node 22.13+（22.x）或 24.x / 26+、pnpm 11.25.0 用于开发工具，不是游戏运行时。

- `assets/core/domain/`：纯 TS 的 Board、Tile、路径、Session、基础 Goal。
- `assets/core/application/`：游戏用例。
- `assets/core/events/`：类型化事件。
- `assets/core/feel/`：反馈协调与效果。
- `assets/presentation/board/`：Cocos 棋盘表现及输入转发。
- `assets/scenes/`：后续由编辑器创建场景。
- `tests/`：脱离 Cocos 的规则单测。
- `settings/`：后续提交编辑器生成的共享工程设置。
- `docs/`：产品、技术与决策记录。

Mode、平台 Adapter、内容包按实际开发任务逐步增加。当前不创建后端工程。Service 是接口封装，不等于独立服务器。

## 数据存储硬约束

**正式发布版玩家持久化数据必须存储在云端或服务端，禁止设备本地存档，也禁止云端失败时回退本地。** 对局运行态可在内存中；静态内容随包发布。云存档是上线前置条件。详见 [ADR-001](docs/architecture/ADR-001-cloud-save.md)。

## 开发命令

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm test:watch
```

`pnpm check` 执行独立 TS 类型检查、ESLint、格式检查、单测。当前测试入口允许没有用例，这只验证工具可运行；CORE-001 起增加真实用例。类型检查覆盖纯 TS 内核、用例、事件和测试；不代替 Cocos Component 编译与构建验收。

根 `tsconfig.json` 使用编辑器生成的 `temp/tsconfig.cocos.json`；首次打开前该文件不存在属于预期，Vitest 加载配置时也可能提示该缺失文件；不应手工伪造编辑器生成物。独立检查使用 `tsconfig.check.json`，不依赖编辑器生成物。

## 安装 Cocos Dashboard 与编辑器（macOS）

Dashboard 负责管理编辑器版本和项目；Creator 是实际搭建、预览和打包游戏的编辑器，两者都需要安装。

1. 打开 [Cocos 官方下载页](https://www.cocos.com/creator-download)，下载 macOS 版 Cocos Dashboard。
2. 双击下载的 `.dmg`，将 `CocosDashboard.app` 拖入“应用程序”，然后打开 Dashboard 并登录 Cocos 账号。
3. 在 Dashboard 的“安装 / Installs”中点击“安装编辑器 / Install Editor”，安装 **Cocos Creator 3.8.8**。Dashboard 自身的版本号无需与 Creator 相同。
4. 如果已单独下载并解压 Creator 3.8.8，在 Dashboard 的安装页面使用“定位 / Locate”添加已有编辑器；仅下载安装包不等于已安装编辑器。

官方说明：[安装和启动](https://docs.cocos.com/creator/3.8/manual/zh/getting-started/install/)、[使用 Dashboard](https://docs.cocos.com/creator/3.8/manual/zh/getting-started/dashboard/)。

## 导入已有 DAY 工程

1. 打开 Dashboard 的项目页面，选择“导入 / Import”，添加已有项目。
2. 选择仓库根目录：本机是 `/Users/daniel.sui/playground/DAY/day`，即内层 `day/`，这里包含 `package.json` 和 `assets/`。其他开发者选择自己的仓库克隆路径。
3. 选择 **Creator 3.8.8** 打开，等待资源导入和类型配置生成。不要新建模板项目覆盖仓库。
4. 首次打开后核对编辑器版本，并检查控制台的错误。当前仓库没有游戏场景或玩法，空白工作区是正常状态；遇到脚本错误则需排查，不能当作正常空项目忽略。

编辑器产生的 `assets/**/*.meta` 必须随对应资源提交；`temp/`、`library/` 等缓存不提交。不要手工伪造 scene、Prefab 或编辑器生成的类型文件。

工程目前只完成骨架与独立工具检查，尚未完成 3.8.8 编辑器导入、场景预览和构建验收。首次导入后还需在编辑器内创建 2D 竖屏场景并验证预览与 Web 构建。

## 如何开始工作

### 首次准备开发工具

安装符合上文版本要求的 Node.js 与 pnpm 后，在终端执行：

```sh
cd /Users/daniel.sui/playground/DAY/day
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm check
```

其他开发者将 `cd` 路径替换为自己的仓库路径。如果提示命令不存在，需先安装 Node.js 或 pnpm，并确保终端 PATH 可以找到它们。工具入口：[Node.js 官方下载](https://nodejs.org/en/download)、[pnpm 安装说明](https://pnpm.io/installation)。pnpm 使用 `package.json` 中的固定版本 11.25.0。

### 日常开发

1. 阅读 `docs/` 最新需求、技术设计及 ADR，先确认任务归属 Core、Shared、Mode、Content 或 Infrastructure。
2. 在 Codex 或代码编辑器中编写 TypeScript；规则与测试可独立于 Cocos 开发，运行 `pnpm test:watch` 持续验证。
3. 涉及画面、输入或特效时，用 Creator 打开工程，在场景与资源管理器中编辑 Node、UI 和素材。Domain 不导入 `cc`，Component 只转发输入与更新表现。
4. 有可运行场景后，保存并打开该场景，使用编辑器顶部的预览按钮运行，检查浏览器和编辑器控制台。当前尚无场景，单独打开工程还不能试玩连连看。
5. 提交前执行 `pnpm check`；涉及 Cocos 的修改还须通过编辑器预览和相应构建验证。检查 `git diff`，包含必要的 `.meta` 和共享设置，排除缓存、密钥及本地生成物。

当前下一项开发工作是 Position / Direction / LinkPath，随后按设计推进规则内核及测试，再接入单棋盘与 Feel Demo。云存档需在正式上线前接入并验收，不使用本地持久化替代。

参考：[Cocos 工程结构](https://docs.cocos.com/creator/3.8/manual/en/getting-started/project-structure/index.html)。

## 设计依据

- [产品与商业方案 V1.0](docs/连连看衍生小游戏商业化项目_V1.0.md)
- [技术设计 V1.0](docs/小游戏技术设计文档_V1.0.md)
- [云端存档决策](docs/architecture/ADR-001-cloud-save.md)

后续顺序：Position / Direction / LinkPath → Tile → Board → BFS PathFinder 与测试 → 生成 / 死局 / 洗牌 → Session / UseCase / EventBus → 单棋盘与 Feel Demo。
