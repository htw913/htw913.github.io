# GoDuck V4.2 导航公仔来源

- 唯一视觉基准：Justin 在 2026-10-09 提供并确认的 `/Users/a0000/Downloads/ChatGPT 图像 2026年10月9日 19_10_38.png`。
- 仓库内原图副本：`assets/goduck-v42-approved-reference.png`。两者 SHA-256 均为 `29c1bcc1984d761a39c4ac44a664c5aabff25316a776d2dc785c826a1ed40f37`。
- 最终可动 3D 模型：`assets/goduck-v42-model.js`，由 Three.js 原生网格、LatheGeometry、ExtrudeGeometry 和曲线创建，非静态图片、贴图转盘或第三方模型。浏览器装配与状态动画在 `assets/duck-guide3d.js`。
- WebGL 回退和 GoDuck 案例插图：`assets/goduck-v42-cutout.png`。它是对上述确认图执行去背景图像编辑得到的透明 PNG，不参与 3D 网格渲染。

模型按原图重建头大身小的圆润比例、黄色躯体、两撮头羽、大黑亮眼和高光、粉色腮红、立体橙色嘴与脚、深蓝紫色科技围巾及青色光纹、一侧挥手与一侧抬脚。模型可在浏览器中旋转；眉眼、头部、翅膀、身体与腿分组，支持待机呼吸、随机眨眼、挥手、看向鼠标、点击回应、导览与陪伴状态。

没有使用 GoDuck 产品仓库文件，也没有使用 Trionn 的模型、素材或源码。造型相似度和审美最终仍以 Justin 的视觉验收为准。
