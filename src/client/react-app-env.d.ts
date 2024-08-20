// file extensions declaration for TypeScript so we could import images:
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}
// declare module "*.svg";
// declare module "*.jpeg";

declare module "react-dom/client";
