declare interface IListUsersCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ListUsersCommandSetStrings' {
  const strings: IListUsersCommandSetStrings;
  export = strings;
}
