declare module '*.jsx' {
  const Component: () => import('react').ReactElement;
  export default Component;
}
