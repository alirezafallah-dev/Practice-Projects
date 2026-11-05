import {
  Search, Menu, X, Sun, Moon, Clock, Users, Trash2, Heart, Share2,
  ExternalLink, ChevronRight, ChevronLeft, Check, Star, Leaf, Filter,
  SlidersHorizontal, ArrowLeft, ArrowUpRight, BookOpen, ArrowRight,
  Printer, Wine, Camera, AlarmClock, CheckCircle2, Flame, Activity,
  Salad, Coffee, Utensils, Soup
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import { forwardRef } from "react";

const createIcon = (Icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>) =>
  forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
    <Icon ref={ref} strokeWidth={2} {...props} />
  ));

export const SearchIcon = createIcon(Search);
export const MenuIcon = createIcon(Menu);
export const XIcon = createIcon(X);
export const SunIcon = createIcon(Sun);
export const MoonIcon = createIcon(Moon);
export const ClockIcon = createIcon(Clock);
export const UsersIcon = createIcon(Users);
export const TrashIcon = createIcon(Trash2);
export const ShareIcon = createIcon(Share2);
export const ExternalLinkIcon = createIcon(ExternalLink);
export const ChevronRightIcon = createIcon(ChevronRight);
export const ChevronLeftIcon = createIcon(ChevronLeft);
export const CheckIcon = createIcon(Check);
export const StarIcon = createIcon(Star);
export const LeafIcon = createIcon(Leaf);
export const FilterIcon = createIcon(Filter);
export const SlidersIcon = createIcon(SlidersHorizontal);
export const ArrowLeftIcon = createIcon(ArrowLeft);
export const ArrowUpRightIcon = createIcon(ArrowUpRight);
export const BookOpenIcon = createIcon(BookOpen);
export const ArrowRightIcon = createIcon(ArrowRight);
export const PrinterIcon = createIcon(Printer);
export const WineIcon = createIcon(Wine);
export const CameraIcon = createIcon(Camera);
export const AlarmIcon = createIcon(AlarmClock);
export const VerifiedIcon = createIcon(CheckCircle2);
export const FlameIcon = createIcon(Flame);
export const PulseIcon = createIcon(Activity);
export const SaladIcon = createIcon(Salad);
export const CoffeeIcon = createIcon(Coffee);
export const UtensilsIcon = createIcon(Utensils);
export const SoupIcon = createIcon(Soup);

// Heart Icon با قابلیت توپر شدن (برای دکمه علاقه‌مندی‌ها)
type HeartIconProps = LucideProps & { filled?: boolean };
export const HeartIcon = forwardRef<SVGSVGElement, HeartIconProps>(({ filled, ...props }, ref) => (
  <Heart ref={ref} fill={filled ? "currentColor" : "none"} strokeWidth={2} {...props} />
));
HeartIcon.displayName = "HeartIcon";