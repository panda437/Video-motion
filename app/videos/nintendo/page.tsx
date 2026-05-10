import VideoEngine from "@/components/VideoEngine";
import Scene1_Title      from "@/components/scenes/nintendo/Scene1_Title";
import Scene2_ArmsRace   from "@/components/scenes/nintendo/Scene2_ArmsRace";
import Scene3_Pivot      from "@/components/scenes/nintendo/Scene3_Pivot";
import Scene4_Yokoi      from "@/components/scenes/nintendo/Scene4_Yokoi";
import Scene5_Playbook   from "@/components/scenes/nintendo/Scene5_Playbook";
import Scene6_Failure    from "@/components/scenes/nintendo/Scene6_Failure";
import Scene7_Impact     from "@/components/scenes/nintendo/Scene7_Impact";
import Scene8_Close      from "@/components/scenes/nintendo/Scene8_Close";

// Durations aligned to nintendo audio file
// Whisper transcript: 277.38s spoken words, 282.50s page runtime with end-card buffer.
const SCENES = [
  { id: "title",     label: "Title",          duration: 16480, Component: Scene1_Title },
  { id: "armsrace",  label: "The Arms Race",  duration: 34680, Component: Scene2_ArmsRace },
  { id: "pivot",     label: "The Pivot",      duration: 27900, Component: Scene3_Pivot },
  { id: "yokoi",     label: "Yokoi",          duration: 52440, Component: Scene4_Yokoi },
  { id: "playbook",  label: "The Playbook",   duration: 45680, Component: Scene5_Playbook },
  { id: "failure",   label: "Wii U",          duration: 43780, Component: Scene6_Failure },
  { id: "impact",    label: "The Impact",     duration: 39000, Component: Scene7_Impact },
  { id: "close",     label: "Close",          duration: 22540, Component: Scene8_Close },
];

export default function NintendoVideoPage() {
  return <VideoEngine scenes={SCENES} />;
}
