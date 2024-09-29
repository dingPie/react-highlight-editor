var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useCallback, useMemo, useRef, useState } from "react";
import { kebabCase } from "lodash-es";
import { defaultComponentStyle, defaultHighlightStyle, } from "../constants/style";
import { moveCursorToEnd } from "../utils/move-cursor-to-end";
export var useReactHighlightEditor = function (_a) {
    var _b, _c;
    var componentStyleProps = _a.componentStyleProps, highlightStyleProps = _a.highlightStyleProps;
    var domRef = useRef(null);
    var rangeRef = useRef(undefined);
    var _d = useState(1), lineNum = _d[0], setLineNum = _d[1];
    var componentStyle = useMemo(function () {
        return __assign(__assign({}, defaultComponentStyle), componentStyleProps);
    }, [componentStyleProps]);
    var highlightStyle = useMemo(function () { return (__assign(__assign({}, defaultHighlightStyle), highlightStyleProps)); }, [highlightStyleProps]);
    var cssTextObj = useMemo(function () {
        var _a;
        var result = {};
        for (var key in highlightStyle) {
            var cssText = Object.entries((_a = highlightStyle[key]) !== null && _a !== void 0 ? _a : {}).reduce(function (acc, _a) {
                var key = _a[0], value = _a[1];
                return (acc += "".concat(kebabCase(key), ": ").concat(value, "; "));
            }, "");
            result[key] = cssText;
        }
        return result;
    }, [highlightStyle]);
    var baseLineHeight = (_c = parseInt((_b = componentStyle.baseText) === null || _b === void 0 ? void 0 : _b.lineHeight, 10)) !== null && _c !== void 0 ? _c : 22;
    /**
     * 커서 위치 저장을 위한 핸들러
     */
    var handleBlurEditableBox = useCallback(function () {
        var selection = window.getSelection();
        var range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
        rangeRef.current = range;
    }, []);
    /**
     * editable container 에
     */
    var handleInputEditableBox = useCallback(function () {
        var _a, _b, _c;
        if (!(domRef === null || domRef === void 0 ? void 0 : domRef.current))
            return;
        var selection = window.getSelection();
        var range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
        // P_MEMO 드래그해서 삭제시 꼬리쪽에 걸친 요소는 X.
        var node = (_a = range === null || range === void 0 ? void 0 : range.commonAncestorContainer) === null || _a === void 0 ? void 0 : _a.parentElement;
        var target = node && (node === null || node === void 0 ? void 0 : node.innerHTML) !== "&nbsp;" ? node : node === null || node === void 0 ? void 0 : node.nextElementSibling;
        var id = (_b = target === null || target === void 0 ? void 0 : target.id) !== null && _b !== void 0 ? _b : "";
        var textContent = (_c = target === null || target === void 0 ? void 0 : target.textContent) !== null && _c !== void 0 ? _c : "";
        var idString = id === null || id === void 0 ? void 0 : id.split("_").at(-1);
        if (!!idString && idString !== textContent) {
            target === null || target === void 0 ? void 0 : target.remove();
        }
        var newLineNum = domRef.current.offsetHeight / baseLineHeight;
        setLineNum(newLineNum);
    }, [baseLineHeight]);
    /**
     * 작성 가능한 박스 외부 클릭시 마지막줄 포커스
     */
    var handleClickEditableOuterBox = useCallback(function () {
        var _a;
        if (!domRef.current)
            return;
        (_a = domRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        moveCursorToEnd(domRef.current);
    }, []);
    /**
     * 외부에서 editable container에 아이템 추가를 위한 핸들러
     */
    var addHighlightSpan = useCallback(function (_a) {
        var _b, _c, _d, _e;
        var text = _a.text, _f = _a.styleKey, styleKey = _f === void 0 ? "base" : _f, spanProperty = _a.spanProperty;
        if (!domRef.current)
            return;
        var range = rangeRef.current;
        // 이미 존재하는 하이라이트에는 추가로 못넣게 막음
        var id = (_b = range === null || range === void 0 ? void 0 : range.commonAncestorContainer.parentElement) === null || _b === void 0 ? void 0 : _b.id;
        if (id)
            return;
        var newSpan = document.createElement("span");
        newSpan.id = "".concat(Date.now(), "_").concat(text);
        newSpan.style.cssText = (_c = cssTextObj[styleKey]) !== null && _c !== void 0 ? _c : "";
        newSpan.textContent = text;
        if (spanProperty) {
            for (var k in spanProperty) {
                var key = k;
                newSpan[key] = spanProperty[key];
            }
        }
        // P_TODO: 이거 마지막에 추가했으면 마지막으로 커서 옮기는거..일단 구현안됨.
        var space = document.createTextNode("\u00a0"); // 공백 문자
        var trailingSpace = document.createElement("span"); // 이렇게 처리해야 뒤 콘텐츠 처리 가능.
        trailingSpace.innerHTML = "&nbsp"; //
        if (range) {
            range.insertNode(space);
            range.insertNode(newSpan);
            range.insertNode(trailingSpace);
        }
        else {
            (_d = domRef.current) === null || _d === void 0 ? void 0 : _d.appendChild(newSpan);
            (_e = domRef.current) === null || _e === void 0 ? void 0 : _e.appendChild(trailingSpace);
        }
        var newLineNum = domRef.current.offsetHeight / baseLineHeight;
        setLineNum(newLineNum);
    }, [baseLineHeight, cssTextObj]);
    return {
        /**
         * editable container에 접근하기 위한 ref
         */
        domRef: domRef,
        /**
         * input을 위치에 처리하기 위한 ref
         */
        rangeRef: rangeRef,
        /**
         * editable container에 height 기반으로 줄 수 계산
         */
        lineNum: lineNum,
        /**
         * parameter로 받은 container style
         */
        componentStyle: componentStyle,
        /**
         * 커서 위치 저장을 위한 핸들러
         */
        handleBlurEditableBox: handleBlurEditableBox,
        /**
         * editable container 에
         */
        handleInputEditableBox: handleInputEditableBox,
        /**
         * 작성 가능한 박스 외부 클릭시 마지막줄 포커스
         */
        handleClickEditableOuterBox: handleClickEditableOuterBox,
        /**
         * 외부에서 editable container에 아이템 추가를 위한 핸들러
         */
        addHighlightSpan: addHighlightSpan,
    };
};
