import { motion } from "framer-motion";

const MapCard = ({ data, isOpen }) => {
  return (
    <motion.div
      className="absolute bottom-[36px]"
      initial="hidden"
      animate={isOpen ? "open" : "closed"}
      variants={{
        closed: {
          opacity: 0,
          scale: 0.5,
        },
        open: {
          opacity: 1,
          sacle: 1,
        },
      }}
    >
      <div className="min-w-[150px] p-4 rounded border-1 border-black bg-white">
        <div className="flex flex-col text-md font-bold text-lg">
          {data.name}
        </div>
        <div className="flex flex-col text-md text-sm text-slate-500">
          {data.city + data.zone + data.road}
        </div>
      </div>
    </motion.div>
  );
};

export default MapCard;
