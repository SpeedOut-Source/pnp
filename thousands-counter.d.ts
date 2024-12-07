// declaring module will allow typescript to import the module
declare module "thousands-counter" {
  // typing module default export as `any` will allow you to access its members without compiler warning
  var ts: any;
  export default ts;
}
