// export default GoalCard
import React, { useState } from "react";

const GoalCard = ({ data }) => {
  if (!data) return null; // wait for backend data

  const [period] = useState("month"); // 'week', 'month', 'year'

  // Calculate progress from saved and target
  const saved = data.saved || 0;
  const target = data.target || 1;
  const pct = Math.min(100, Math.round((saved / target) * 100));

  return (
    <div className="w-full max-w-[700px] bg-white rounded-[10px] shadow p-4 gap-4 flex flex-col hover:scale-105 hover:shadow-lg transition-transform duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{data.title}</h3>
      </div>

      {/* Progress section */}
      <div className="flex flex-1 items-center gap-4 relative">
        {/* Circular progress */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(#FFA500 0deg ${(
              (pct / 100) *
              360
            ).toFixed(2)}deg, #FFD8A8 ${(pct / 100) * 360}deg 360deg)`,
          }}
        >
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
            <span className="text-xl font-medium">🚗</span>
          </div>
        </div>

        {/* Goal info */}
        <div className="flex flex-col justify-between">
          <span className='text-black text-base font-medium font-["Inter"]'>
            {data.title}
          </span>

          <div className="inline-flex bg-amber-50 rounded-full ring ring-amber-500 px-2 py-0.5">
            <span className='text-amber-700 text-[10px] font-normal font-["Inter"] truncate'>
              Month: €{data.monthlyTarget || 0}/€{target}
            </span>
          </div>
        </div>

        {/* Total saved on right corner */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
          <span className='text-black text-base font-bold font-["Inter"]'>
            €{saved}
          </span>
          <span className='text-black text-sm font-normal font-["Inter"]'>
            of €{target}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
