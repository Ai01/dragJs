# drag js

原生实现 js 拖拽

## 使用

```js
import dragJs, { getElementFronPoint } from 'pure-js-drag';

dragJs(
  fireEle, // 触发拖动的原素,这个原素的mousedown事件会触发拖动
  draggedEle, // 被拖动的原素,这个原素会被改变位置,需要css的left，top改变可以改变位置,
              // 需要预先设置这个原素的position为absolute。如果元素利用了relative。那么需要使用
              // customCbForMousemove来自己决定x，y的位置
  {
    disabledX: Boolean, // true表示无法在x轴拖动，默认false
    disabledY: Boolean, // true表示无法在y轴拖动，默认为false
    minX: number, // x轴最小的距离
    maxX: number, // x轴最大的距离
    minY: number, // y最小的距离
    maxY: number, // y最大的距离
    droppedEle: Node, // 可以放置的原素。需要在draggedEle下面的最顶层
    once: Boolean, // 是否只拖动一次
    customCbForMousemove: Function, // 自定义的mousemove回调
  },
);

// 根据clientX，clientY来获取元素的位置
getElementFromPoint(e.clientX, e.clientY);
```
