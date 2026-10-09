# PORTFOLIO-V4.2 验收记录

**状态：`WAITING_USER_VISUAL_ACCEPTANCE`**。工作树：`codex/portfolio-v4-2-approved-duck`。V4.2 未合并、未推送、未覆盖 GitHub Pages。线上 `https://htw913.github.io/` 仍是原先的 V4 版本。此版本是 Justin / HTW913 的个人作品集，GoDuck 仅为精选项目和站内导览角色。

## 范围与来源

- 保留 V4 已接入的本地 GSAP / ScrollTrigger / Lenis / Three.js / Web Audio 架构及既有真实案例内容；只在当前作品集 Git 仓库内开发。
- 公仔唯一造型基准及建模来源见 [GODUCK_V42_MODEL_SOURCE.md](./GODUCK_V42_MODEL_SOURCE.md)。最终可动模型是 [assets/goduck-v42-model.js](./assets/goduck-v42-model.js)，在 [assets/duck-guide3d.js](./assets/duck-guide3d.js) 内渲染和驱动。它不是贴在平面上的图，也不是第三方 GLB。原图和透明回退图分别在 `assets/goduck-v42-approved-reference.png`、`assets/goduck-v42-cutout.png`。
- 实际调用本机可用的 `frontend-ui-engineering`、`web-design-guidelines`、`playwright`、`git-workflow-and-versioning` 与 `imagegen` 技能；本机没有专用的 Three.js 建模技能，未声称调用。

## 浏览器证据

| 内容 | 实际文件 |
| --- | --- |
| 电影入场截图 / 完整录屏 | `output/playwright/v42-intro-final.png` / `v42-intro-final.webm` |
| 3D 鸭鸭正面、斜侧面、侧面 | `output/playwright/v42-duck-front.png` / `v42-duck-three-quarter.png` / `v42-duck-side.png` |
| 待机、挥手、点击、导览录屏 | `output/playwright/v42-duck-motion-detail.webm` / `v42-duck-interaction.webm` |
| 极光鼠标录屏 | `output/playwright/v42-cursor.webm` |
| 桌面作品 / Contact | `output/playwright/v42-desktop-works-final.png` / `v42-desktop-body-clear.png` / `v42-desktop-contact-final.png` |
| 手机作品、导览、Contact / 流程录屏 | `output/playwright/v42-mobile-works-final.png` / `v42-mobile-guide-final.png` / `v42-mobile-contact-final.png` / `v42-mobile-final.webm` |
| 平板作品 / 英文导览 | `output/playwright/v42-tablet-works-final.png` / `v42-tablet-guide-en-final.png` |
| GoDuck 案例 / 无 WebGL 回退 | `output/playwright/v42-goduck-project-final.png` / `v42-webgl-fallback-mobile.png` |

所有录屏由真实 Chromium 浏览器页面录制。`v42-duck-motion-detail.webm` 为便于查看角色细节，在测试浏览器中临时放大舞台；生产页面仍用响应式尺寸。图片和视频没有代替运行中的 Three.js 模型。

## A–J 内部验收

| 项目 | 结果 | 浏览器证据 |
| --- | --- | --- |
| A 吉祥物美术质量 | PASS（内部自测，最终审美待 Justin 确认） | 批准图与三角度截图：大头小身、双羽、大眼、腮红、立体嘴、橙脚、深色围巾均可见；原图 SHA-256 见来源说明。 |
| B 3D 模型完整度 | PASS | Three.js WebGL canvas，30 个可旋转网格；正面、侧面与斜侧面截图；拖动录屏。 |
| C 动作自然程度 | PASS（内部自测） | 待机呼吸、随机眨眼、挥手、看鼠标、点击回应、导览、关闭后 comfort；6.5 秒采样 391 帧，眼部缩放最小值 0.081，证明实际触发眨眼；动作录屏。 |
| D 角色交互 | PASS | 鼠标拖动与点击；键盘 Enter 打开后焦点到关闭按钮，Enter 关闭后焦点返回公仔；About、Works、Contact、GoDuck 四入口实际到达目标。 |
| E 电影式入场 | PASS | 首次点击入场录屏；Enter / Skip；访问锚点及返回时跳过重复入场；reduced-motion 直接显示首页。 |
| F 梦幻鼠标 | PASS | 操作录屏；交互标签和磁吸；同屏星尘最多 10 个；390px 手机及 reduced-motion 下自定义鼠标为 `display:none`。 |
| G Contact 邮箱 | PASS | 桌面和手机截图；`mailto:a839629934@outlook.com`；复制成功反馈中英双语；模拟 Clipboard API 与 `execCommand` 同时失败时给出明确手动复制提示；GitHub 链接指向 `https://github.com/htw913`。发送邮件测试验证了 mailto 链接，未代替用户启动本机邮件客户端。 |
| H 响应式布局 | PASS | 1440×900、390×844、768×1024 均无水平溢出。手机和平板鸭鸭放入作品区展示位；桌面停靠公仔在接触项目正文时自动隐去，在 Contact / Footer 完全隐藏。 |
| I 性能与稳定性 | PASS（有性能差异） | 最终 Lighthouse 与 120 帧 rAF 采样见下。WebGL 不可用及模拟 context loss 都退回批准图，导览仍可用；音频默认关闭，模拟 AudioContext 拒绝后按钮自动回到关闭；新页面至 GoDuck 案例无 console error。 |
| J 真实项目内容准确性 | PASS | Justin 为首页主角；GoDuck 中文为「敬请期待」、英文为「Coming Soon」；案例注明概念视觉并无 GoDuck 网页版、公开入口或虚构用户成果。 |

## 性能实测

Lighthouse 在同一台本机、同一 `http://127.0.0.1:8765/index.html` 环境中运行。V4 基线为本仓库已有的 `output/playwright/lighthouse/v4-desktop-repeat.json` 与 `v4-mobile.json`；V4.2 最终原始结果是 `v42-final-desktop.json` 与 `v42-final-mobile.json`。

| 环境 | 版本 | Performance | Accessibility | LCP | TBT | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 桌面 | V4 | 90 | 96 | 2046 ms | 62 ms | 0 |
| 桌面 | V4.2 | 88 | 100 | 2343 ms | 17 ms | 0 |
| 移动 | V4 | 98 | 100 | 2460 ms | 0 ms | 0 |
| 移动 | V4.2 | 97 | 100 | 2503 ms | 0 ms | 0 |

V4.2 桌面分数低 2 分，LCP 慢约 297 ms；移动分数低 1 分，LCP 慢约 43 ms。桌面首轮曾出现一次 58 分 / TBT 745 ms 的冷启动异常值，后续两次是 88 分 / TBT 4–6 ms；原始 JSON 保留在 `output/playwright/lighthouse/v42-desktop*.json`，没有删除异常结果。作品区鸭鸭可见时，Chromium 120 帧 rAF 采样桌面和 390px 视口的中位及 p95 均为 16.7 ms（约 60 fps）；这是本机浏览器采样，并非所有设备的帧率保证。

## 发现并修复

1. 旧方块鸭造型和静态替代素材与批准图不一致：更换为原创可转动网格；批准图透明编辑仅用于无 WebGL 回退与案例插图。
2. 初版嘴、围巾、侧面及项目卡片裁切不理想：改成立体曲线嘴、贴身围巾、较圆润翅膀和 `object-fit:contain`，通过三视图复查。
3. 悬浮公仔遮挡手机项目正文：手机与平板改为作品区行内展示位；桌面增加正文碰撞避让，Contact / Footer 隐藏。
4. 导览浮层压正文：打开后移动到作品区行内面板，保留关闭与焦点返回。
5. 浏览器可能继续使用旧脚本缓存：更改过的入口资源使用 V4.2 查询版本。
6. 音频不可用时会误显示 SOUND ON：失败后恢复 SOUND OFF；复制邮箱失败路径同样保留可操作提示。
7. 入场锚点访问和 cursor 星尘清理问题：锚点跳过入场；星尘限制 10 个、窗口失焦隐藏指针。

## 验收边界

视觉美术和动效质感仍需 Justin 最终确认。当前分支可本地预览和审阅，**尚未合并或部署到 GitHub Pages**。收到明确视觉验收后再执行上线。
