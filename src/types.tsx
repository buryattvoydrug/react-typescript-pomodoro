export interface IPomodoro {
  timer: number,
  break: number,
}
export type TimerProps = {
  timer: number,
  break: number,
}

export type TimerState = {
  isActive: boolean,
  timerTime: number,
  breakTime: number,
  currentTimer: number,
  currentTimerName: string,
  output: string,
  total: number,
  totalHours: number,
  interval?: any,
}