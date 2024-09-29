import { CSSProperties, useCallback, useMemo, useRef, useState } from "react";

import { kebabCase } from "lodash-es";

import {
  defaultComponentStyle,
  defaultHighlightStyle,
} from "../constants/style";
import { moveCursorToEnd } from "../utils/move-cursor-to-end";

interface useReactHighlightEditorProps {
  componentStyleProps?: typeof defaultComponentStyle;
  highlightStyleProps?: Record<string, CSSProperties>;
}

export const useReactHighlightEditor = ({
  componentStyleProps,
  highlightStyleProps,
}: useReactHighlightEditorProps) => {
  const domRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<Range | undefined>(undefined);

  const [lineNum, setLineNum] = useState(1);

  const componentStyle = useMemo(() => {
    return {
      ...defaultComponentStyle,
      ...componentStyleProps,
    };
  }, [componentStyleProps]);

  const highlightStyle = useMemo(
    () => ({
      ...defaultHighlightStyle,
      ...highlightStyleProps,
    }),
    [highlightStyleProps]
  );

  const cssTextObj = useMemo(() => {
    const result: Record<string, string> = {};
    for (const key in highlightStyle) {
      const cssText = Object.entries(highlightStyle[key] ?? {}).reduce(
        (acc, [key, value]) => {
          return (acc += `${kebabCase(key)}: ${value}; `);
        },
        ""
      );

      result[key] = cssText;
    }
    return result;
  }, [highlightStyle]);

  const baseLineHeight =
    parseInt(componentStyle.baseText?.lineHeight, 10) ?? 22;

  /**
   * 커서 위치 저장을 위한 핸들러
   */
  const handleBlurEditableBox = useCallback(() => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    rangeRef.current = range;
  }, []);

  /**
   * editable container 에
   */
  const handleInputEditableBox = useCallback(() => {
    if (!domRef?.current) return;

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    // P_MEMO 드래그해서 삭제시 꼬리쪽에 걸친 요소는 X.
    const node = range?.commonAncestorContainer?.parentElement;
    const target =
      node && node?.innerHTML !== "&nbsp;" ? node : node?.nextElementSibling;

    const id = target?.id ?? "";
    const textContent = target?.textContent ?? "";
    const idString = id?.split("_").at(-1);

    if (!!idString && idString !== textContent) {
      target?.remove();
    }

    const newLineNum = domRef.current.offsetHeight / baseLineHeight;
    setLineNum(newLineNum);
  }, [baseLineHeight]);

  /**
   * 작성 가능한 박스 외부 클릭시 마지막줄 포커스
   */
  const handleClickEditableOuterBox = useCallback(() => {
    if (!domRef.current) return;
    domRef.current?.focus();
    moveCursorToEnd(domRef.current);
  }, []);

  /**
   * 외부에서 editable container에 아이템 추가를 위한 핸들러
   */
  const handleClickAddIndexItem = useCallback(
    ({
      text,
      styleKey = "base",
      spanProperty,
    }: {
      text: string;
      styleKey?: string;
      spanProperty?: WritableSpanPropertyType;
    }) => {
      if (!domRef.current) return;
      const range = rangeRef.current;

      // 이미 존재하는 하이라이트에는 추가로 못넣게 막음
      const id = range?.commonAncestorContainer.parentElement?.id;
      if (id) return;

      const newSpan = document.createElement("span");

      newSpan.id = `${Date.now()}_${text}`;
      newSpan.style.cssText = cssTextObj[styleKey] ?? "";
      newSpan.textContent = text;

      if (spanProperty) {
        for (const k in spanProperty) {
          const key = k as keyof typeof spanProperty;
          newSpan[key] = spanProperty[key] as never;
        }
      }

      // P_TODO: 이거 마지막에 추가했으면 마지막으로 커서 옮기는거..일단 구현안됨.

      const space = document.createTextNode("\u00a0"); // 공백 문자
      const trailingSpace = document.createElement("span"); // 이렇게 처리해야 뒤 콘텐츠 처리 가능.
      trailingSpace.innerHTML = "&nbsp"; //

      if (range) {
        range.insertNode(space);
        range.insertNode(newSpan);
        range.insertNode(trailingSpace);
      } else {
        domRef.current?.appendChild(newSpan);
        domRef.current?.appendChild(trailingSpace);
      }
      const newLineNum = domRef.current.offsetHeight / baseLineHeight;
      setLineNum(newLineNum);
    },
    [baseLineHeight, cssTextObj]
  );

  return {
    /**
     * editable container에 접근하기 위한 ref
     */
    domRef,
    /**
     * input을 위치에 처리하기 위한 ref
     */
    rangeRef,
    /**
     * editable container에 height 기반으로 줄 수 계산
     */
    lineNum,
    /**
     * parameter로 받은 container style
     */
    componentStyle,
    /**
     * 커서 위치 저장을 위한 핸들러
     */
    handleBlurEditableBox,
    /**
     * editable container 에
     */
    handleInputEditableBox,
    /**
     * 작성 가능한 박스 외부 클릭시 마지막줄 포커스
     */
    handleClickEditableOuterBox,
    /**
     * 외부에서 editable container에 아이템 추가를 위한 핸들러
     */
    handleClickAddIndexItem,
  };
};
