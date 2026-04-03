// src/data/keyboard.ts
export interface KeyData {
  id: string;
  icon: string;
  label: string;
  sub?: string;
  wide?: boolean;
  wider?: boolean;
  cf?: boolean; // Cloudflare cluster — orange stem
}

export const KEYBOARD_ROWS: KeyData[][] = [
  // Row 1: Languages
  [
    { id: 'typescript', icon: '🔷', label: 'TypeScript' },
    { id: 'javascript', icon: '🟨', label: 'JavaScript' },
    { id: 'java', icon: '☕', label: 'Java' },
    { id: 'rust', icon: '🦀', label: 'Rust' },
    { id: 'cpp', icon: '⚙️', label: 'C++' },
    { id: 'csharp', icon: '🔵', label: 'C#' },
    { id: 'php', icon: '🐘', label: 'PHP' },
  ],
  // Row 2: Frontend / Templating
  [
    { id: 'react', icon: '⚛️', label: 'React' },
    { id: 'tailwind', icon: '🌊', label: 'Tailwind CSS', wide: true },
    { id: 'pug', icon: '🎭', label: 'Pug' },
    { id: 'ejs', icon: '📄', label: 'EJS' },
    { id: 'vite', icon: '⚡', label: 'Vite' },
  ],
  // Row 3: Backend / Runtime
  [
    { id: 'nodejs', icon: '🟢', label: 'Node.js', wide: true },
    { id: 'express', icon: '🚂', label: 'Express', wide: true },
    { id: 'mysql', icon: '🐬', label: 'MySQL' },
    { id: 'docker', icon: '🐳', label: 'Docker' },
    { id: 'shell', icon: '🖥️', label: 'Shell' },
  ],
  // Row 4: Cloudflare + Platforms
  [
    { id: 'cf-workers', icon: '🟠', label: 'CF Workers', sub: 'Edge Runtime', cf: true, wider: true },
    { id: 'cf-d1', icon: '🗄️', label: 'D1', sub: 'Database', cf: true },
    { id: 'cf-r2', icon: '🪣', label: 'R2', sub: 'Storage', cf: true },
    { id: 'discord', icon: '💬', label: 'Discord.js' },
    { id: 'minecraft', icon: '🧱', label: 'Minecraft' },
  ],
];
