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
}

export const ProposalCard: FC<props> = ({ proposal, showCrown, onClick }) => {
  return (
    <div className="relative">
      <button
        className=" hover:scale-110 hover:bg-green-200 transition-all absolute bottom-3 bg-green-100 rounded-full border left-1/2 -translate-x-1/2"
        onClick={onClick}
      >
        <Tick />
      </button>
      {showCrown && (
        <div className="absolute -top-16 right-9 rotate-12">
          <Crown />
        </div>
      )}
      <div className="border w-[500px] h-[500px] overflow-auto rounded-md p-5 bg-gray-100 shadow pb-12">
        {proposal.map(({ title, description }) => (
          <div key={title} className="mb-3">
            <h1 className="font-bold">{title}</h1>
            <span>{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
