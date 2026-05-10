import VideoEngine from "@/components/VideoEngine";
import Scene1_TheGift from "@/components/scenes/toyota/Scene1_TheGift";
import Scene2_TheCrash from "@/components/scenes/toyota/Scene2_TheCrash";
import Scene3_TheChaos from "@/components/scenes/toyota/Scene3_TheChaos";
import Scene4_TheMiracle from "@/components/scenes/toyota/Scene4_TheMiracle";
import Scene5_TheInventory from "@/components/scenes/toyota/Scene5_TheInventory";
import Scene6_TheCord from "@/components/scenes/toyota/Scene6_TheCord";
import Scene7_TheRejection from "@/components/scenes/toyota/Scene7_TheRejection";
import Scene8_TheCulture from "@/components/scenes/toyota/Scene8_TheCulture";
import Scene9_TheCost from "@/components/scenes/toyota/Scene9_TheCost";
import Scene10_TheLegacy from "@/components/scenes/toyota/Scene10_TheLegacy";
import Scene11_TheMoat from "@/components/scenes/toyota/Scene11_TheMoat";

const SCENES = [
  { id: "gift",      label: "The Gift",      duration: 20300, Component: Scene1_TheGift },
  { id: "crash",     label: "The Crash",     duration: 9400,  Component: Scene2_TheCrash },
  { id: "chaos",     label: "The Chaos",     duration: 42800, Component: Scene3_TheChaos },
  { id: "miracle",   label: "The Miracle",   duration: 24400, Component: Scene4_TheMiracle },
  { id: "inventory", label: "The Inventory", duration: 37200, Component: Scene5_TheInventory },
  { id: "cord",      label: "The Cord",      duration: 24600, Component: Scene6_TheCord },
  { id: "rejection", label: "The Rejection", duration: 22600, Component: Scene7_TheRejection },
  { id: "culture",   label: "The Culture",   duration: 39800, Component: Scene8_TheCulture },
  { id: "cost",      label: "The Cost",      duration: 16500, Component: Scene9_TheCost },
  { id: "legacy",    label: "The Legacy",    duration: 8500,  Component: Scene10_TheLegacy },
  { id: "moat",      label: "The Moat",      duration: 34500, Component: Scene11_TheMoat },
];

export default function ToyotaVideoPage() {
  return <VideoEngine scenes={SCENES} />;
}
