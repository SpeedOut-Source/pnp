// declaring module will allow typescript to import the module
declare module "thousands-counter" {
  interface ThousandsCounterOptions {
    digits?: number;
    uppercase?: boolean;
  }

  const tc: (
    count: number,
    options?: ThousandsCounterOptions,
  ) => string | number;
  export default tc;
}
