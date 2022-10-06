import React, { useEffect, useRef, useState } from 'react'
import { outputProps } from '../types';
import ProgressBar from './ProgressBar';



export default function TimerOutput(props: outputProps) {
  const { totalHours, currentTimerName, output, progress } = props;
  const [width, setWidth] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setWidth(ref.current?.getBoundingClientRect().width || 0);
  }, [])
  console.log(progress);
  return (
    <>
        <div className='total__hours__timer'>{"|".repeat(totalHours)}</div>
        <div className={currentTimerName === 'break' ? "timer break" : "timer"}
             ref={ref}>
          <div className="timer__output">{output}</div>
          <ProgressBar size={width} progress={progress}/>
        </div>
    </>
  )
}
