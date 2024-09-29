import { CSSProperties } from "react";
import { defaultComponentStyle } from "../constants/style";
interface useReactHighlightEditorProps {
    componentStyleProps?: typeof defaultComponentStyle;
    highlightStyleProps?: Record<string, CSSProperties>;
}
export declare const useReactHighlightEditor: ({ componentStyleProps, highlightStyleProps, }: useReactHighlightEditorProps) => {
    /**
     * editable container에 접근하기 위한 ref
     */
    domRef: import("react").RefObject<HTMLDivElement>;
    /**
     * input을 위치에 처리하기 위한 ref
     */
    rangeRef: import("react").MutableRefObject<Range | undefined>;
    /**
     * editable container에 height 기반으로 줄 수 계산
     */
    lineNum: number;
    /**
     * parameter로 받은 container style
     */
    componentStyle: {
        container: {
            display: string;
            backgroundColor: string;
            flexShrink: number;
            width: string;
            height: string;
            overflowY: string;
            borderWidth: string;
            borderColor: string;
            borderRadius: string;
        };
        baseText: {
            fontFamily: string;
            fontSize: string;
            lineHeight: string;
        };
        lineContainer: {
            display: string;
            flexDirection: string;
            flexShrink: number;
            padding: string;
            width: string;
            height: string;
            minHeight: string;
            backgroundColor: string;
        };
        lineItemBox: {
            display: string;
            justifyContent: string;
            alignItems: string;
            width: string;
            padding: string;
            backgroundColor: string;
        };
        lineItemText: {
            fontFamily: string;
            fontSize: string;
            fontWeight: number;
            color: string;
        };
        editorOuter: {
            height: string;
            width: string;
            margin: string;
            padding: string;
        };
        editorInner: {
            width: string;
            height: string;
        };
        "editorInner:focus": {
            outline: string;
        };
    };
    /**
     * 커서 위치 저장을 위한 핸들러
     */
    handleBlurEditableBox: () => void;
    /**
     * editable container 에
     */
    handleInputEditableBox: () => void;
    /**
     * 작성 가능한 박스 외부 클릭시 마지막줄 포커스
     */
    handleClickEditableOuterBox: () => void;
    /**
     * 외부에서 editable container에 아이템 추가를 위한 핸들러
     */
    addHighlightSpan: ({ text, styleKey, spanProperty, }: {
        text: string;
        styleKey?: string | undefined;
        spanProperty?: Partial<Pick<HTMLSpanElement, "accessKey" | "autocapitalize" | "className" | "dir" | "draggable" | "hidden" | "id" | "lang" | "spellcheck" | "tabIndex" | "title" | "translate">> | undefined;
    }) => void;
};
export {};
