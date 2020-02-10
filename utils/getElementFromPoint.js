// elementFromPoint可能存在兼容问题，暂时做一层代理，方便以后扩展

// x, y 分别是e.clientX, e.clientY
const getElementFromPoint = (x, y) => {
  return document.elementFromPoint(x, y);
};

export default getElementFromPoint;
