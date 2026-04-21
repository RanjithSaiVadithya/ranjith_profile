"use client";

import { useState } from "react";
import { LoadingVault } from "./components/LoadingVault";
import { HeroSection } from "./components/HeroSection";
import { CareerPreview } from "./components/CareerPreview";
import { ProjectPreview } from "./components/ProjectPreview";
import { SkillsPreview } from "./components/SkillsPreview";
import { InfraPreview } from "./components/InfraPreview";
import { FooterCLI } from "./components/FooterCLI";

export function HomeModule() {
  const [sequenceComplete, setSequenceComplete] = useState(false);

  return (
    <div className="w-full relative bg-black overflow-visible">
      {!sequenceComplete && (
        <LoadingVault onComplete={() => setSequenceComplete(true)} />
      )}

      {/* Main Architecture Page Elements as Sticky Cards */}
      <div className="relative w-full">
          {/* Index 0: Dark */}
          <HeroSection />
          
          {/* Index 1: Light */}
          <CareerPreview />
          
          {/* Index 2: Dark */}
          <ProjectPreview />
          
          {/* Index 3: Light */}
          <SkillsPreview />
          
          {/* Index 4: Dark */}
          <InfraPreview />
          
          {/* Index 5: Dark CLI */}
          <FooterCLI />
      </div>
    </div>
  );
}
