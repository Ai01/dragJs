import drag from '../index.js';

// 普通拖动
const ele = document.getElementById('sign');
const line = document.getElementById('line');
drag(ele, ele, { disabledY: true, minX: 0, maxX: line.clientWidth - ele.offsetWidth });

// 可放置拖动
const ball = document.getElementById('ball');
const door = document.getElementById('door');
drag(ball, ball, { droppedEle: door });

// 自定义回调
const ball1 = document.getElementById('ball1');
const door1 = document.getElementById('door1')
const onmousemoveForBall = e => {
  // 将x设置为元素距离页面左边的宽度减去自身宽度的一半
  let x = e.pageX - ball1.offsetWidth / 2;
  let y = e.pageY - ball1.offsetHeight / 2;

  ball1.style.left = `${x}px`;
  ball1.style.top = `${y}px`;

  // 找到下面的元素。如果是door。那么停止移动
  ball1.hidden = true;
  let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
  ball1.hidden = false;

  if (!elemBelow) return;

  if (elemBelow === door1) {
    door1.style.background = 'red';
  } else {
    door1.style.background = 'white';
  }
}

drag(ball1, ball1, { customCbForMousemove: onmousemoveForBall });
