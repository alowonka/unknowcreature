import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Marquee from "./components/Marquee";
import Manifesto from "./components/Manifesto";
import WhatWeDo from "./components/WhatWeDo";
import Studio from "./components/Studio";
import Team from "./components/Team";
import GameTeaser from "./components/GameTeaser";
import Notify from "./components/Notify";
import Footer from "./components/Footer";
import Reveals from "./components/Reveals";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-hidden w-full max-w-full relative">
        <Hero />
        <Stats />
        <Marquee />
        <Manifesto />
        <WhatWeDo />
        <Studio />
        <Team />
        <GameTeaser />
        <Notify />
        <Footer />
      </main>
      <Reveals />
    </>
  );
}
