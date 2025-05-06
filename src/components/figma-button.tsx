import React from "react";
import { ChevronRight } from "tabler-icons-react";

export const Frame = (): JSX.Element => {
  return (
    <div className="inline-flex items-center justify-center gap-3 px-5 py-[18px] relative bg-white rounded-[999px] border-[3.5px] border-solid border-[#fbf2f299] [background:linear-gradient(90deg,rgba(129,122,193,1)_0%,rgba(86,56,204,1)_82%)]">
      <div className="relative w-fit mt-[-1.50px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[22px] text-center tracking-[-1.10px] leading-[26.2px] whitespace-nowrap">
        Give me your money
      </div>

      <div className="flex flex-col w-[30px] h-[30px] items-center justify-center p-2.5 relative bg-[#7f7ced] rounded-[999px] overflow-hidden shadow-[inset_0px_4.35px_8.7px_#ffffff99,inset_0px_-4.35px_4px_#3f3bd599,0px_13px_11.7px_#00000040]">
        {/* <img
          className="relative w-[13px] h-[10.55px] mt-[-0.28px] mb-[-0.28px] ml-[-1.50px] mr-[-1.50px]"
          alt="Icon arrow right"
          src={iconArrowRight}
        /> */}
        <ChevronRight
        className="relative w-[13px] h-[10.55px] mt-[-0.28px] mb-[-0.28px] ml-[-1.50px] mr-[-1.50px]"
        />
      </div>
    </div>
  );
};
