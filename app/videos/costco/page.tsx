import VideoEngine from "@/components/VideoEngine";
import Scene1_Title from "@/components/scenes/Scene1_Title";
import Scene2_Numbers from "@/components/scenes/Scene2_Numbers";
import Scene3_Rule from "@/components/scenes/Scene3_Rule";
import Scene4_Origin from "@/components/scenes/Scene4_Origin";
import Scene5_Religion from "@/components/scenes/Scene5_Religion";
import Scene6_Fragility from "@/components/scenes/Scene6_Fragility";
import Scene7_Ripple from "@/components/scenes/Scene7_Ripple";
import Scene8_Close from "@/components/scenes/Scene8_Close";

const SCENES = [
  { id: "title",     label: "Title",         duration: 7000,  Component: Scene1_Title },
  { id: "numbers",   label: "The Numbers",   duration: 16000, Component: Scene2_Numbers },
  { id: "rule",      label: "The Rule",      duration: 14000, Component: Scene3_Rule },
  { id: "origin",    label: "Origin",        duration: 17000, Component: Scene4_Origin },
  { id: "religion",  label: "The Religion",  duration: 20000, Component: Scene5_Religion },
  { id: "fragility", label: "The Crack",     duration: 14000, Component: Scene6_Fragility },
  { id: "ripple",    label: "The Ripple",    duration: 17000, Component: Scene7_Ripple },
  { id: "close",     label: "Close",         duration: 15000, Component: Scene8_Close },
];

export default function CostcoVideoPage() {
  return <VideoEngine scenes={SCENES} />;
}
