"use client";

import { useState, useMemo } from "react";
import { OriginAwareCards } from "./origin-aware-cards";
import { motion } from "framer-motion";
import { Copy, Check, Maximize2, ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FamilyStyleModal } from "./family-style-modal";

interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
}

const components: Component[] = [
  {
    id: "origin-aware-cards",
    name: "Origin Aware Cards",
    description: "Interactive cards with origin-aware animations",
    category: "Animation",
  },
  {
    id: "family-style-modal",
    name: "Family Style Modal",
    description: "Modal with family-style layout",
    category: "Modal",
  },
];

// Copy button component
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="absolute top-4 right-4 p-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-zinc-300" />
      )}
    </motion.button>
  );
}

export function CraftLayout() {
  const [selectedComponent, setSelectedComponent] = useState<string>("origin-aware-cards");
  const [activeTab, setActiveTab] = useState<"usage" | "source">("usage");
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);

  // Get current component index and navigation info
  const currentIndex = components.findIndex((c) => c.id === selectedComponent);
  const previousComponent = currentIndex > 0 ? components[currentIndex - 1] : null;
  const nextComponent = currentIndex < components.length - 1 ? components[currentIndex + 1] : null;

  // Cache the rendered component demo based on selected component, active tab, and expand state
  const componentDemo = useMemo(() => {
    const renderComponentDemo = () => {
      switch (selectedComponent) {
        case "origin-aware-cards":
          return (
            <div className="space-y-6 sm:space-y-8">
              {/* Component Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                    Origin Aware Cards
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    Interactive card component with origin-aware animations using Framer Motion
                  </p>
                </div>

                {/* Navigation Buttons - Horizontal on mobile, show only icons */}
                <div className="flex items-center gap-2">
                  {previousComponent && (
                    <button
                      onClick={() => setSelectedComponent(previousComponent.id)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm text-zinc-900 dark:text-zinc-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden md:inline">{previousComponent.name}</span>
                    </button>
                  )}
                  {nextComponent && (
                    <button
                      onClick={() => setSelectedComponent(nextComponent.id)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm text-zinc-900 dark:text-zinc-100"
                    >
                      <span className="hidden md:inline">{nextComponent.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Demo Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Demo</h3>
                <div className="min-h-[400px] flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-8">
                  <OriginAwareCards />
                </div>
              </div>

              {/* Installation Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Installation
                </h3>

                {/* Step 1 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm">
                      1
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white">
                      Copy and paste the following code into your project.
                    </h4>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800">
                    <button
                      onClick={() => setActiveTab("usage")}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "usage"
                          ? "text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                      Usage
                    </button>
                    <button
                      onClick={() => setActiveTab("source")}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "source"
                          ? "text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                      Source Code
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="relative">
                    {activeTab === "usage" ? (
                      <div className="relative">
                        <CopyButton
                          code={`import { OriginAwareCards } from "@/components/craft/origin-aware-cards";

const cards = [
  {
    id: 1,
    title: "Virat Kohli - Cricket Legend",
    shortDescription: "One of cricket's greatest batsmen and India's most successful Test captain",
    longDescription: "Virat Kohli is an Indian cricket icon and former captain widely regarded as one of the greatest all-format batters of all time...",
    image: "/images/virat-card-image.jpg",
  },
  {
    id: 2,
    title: "Cristiano Ronaldo - Football Icon",
    shortDescription: "Five-time Ballon d'Or winner and all-time leading international goalscorer",
    longDescription: "Cristiano Ronaldo is a Portuguese football legend and one of the greatest players in history...",
    image: "/images/cristiano-card-image.jpg",
  },
];

export default function MyComponent() {
  return <OriginAwareCards cards={cards} />;
}`}
                        />
                        <div className="bg-zinc-900 dark:bg-zinc-800 rounded-xl p-6 overflow-x-auto">
                          <pre className="text-sm text-zinc-100">
                            <code>{`import { OriginAwareCards } from "@/components/craft/origin-aware-cards";

const cards = [
  {
    id: 1,
    title: "Virat Kohli - Cricket Legend",
    shortDescription: "One of cricket's greatest batsmen and India's most successful Test captain",
    longDescription: "Virat Kohli is an Indian cricket icon and former captain widely regarded as one of the greatest all-format batters of all time...",
    image: "/images/virat-card-image.jpg",
  },
  {
    id: 2,
    title: "Cristiano Ronaldo - Football Icon",
    shortDescription: "Five-time Ballon d'Or winner and all-time leading international goalscorer",
    longDescription: "Cristiano Ronaldo is a Portuguese football legend and one of the greatest players in history...",
    image: "/images/cristiano-card-image.jpg",
  },
];

export default function MyComponent() {
  return <OriginAwareCards cards={cards} />;
}`}</code>
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <CopyButton
                          code={`"use client";

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
    <div className="bg-slate-300 dark:bg-zinc-800 rounded-3xl md:rounded-[36px] flex items-center gap-4 md:gap-8 justify-center md:justify-around h-full w-full p-4 md:p-8 flex-col md:flex-row overflow-x-auto scroll-smooth [scrollbar-width:none]">
      {current !== null && (
        <div
          className="fixed inset-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm"
          onClick={() => setCurrent(null)}
        />
      )}

      {current !== null && (
        <motion.div
          layoutId={\`card-\${current?.id}\`}
          className="fixed inset-4 md:inset-0 z-20 md:m-auto bg-zinc-300/80 dark:bg-zinc-800 rounded-[24px] md:rounded-[36px] flex flex-col items-start justify-start p-4 md:p-6 gap-3 md:gap-4 h-[30rem] md:h-[36rem] w-auto md:w-[36rem] overflow-y-auto max-h-[calc(100vh-2rem)]"
          style={{ scrollbarWidth: "none" }}
        >
          <motion.img layoutId={\`image-\${current?.id}\`} src={current?.image} alt={current?.title} className="w-full h-48 md:h-full object-cover rounded-2xl md:rounded-3xl" />
          <motion.h1 layoutId={\`title-\${current?.id}\`} className="text-xl md:text-2xl font-bold dark:text-white text-zinc-900">
            {current?.title}
          </motion.h1>
          <motion.p className="text-zinc-800 dark:text-zinc-300 text-sm md:text-base pb-8" layoutId={\`description-\${current?.id}\`}>{current?.longDescription}</motion.p>
        </motion.div>
      )}

      {cards.map((card) => (
        <motion.div
          layoutId={\`card-\${card.id}\`}
          onClick={() => setCurrent(card)}
          key={card.id}
          className="bg-zinc-900 dark:bg-zinc-100 w-full md:w-auto h-auto rounded-2xl md:rounded-3xl flex items-start justify-center p-4 md:p-6 gap-3 md:gap-4 cursor-pointer min-w-[240px] md:min-w-60 flex-shrink-0"
        >
          <div className="flex items-start gap-2 flex-col justify-center w-[12rem]">
            <motion.img layoutId={\`image-\${card.id}\`} src={card.image} alt={card.title} className="w-14 h-8 md:w-16 md:h-9 aspect-video object-contain rounded-md" />
            <motion.h1 layoutId={\`title-\${card.id}\`} className="text-base md:text-xl font-bold text-zinc-100 dark:text-zinc-900">{card.title}</motion.h1>
            <motion.p layoutId={\`description-\${card.id}\`} className="text-xs md:text-sm text-zinc-400 dark:text-zinc-700">{card.shortDescription}</motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}`}
                        />
                        <div className="relative">
                          <div
                            className={`bg-zinc-900 dark:bg-zinc-800 rounded-xl p-6 overflow-y-auto transition-all ${isSourceExpanded ? "max-h-[800px]" : "max-h-[400px]"
                              }`}
                          >
                            <pre className="text-sm text-zinc-100 whitespace-pre-wrap break-words">
                              <code>{`"use client";

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
    <div className="bg-slate-300 dark:bg-zinc-800 rounded-3xl md:rounded-[36px] flex items-center gap-4 md:gap-8 justify-center md:justify-around h-full w-full p-4 md:p-8 flex-col md:flex-row overflow-x-auto scroll-smooth [scrollbar-width:none]">
      {current !== null && (
        <div
          className="fixed inset-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm"
          onClick={() => setCurrent(null)}
        />
      )}

      {current !== null && (
        <motion.div
          layoutId={\`card-\${current?.id}\`}
          className="fixed inset-4 md:inset-0 z-20 md:m-auto bg-zinc-300/80 dark:bg-zinc-800 rounded-[24px] md:rounded-[36px] flex flex-col items-start justify-start p-4 md:p-6 gap-3 md:gap-4 h-[30rem] md:h-[36rem] w-auto md:w-[36rem] overflow-y-auto max-h-[calc(100vh-2rem)]"
          style={{ scrollbarWidth: "none" }}
        >
          <motion.img layoutId={\`image-\${current?.id}\`} src={current?.image} alt={current?.title} className="w-full h-48 md:h-full object-cover rounded-2xl md:rounded-3xl" />
          <motion.h1 layoutId={\`title-\${current?.id}\`} className="text-xl md:text-2xl font-bold dark:text-white text-zinc-900">
            {current?.title}
          </motion.h1>
          <motion.p className="text-zinc-800 dark:text-zinc-300 text-sm md:text-base pb-8" layoutId={\`description-\${current?.id}\`}>{current?.longDescription}</motion.p>
        </motion.div>
      )}

      {cards.map((card) => (
        <motion.div
          layoutId={\`card-\${card.id}\`}
          onClick={() => setCurrent(card)}
          key={card.id}
          className="bg-zinc-900 dark:bg-zinc-100 w-full md:w-auto h-auto rounded-2xl md:rounded-3xl flex items-start justify-center p-4 md:p-6 gap-3 md:gap-4 cursor-pointer min-w-[240px] md:min-w-60 flex-shrink-0"
        >
          <div className="flex items-start gap-2 flex-col justify-center w-[12rem]">
            <motion.img layoutId={\`image-\${card.id}\`} src={card.image} alt={card.title} className="w-14 h-8 md:w-16 md:h-9 aspect-video object-contain rounded-md" />
            <motion.h1 layoutId={\`title-\${card.id}\`} className="text-base md:text-xl font-bold text-zinc-100 dark:text-zinc-900">{card.title}</motion.h1>
            <motion.p layoutId={\`description-\${card.id}\`} className="text-xs md:text-sm text-zinc-400 dark:text-zinc-700">{card.shortDescription}</motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}`}</code>
                            </pre>
                          </div>

                          {/* Gradient mask and expand button */}
                          {!isSourceExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 dark:from-zinc-800 to-transparent rounded-b-xl pointer-events-none" />
                          )}
                          <button
                            onClick={() => setIsSourceExpanded(!isSourceExpanded)}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors flex items-center gap-2 text-sm text-zinc-100"
                          >
                            <Maximize2 className="w-4 h-4" />
                            {isSourceExpanded ? "Collapse" : "Expand"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm">
                      2
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white">
                      Update the import paths to match your project setup.
                    </h4>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 ml-11">
                    Make sure the import path matches where you saved the component file in your project.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm">
                      3
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white">
                      Install Framer Motion if you haven&apos;t already
                    </h4>
                  </div>
                  <div className="ml-11 relative align-middle">
                    <div className="absolute top-0 right-0">
                      <CopyButton code="npm install framer-motion" />
                    </div>
                    <div className="bg-zinc-900 dark:bg-zinc-800 rounded-xl p-4 overflow-x-auto">
                      <pre className="text-sm text-zinc-100">
                        <code>npm install framer-motion</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
                      ✨ Origin-Aware Animations
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Cards expand from their exact position using layout animations
                    </p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
                      🎨 Simple & Clean
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Minimal design with smooth transitions
                    </p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
                      🌓 Dark Mode
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Fully styled for both light and dark themes
                    </p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4">
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
                      📱 Responsive
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Works seamlessly across all device sizes
                    </p>
                  </div>
                </div>
              </div>

              {/* Props Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Props</h3>
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-800">
                        <th className="text-left py-2 text-zinc-900 dark:text-white">Prop</th>
                        <th className="text-left py-2 text-zinc-900 dark:text-white">Type</th>
                        <th className="text-left py-2 text-zinc-900 dark:text-white">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-600 dark:text-zinc-400">
                      <tr className="border-b border-zinc-200 dark:border-zinc-800">
                        <td className="py-2">cards</td>
                        <td className="py-2">Card[]</td>
                        <td className="py-2">Array of card objects with id, title, shortDescription, longDescription, and image</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case "family-style-modal":
          return (
            <div className="space-y-6 sm:space-y-8">
              {/* Component Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                    Family Style Modal
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    Multi-step modal component with smooth animations and stateful workflow using Framer Motion
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  {previousComponent && (
                    <button
                      onClick={() => setSelectedComponent(previousComponent.id)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm text-zinc-900 dark:text-zinc-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden md:inline">{previousComponent.name}</span>
                    </button>
                  )}
                  {nextComponent && (
                    <button
                      onClick={() => setSelectedComponent(nextComponent.id)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm text-zinc-900 dark:text-zinc-100"
                    >
                      <span className="hidden md:inline">{nextComponent.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Demo Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Demo</h3>
                <FamilyStyleModal />
              </div>

              {/* Installation Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Installation
                </h3>

                {/* Step 1 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm">
                      1
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white">
                      Install dependencies
                    </h4>
                  </div>
                  <div className="relative">
                    <CopyButton code="npm install framer-motion lucide-react" />
                    <div className="bg-zinc-900 dark:bg-zinc-800 rounded-xl p-6 overflow-x-auto">
                      <pre className="text-sm text-zinc-100">
                        <code>npm install framer-motion lucide-react</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm">
                      2
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white">
                      Copy and paste the following code into your project.
                    </h4>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800">
                    <button
                      onClick={() => setActiveTab("usage")}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === "usage"
                          ? "text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      Usage
                    </button>
                    <button
                      onClick={() => setActiveTab("source")}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === "source"
                          ? "text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      Source Code
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="relative">
                    {activeTab === "usage" ? (
                      <div className="relative">
                        <CopyButton
                          code={`import { FamilyStyleModal } from "@/components/craft/family-style-modal";

export default function MyPage() {
  return (
    <div className="min-h-screen p-8">
      <FamilyStyleModal />
    </div>
  );
}`}
                        />
                        <div className="bg-zinc-900 dark:bg-zinc-800 rounded-xl p-6 overflow-x-auto">
                          <pre className="text-sm text-zinc-100">
                            <code>{`import { FamilyStyleModal } from "@/components/craft/family-style-modal";

export default function MyPage() {
  return (
    <div className="min-h-screen p-8">
      <FamilyStyleModal />
    </div>
  );
}`}</code>
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <CopyButton
                          code={`"use client";

import { useState, useEffect } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ModalStep = "initial" | "confirmation" | "processing" | "success";

export function FamilyStyleModal() {
  const [step, setStep] = useState<ModalStep>("initial");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (step === "processing") {
      const timer = setTimeout(() => setStep("success"), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleReceive = () => { setIsOpen(true); setStep("confirmation"); };
  const handleConfirm = () => setStep("processing");
  const handleCancel = () => { setIsOpen(false); setStep("initial"); };
  const handleClose = () => { setIsOpen(false); setStep("initial"); };

  return (
    <div className="relative flex items-center justify-center min-h-[400px] bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-8 overflow-hidden">
      {/* ... rest of component code ... */}
    </div>
  );
}`}
                        />
                        <div className="relative rounded-xl overflow-hidden">
                          <div
                            className={`bg-zinc-900 dark:bg-zinc-800 p-6 overflow-y-auto transition-all ${
                              isSourceExpanded ? "max-h-[800px]" : "max-h-[400px]"
                            }`}
                            style={{ scrollbarWidth: "none" }}
                          >
                            <pre className="text-sm text-zinc-100 whitespace-pre-wrap break-words pb-12">
                              <code>{`"use client";

import { useState, useEffect } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ModalStep = "initial" | "confirmation" | "processing" | "success";

export function FamilyStyleModal() {
  const [step, setStep] = useState<ModalStep>("initial");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (step === "processing") {
      const timer = setTimeout(() => setStep("success"), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleReceive = () => { setIsOpen(true); setStep("confirmation"); };
  const handleConfirm = () => setStep("processing");
  const handleCancel = () => { setIsOpen(false); setStep("initial"); };
  const handleClose = () => { setIsOpen(false); setStep("initial"); };

  return (
    <div className="relative flex items-center justify-center min-h-[400px] bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-8 overflow-hidden">
      <div className="text-center space-y-4">
        <AnimatePresence>
          {!isOpen && (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}
              layoutId="receive-button" onClick={handleReceive}
              className="bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-full px-6 py-3 font-semibold cursor-pointer">
              <motion.span layoutId="receive-button-text">Receive</motion.span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} onClick={handleClose}
                className="absolute inset-0 bg-black/50 z-40 backdrop-blur-sm rounded-3xl" />

              <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
                  {step !== "processing" && (
                    <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleClose}
                      className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}

                  <AnimatePresence mode="wait">
                    {step === "confirmation" && (
                      <motion.div key="confirmation" initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }} className="space-y-6">
                        <div className="text-center">
                          <motion.h3 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                            Confirm
                          </motion.h3>
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                            className="text-zinc-600 dark:text-zinc-400">
                            Are you sure you want to receive a load of money?
                          </motion.p>
                        </div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }} className="flex gap-3">
                          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={handleCancel}
                            className="flex-1 px-6 py-3 rounded-full border-2 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white font-semibold">
                            Cancel
                          </motion.button>
                          <motion.button layoutId="receive-button" whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }} onClick={handleConfirm}
                            className="flex-1 px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold">
                            Receive
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    )}

                    {step === "processing" && (
                      <motion.div key="processing" initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }} className="text-center py-8">
                        <div className="flex flex-col items-center gap-4">
                          <motion.div animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                            <Loader2 className="w-12 h-12 text-zinc-900 dark:text-zinc-100" />
                          </motion.div>
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg font-semibold text-zinc-900 dark:text-white">
                            Processing...
                          </motion.p>
                        </div>
                      </motion.div>
                    )}

                    {step === "success" && (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="text-center py-8">
                        <div className="flex flex-col items-center gap-4">
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15, stiffness: 400, delay: 0.1 }}
                            className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                            <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.3, type: "spring", damping: 12 }}>
                              <Check className="w-8 h-8 text-white" />
                            </motion.div>
                          </motion.div>
                          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl font-bold text-zinc-900 dark:text-white">
                            Amount Credited
                          </motion.p>
                          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }} whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }} onClick={handleClose}
                            className="mt-4 px-6 py-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold">
                            Done
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}`}</code>
                            </pre>
                          </div>

                          {/* Gradient Mask with Show More Button */}
                          {!isSourceExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 dark:from-zinc-800 to-transparent pointer-events-none flex items-end justify-center pb-4">
                              <button
                                onClick={() => setIsSourceExpanded(true)}
                                className="pointer-events-auto flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                              >
                                <Maximize2 className="w-4 h-4" />
                                Show More
                              </button>
                            </div>
                          )}

                          {/* Show Less Button */}
                          {isSourceExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center py-4">
                              <button
                                onClick={() => setIsSourceExpanded(false)}
                                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                              >
                                <Maximize2 className="w-4 h-4" />
                                Show Less
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Multi-step workflow (4 states)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Layout animations with layoutId</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Staggered entrance animations</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Spring physics transitions</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Dark mode support</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Responsive design</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Auto-progression (processing to success)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Backdrop blur effect</span>
                  </li>
                </ul>
              </div>

              {/* Props Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Component Props</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-800">
                        <th className="text-left py-2 px-4 font-semibold text-zinc-900 dark:text-white">Prop</th>
                        <th className="text-left py-2 px-4 font-semibold text-zinc-900 dark:text-white">Type</th>
                        <th className="text-left py-2 px-4 font-semibold text-zinc-900 dark:text-white">Default</th>
                        <th className="text-left py-2 px-4 font-semibold text-zinc-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-200 dark:border-zinc-800">
                        <td className="py-2 px-4 font-mono text-zinc-600 dark:text-zinc-400">-</td>
                        <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">-</td>
                        <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">-</td>
                        <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">No props required. Component manages its own state.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                  Note: The component is self-contained with internal state management. For customization, you can modify the source code directly.
                </p>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return renderComponentDemo();
  }, [selectedComponent, activeTab, isSourceExpanded, previousComponent, nextComponent]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pr-8 py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile: Back to Home - Top */}
          <div className="lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          {/* Sidebar - Mobile: Horizontal scroll, Desktop: Sticky sidebar */}
          <aside className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Desktop: Back to Home Link */}
              <Link
                href="/"
                className="hidden lg:inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>

              {/* Sidebar Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl lg:rounded-3xl p-4 sm:p-6 shadow-lg">
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-3 sm:mb-4">
                  Components
                </h2>

                {/* Mobile: Horizontal scrolling tabs */}
                <nav className="lg:space-y-2">
                  <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0 scrollbar-hide relative">
                    {components.map((component) => (
                      <button
                        key={component.id}
                        onClick={() => setSelectedComponent(component.id)}
                        className={`flex-shrink-0 lg:w-full text-left px-4 py-3 rounded-xl relative z-10 ${selectedComponent === component.id
                            ? "text-white dark:text-zinc-900"
                            : "text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                          }`}
                      >
                        {selectedComponent === component.id && (
                          <motion.div
                            layoutId="active-tab-bg"
                            className="absolute inset-0 bg-zinc-900 dark:bg-zinc-100 rounded-xl -z-10"
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                          />
                        )}
                        <div className="font-semibold text-sm sm:text-base whitespace-nowrap lg:whitespace-normal">
                          {component.name}
                        </div>
                        <div
                          className={`text-xs mt-1 hidden sm:block ${selectedComponent === component.id
                              ? "text-zinc-300 dark:text-zinc-600"
                              : "text-zinc-500 dark:text-zinc-400"
                            }`}
                        >
                          {component.category}
                        </div>
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Stats - Hidden on mobile */}
                <div className="hidden sm:block mt-6 lg:mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Components</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {components.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Categories</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {new Set(components.map((c) => c.category)).size}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:max-w-5xl min-w-0">
            <motion.div
              key={selectedComponent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden"
            >
              {componentDemo}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
