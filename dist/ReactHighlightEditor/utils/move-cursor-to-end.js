/**
 * editable container의 커서를 맨 마지막으로 이동시킵니다.
 * @param element Element
 */
export var moveCursorToEnd = function (element) {
    var selection = window.getSelection();
    var newRange = document.createRange();
    newRange.selectNodeContents(element);
    newRange.collapse(false);
    selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
    selection === null || selection === void 0 ? void 0 : selection.addRange(newRange);
};
