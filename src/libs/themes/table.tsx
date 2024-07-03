import { Interpolation, Theme } from "@emotion/react";

const thead = { width: "100%" } as Interpolation<Theme>;

const tr = { width: "100%" } as Interpolation<Theme>;

const themes = {
  thead: { width: "100%" } as Interpolation<Theme>,
  tr: { width: "100%" } as Interpolation<Theme>,
  th: {
    padding: 8,
    color: "#888",
    backgroundColor: "#f8f8f8",
    fontSize: 13,
    borderBottom: "1px solid #e2e2e2",
    borderRight: "1px solid #e2e2e2",
    fontWeight: "400",
    textAlign: "center",

    "@media print": { fontSize: 12 },
  } as Interpolation<Theme>,
};
