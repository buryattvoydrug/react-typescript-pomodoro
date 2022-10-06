import '../scss/progressbar.scss';
import { ProgressBarProps } from '../types';

export default function ProgressBar(props:ProgressBarProps) {
  const { size, progress } = props;
  const center = size / 2,
        radius = center - 10,
        dashArray = 2 * Math.PI * radius,
        dashOffset = dashArray * ((100 - progress) / 100);
  return (
    <div className='progress-bar'>
      <svg className="svg-object" >
          <circle
            className='progress'
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={'#fff'}
            strokeWidth={10}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        </svg>
    </div>
  )
}
