import {
  darkDefaultTheme,
  lightDefaultTheme,
  type Theme,
} from "@blocknote/mantine";

const lightNoteTheme = {
  colors: {
    editor: {
      text: "#1f1a17",
      background: "#fffaf4",
    },
    menu: {
      text: "#1f1a17",
      background: "#fffaf4",
    },
    tooltip: {
      text: "#fffaf4",
      background: "#4b362f",
    },
    hovered: {
      text: "#1f1a17",
      background: "#e4d8cc",
    },
    selected: {
      text: "#fffaf4",
      background: "#6b4f45",
    },
    disabled: {
      text: "#8a7b70",
      background: "#e4d8cc",
    },
    shadow: "#d6c8ba",
    border: "#d6c8ba",
    sideMenu: "#6b4f45",
    highlights: lightDefaultTheme.colors!.highlights,
  },
  borderRadius: 8,
  fontFamily: '"IBM Plex Sans", sans-serif',
} satisfies Theme;

const darkNoteTheme = {
  ...lightNoteTheme,
  colors: {
    ...lightNoteTheme.colors,
    editor: {
      text: "#f3eee8",
      background: "#1f1a17",
    },
    menu: {
      text: "#f3eee8",
      background: "#2b221e",
    },
    tooltip: {
      text: "#1f1a17",
      background: "#d6c8ba",
    },
    hovered: {
      text: "#f3eee8",
      background: "#4b362f",
    },
    selected: {
      text: "#1f1a17",
      background: "#a67c52",
    },
    disabled: {
      text: "#8a7b70",
      background: "#3b2a24",
    },
    shadow: "#120f0d",
    border: "#4b362f",
    sideMenu: "#d6c8ba",
    highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

export const noteTheme = {
  light: lightNoteTheme,
  dark: darkNoteTheme,
};
