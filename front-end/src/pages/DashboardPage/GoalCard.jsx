import React, { useState } from "react";

const GoalCard = ({ data }) => {
  if (!data) return null;

  const [period] = useState("month");

  const saved = data.saved || 0;
  const target = data.target || 1;
  const pct = Math.min(100, Math.round((saved / target) * 100));

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-[10px] shadow p-4 gap-4 flex flex-col hover:scale-105 hover:shadow-lg transition-transform duration-300">
      {/* Title */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
          {data.title}
        </h3>
      </div>

      {/* Progress + Info  */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Circular Progress */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `conic-gradient(#FFA500 0deg ${
              (pct / 100) * 360
            }deg, #FFD8A8 ${(pct / 100) * 360}deg 360deg)`,
          }}
        >
          <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-gray-700 flex items-center justify-center transition-colors duration-300">
            <span className="text-xl font-medium">⌛</span>
          </div>
        </div>

        {/* Monthly Target + Saved/Target */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
          {/* Monthly badge */}
          <div className="inline-flex bg-amber-50 dark:bg-amber-800 rounded-full ring ring-amber-500 dark:ring-amber-400 px-3 py-1 mb-2 sm:mb-0">
            <span className='text-amber-700 dark:text-amber-200 text-sm font-normal font-["Inter"] whitespace-nowrap'>
              Month: €{data.monthlyTarget || 0}/€{target}
            </span>
          </div>

          {/* Saved section */}
          <div className="flex flex-col items-start sm:items-end">
            <span className='text-black dark:text-gray-100 text-base font-bold font-["Inter"]'>
              €{saved}
            </span>
            <span className='text-black dark:text-gray-300 text-sm font-normal font-["Inter"] whitespace-nowrap'>
              of €{target}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
