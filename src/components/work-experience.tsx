"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { education, workExperience } from "@/lib/resume";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/magicui/company-logo";

interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  location: string;
  current: boolean;
  duration: string;
  type: "education" | "work" | "project";
  description: string[];
  achievements?: string[];
  skills?: string[];
  link?: string;
  logo?: string;
}

const BriefcaseIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <title>suitcase</title>
      <g fill="none">
        <path d="M20.4072 10.9961C20.923 11.1034 21.3758 11.4096 21.667 11.8486C22 12.351 22 13.1431 22 14.7266V15.5996C22 17.8398 22.0004 18.9608 21.5645 19.8164C21.181 20.5689 20.5689 21.181 19.8164 21.5645C18.9608 22.0004 17.8398 22 15.5996 22H8.40039C6.16018 22 5.03924 22.0004 4.18359 21.5645C3.43109 21.181 2.81902 20.5689 2.43555 19.8164C1.99957 18.9608 2 17.8398 2 15.5996V14.7266C2 13.1431 2 12.351 2.33301 11.8486C2.62416 11.4096 3.07699 11.1034 3.59277 10.9961C4.18287 10.8735 4.9185 12.1668 6.38867 12.7549L9.62305 14.0488C10.5011 14.4001 10.9403 14.576 11.3936 14.6455C11.7955 14.7072 12.2045 14.7072 12.6064 14.6455C13.0597 14.576 13.4989 14.4001 14.377 14.0488L17.6113 12.7549C19.0815 12.1668 19.8171 10.8735 20.4072 10.9961ZM15 2C16.6569 2 18 3.34315 18 5V8C18 8.55228 17.5523 9 17 9C16.4477 9 16 8.55228 16 8V5C16 4.44772 15.5523 4 15 4H9C8.44772 4 8 4.44772 8 5V8C8 8.55228 7.55228 9 7 9C6.44772 9 6 8.55228 6 8V5C6 3.34315 7.34315 2 9 2H15Z" fill="url(#1752500502806-5892266_suitcase_existing_0_3b5zzms3i)" data-glass="origin" mask="url(#1752500502806-5892266_suitcase_mask_4781812il)"></path>
        <path d="M20.4072 10.9961C20.923 11.1034 21.3758 11.4096 21.667 11.8486C22 12.351 22 13.1431 22 14.7266V15.5996C22 17.8398 22.0004 18.9608 21.5645 19.8164C21.181 20.5689 20.5689 21.181 19.8164 21.5645C18.9608 22.0004 17.8398 22 15.5996 22H8.40039C6.16018 22 5.03924 22.0004 4.18359 21.5645C3.43109 21.181 2.81902 20.5689 2.43555 19.8164C1.99957 18.9608 2 17.8398 2 15.5996V14.7266C2 13.1431 2 12.351 2.33301 11.8486C2.62416 11.4096 3.07699 11.1034 3.59277 10.9961C4.18287 10.8735 4.9185 12.1668 6.38867 12.7549L9.62305 14.0488C10.5011 14.4001 10.9403 14.576 11.3936 14.6455C11.7955 14.7072 12.2045 14.7072 12.6064 14.6455C13.0597 14.576 13.4989 14.4001 14.377 14.0488L17.6113 12.7549C19.0815 12.1668 19.8171 10.8735 20.4072 10.9961ZM15 2C16.6569 2 18 3.34315 18 5V8C18 8.55228 17.5523 9 17 9C16.4477 9 16 8.55228 16 8V5C16 4.44772 15.5523 4 15 4H9C8.44772 4 8 4.44772 8 5V8C8 8.55228 7.55228 9 7 9C6.44772 9 6 8.55228 6 8V5C6 3.34315 7.34315 2 9 2H15Z" fill="url(#1752500502806-5892266_suitcase_existing_0_3b5zzms3i)" data-glass="clone" filter="url(#1752500502806-5892266_suitcase_filter_b8oimvggo)" clip-path="url(#1752500502806-5892266_suitcase_clipPath_p6yx8hppg)"></path>
        <path d="M17.8156 6C18.9167 6 19.4672 6 19.9218 6.10767C21.3941 6.45636 22.5436 7.60589 22.8923 9.07816C23 9.53279 23 10.0833 23 11.1844C23 11.5818 23 11.7806 22.9674 11.959C22.8626 12.532 22.5132 13.0308 22.0105 13.3251C21.854 13.4167 21.6672 13.4847 21.2937 13.6205L14.1872 16.2047C13.3772 16.4992 12.9722 16.6465 12.5562 16.7049C12.1872 16.7567 11.8128 16.7567 11.4438 16.7049C11.0278 16.6465 10.6228 16.4992 9.81284 16.2047L2.70632 13.6205C2.33279 13.4847 2.14602 13.4167 1.98947 13.3251C1.48682 13.0308 1.13745 12.532 1.03264 11.959C1 11.7806 1 11.5818 1 11.1844C1 10.0833 1 9.53279 1.10767 9.07816C1.45636 7.60589 2.60589 6.45636 4.07816 6.10767C4.53279 6 5.08332 6 6.18437 6L17.8156 6Z" fill="url(#1752500502806-5892266_suitcase_existing_1_9ndgfommo)" data-glass="blur"></path>
        <path d="M22.25 11.1846C22.25 10.0408 22.2445 9.59888 22.1621 9.25098C21.8788 8.05486 20.9451 7.12122 19.749 6.83789C19.4011 6.7555 18.9592 6.75 17.8154 6.75H6.18457C5.04078 6.75 4.59888 6.7555 4.25098 6.83789C3.05486 7.12122 2.12122 8.05486 1.83789 9.25098C1.7555 9.59888 1.75 10.0408 1.75 11.1846C1.75 11.6117 1.75307 11.7289 1.77051 11.8242C1.83603 12.1822 2.05419 12.4938 2.36816 12.6777C2.45183 12.7267 2.56134 12.77 2.96289 12.916L10.0693 15.5C10.9082 15.8051 11.228 15.917 11.5479 15.9619C11.8477 16.004 12.1523 16.004 12.4521 15.9619C12.772 15.917 13.0918 15.8051 13.9307 15.5L21.0371 12.916C21.4387 12.77 21.5482 12.7267 21.6318 12.6777C21.9458 12.4938 22.164 12.1822 22.2295 11.8242C22.2469 11.7289 22.25 11.6117 22.25 11.1846ZM22.9961 11.6543C22.992 11.7757 22.9841 11.8699 22.9678 11.959L22.917 12.1699C22.7731 12.6533 22.4506 13.0676 22.0107 13.3252L21.8848 13.3906C21.7488 13.4547 21.5738 13.5184 21.2939 13.6201L14.1875 16.2051L13.6494 16.3984C13.1743 16.5669 12.8686 16.6612 12.5566 16.7051L12.2783 16.7344C12.093 16.7473 11.907 16.7473 11.7217 16.7344L11.4434 16.7051C11.1314 16.6612 10.8257 16.5669 10.3506 16.3984L9.8125 16.2051L2.70605 13.6201C2.4262 13.5184 2.25124 13.4547 2.11523 13.3906L1.98926 13.3252C1.48667 13.0309 1.13702 12.5319 1.03223 11.959C1.01594 11.8699 1.00799 11.7757 1.00391 11.6543L1 11.1846C1 10.0835 0.999755 9.53275 1.10742 9.07812C1.45611 7.60585 2.60585 6.45611 4.07812 6.10742C4.41916 6.02666 4.81422 6.007 5.45508 6.00195L6.18457 6H17.8154C18.9165 6 19.4672 5.99975 19.9219 6.10742C21.3941 6.45611 22.5439 7.60585 22.8926 9.07812C23.0002 9.53275 23 10.0835 23 11.1846L22.9961 11.6543Z" fill="url(#1752500502806-5892266_suitcase_existing_2_jc11z5glc)"></path>
        <defs>
          <linearGradient id="1752500502806-5892266_suitcase_existing_0_3b5zzms3i" x1="12" y1="-1.5" x2="12" y2="22" gradientUnits="userSpaceOnUse">
            <stop stop-color="#575757"></stop>
            <stop offset="1" stop-color="#151515"></stop>
          </linearGradient>
          <linearGradient id="1752500502806-5892266_suitcase_existing_1_9ndgfommo" x1="23" y1="11.5" x2="1" y2="11.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E3E3E5" stop-opacity=".6"></stop>
            <stop offset="1" stop-color="#BBBBC0" stop-opacity=".6"></stop>
          </linearGradient>
          <linearGradient id="1752500502806-5892266_suitcase_existing_2_jc11z5glc" x1="12" y1="6" x2="12" y2="11.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#fff" stop-opacity="1"></stop>
            <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
          </linearGradient>
          <filter id="1752500502806-5892266_suitcase_filter_b8oimvggo" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
          </filter>
          <clipPath id="1752500502806-5892266_suitcase_clipPath_p6yx8hppg">
            <path d="M17.8156 6C18.9167 6 19.4672 6 19.9218 6.10767C21.3941 6.45636 22.5436 7.60589 22.8923 9.07816C23 9.53279 23 10.0833 23 11.1844C23 11.5818 23 11.7806 22.9674 11.959C22.8626 12.532 22.5132 13.0308 22.0105 13.3251C21.854 13.4167 21.6672 13.4847 21.2937 13.6205L14.1872 16.2047C13.3772 16.4992 12.9722 16.6465 12.5562 16.7049C12.1872 16.7567 11.8128 16.7567 11.4438 16.7049C11.0278 16.6465 10.6228 16.4992 9.81284 16.2047L2.70632 13.6205C2.33279 13.4847 2.14602 13.4167 1.98947 13.3251C1.48682 13.0308 1.13745 12.532 1.03264 11.959C1 11.7806 1 11.5818 1 11.1844C1 10.0833 1 9.53279 1.10767 9.07816C1.45636 7.60589 2.60589 6.45636 4.07816 6.10767C4.53279 6 5.08332 6 6.18437 6L17.8156 6Z" fill="url(#1752500502806-5892266_suitcase_existing_1_9ndgfommo)"></path>
          </clipPath>
          <mask id="1752500502806-5892266_suitcase_mask_4781812il">
            <rect width="100%" height="100%" fill="#FFF"></rect>
            <path d="M17.8156 6C18.9167 6 19.4672 6 19.9218 6.10767C21.3941 6.45636 22.5436 7.60589 22.8923 9.07816C23 9.53279 23 10.0833 23 11.1844C23 11.5818 23 11.7806 22.9674 11.959C22.8626 12.532 22.5132 13.0308 22.0105 13.3251C21.854 13.4167 21.6672 13.4847 21.2937 13.6205L14.1872 16.2047C13.3772 16.4992 12.9722 16.6465 12.5562 16.7049C12.1872 16.7567 11.8128 16.7567 11.4438 16.7049C11.0278 16.6465 10.6228 16.4992 9.81284 16.2047L2.70632 13.6205C2.33279 13.4847 2.14602 13.4167 1.98947 13.3251C1.48682 13.0308 1.13745 12.532 1.03264 11.959C1 11.7806 1 11.5818 1 11.1844C1 10.0833 1 9.53279 1.10767 9.07816C1.45636 7.60589 2.60589 6.45636 4.07816 6.10767C4.53279 6 5.08332 6 6.18437 6L17.8156 6Z" fill="#000"></path>
          </mask>
        </defs>
      </g>
    </svg>
  );
};

const BookOpenIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <title>book-open</title>
      <g fill="none">
        <path d="M19.8 7C20.9201 7 21.4802 7 21.908 7.21799C22.2843 7.40973 22.5903 7.7157 22.782 8.09202C23 8.51984 23 9.0799 23 10.2V14.6C23 16.8402 23 17.9603 22.564 18.816C22.1805 19.5686 21.5686 20.1805 20.816 20.564C19.9603 21 18.8402 21 16.6 21C16.0003 21 15.3477 20.9253 14.7546 21.031C14.3513 21.1029 14.0296 21.3136 13.6938 21.5374C13.4363 21.7091 13.1783 21.93 12.8727 21.9845C12.7857 22 12.6956 22 12.5156 22H11.4844C11.3044 22 11.2143 22 11.1273 21.9845C10.8217 21.93 10.5637 21.7091 10.3062 21.5374C9.97044 21.3136 9.64872 21.1029 9.24542 21.031C8.65232 20.9253 7.99966 21 7.4 21C5.15979 21 4.03968 21 3.18404 20.564C2.43139 20.1805 1.81947 19.5686 1.43597 18.816C1 17.9603 1 16.8402 1 14.6L1 10.2C1 9.07989 1 8.51984 1.21799 8.09202C1.40973 7.71569 1.7157 7.40973 2.09202 7.21799C2.51984 7 3.0799 7 4.2 7L19.8 7Z" fill="url(#1752500502767-6164915_book-open_existing_0_icxw9y0nx)" data-glass="origin" mask="url(#1752500502767-6164915_book-open_mask_0lsha4amw)"></path>
        <path d="M19.8 7C20.9201 7 21.4802 7 21.908 7.21799C22.2843 7.40973 22.5903 7.7157 22.782 8.09202C23 8.51984 23 9.0799 23 10.2V14.6C23 16.8402 23 17.9603 22.564 18.816C22.1805 19.5686 21.5686 20.1805 20.816 20.564C19.9603 21 18.8402 21 16.6 21C16.0003 21 15.3477 20.9253 14.7546 21.031C14.3513 21.1029 14.0296 21.3136 13.6938 21.5374C13.4363 21.7091 13.1783 21.93 12.8727 21.9845C12.7857 22 12.6956 22 12.5156 22H11.4844C11.3044 22 11.2143 22 11.1273 21.9845C10.8217 21.93 10.5637 21.7091 10.3062 21.5374C9.97044 21.3136 9.64872 21.1029 9.24542 21.031C8.65232 20.9253 7.99966 21 7.4 21C5.15979 21 4.03968 21 3.18404 20.564C2.43139 20.1805 1.81947 19.5686 1.43597 18.816C1 17.9603 1 16.8402 1 14.6L1 10.2C1 9.07989 1 8.51984 1.21799 8.09202C1.40973 7.71569 1.7157 7.40973 2.09202 7.21799C2.51984 7 3.0799 7 4.2 7L19.8 7Z" fill="url(#1752500502767-6164915_book-open_existing_0_icxw9y0nx)" data-glass="clone" filter="url(#1752500502767-6164915_book-open_filter_dric4oey8)" clip-path="url(#1752500502767-6164915_book-open_clipPath_99y0rffwb)"></path>
        <path d="M17.1058 2.86537C18.4374 2.56947 19.1032 2.42152 19.6257 2.59361C20.0838 2.74451 20.472 3.05589 20.7187 3.47039C21 3.94312 21 4.62513 21 5.98917L21 14.4331C21 15.349 21 15.807 20.8377 16.1849C20.6945 16.5182 20.4634 16.8063 20.1691 17.0184C19.8354 17.2588 19.3883 17.3582 18.4942 17.5568L12.3471 18.9229C12.2176 18.9517 12.1528 18.966 12.0874 18.9718C12.0292 18.9769 11.9708 18.9769 11.9126 18.9718C11.8472 18.966 11.7824 18.9517 11.6529 18.9229L5.50582 17.5568C4.6117 17.3582 4.16464 17.2588 3.83093 17.0184C3.53658 16.8063 3.30545 16.5182 3.1623 16.1849C3 15.8069 3 15.349 3 14.4331L3 5.98917C3 4.62513 3 3.94312 3.28134 3.47039C3.52803 3.05589 3.9162 2.74451 4.37434 2.59361C4.89684 2.42152 5.56262 2.56947 6.89418 2.86537L11.6529 3.92287C11.7824 3.95165 11.8472 3.96604 11.9126 3.97178C11.9708 3.97688 12.0292 3.97688 12.0874 3.97178C12.1528 3.96604 12.2176 3.95165 12.3471 3.92287L17.1058 2.86537Z" fill="url(#1752500502767-6164915_book-open_existing_1_gwnxwxu1a)" data-glass="blur"></path>
        <path d="M20.25 5.98921C20.25 5.29355 20.2494 4.82046 20.2178 4.46088C20.1867 4.10809 20.1309 3.94983 20.0742 3.85443C19.92 3.59536 19.677 3.3999 19.3906 3.3056C19.2852 3.27098 19.1185 3.25158 18.7676 3.29778C18.4097 3.34493 17.9476 3.44668 17.2686 3.59759L12.5098 4.65521C12.3988 4.67988 12.2789 4.70764 12.1533 4.71869C12.0516 4.72761 11.9484 4.72761 11.8467 4.71869C11.7211 4.70764 11.6012 4.67988 11.4902 4.65521L6.73145 3.59759C6.05237 3.44668 5.59029 3.34493 5.23242 3.29778C4.88146 3.25158 4.71479 3.27098 4.60938 3.3056C4.32304 3.3999 4.07996 3.59536 3.92578 3.85443C3.86911 3.94983 3.81326 4.10809 3.78223 4.46088C3.75062 4.82046 3.75 5.29355 3.75 5.98921V14.4336C3.75 14.9022 3.75076 15.2137 3.76855 15.4561C3.78565 15.6887 3.81605 15.8059 3.85156 15.8887C3.94103 16.097 4.08556 16.2776 4.26953 16.4102C4.34261 16.4628 4.45054 16.5178 4.67383 16.585C4.90661 16.6549 5.21124 16.7235 5.66895 16.8252L11.8154 18.1905C11.8836 18.2056 11.9214 18.2141 11.9502 18.2198C11.9732 18.2242 11.9794 18.2247 11.9785 18.2246C11.9928 18.2259 12.0072 18.2259 12.0215 18.2246C12.0206 18.2247 12.0268 18.2242 12.0498 18.2198C12.0786 18.2141 12.1164 18.2056 12.1846 18.1905L18.3311 16.8252C18.7888 16.7235 19.0934 16.6549 19.3262 16.585C19.5495 16.5178 19.6574 16.4628 19.7305 16.4102C19.9144 16.2776 20.059 16.097 20.1484 15.8887C20.1839 15.8059 20.2143 15.6887 20.2314 15.4561C20.2492 15.2137 20.25 14.9022 20.25 14.4336V5.98921ZM21 14.4336L20.9971 15.04C20.9895 15.5728 20.9595 15.9012 20.8379 16.1846L20.7803 16.3076C20.6361 16.5891 20.4266 16.833 20.1689 17.0186L20.0381 17.1026C19.7167 17.2854 19.2765 17.3828 18.4941 17.5567L12.3467 18.9229C12.2174 18.9516 12.1523 18.966 12.0869 18.9717C12.058 18.9742 12.029 18.9756 12 18.9756L11.9131 18.9717C11.8803 18.9688 11.8473 18.964 11.8066 18.9561L11.6533 18.9229L5.50586 17.5567C4.72347 17.3828 4.28327 17.2854 3.96191 17.1026L3.83105 17.0186C3.53671 16.8065 3.30526 16.5179 3.16211 16.1846C3.04052 15.9012 3.01053 15.5728 3.00293 15.04L3 14.4336V5.98921C3 4.71045 2.99965 4.0309 3.23145 3.56146L3.28125 3.47064C3.49715 3.10787 3.82136 2.82349 4.20605 2.65715L4.37402 2.59368C4.89653 2.42158 5.56298 2.56926 6.89453 2.86516L11.6533 3.92279C11.7826 3.95152 11.8477 3.96588 11.9131 3.97162C11.9709 3.97666 12.0291 3.97666 12.0869 3.97162C12.1523 3.96588 12.2174 3.95152 12.3467 3.92279L17.1055 2.86516C18.437 2.56926 19.1035 2.42158 19.626 2.59368C20.084 2.74461 20.4721 3.05623 20.7188 3.47064C21 3.94336 21 4.62538 21 5.98921V14.4336Z" fill="url(#1752500502767-6164915_book-open_existing_2_8znynyepl)"></path>
        <defs>
          <linearGradient id="1752500502767-6164915_book-open_existing_0_icxw9y0nx" x1="12" y1="7" x2="12" y2="22" gradientUnits="userSpaceOnUse">
            <stop stop-color="#575757"></stop>
            <stop offset="1" stop-color="#151515"></stop>
          </linearGradient>
          <linearGradient id="1752500502767-6164915_book-open_existing_1_gwnxwxu1a" x1="21" y1="10.5" x2="3" y2="10.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E3E3E5" stop-opacity=".6"></stop>
            <stop offset="1" stop-color="#BBBBC0" stop-opacity=".6"></stop>
          </linearGradient>
          <linearGradient id="1752500502767-6164915_book-open_existing_2_8znynyepl" x1="12" y1="2.52" x2="12" y2="12.05" gradientUnits="userSpaceOnUse">
            <stop stop-color="#fff"></stop>
            <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
          </linearGradient>
          <filter id="1752500502767-6164915_book-open_filter_dric4oey8" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
          </filter>
          <clipPath id="1752500502767-6164915_book-open_clipPath_99y0rffwb">
            <path d="M17.1058 2.86537C18.4374 2.56947 19.1032 2.42152 19.6257 2.59361C20.0838 2.74451 20.472 3.05589 20.7187 3.47039C21 3.94312 21 4.62513 21 5.98917L21 14.4331C21 15.349 21 15.807 20.8377 16.1849C20.6945 16.5182 20.4634 16.8063 20.1691 17.0184C19.8354 17.2588 19.3883 17.3582 18.4942 17.5568L12.3471 18.9229C12.2176 18.9517 12.1528 18.966 12.0874 18.9718C12.0292 18.9769 11.9708 18.9769 11.9126 18.9718C11.8472 18.966 11.7824 18.9517 11.6529 18.9229L5.50582 17.5568C4.6117 17.3582 4.16464 17.2588 3.83093 17.0184C3.53658 16.8063 3.30545 16.5182 3.1623 16.1849C3 15.8069 3 15.349 3 14.4331L3 5.98917C3 4.62513 3 3.94312 3.28134 3.47039C3.52803 3.05589 3.9162 2.74451 4.37434 2.59361C4.89684 2.42152 5.56262 2.56947 6.89418 2.86537L11.6529 3.92287C11.7824 3.95165 11.8472 3.96604 11.9126 3.97178C11.9708 3.97688 12.0292 3.97688 12.0874 3.97178C12.1528 3.96604 12.2176 3.95165 12.3471 3.92287L17.1058 2.86537Z" fill="url(#1752500502767-6164915_book-open_existing_1_gwnxwxu1a)"></path>
          </clipPath>
          <mask id="1752500502767-6164915_book-open_mask_0lsha4amw">
            <rect width="100%" height="100%" fill="#FFF"></rect>
            <path d="M17.1058 2.86537C18.4374 2.56947 19.1032 2.42152 19.6257 2.59361C20.0838 2.74451 20.472 3.05589 20.7187 3.47039C21 3.94312 21 4.62513 21 5.98917L21 14.4331C21 15.349 21 15.807 20.8377 16.1849C20.6945 16.5182 20.4634 16.8063 20.1691 17.0184C19.8354 17.2588 19.3883 17.3582 18.4942 17.5568L12.3471 18.9229C12.2176 18.9517 12.1528 18.966 12.0874 18.9718C12.0292 18.9769 11.9708 18.9769 11.9126 18.9718C11.8472 18.966 11.7824 18.9517 11.6529 18.9229L5.50582 17.5568C4.6117 17.3582 4.16464 17.2588 3.83093 17.0184C3.53658 16.8063 3.30545 16.5182 3.1623 16.1849C3 15.8069 3 15.349 3 14.4331L3 5.98917C3 4.62513 3 3.94312 3.28134 3.47039C3.52803 3.05589 3.9162 2.74451 4.37434 2.59361C4.89684 2.42152 5.56262 2.56947 6.89418 2.86537L11.6529 3.92287C11.7824 3.95165 11.8472 3.96604 11.9126 3.97178C11.9708 3.97688 12.0292 3.97688 12.0874 3.97178C12.1528 3.96604 12.2176 3.95165 12.3471 3.92287L17.1058 2.86537Z" fill="#000"></path>
          </mask>
        </defs>
      </g>
    </svg>
  )
}
// Transform work experience data
const workItems: ExperienceItem[] = workExperience.map(work => {
  const workAny = work as any;
  return {
    id: work.id,
    title: work.position,
    organization: work.company,
    location: work.location,
    duration: `${work.startDate} – ${work.endDate}`,
    type: "work" as const,
    description: [...work.responsibilities],
    achievements: [],
    skills: [...work.technologies],
    current: work.current,
    logo: workAny.logo,
  };
}) as ExperienceItem[];

// Transform education data
const educationItems: ExperienceItem[] = education.map(edu => {
  const eduAny = edu as any;
  const gradeInfo = eduAny.cgpa || eduAny.percentage || `Score: ${eduAny.gpa}`;
  return {
    id: edu.id,
    title: `${edu.degree} in ${edu.field}`,
    organization: edu.institution,
    location: edu.location,
    duration: `${edu.startDate} – ${edu.endDate}`,
    type: "education" as const,
    description: [edu.description, gradeInfo],
    achievements: [...edu.achievements],
    skills: [],
    current: false,
    logo: eduAny.logo,
  };
});

function ExperienceSection({
  title,
  items,
  icon: Icon
}: {
  title: string;
  items: ExperienceItem[];
  icon: React.ElementType;
}) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{title}</h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">({items.length})</span>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[19px] top-12 bottom-0 w-[2px] bg-zinc-200 dark:bg-zinc-800" />

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-6 z-10">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-sm relative overflow-hidden">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.organization}
                      className="w-8 h-8 object-contain rounded-full"
                    />
                  ) : (
                    <Icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  )}

                  {/* Green ripple indicator for current/first item */}

                </div>
              </div>

              {/* Card */}
              <div className="ml-16 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60 transition-all duration-200 group shadow-sm ">
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full text-left p-4"
                  aria-expanded={expandedIds.has(item.id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-medium text-zinc-900 dark:text-white mb-1 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors flex items-center gap-2 flex-wrap">
                        <span>{item.organization} — {item.location}</span>
                        {item.current && (
                          <Badge 
                            variant="secondary" 
                            className="align-middle gap-1.5 py-0.5 px-2 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 font-medium text-[10px] uppercase tracking-wider"
                          >
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            Working
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                        {item.duration}
                      </p>
                    </div>

                    {/* Toggle Icons */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {item.link && (
                        <LinkIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                      )}
                      <div className="flex flex-col items-center">
                        <ChevronUp
                          className={cn(
                            "w-3.5 h-3.5 transition-all duration-300",
                            expandedIds.has(item.id)
                              ? "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                              : "text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-600"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 -mt-1 transition-all duration-300",
                            expandedIds.has(item.id)
                              ? "text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-600"
                              : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    expandedIds.has(item.id)
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-4 pb-4 space-y-4 pt-2">
                    {/* Description */}
                    {item.description.length > 0 && (
                      <div>
                        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                          {item.description.map((desc, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-zinc-400 dark:text-zinc-600 mt-1 flex-shrink-0">•</span>
                              <span className="flex-1">{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Achievements */}
                    {item.achievements && item.achievements.length > 0 && (
                      <div>
                        <h5 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                          Achievements
                        </h5>
                        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                          {item.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-zinc-400 dark:text-zinc-600 mt-1 flex-shrink-0">•</span>
                              <span className="flex-1">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-300/80 dark:hover:bg-zinc-700/80 transition-colors flex items-center gap-1.5"
                          >
                            <div className="relative w-4 h-4 flex-shrink-0">
                              <CompanyLogo
                                name={skill}
                                size={16}
                                className="w-4 h-4"
                                lazy={true}
                              />
                            </div>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WorkExperience() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Work Experience Section */}
        {workItems.length > 0 && (
          <ExperienceSection
            title="Work Experience"
            items={workItems}
            icon={BriefcaseIcon}
          />
        )}

        {/* Education Section */}
        {educationItems.length > 0 && (
          <ExperienceSection
            title="Education"
            items={educationItems}
            icon={BookOpenIcon}
          />
        )}

        {/* Projects Section - Placeholder for future */}
        {/* <ExperienceSection
          title="Projects"
          items={projectItems}
          icon={BriefcaseIcon}
        /> */}
      </div>

    </section>
  );
}



