import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;
      itemBackground: string;
      heading: string;
      text: string;
      switch: string;
    };
  }
}
