export interface IPomodoro {
  timer: number,
  break: number,
}
export type TimerProps = {
  timer: number,
  break: number,
}
export type ProgressBarProps = {
  size: number,
  progress: number,
}
export type outputProps = {
  totalHours: number,
  currentTimerName: string,
  output: string,
  progress: number,
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