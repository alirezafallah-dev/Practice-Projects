// components/ui/icons.tsx
import type { SVGProps } from "react";
import {
  Activity,
  AlarmClock,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Bookmark,
  Camera,
  ChefHat,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  ExternalLink,
  Filter,
  Flame,
  Globe,
  Heart as HeartLucide,
  Home,
  Info,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Minus,
  Moon,
  Phone,
  Pizza,
  Plus,
  Printer,
  Search,
  Sandwich,
  Send,
  Share2,
  ShoppingBasket,
  SlidersHorizontal,
  Soup,
  Sparkles,
  Star,
  Sun,
  Trash2,
  User,
  Users,
  Utensils,
  Wheat,
  Wine,
  X,
} from "lucide-react";

export type IconProps = SVGProps<SVGSVGElement> & {
  filled?: boolean;
};

export function HeartIcon({ filled, ...props }: IconProps) {
  return <HeartLucide {...props} fill={filled ? "currentColor" : "none"} />;
}

export const SearchIcon = Search;
export const MenuIcon = Menu;
export const XIcon = X;
export const SunIcon = Sun;
export const MoonIcon = Moon;
export const ClockIcon = Clock;
export const UsersIcon = Users;
export const UserIcon = User;
export const TrashIcon = Trash2;
export const ShareIcon = Share2;
export const ExternalLinkIcon = ExternalLink;
export const ChevronRightIcon = ChevronRight;
export const ChevronLeftIcon = ChevronLeft;
export const ChevronDownIcon = ChevronDown;
export const ChevronUpIcon = ChevronUp;
export const CheckIcon = Check;
export const CheckCircleIcon = Check;
export const StarIcon = Star;
export const LeafIcon = Leaf;
export const FilterIcon = Filter;
export const SlidersIcon = SlidersHorizontal;
export const ArrowLeftIcon = ArrowLeft;
export const ArrowRightIcon = ArrowRight;
export const ArrowUpRightIcon = ArrowUpRight;
export const BookOpenIcon = BookOpen;
export const PrinterIcon = Printer;
export const WineIcon = Wine;
export const CameraIcon = Camera;
export const AlarmIcon = AlarmClock;
export const VerifiedIcon = BadgeCheck;
export const FlameIcon = Flame;
export const PulseIcon = Activity;
export const BookmarkIcon = Bookmark;
export const SparklesIcon = Sparkles;
export const UtensilsIcon = Utensils;
export const ChefHatIcon = ChefHat;
export const MailIcon = Mail;
export const SendIcon = Send;
export const PlusIcon = Plus;
export const MinusIcon = Minus;
export const HomeIcon = Home;
export const InfoIcon = Info;
export const MapPinIcon = MapPin;
export const PhoneIcon = Phone;
export const GlobeIcon = Globe;

// Culinary aliases
export const PizzaIcon = Pizza;
export const RamenIcon = Soup;
export const TacoIcon = Sandwich;
export const OliveIcon = Leaf;
export const CurryIcon = Flame;
export const CroissantIcon = Wheat;
export const BasketIcon = ShoppingBasket;