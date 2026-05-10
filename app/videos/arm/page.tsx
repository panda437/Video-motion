import VideoEngine from "@/components/VideoEngine";
import Scene1_TheSpark from "@/components/scenes/arm/Scene1_TheSpark";
import Scene2_TheScale from "@/components/scenes/arm/Scene2_TheScale";
import Scene3_Acorn from "@/components/scenes/arm/Scene3_Acorn";
import Scene4_RISC from "@/components/scenes/arm/Scene4_RISC";
import Scene5_PDABet from "@/components/scenes/arm/Scene5_PDABet";
import Scene6_TurkeyBarn from "@/components/scenes/arm/Scene6_TurkeyBarn";
import Scene7_TheFailure from "@/components/scenes/arm/Scene7_TheFailure";
import Scene8_ThePivot from "@/components/scenes/arm/Scene8_ThePivot";
import Scene9_TheMultiplier from "@/components/scenes/arm/Scene9_TheMultiplier";
import Scene10_ThePawn from "@/components/scenes/arm/Scene10_ThePawn";
import Scene11_TheRailroad from "@/components/scenes/arm/Scene11_TheRailroad";
import Scene12_TheFoundation from "@/components/scenes/arm/Scene12_TheFoundation";

// Accurate durations mapped to Whisper timestamps from "ARM audio.m4a"
const SCENES = [
  { id: "spark",      label: "First Try",        duration: 28240, Component: Scene1_TheSpark },
  { id: "scale",      label: "Runs the World",   duration: 71000, Component: Scene2_TheScale },
  { id: "acorn",      label: "Acorn Legacy",     duration: 44000, Component: Scene3_Acorn },
  { id: "risc",       label: "RISC Design",      duration: 34000, Component: Scene4_RISC },
  { id: "pda",        label: "Power Advantage",  duration: 60000, Component: Scene5_PDABet },
  { id: "barn",       label: "The Turkey Barn",  duration: 19000, Component: Scene6_TurkeyBarn },
  { id: "failure",    label: "Newton Failure",   duration: 28000, Component: Scene7_TheFailure },
  { id: "pivot",      label: "The License",      duration: 55000, Component: Scene8_ThePivot },
  { id: "multiplier", label: "Royalty Model",    duration: 94000, Component: Scene9_TheMultiplier },
  { id: "pawn",       label: "Geopolitics",      duration: 44000, Component: Scene10_ThePawn },
  { id: "railroad",   label: "Infrastructure",   duration: 40000, Component: Scene11_TheRailroad },
  { id: "foundation", label: "Final Moat",       duration: 61840, Component: Scene12_TheFoundation },
];

export default function ARMVideoPage() {
  return <VideoEngine scenes={SCENES} />;
}
