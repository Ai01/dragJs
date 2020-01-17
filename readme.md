# drag js

原生实现js拖拽

## 使用

```js
dragJs(
fireEle, // 触发拖动的原素,这个原素的mousedown事件会触发拖动
draggedEle, // 被拖动的原素,这个原素会被改变位置,需要css的left，top改变可以改变位置,
            // 这个元素的position会被设置为absolute,为了防止布局的突然改变，需要预先设置这个原素的position为absolute
{
  disabledX: Boolean, // true表示无法在x轴拖动，默认false
  disabledY: Boolean, // true表示无法在y轴拖动，默认为false
  minX: number, // x轴最小的距离
  maxX: number, // x轴最大的距离
  minY: number, // y最小的距离
  maxY: number, // y最大的距离
  droppedEle: Node,  // 可以放置的原素。需要在draggedEle下面的最顶层
  once: Boolean,  // 是否只拖动一次
  customCbForMousemove: Function, // 自定义的mousemove回调 
})
```
