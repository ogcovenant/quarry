import {
  darkDefaultTheme,
  lightDefaultTheme,
  type Theme,
} from "@blocknote/mantine";

const lightNoteTheme = {
  colors: {
    editor: {
      text: "var(--foreground)",
      background: "var(--card)",
    },
    menu: {
      text: "var(--foreground)",
      background: "var(--card)",
    },
    tooltip: {
      text: "var(--light-neutral)",
      background: "var(--primary)",
    },
    hovered: {
      text: "var(--foreground)",
      background: "var(--muted)",
    },
    selected: {
      text: "var(--light-neutral)",
      background: "var(--primary)",
    },
    disabled: {
      text: "var(--secondary)",
      background: "var(--muted)",
    },
    shadow: "var(--border)",
    border: "var(--border)",
    sideMenu: "var(--secondary)",
    highlights: lightDefaultTheme.colors!.highlights,
  },
  borderRadius: 6,
  fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
} satisfies Theme;

const darkNoteTheme = {
  ...lightNoteTheme,
  colors: {
    ...lightNoteTheme.colors,
    editor: {
      text: "#f7f6f3",
      background: "#2f2e2a",
    },
    menu: {
      text: "#f7f6f3",
      background: "#37352f",
    },
    tooltip: {
      text: "#37352f",
      background: "#f1f1ef",
    },
    hovered: {
      text: "#f7f6f3",
      background: "#45433e",
    },
    selected: {
      text: "#ffffff",
      background: "#9a6b45",
    },
    disabled: {
      text: "#9b9995",
      background: "#45433e",
    },
    shadow: "#1f1e1b",
    border: "#55524c",
    sideMenu: "#c7c5c1",
    highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

export const noteTheme = {
  light: lightNoteTheme,
  dark: darkNoteTheme,
};
