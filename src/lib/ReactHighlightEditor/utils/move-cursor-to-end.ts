/**
 * editable container의 커서를 맨 마지막으로 이동시킵니다.
 * @param element Element
 */
export const moveCursorToEnd = (element: Element) => {
  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.selectNodeContents(element);
  newRange.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};
