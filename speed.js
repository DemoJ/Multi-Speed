// ==UserScript==
// @name         倍速播放脚本
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在网页上实现倍速播放功能，支持动态调整倍速和浮动提示
// @license MIT
// @author       diyun
// @include      http://*/*
// @include      https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // 等待视频元素加载
    function waitForVideoElement() {
        return new Promise((resolve) => {
            const observer = new MutationObserver((mutations, obs) => {
                const video = document.querySelector("video");
                if (video) {
                    obs.disconnect(); // 停止观察
                    resolve(video);
                }
            });

            // 监听整个文档的变化
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }

    // 显示浮动提示
    function showFloatingMessage(message) {
        // 创建提示元素
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        messageElement.style.position = "fixed";
        messageElement.style.top = "10px";
        messageElement.style.left = "50%";
        messageElement.style.transform = "translateX(-50%)";
        messageElement.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        messageElement.style.color = "white";
        messageElement.style.padding = "8px 16px";
        messageElement.style.borderRadius = "4px";
        messageElement.style.zIndex = "10000";
        messageElement.style.fontFamily = "Arial, sans-serif";
        messageElement.style.fontSize = "14px";
        messageElement.style.transition = "opacity 0.5s ease-out";

        // 添加到页面
        document.body.appendChild(messageElement);

        // 几秒后消失
        setTimeout(() => {
            messageElement.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 500); // 等待透明度过渡完成
        }, 2000); // 2秒后消失
    }

    // 初始化脚本
    async function init() {
        const video = await waitForVideoElement();
        console.log("找到视频元素：", video);

        const key = "ArrowRight"; // 监听的按键
        const increaseKey = "Equal"; // + 键
        const decreaseKey = "Minus"; // - 键
        const rate1 = 1; // 正常速度
        let rate2 = 2; // 默认倍速
        let downCount = 0; // 按键按下计数器
        let currentRate = video.playbackRate; // 保存当前播放速度

        // 监听按键按下事件
        document.addEventListener(
            "keydown",
            (e) => {
                // 长按 ArrowRight 键：以 rate2 倍速播放
                if (e.code === key) {
                    e.preventDefault(); // 阻止默认行为
                    e.stopImmediatePropagation(); // 阻止其他事件监听器
                    downCount++;

                    // 当按键按下次数为2时（长按），设置为 rate2 倍速
                    if (downCount === 2) {
                        currentRate = video.playbackRate;
                        video.playbackRate = rate2;
                        showFloatingMessage(`开始 ${rate2} 倍速播放`);
                    }
                }

                // 按 + 键：增加 rate2 的值
                if (e.code === increaseKey) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    rate2 += 0.5;
                    showFloatingMessage(`下次倍速：${rate2}`);
                }

                // 按 - 键：减少 rate2 的值
                if (e.code === decreaseKey) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (rate2 > 0.5) {
                        rate2 -= 0.5;
                        showFloatingMessage(`下次倍速：${rate2}`);
                    } else {
                        showFloatingMessage("倍速已达到最小值 0.5");
                    }
                }
            },
            true // 使用捕获阶段，确保屏蔽原有功能
        );

        // 监听按键释放事件
        document.addEventListener(
            "keyup",
            (e) => {
                if (e.code !== key) {
                    return; // 如果不是目标按键，直接返回
                }

                e.preventDefault();
                e.stopImmediatePropagation();

                // 单击 ArrowRight 键：跳转5秒
                if (downCount === 1) {
                    video.currentTime += 5;
                }

                // 长按 ArrowRight 键：恢复原速
                if (downCount >= 2) {
                    video.playbackRate = currentRate;
                    showFloatingMessage(`恢复 ${currentRate} 倍速播放`);
                }

                downCount = 0; // 重置按下计数
            },
            true
        );
    }

    // 启动脚本
    init();
})();