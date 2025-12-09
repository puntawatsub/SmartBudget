const AnalyticalOverview = ({ data }) => {
  if (!data) return null;

  const stats = [
    {
      title: "Income",
      value: `€${data.income}`,
      gradient:
        "from 12deg at 52.47% 54.14%, rgba(72,255,84,0.25) 0deg, rgba(202,255,235,0.25) 360deg",
      blurLeft: "-5.5px",
      blurTop: "87.5px",
    },
    {
      title: "Expenses",
      value: `€${data.expenses}`,
      gradient:
        "from 12deg at 50% 50%, rgba(72,215,255,0.25) 0deg, rgba(202,255,235,0.25) 360deg",
      blurLeft: "0px",
      blurTop: "100px",
    },
    {
      title: "Total Balance",
      value: `€${data.income - data.expenses}`,
      gradient:
        "from 12deg at 50% 50%, rgba(255,166,72,0.25) 0deg, rgba(251,181,152,0.25) 360deg",
      blurLeft: "0px",
      blurTop: "100px",
    },
    {
      title: "Total Savings",
      value: `€${data.savings}`,
      gradient:
        "from 12deg at 50% 50%, rgba(78,72,255,0.25) 0deg, rgba(202,245,255,0.25) 360deg",
      blurLeft: "0px",
      blurTop: "100px",
    },
  ];

  return (
    <div className="w-full max-w-[1410px] mx-auto">
      <h2 className="text-black text-sm font-medium font-['Inter'] mb-3">
        Analytical Overview
      </h2>
      <div className="w-full bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-wrap">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="w-full sm:w-1/2 lg:w-1/4 h-40 relative border-r lg:last:border-r-0 border-gray-100 overflow-hidden"
          >
            {/* Gradient blur */}
            <div
              className="absolute w-56 h-72 blur-2xl rounded-full"
              style={{
                background: `conic-gradient(${stat.gradient})`,
                left: stat.blurLeft,
                top: stat.blurTop,
              }}
            />
            {/* Title & Value */}
            <div className="absolute left-[37px] top-[40px] flex flex-col gap-1">
              <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-10">
                {stat.title}
              </div>
              <div className="text-black text-3xl font-medium font-['Inter'] leading-10">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticalOverview;
