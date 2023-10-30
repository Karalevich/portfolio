/// <reference types="cypress" />
declare module '*.png'
export {}

declare global {
  namespace Cypress {
    interface Chainable {

      /**
       * Find a single entity via database query
       */
      getEditor(): Chainable;
      upload(subject: FileContents, file: File, fileName?: string): any;

    }
  }
}