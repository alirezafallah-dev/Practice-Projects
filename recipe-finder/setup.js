const fs = require('fs');
const path = require('path');

const dirs = [
  'app/api/recipes/[id]','app/favorites','app/recipe/[id]','app/search','app/about',
  'components/layout','components/home','components/recipes','components/recipe','components/ui',
  'context','lib','types','public/images/recipes'
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

const files = {
  'package.json': JSON.stringify({
    name: "recipe-finder", version: "1.0.0", private: true,
    scripts: { dev: "next dev", build: "next build", start: "next start" },
    dependencies: { next: "^16.0.0", "next-themes": "^0.4.6", react: "^19.2.0", "react-dom": "^19.2.0" },
    devDependencies: {
      "@types/node": "^22.10.0", "@types/react": "^19.0.0", "@types/react-dom": "^19.0.0",
      autoprefixer: "^10.4.20", postcss: "^8.4.49", tailwindcss: "^3.4.17", typescript: "^5.7.0"
    }
  }, null, 2),
  '.env.local.example': 'SPOONACULAR_API_KEY=\nNEXT_PUBLIC_SITE_URL=http://localhost:3000',
  '.gitignore': 'node_modules\n.next\nout\n.env*.local\n*.tsbuildinfo\nnext-env.d.ts',
  'tsconfig.json': JSON.stringify({
    compilerOptions: {
      target: "ES2017", lib: ["dom", "dom.iterable", "esnext"], allowJs: true, skipLibCheck: true,
      strict: true, noEmit: true, esModuleInterop: true, module: "esnext",
      moduleResolution: "bundler", resolveJsonModule: true, isolatedModules: true,
      jsx: "preserve", incremental: true, plugins: [{ name: "next" }],
      paths: { "@/*": ["./*"] }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  }, null, 2),
  'next.config.ts': `import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.spoonacular.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
export default nextConfig;`,
  'tailwind.config.ts': `import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}","./context/**/*.{ts,tsx}","./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { 50:"#FFFDF8",100:"#FFF9EE",200:"#FDF0DC",300:"#FAE2C0" },
        brand: { 50:"#FFF7ED",100:"#FFEDD5",200:"#FED7AA",300:"#FDBA74",400:"#FB923C",500:"#F97316",600:"#EA580C",700:"#C2410C",800:"#9A3412",900:"#7C2D12" },
        basil: { 50:"#F0FDF4",100:"#DCFCE7",200:"#BBF7D0",300:"#86EFAC",400:"#4ADE80",500:"#22C55E",600:"#16A34A",700:"#15803D",800:"#166534",900:"#14532D" },
      },
      fontFamily: {
        sans: ["var(--font-vazir)", "var(--font-poppins)", "system-ui", "sans-serif"],
        latin: ["var(--font-poppins)", "var(--font-vazir)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;`,
  'postcss.config.mjs': `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };`
};

for (const [f, c] of Object.entries(files)) fs.writeFileSync(f, c, 'utf8');
console.log('✅ ساختار پایه ساخته شد. حالا npm install را اجرا کن.');