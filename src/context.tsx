import React from "react";

interface currentTimerI {
  minutes: number,
  seconds: number,
}
export interface AppContextInterface {
  currentTimer: currentTimerI,
}

export const defaultContext: AppContextInterface = {
  currentTimer: {
    minutes:45,
    seconds:0,
  },
};

export const context = React.createContext<AppContextInterface>(defaultContext);