import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></Svg>
);
export const MenuIcon = (p: IconProps) => (
  <Svg {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Svg>
);
export const XIcon = (p: IconProps) => (
  <Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>
);
export const SunIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </Svg>
);
export const MoonIcon = (p: IconProps) => (
  <Svg {...p}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></Svg>
);
export const ClockIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Svg>
);
export const UsersIcon = (p: IconProps) => (
  <Svg {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Svg>
);
export const TrashIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  </Svg>
);
export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <Svg fill={filled ? "currentColor" : "none"} {...p}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </Svg>
);
export const ShareIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
  </Svg>
);
export const ExternalLinkIcon = (p: IconProps) => (
  <Svg {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></Svg>
);
export const ChevronRightIcon = (p: IconProps) => (<Svg {...p}><path d="m9 18 6-6-6-6" /></Svg>);
export const ChevronLeftIcon = (p: IconProps) => (<Svg {...p}><path d="m15 18-6-6 6-6" /></Svg>);
export const CheckIcon = (p: IconProps) => (<Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>);
export const StarIcon = (p: IconProps) => (
  <Svg {...p}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></Svg>
);
export const LeafIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </Svg>
);
export const FilterIcon = (p: IconProps) => (
  <Svg {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></Svg>
);
export const SlidersIcon = (p: IconProps) => (
  <Svg {...p}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4" /></Svg>
);
export const ArrowLeftIcon = (p: IconProps) => (
  <Svg {...p}><path d="M19 12H5m7 7-7-7 7-7" /></Svg>
);
export const ArrowUpRightIcon = (p: IconProps) => (
  <Svg {...p}><path d="M7 17 17 7M8 7h9v9" /></Svg>
);
export const BookOpenIcon = (p: IconProps) => (
  <Svg {...p}><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" /></Svg>
);
export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}><path d="M5 12h14m-7-7 7 7-7 7" /></Svg>
);
export const PrinterIcon = (p: IconProps) => (
  <Svg {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" rx="1" /></Svg>
);
export const WineIcon = (p: IconProps) => (
  <Svg {...p}><path d="M8 22h8M12 15v7M12 15a5 5 0 0 0 5-5V2H7v8a5 5 0 0 0 5 5Z" /></Svg>
);
export const CameraIcon = (p: IconProps) => (
  <Svg {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3" /></Svg>
);
export const AlarmIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M5 3 2 6M22 6l-3-3" /></Svg>
);
export const VerifiedIcon = (p: IconProps) => (
  <Svg {...p}><path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="9" /></Svg>
);
export const FlameIcon = (p: IconProps) => (
  <Svg {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5Z" /></Svg>
);
export const PulseIcon = (p: IconProps) => (
  <Svg {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></Svg>
);