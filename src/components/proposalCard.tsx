import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { Crown } from "./cronw";
import { Tick } from "./tick";

type proposalItem = {
  title: string;
  description: string;
};

export type Candidate = {
  name: string;
  partido: string;
  urlCandidate: string;
  urlPartido: string;
  candidateImageUrl: string;
  partidoImageUrl: string;
  proposal: Proposal;
};

type Proposal = proposalItem[];

interface props {
  proposal: Proposal;
  showCrown?: boolean;
  onClick?: () => void;
  position?: "left" | "right";
}

export const ProposalCard: FC<props> = ({
  proposal,
  showCrown,
  onClick,
  position,
}) => {
  return (
    <motion.div
      className="relative m-2"
      initial={{ opacity: 0, scale: 0.85, x: position === "left" ? -500 : 500 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ scale: 0.85 }}
      transition={{ duration: 0.4 }}
    >
      <button
        className="hover:scale-110 hover:bg-green-200 transition-all absolute bottom-3 bg-green-100 rounded-full border left-1/2 -translate-x-1/2"
        onClick={onClick}
      >
        <Tick />
      </button>
      <AnimatePresence>
        {showCrown && (
          <motion.div
            className="absolute md:-top-16 md:right-9 top-0 right-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <Crown />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="border md:w-[500px] md:h-[500px] w-full h-[calc(50dvh-15px)] overflow-auto md:rounded-md rounded-lg p-5 bg-gray-100 shadow pb-12">
        {proposal.map(({ title, description }) => (
          <div key={title} className="mb-3">
            <h1 className="font-bold">{title}</h1>
            <span>{description}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
