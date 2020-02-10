import getElementFromPoint from './utils/getElementFromPoint.js';

// fireEle是触发拖拽的对象
// draggedEle是被拖拽的对象
const _drag = (fireEle, draggedEle, options) => {
  if (!fireEle || !draggedEle) return;

  const {
    draggedElePositionStyle, // 被拖拽元素的position模式，有relative，absolute两种可能
    droppedEle, // 被放置的对象
    once, // 是否只拖动一次
    disabledX, // x轴无法拖动
    disabledY, // y轴无法拖动
    maxX, // x轴的拖动最大距离
    minX, // x轴拖动的最小距离
    maxY, // y轴拖动的最大距离
    minY, // y轴拖动的最小距离
    customCbForMousemove, // 自定义mousemove事件回调
  } = options || {};

  // 是否开始拖拽
  let startDrag = false;

  // 触发元素的mousedown事件决定是否开始拖拽
  fireEle.addEventListener('mousedown', e => {
    startDrag = true;
  });

  const mousemoveCb = e => {
    if (!startDrag) return;

    // 自定义回调
    if (typeof customCbForMousemove === 'function') {
      customCbForMousemove(e);
      return;
    }

    let x = e.pageX - draggedEle.offsetWidth / 2;
    let y = e.pageY - draggedEle.offsetHeight / 2;

    // x,y的范围判断
    if (typeof minX === 'number' && x < minX) x = minX;
    if (typeof maxX === 'number' && x > maxX) x = maxX;
    if (typeof minY === 'number' && y < minY) y = minY;
    if (typeof maxY === 'number' && y > maxY) y = maxY;

    // 如果有指明哪一个方向不拖拽那么不使用拖拽
    if (!disabledX) draggedEle.style.left = `${x}px`;
    if (!disabledY) draggedEle.style.top = `${y}px`;
  };

  // 添加在document上来防止，滑出fireEle的范围依然可以实现对draggedEle的拖动
  document.addEventListener('mousemove', mousemoveCb);

  draggedEle.addEventListener('mouseup', e => {
    startDrag = false;

    // 如果只拖拽一次，那么removeListener;
    if (once) document.removeEventListener('mousemove', mousemoveCb);

    // 拖拽放置
    if (droppedEle) {
      draggedEle.hidden = true;
      let elemBelow = getElementFromPoint(e.clientX, e.clientY);
      draggedEle.hidden = false;

      if (!elemBelow) return;

      if (elemBelow === droppedEle) {
        droppedEle.appendChild(draggedEle);
        draggedEle.style.left = `0px`;
        draggedEle.style.top = `0px`;
        draggedEle.style.position = 'static';

        document.removeEventListener('mousemove', mousemoveCb);
      }
    }
  });
};

export { getElementFromPoint };
export default _drag;
