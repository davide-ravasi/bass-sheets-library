import "react";

declare module "react" {
  interface ButtonHTMLAttributes<T> {
    /** Invoker Commands API — https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command */
    command?:
      | "show-modal"
      | "close"
      | "request-close"
      | "show-popover"
      | "hide-popover"
      | "toggle-popover"
      | (string & {});
    /** ID of the element to control (`commandfor` in HTML) */
    commandfor?: string;
  }
}

export {};
