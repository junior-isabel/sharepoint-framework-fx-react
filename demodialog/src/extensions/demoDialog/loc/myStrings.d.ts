declare interface IDemoDialogCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'DemoDialogCommandSetStrings' {
  const strings: IDemoDialogCommandSetStrings;
  export = strings;
}
