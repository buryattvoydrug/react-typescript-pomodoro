import React from "react";

export interface AppContextInterface {
  timer: number,
  break: number,
  changeContext?: () => void,
}

export const defaultContext: AppContextInterface = {
  timer:45,
  break:0,
  changeContext: () => {}
};

export const context = React.createContext(defaultContext);