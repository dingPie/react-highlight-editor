import { CSSProperties, memo, useMemo } from "react";

import { useReactHighlightEditor } from "./hooks/useReactHighlightEditor";

interface ReactHighlightEditorProps
  extends ReturnType<typeof useReactHighlightEditor> {
  containerProps?: Omit<React.ComponentProps<"div">, "onClick" | "style">;
  lineContainerProps?: Omit<React.ComponentProps<"div">, "style">;
  editorOuterProps?: Omit<React.ComponentProps<"div">, "onClick" | "style">;
  editorInnerProps?: Omit<
    React.ComponentProps<"div">,
    "onBlur" | "onInput" | "onClick" | "style"
  >;
}

/**
 * 계산식 작성 모달
 */
const ReactHighlightEditor = ({
  containerProps,
  lineContainerProps,
  editorInnerProps,
  editorOuterProps,
  ...props
}: ReactHighlightEditorProps) => {
  const {
    domRef,
    lineNum,
    componentStyle,
    handleBlurEditableBox,
    handleInputEditableBox,
    handleClickEditableOuterBox,
  } = props;

  const baseLineHeight = componentStyle.baseText?.lineHeight ?? "22px";

  const lineList = useMemo(() => Array(lineNum).fill(0), [lineNum]);

  return (
    <div
      className="tag-editor-container"
      style={componentStyle.container as CSSProperties}
      {...containerProps}
    >
      {/* 몇줄인지 표기 */}
      <div
        className="tag-editor-line-container"
        style={componentStyle.lineContainer as CSSProperties}
        {...lineContainerProps}
      >
        {lineList.map((_, idx) => (
          <div
            key={idx}
            className="tag-editor-line-item-box"
            style={{ ...componentStyle.lineItemBox, height: baseLineHeight }}
          >
            <span
              className="tag-editor-line-item-text"
              style={{
                ...componentStyle.lineItemText,
                lineHeight: baseLineHeight,
              }}
            >
              {idx + 1}
            </span>
          </div>
        ))}
      </div>

      {/* 에디터 박스 */}

      <div
        className="tag-editor-editor-outer"
        onClick={handleClickEditableOuterBox}
        style={componentStyle.editorOuter}
        {...editorOuterProps}
      >
        {/* 실제써지는 영역 */}
        <div
          className="tag-editor-editor-inner"
          ref={domRef}
          contentEditable
          style={{
            ...componentStyle.editorInner,
            ...componentStyle["editorInner:focus"],
            ...componentStyle.baseText,
            minHeight: baseLineHeight,
          }}
          onClick={(e) => e.stopPropagation()}
          onBlur={handleBlurEditableBox}
          onInput={handleInputEditableBox}
          {...editorInnerProps}
        />
      </div>
    </div>
  );
};

export default memo(ReactHighlightEditor);
