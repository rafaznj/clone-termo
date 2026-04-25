import { RiResetLeftFill } from "react-icons/ri";

export default function ResetButton() {
  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => window.location.reload()}
        className="text-lg text-white flex items-center gap-2 px-4 py-2 rounded-md 
             bg-tiles-background 
             border border-transparent 
             hover:border-white 
             hover:bg-tiles-background-hover 
             transition"
      >
        <span>Reiniciar</span>
        <RiResetLeftFill />
      </button>
    </div>
  );
}
