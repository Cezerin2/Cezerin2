/// <reference types="react-scripts" />

declare module "*/style.sass" {
  const content: Record<string, import("react").CSSProperties>

  export default content
}
