import { CSSProperties } from "react";

export const defaultComponentStyle = {
  container: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    borderWidth: "1px",
    borderColor: "#d1d5d9",
    borderRadius: "8px",
  },

  baseText: {
    fontFamily: "Pretendard Variable",
    fontSize: "14px",
    lineHeight: "22px",
  },

  lineContainer: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    padding: "8px 0px",
    width: "32px",
    height: "max-content",
    minHeight: "100%",
    backgroundColor: "#f3f4f5",
  },
  lineItemBox: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: "0px 4px",
    backgroundColor: "background.secondary",
  },
  lineItemText: {
    fontFamily: "Pretendard Variable",
    fontSize: "12px",
    fontWeight: 400,
    color: "#6f7781",
  },

  editorOuter: {
    height: "100%",
    width: "100%",
    margin: "0px",
    padding: "8px",
  },
  editorInner: {
    width: "100%",
    height: "auto",
  },
  "editorInner:focus": {
    outline: "0px solid transparent",
  },
};

export const defaultHighlightStyle: Record<string, CSSProperties> = {
  base: {
    height: "17px",
    color: "#F25C2C",
    backgroundColor: "#FEEEE9",
    padding: "0px 4px",
  },
};
