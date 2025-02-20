# 网页视频播放器倍速控制脚本

## 主要功能

### 长按右键倍速播放
- 长按 ArrowRight 键(右键)时,视频将以设定的倍速(默认 2 倍速)播放
- 释放右键后,视频自动恢复原速播放

### 动态调整倍速
- 使用 + 键(Equal 键)增加倍速值
- 使用 - 键(Minus 键)减少倍速值 
- 调整后的新倍速值将在下次长按右键时生效

### 快速倍速调整
- 使用 ] 键从 1.5 倍速开始，每次增加 0.5 倍速
- 使用 [ 键每次减少 0.5 倍速
- 使用 P 键快速恢复 1.0 倍速播放

## 使用方法

### 安装步骤
1. 将脚本安装到油猴(Tampermonkey)或 Greasemonkey 中
2. 在浏览器中打开并播放视频

### 快捷键说明

| 按键 | 功能说明 |
|------|----------|
| 长按右键 | 以设定的倍速播放视频 |
| 单击右键 | 视频快进 5 秒 |
| + 键 | 增加倍速值(每次增加 0.5) |
| - 键 | 减少倍速值(每次减少 0.5) |
| ] 键 | 从 1.5 倍速开始，每按一次增加 0.5 倍速 |
| [ 键 | 每按一次减少 0.5 倍速 |
| P 键 | 恢复 1.0 倍速播放 |

## 注意事项

### 倍速范围
- 最小倍速值为 0.5
- 最大倍速值无限制(但受播放器支持限制)

### 提示显示
- 操作提示会在页面顶部显示
- 提示文字将在 2 秒后自动消失

### 兼容性说明
- 本脚本主要适用于网页播放器(特别适合 NAS 用户和 Jellyfin 播放器)
- 其他类型播放器可能存在兼容性问题