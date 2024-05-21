// import React from 'react';

// function ProgressSlide({ progress }) {
//   return (
//     <div className="progress-container">
//       <div className="progress-bar">
//         <div className="progress" style={{ width: `${progress}%` }}></div>
//         <div className="label">{progress}% Process Complete</div>
//       </div>
//     </div>
//   );
// }

// export default ProgressSlide;

import React from 'react'
import '../components/IT.css'

const ProgressSlide = ({ items }) => {
  return (
    <div className='progress-container'>
      {items.map((item, index) => (
        <div key={index} className='progress-bar'>
          <div
            className='progress'
            style={{ width: `${item.progress}%` }}
          ></div>
          <div className='label'>
           {`${item.progress}% - ${item.label}`}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProgressSlide
