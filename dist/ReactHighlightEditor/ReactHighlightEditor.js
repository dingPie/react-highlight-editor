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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from "react";
/**
 * 계산식 작성 모달
 */
var ReactHighlightEditor = function (_a) {
    var _b, _c;
    var containerProps = _a.containerProps, lineContainerProps = _a.lineContainerProps, editorInnerProps = _a.editorInnerProps, editorOuterProps = _a.editorOuterProps, props = __rest(_a, ["containerProps", "lineContainerProps", "editorInnerProps", "editorOuterProps"]);
    var domRef = props.domRef, lineNum = props.lineNum, componentStyle = props.componentStyle, handleBlurEditableBox = props.handleBlurEditableBox, handleInputEditableBox = props.handleInputEditableBox, handleClickEditableOuterBox = props.handleClickEditableOuterBox;
    var baseLineHeight = (_c = (_b = componentStyle.baseText) === null || _b === void 0 ? void 0 : _b.lineHeight) !== null && _c !== void 0 ? _c : "22px";
    var lineList = useMemo(function () { return Array(lineNum).fill(0); }, [lineNum]);
    return (_jsxs("div", __assign({ className: "tag-editor-container", style: componentStyle.container }, containerProps, { children: [_jsx("div", __assign({ className: "tag-editor-line-container", style: componentStyle.lineContainer }, lineContainerProps, { children: lineList.map(function (_, idx) { return (_jsx("div", __assign({ className: "tag-editor-line-item-box", style: __assign(__assign({}, componentStyle.lineItemBox), { height: baseLineHeight }) }, { children: _jsx("span", __assign({ className: "tag-editor-line-item-text", style: __assign(__assign({}, componentStyle.lineItemText), { lineHeight: baseLineHeight }) }, { children: idx + 1 })) }), idx)); }) })), _jsx("div", __assign({ className: "tag-editor-editor-outer", onClick: handleClickEditableOuterBox, style: componentStyle.editorOuter }, editorOuterProps, { children: _jsx("div", __assign({ className: "tag-editor-editor-inner", ref: domRef, contentEditable: true, style: __assign(__assign(__assign(__assign({}, componentStyle.editorInner), componentStyle["editorInner:focus"]), componentStyle.baseText), { minHeight: baseLineHeight }), onClick: function (e) { return e.stopPropagation(); }, onBlur: handleBlurEditableBox, onInput: handleInputEditableBox }, editorInnerProps)) }))] })));
};
export default memo(ReactHighlightEditor);
