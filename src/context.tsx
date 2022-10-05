import React from "react";

export interface AppContextInterface {
  timer: number,
  break: number,
}

export const defaultContext: AppContextInterface = {
  timer:91,
  break:41,
};

export const context = React.createContext<AppContextInterface >(defaultContext);