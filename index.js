// fireEle是触发拖拽的对象
// draggedEle是被拖拽的对象
const _drag = (fireEle, draggedEle, options) => {
  if (!fireEle || !draggedEle) return;

  const { droppedEle, once, disabledX, disabledY, maxX, minX, maxY, minY, customCbForMousemove } = options || {};

  // 是否开始拖拽
  let startDrag = false;

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

    // 拖拽放置
    if (droppedEle) {
      draggedEle.hidden = true;
      let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      draggedEle.hidden = false;

      if (elemBelow === droppedEle) {
        droppedEle.appendChild(draggedEle);
        draggedEle.style.left = `0px`;
        draggedEle.style.top = `0px`;
        draggedEle.style.position = 'static';

        document.removeEventListener('mousemove', mousemoveCb);
      }
    }
  };

  // 添加在document上来防止，滑出fireEle的范围依然可以实现对draggedEle的拖动
  document.addEventListener('mousemove', mousemoveCb);

  document.addEventListener('mouseup', e => {
    startDrag = false;

    // 如果只拖拽一次，那么removeListener;
    if (once) document.removeEventListener('mousemove', mousemoveCb);
  });
};

export default _drag;
