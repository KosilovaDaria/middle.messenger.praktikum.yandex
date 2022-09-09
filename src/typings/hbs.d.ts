declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars';
  // const template: any;
  const template: TemplateDelegate;
  export default template;
}
