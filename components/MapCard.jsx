const MapCard = ({ data }) => {
  return (
    <div className="min-w-[150px] p-4 rounded border-1 border-black bg-white absolute bottom-[36px]">
      <div className="flex flex-col text-md font-bold text-lg">{data.name}</div>
      <div className="flex flex-col text-md text-sm text-slate-500">
        {data.city + data.zone + data.road}
      </div>
    </div>
  );
};

export default MapCard;
