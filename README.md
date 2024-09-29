# React Highlight Editor

## 설명

content-editable 속성을 이용하여 간단하게 만든 만든 에디터입니다.
태그나 멘션과 같은 텍스트를 에디터 내에 추가 가능하며,
리액트 환경에 맞게 객체로 손쉽게 커스텀 가능합니다.

<br />
<br />

## 사용법

### 기본 사용법

미리 정의해둔 base tag로 스타일링 됩니다.

```ts
import {
  ReactHighlightEditor,
  useReactHighlightEditor,
} from 'react-highlight-editor';



const Component = () => {
  const useTagEditorBoxMethod = useReactHighlightEditor({});
  const { addHighlightSpan } = useTagEditorBoxMethod;

  return (
    <>
        <Button
            onClick={() => {addHighlightSpan({ text: '추가할 텍스트'})}}
        >
            아이템 추가
        </Button>
        <ReactHighlightEditor {...useTagEditorBoxMethod} />
    <>
  )
}
```

<br />

### 하이라이트 커스텀

미리 정의해둔 base tag로 스타일링 됩니다.

```ts
import {
  ReactHighlightEditor,
  useReactHighlightEditor,
} from 'react-highlight-editor';



const Component = () => {
  const useTagEditorBoxMethod = useReactHighlightEditor({
    highlightStyleProps: {
      second: {
        background: 'red',
      },

      other: {
        background: 'blues',
      },
    },
  });
  const { addHighlightSpan } = useTagEditorBoxMethod;

  return (
    <>
        <Button
            onClick={() => {addHighlightSpan({ text: '빨간바탕', spanProperty: 'second' })}}
        >
            second 추가
        </Button>

        <Button
            onClick={() => {addHighlightSpan({ text: '파란바탕', spanProperty: 'other' })}}
        >
            other 추가
        </Button>

        <ReactHighlightEditor {...useTagEditorBoxMethod} />
    <>
  )
}
```

<br />

이 외에도 `spanProperty` 를 이용하여 생성할 span 태그에 직접 값을 할당 가능합니다.
readonly 및 이미 사용되는 값들은 지원하지 않습니다.
