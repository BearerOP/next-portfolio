"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface Card {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
}

interface OriginAwareCardsProps {
  cards?: Card[];
}

const defaultCards: Card[] = [
  {
    id: 1,
    title: "Virat Kohli - Cricket Legend",
    shortDescription: "One of cricket's greatest batsmen and India's most successful Test captain",
    longDescription: "Virat Kohli is an Indian cricket icon and former captain widely regarded as one of the greatest all-format batters of all time. He holds the record for most centuries in ODI cricket (50+) and is the second-highest run-scorer in international cricket. With 4 ICC ODI Player of the Year awards, 2 ICC Cricketer of the Year honors, and India's highest sporting honor - the Khel Ratna award - his achievements are unprecedented. He led India to historic Test series victories, including their first-ever series win in Australia, and maintained the ICC World Test Championship Mace for multiple years. Known for his aggressive batting style, unmatched consistency, and revolutionary approach to fitness in Indian cricket, Kohli has inspired millions worldwide. He's also a successful entrepreneur and philanthropist through the Virat Kohli Foundation.",
    image: "/images/virat-card-image.jpg",
  },
  {
    id: 2,
    title: "Cristiano Ronaldo - Football Icon",
    shortDescription: "Five-time Ballon d'Or winner and all-time leading international goalscorer",
    longDescription: "Cristiano Ronaldo is a Portuguese football legend and one of the greatest players in history. With 5 Ballon d'Or awards, 5 UEFA Champions League titles, and over 900 career goals, his achievements are unparalleled. He holds records for most goals (140) and assists (42) in the Champions League, most international goals (143), and most international appearances (225). Known for his iconic 'Siuuu' celebration, incredible athleticism, and dedication to excellence, Ronaldo has dominated football for two decades across Manchester United, Real Madrid, Juventus, and Al-Nassr. He's won 34 major trophies including the UEFA European Championship and Nations League with Portugal. Beyond football, he's the most-followed athlete on social media with over 1 billion followers and a global brand ambassador inspiring millions with his work ethic and philanthropic efforts.",
    image: "/images/cristiano-card-image.jpg",
  },
  {
    id: 3,
    title: "Prabhas - Pan-Indian Superstar",
    shortDescription: "India's first pan-Indian star and Baahubali phenomenon",
    longDescription: "Prabhas, born Uppalapati Venkata Suryanarayana Prabhas Raju, is an Indian actor who revolutionized Indian cinema with the epic Baahubali series. Known as the 'Rebel Star,' he's one of the highest-paid actors in Indian cinema and has been featured in Forbes India's Celebrity 100 since 2015. His dual role in Baahubali: The Beginning (2015) and Baahubali 2: The Conclusion (2017) created history, with the sequel becoming India's highest-grossing film at release, earning over ₹1,700 crore worldwide. He's the first Indian actor to achieve four ₹100 crore opening-day films and the first South Indian actor to have a wax statue at Madame Tussauds. With blockbusters like Salaar and Kalki 2898 AD (2024), he continues to push cinematic boundaries. Beyond acting, Prabhas is known for his humility, philanthropy, and dedication—spending 5 years exclusively on Baahubali, showcasing unprecedented commitment to his craft.",
    image: "/images/prabhas-card-image.png",
  },
];

export function OriginAwareCards({ cards = defaultCards }: OriginAwareCardsProps) {
  const [current, setCurrent] = useState<Card | null>(null);

  return (
    <div className="bg-slate-300 dark:bg-zinc-800 rounded-3xl  md:rounded-[36px] flex items-center gap-4 md:gap-8 justify-center md:justify-around h-full w-full p-4 md:p-8 flex-col md:flex-row overflow-x-auto scroll-smooth [scrollbar-width:none]">
      {current !== null && (
        <div
          className="fixed inset-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm"
          onClick={() => setCurrent(null)}
        />
      )}

      {current !== null && (
        <motion.div
          layoutId={`card-${current?.id}`}
          className="fixed inset-4 md:inset-0 z-20 md:m-auto bg-zinc-300/80 dark:bg-zinc-800 rounded-[24px] md:rounded-[36px] flex flex-col items-start justify-start p-4 md:p-6 gap-3 md:gap-4 h-[30rem] md:h-[36rem] w-auto md:w-[36rem] overflow-y-auto max-h-[calc(100vh-2rem)]"
          style={{ scrollbarWidth: "none" }}
        >
          <motion.img layoutId={`image-${current?.id}`} src={current?.image} alt={current?.title} className="w-full h-48 md:h-full object-cover rounded-2xl md:rounded-3xl" />
          <motion.h1 layoutId={`title-${current?.id}`} className="text-xl md:text-2xl font-bold dark:text-white text-zinc-900">
            {current?.title}
          </motion.h1>
          <motion.p className="text-zinc-800 dark:text-zinc-300 text-sm md:text-base pb-8" layoutId={`description-${current?.id}`}>{current?.longDescription}</motion.p>
        </motion.div>
      )}

      {cards.map((card) => (
        <motion.div
          layoutId={`card-${card.id}`}
          onClick={() => setCurrent(card)}
          key={card.id}
          className="bg-zinc-900 dark:bg-zinc-100 w-full md:w-auto h-auto rounded-2xl md:rounded-3xl flex items-start justify-center p-4 md:p-6 gap-3 md:gap-4 cursor-pointer min-w-[240px] md:min-w-60 flex-shrink-0"
        >
          <div className="flex items-start gap-2 flex-col justify-center w-[12rem]">
            <motion.img layoutId={`image-${card.id}`} src={card.image} alt={card.title} className="w-14 h-8 md:w-16 md:h-9 aspect-video object-contain rounded-md" />
            <motion.h1 layoutId={`title-${card.id}`} className="text-base md:text-xl font-bold text-zinc-100 dark:text-zinc-900">{card.title}</motion.h1>
            <motion.p layoutId={`description-${card.id}`} className="text-xs md:text-sm text-zinc-400 dark:text-zinc-700">{card.shortDescription}</motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
