import Logo from "./logo";
import { ModeToggle } from "./theme-button";
import Booker from "./cta";

export const Navbar = () => {
  return (
    <nav
      className="sticky w-full top-4 z-50 flex items-center justify-between place-self-center flex-wrap gap-2 p-2 px-4 mt-4 rounded-xl backdrop-blur-sm bg-neutral-200/50 dark:bg-neutral-50/10 h-full"
    >
      {/* <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={100}
        patternAlpha={15}
      /> */}
      <div className="flex  items-center gap-2 h-12 relative">
        <Logo />
      </div>
      <div className="flex items-center gap-2 h-12 relative">
        {/* <Frame/> */}
      <Booker/>
      <ModeToggle />
      </div>
    </nav>
  );
};
