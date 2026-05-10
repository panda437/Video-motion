import VideoEngine from "@/components/VideoEngine";
import Scene1_Title      from "@/components/scenes/asml/Scene1_Title";
import Scene2_Machine    from "@/components/scenes/asml/Scene2_Machine";
import Scene3_Physics    from "@/components/scenes/asml/Scene3_Physics";
import Scene4_HowItWorks from "@/components/scenes/asml/Scene4_HowItWorks";
import Scene5_Origin     from "@/components/scenes/asml/Scene5_Origin";
import Scene6_TwoBets    from "@/components/scenes/asml/Scene6_TwoBets";
import Scene7_LockIn     from "@/components/scenes/asml/Scene7_LockIn";
import Scene8_Geopolitics from "@/components/scenes/asml/Scene8_Geopolitics";
import Scene9_Lesson     from "@/components/scenes/asml/Scene9_Lesson";

// Durations synced to Whisper transcript of ASML_clean.m4a (429.4s total after gap removal).
const SCENES = [
  { id: "title",    label: "Title",        duration: 40000,  Component: Scene1_Title },
  { id: "machine",  label: "The Machine",  duration: 22000,  Component: Scene2_Machine },
  { id: "physics",  label: "The Physics",  duration: 73000,  Component: Scene3_Physics },
  { id: "euv",      label: "How EUV Works", duration: 57000, Component: Scene4_HowItWorks },
  { id: "origin",   label: "Origin",       duration: 33000,  Component: Scene5_Origin },
  { id: "twobets",  label: "Two Bets",     duration: 52000,  Component: Scene6_TwoBets },
  { id: "lockin",   label: "Lock-in",      duration: 66000,  Component: Scene7_LockIn },
  { id: "geo",      label: "Geopolitics",  duration: 58000,  Component: Scene8_Geopolitics },
  { id: "lesson",   label: "The Lesson",   duration: 50000,  Component: Scene9_Lesson },
];

export default function ASMLVideoPage() {
  return <VideoEngine scenes={SCENES} />;
}
