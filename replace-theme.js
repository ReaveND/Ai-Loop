const fs = require('fs');

const files = [
  'app/(dashboard)/ask/AskLoopClient.tsx',
  'app/(dashboard)/ask/page.tsx',
  'app/(dashboard)/dashboard/page.tsx',
  'app/(dashboard)/themes/page.tsx',
  'components/DashboardMetrics.tsx',
  'components/SettingsTabs.tsx',
  'components/Sidebar.tsx',
  'components/charts/ThemesChart.tsx',
  'components/landing/ProductPreviewDemo.tsx'
];

const replacements = [
  { from: /text-slate-900 dark:text-white/g, to: 'text-textPrimary' },
  { from: /text-slate-500/g, to: 'text-textSecondary' },
  { from: /bg-white dark:bg-slate-900/g, to: 'bg-surface-1' },
  { from: /border-slate-200 dark:border-slate-800/g, to: 'border-borderSubtle' },
  { from: /bg-slate-50 dark:bg-slate-800\/50/g, to: 'bg-surface-2/50' },
  { from: /bg-slate-50 dark:bg-slate-950/g, to: 'bg-canvas' },
  { from: /divide-slate-200 dark:divide-slate-800/g, to: 'divide-borderSubtle' },
  { from: /hover:bg-slate-100 dark:hover:bg-slate-800/g, to: 'hover:bg-surface-2' },
  { from: /hover:bg-slate-50 dark:hover:bg-slate-800\/50/g, to: 'hover:bg-surface-2/50' },
  { from: /bg-slate-200 dark:bg-slate-700/g, to: 'bg-surface-2' },
  { from: /text-slate-600 dark:text-slate-300/g, to: 'text-textSecondary' },
  { from: /text-slate-900/g, to: 'text-textPrimary' },
  { from: /dark:text-white/g, to: 'text-textPrimary' }
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    replacements.forEach(r => {
      content = content.replace(r.from, r.to);
    });
    fs.writeFileSync(file, content);
  }
});
console.log('Done');
