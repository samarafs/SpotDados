import React from 'react'

function ListenerStatistic({message,statistic, color, subtitle}) {
  return (
    <div
      className={`p-5 shadow-2xl ${color} w-[332px] h-[210px] rounded-lg `}
    >
      <div className='flex-column justify-center'>
        <h1 className="font-sans font-bold text-xl text-center text-white capitalize">
          {message}
        </h1>
        <h1 className="text-center text-white text-4xl font-extrabold font-sans mt-8">
          {statistic}
        </h1>
        <h1 className="text-center text-white text-lg mt-4">
          {subtitle}
        </h1>
      </div>
    </div>
  );
}

export default ListenerStatistic