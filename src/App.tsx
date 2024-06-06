import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { C1 } from "./candidates/C1";
import { C10 } from "./candidates/C10";
import { C11 } from "./candidates/C11";
import { C12 } from "./candidates/C12";
import { C13 } from "./candidates/C13";
import { C14 } from "./candidates/C14";
import { C15 } from "./candidates/C15";
import { C16 } from "./candidates/C16";
import { C2 } from "./candidates/C2";
import { C3 } from "./candidates/C3";
import { C4 } from "./candidates/C4";
import { C5 } from "./candidates/C5";
import { C6 } from "./candidates/C6";
import { C7 } from "./candidates/C7";
import { C8 } from "./candidates/C8";
import { C9 } from "./candidates/C9";
import { Progress } from "./components/progress";
import { Candidate, ProposalCard } from "./components/proposalCard";

const candidates = [
  C1,
  C2,
  C3,
  C4,
  C5,
  C6,
  C7,
  C8,
  C9,
  C10,
  C11,
  C12,
  C13,
  C14,
  C15,
  C16,
].sort(() => Math.random() - 0.5);
const maxSteps = candidates.length - 1;

function App() {
  const [currentLeft, setCurrentLeft] = useState(0);
  const [currentRight, setCurrentRight] = useState(1);
  const [step, setStep] = useState(1);
  const [champion, setChampion] = useState<null | "left" | "right">(null);
  const [winner, setWinner] = useState<null | Candidate>(null);
  const [startModal, setStartModal] = useState<boolean>(true);

  const closeStartModal = () => setStartModal(false);

  const chooseProposal = (chosen: "left" | "right") => {
    console.log({ currentLeft, currentRight, step, champion, winner });
    setChampion(chosen);
    if (step === maxSteps) {
      setWinner(candidates[chosen === "left" ? currentLeft : currentRight]);
      return;
    }
    setStep(step + 1);
    chosen === "left" ? setCurrentRight(step + 1) : setCurrentLeft(step + 1);
  };

  return (
    <div>
      <AnimatePresence initial={false}>
        <header className="bg-white w-full h-screen flex items-center justify-center gap-10 overflow-clip">
          <ProposalCard
            key={candidates[currentLeft].name}
            proposal={candidates[currentLeft].proposal}
            showCrown={champion === "left"}
            onClick={() => chooseProposal("left")}
            position="left"
          />
          <ProposalCard
            key={candidates[currentRight].name}
            proposal={candidates[currentRight].proposal}
            showCrown={champion === "right"}
            onClick={() => chooseProposal("right")}
            position="right"
          />
        </header>
      </AnimatePresence>
      {!winner && (
        <div className="absolute w-full bottom-0">
          <Progress value={((step - 1) / (maxSteps - 1)) * 100} />
        </div>
      )}
      {startModal && (
        <div
          className="absolute inset-0 bg-blue-100/50 flex justify-center items-center"
          onClick={closeStartModal}
        >
          <div className="relative w-[500px] h-[410px] rounded bg-white shadow-md text-left p-5">
            <h1 className="font-bold text-3xl mt-5 mb-2 text-center">
              A quien voto?
            </h1>
            La forma de decidir cual es tu candidato ideal con el menor sesgo
            politico posible.
            <div className="font-bold text-lg mt-5">Instrucciones:</div>
            Acontinuacion se te presentaran propuestas de dos candidatos, con
            toda la informacion anonimizada y sin genero. Elegi la propuesta que
            mas te guste y aparecera una nueva que reemplazara la otra.
            <br />
            Cuando acabes todos los pasos (16 en total), te mostraremos cual es
            el candidato asociado a la propuesta que mas te gusto.
            <div className="w-full text-center">
              <button
                onClick={closeStartModal}
                className="bg-green-500 hover:bg-green-700 transition-colors text-white font-bold px-3 rounded-md mt-10 mx-auto"
              >
                Empezar
              </button>
            </div>
          </div>
        </div>
      )}
      {winner && (
        <div className="absolute inset-0 bg-gray-200 flex justify-center items-center">
          <div className="w-[500px] h-[500px] rounded bg-white shadow-md text-center">
            <div className="mt-12">Tu candidato elegido es</div>
            <a
              href={winner.urlCandidate}
              className="font-bold text-3xl underline text-blue-500"
            >
              {winner.name}
            </a>
            <div className="mt-6">del partido</div>
            <a
              href={winner.urlPartido}
              className="font-bold text-3xl underline text-blue-500"
            >
              {winner.partido}
            </a>
            <div className="flex justify-center gap-3 mt-12">
              <img
                src={winner.candidateImageUrl}
                alt={winner.name}
                className="rounded-full w-40 h-40 object-cover"
              />
              <img
                src={winner.partidoImageUrl}
                alt={winner.name}
                className="rounded-full w-40 h-40 object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// TODO: Add a button to restart the process
// TODO: Add a button to go back to the previous step
// TODO: Add a button to skip both proposals (only if there is no champion)
