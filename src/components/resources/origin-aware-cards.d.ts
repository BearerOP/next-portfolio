/**
 * Type definitions for Origin Aware Cards component
 * @module origin-aware-cards
 */

/**
 * Card interface defining the structure of each card
 */
export interface Card {
  /**
   * Unique identifier for the card
   * Used for layoutId matching in animations
   */
  id: number;

  /**
   * Title displayed on the card
   * Visible in both collapsed and expanded states
   */
  title: string;

  /**
   * Description text for the card
   * Visible in both collapsed and expanded states
   */
  description: string;

  /**
   * Optional Tailwind CSS classes for the card's background in collapsed state
   * @example "bg-blue-200 dark:bg-blue-900"
   */
  color?: string;

  /**
   * Optional Tailwind CSS classes for the card's background in expanded modal state
   * @example "bg-blue-400 dark:bg-blue-700"
   */
  expandedColor?: string;
}

/**
 * Props for the OriginAwareCards component
 */
export interface OriginAwareCardsProps {
  /**
   * Array of card objects to display
   * If not provided, defaults to sample cards
   * @default defaultCards
   */
  cards?: Card[];

  /**
   * Additional Tailwind CSS classes for the container wrapper
   * @example "bg-gradient-to-br from-slate-200 to-slate-400"
   */
  containerClassName?: string;

  /**
   * Additional Tailwind CSS classes for individual cards in collapsed state
   * @example "border-2 border-zinc-400 shadow-xl"
   */
  cardClassName?: string;

  /**
   * Additional Tailwind CSS classes for the expanded modal state
   * @example "border-4 border-white shadow-2xl"
   */
  expandedClassName?: string;
}

/**
 * Origin Aware Cards Component
 *
 * An interactive card component with origin-aware animations powered by Framer Motion.
 * Cards smoothly expand from their original position to a centered modal view.
 *
 * @component
 * @example
 * ```tsx
 * import { OriginAwareCards } from "@/components/resources/origin-aware-cards";
 *
 * const cards = [
 *   {
 *     id: 1,
 *     title: "Feature 1",
 *     description: "Description",
 *     color: "bg-blue-200",
 *     expandedColor: "bg-blue-500"
 *   }
 * ];
 *
 * <OriginAwareCards cards={cards} />
 * ```
 */
export function OriginAwareCards(props: OriginAwareCardsProps): JSX.Element;

// Default export
export default OriginAwareCards;
