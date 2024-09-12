import React from "react";
import HomeNavbar from "./_components/home-navbar";
import HomeButtons from "./_components/home-buttons";

const Home = () => {
  return (
    <main className="mx-auto w-full">
      <div className="h-[75px] fixed inset-y-0 w-full z-50">
        <HomeNavbar />
      </div>

      <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center p-4 flex-col">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <p className="text-4xl sm:text-6xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-700 py-8 text-center">
          Unlock Your Learning Potential.
        </p>

        <div className="text-base sm:text-lg relative z-20 bg-clip-text py-3 md:py-6 text-center text-black/70 dark:text-white/70 italic">
          Our state-of-the-art Learning Management System (LMS) enables
          organizations <br className="hidden sm:block" /> to deliver impactful
          online learning experiences.
        </div>

        <div className="py-3 md:py-6">
          <HomeButtons />
        </div>
      </div>
    </main>
  );
};

export default Home;
