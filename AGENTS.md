# DAY 开发约束

- 仓库根目录是 `DAY/day/`；先阅读 `README.md`、`docs/` 最新设计及 ADR。
- 一个 Cocos 工程、一套 Rule Core + Feel Core，禁止为三个产品复制内核。
- Domain 保持纯 TypeScript；Component 只负责生命周期、输入、View 和动画。
- 逻辑同步结算，表现异步播放，禁止等待完整动画后恢复输入。
- 正式发布版玩家持久化数据必须存于云端或服务端；禁止设备本地存档及失败后回退本地。详见 `docs/architecture/ADR-001-cloud-save.md`。
- 当前只开发 Rule Core + Feel Core，不提前铺开三个完整 Mode 或独立后端。
- 修改领域模型、公共接口、Schema 或架构边界时同步文档。
- 交付前运行 `pnpm check`；没有用例的测试工具初始化不等于规则已经通过测试。
