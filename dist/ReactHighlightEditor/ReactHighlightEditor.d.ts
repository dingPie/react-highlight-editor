/// <reference types="react" />
import { useReactHighlightEditor } from "./hooks/useReactHighlightEditor";
interface ReactHighlightEditorProps extends ReturnType<typeof useReactHighlightEditor> {
    containerProps?: Omit<React.ComponentProps<"div">, "onClick" | "style">;
    lineContainerProps?: Omit<React.ComponentProps<"div">, "style">;
    editorOuterProps?: Omit<React.ComponentProps<"div">, "onClick" | "style">;
    editorInnerProps?: Omit<React.ComponentProps<"div">, "onBlur" | "onInput" | "onClick" | "style">;
}
declare const _default: import("react").MemoExoticComponent<({ containerProps, lineContainerProps, editorInnerProps, editorOuterProps, ...props }: ReactHighlightEditorProps) => import("react/jsx-runtime").JSX.Element>;
export default _default;
