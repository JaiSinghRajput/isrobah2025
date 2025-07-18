import React from "react";
import aditya from "../assets/Aditya.jpg";
import cme from "../assets/CME.jpg";
import swis from "../assets/swis.png";

function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 py-4 gap-2">
      <div className="w-full flex justify-center items-center">
        <iframe
          width="430"
          height="270"
          src="https://www.youtube.com/embed/kZUDgA4fzt0?si=Cs3oupopwNWU8vOR"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-2">
        <img src={aditya} alt="Aditya" className="w-60 h-60 rounded shadow-md" />
        <img src={cme} alt="CME" className="w-60 h-60 rounded shadow-md" />
        <img src={swis} alt="SWIS" className="w-60 h-60 rounded shadow-md" />
      </div>
      <div className="bg-white w-full md:w-3/4 p-6 rounded-lg shadow-md text-justify">
        <p className="text-gray-700">
          The Sun continuously propels plasma out into the heliosphere, known as
          the <strong>solar wind</strong>. It primarily consists of ionized
          hydrogen (H+, protons), doubly ionized helium (He2+, alpha particles),
          and smaller amounts of heavier elements. Depending on the type of
          ambient solar wind and the influence of transient events like{" "}
          <strong>Coronal Mass Ejections (CMEs)</strong>,{" "}
          <strong>Stream/Corotating Interaction Regions (SIRs/CIRs)</strong>, or
          events like <strong>magnetic reconnection</strong>, the elemental
          abundance changes significantly. To understand the sources,
          properties, and acceleration mechanisms of solar wind plasma,
          systematic <strong>in-situ observations</strong> of ion flux,
          velocity, density, and thermal parameters are crucial. The{" "}
          <strong>Aditya Solar Wind Particle Experiment (ASPEX)</strong> is
          designed for this purpose. It detects ions from{" "}
          <strong>100 eV to 5 MeV/nucleon</strong> using two subsystems:
          <em> Solar Wind Ion Spectrometer (SWIS)</em> and the{" "}
          <em>SupraThermal and Energetic Particle Spectrometer (STEPS)</em>. The{" "}
          <strong>SWIS subsystem</strong> features two{" "}
          <em>Top Hat Analyzers (THAs)</em> — one aligned with the ecliptic and
          one perpendicular — covering a full 360° field of view. It measures
          ions in the energy range of <strong>0.1–20 keV</strong>.
        </p>
      </div>
    </div>
  );
}

export default Home;
