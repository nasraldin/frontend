import { Title } from '@solidjs/meta';
import { A } from '@solidjs/router';
import { createMemo, createSignal } from 'solid-js';

import {
  FadeInSection,
  ParallaxScroll,
  TypingAnimation,
} from '~/components/animations';
import Icons from '~/components/icons';

// Constants
const SIZE_OPTIONS = [
  { label: 'Small', value: 16 },
  { label: 'Medium', value: 24 },
  { label: 'Large', value: 32 },
  { label: 'X-Large', value: 48 },
  { label: 'XX-Large', value: 64 },
] as const;

const COLOR_OPTIONS = [
  { label: 'White', value: '#ffffff' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Green', value: '#10b981' },
  { label: 'Purple', value: '#8b5cf6' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Yellow', value: '#f59e0b' },
  { label: 'Pink', value: '#ec4899' },
  { label: 'Cyan', value: '#06b6d4' },
] as const;

// SVG icons from public/svg directory
const SVG_ICONS = [
  '2fa',
  'ad-open',
  'apple',
  'buy',
  'customer-satisfaction',
  'facebook',
  'google-play',
  'google',
  'holiday-in',
  'instagram',
  'linkedin',
  'microsoft',
  'no-guests',
  'no-payment-method',
  'no-pending-invoices',
  'no-profile-picture-female',
  'no-profile-picture',
  'not-found',
  'password',
  'private',
  'rent',
  'sale',
  'search',
  'settings',
  'sso',
  'timing-out',
  'total-revenue',
  'volume',
  'x',
];

// Flag icons from public/flags directory
const FLAG_ICONS = [
  'ad',
  'ae',
  'af',
  'ag',
  'ai',
  'al',
  'am',
  'ao',
  'aq',
  'ar',
  'as',
  'at',
  'au',
  'aw',
  'ax',
  'az',
  'ba',
  'bb',
  'bd',
  'be',
  'bf',
  'bg',
  'bh',
  'bi',
  'bj',
  'bl',
  'bm',
  'bn',
  'bo',
  'bq',
  'br',
  'bs',
  'bt',
  'bv',
  'bw',
  'by',
  'bz',
  'ca',
  'cc',
  'cd',
  'cf',
  'cg',
  'ch',
  'ci',
  'ck',
  'cl',
  'cm',
  'cn',
  'co',
  'cr',
  'cu',
  'cv',
  'cw',
  'cx',
  'cy',
  'cz',
  'de',
  'dj',
  'dk',
  'dm',
  'do',
  'dz',
  'ec',
  'ee',
  'eg',
  'eh',
  'er',
  'es',
  'et',
  'eu',
  'fi',
  'fj',
  'fk',
  'fm',
  'fo',
  'fr',
  'ga',
  'gb-eng',
  'gb-nir',
  'gb-sct',
  'gb-wls',
  'gb',
  'gd',
  'ge',
  'gf',
  'gg',
  'gh',
  'gi',
  'gl',
  'gm',
  'gn',
  'gp',
  'gq',
  'gr',
  'gs',
  'gt',
  'gu',
  'gw',
  'gy',
  'hk',
  'hm',
  'hn',
  'hr',
  'ht',
  'hu',
  'id',
  'ie',
  'im',
  'in',
  'io',
  'iq',
  'ir',
  'is',
  'it',
  'je',
  'jm',
  'jo',
  'jp',
  'ke',
  'kg',
  'kh',
  'ki',
  'km',
  'kn',
  'kp',
  'kr',
  'kw',
  'ky',
  'kz',
  'la',
  'lb',
  'lc',
  'li',
  'lk',
  'lr',
  'ls',
  'lt',
  'lu',
  'lv',
  'ly',
  'ma',
  'mc',
  'md',
  'me',
  'mf',
  'mg',
  'mh',
  'mk',
  'ml',
  'mm',
  'mn',
  'mo',
  'mp',
  'mq',
  'mr',
  'ms',
  'mt',
  'mu',
  'mv',
  'mw',
  'mx',
  'my',
  'mz',
  'na',
  'nc',
  'ne',
  'nf',
  'ng',
  'ni',
  'nl',
  'no',
  'np',
  'nr',
  'nu',
  'nz',
  'om',
  'pa',
  'pe',
  'pf',
  'pg',
  'ph',
  'pk',
  'pl',
  'pm',
  'pn',
  'pr',
  'ps',
  'pt',
  'pw',
  'py',
  'qa',
  're',
  'ro',
  'rs',
  'ru',
  'rw',
  'sa',
  'sb',
  'sc',
  'sd',
  'se',
  'sg',
  'sh',
  'si',
  'sj',
  'sk',
  'sl',
  'sm',
  'sn',
  'so',
  'sr',
  'ss',
  'st',
  'sv',
  'sx',
  'sy',
  'sz',
  'tc',
  'td',
  'tf',
  'tg',
  'th',
  'tj',
  'tk',
  'tl',
  'tm',
  'tn',
  'to',
  'tr',
  'tt',
  'tv',
  'tw',
  'tz',
  'ua',
  'ug',
  'um',
  'us',
  'uy',
  'uz',
  'va',
  'vc',
  've',
  'vg',
  'vi',
  'vn',
  'vu',
  'wf',
  'ws',
  'xk',
  'ye',
  'yt',
  'za',
  'zm',
  'zw',
];

export default function IconsPage() {
  // State for search and size controls
  const [lucideSearch, setLucideSearch] = createSignal('');
  const [svgSearch, setSvgSearch] = createSignal('');
  const [flagsSearch, setFlagsSearch] = createSignal('');
  const [iconSize, setIconSize] = createSignal(48);
  const [iconColor, setIconColor] = createSignal('#ffffff');
  const [isRTL, setIsRTL] = createSignal(false);
  const [showAllLucide, setShowAllLucide] = createSignal(false);
  const [showAllSvg, setShowAllSvg] = createSignal(false);
  const [showAllFlags, setShowAllFlags] = createSignal(false);
  const [selectedSvg, setSelectedSvg] = createSignal<string | null>(null);

  // Filtered icons based on search
  const filteredLucideIcons = createMemo(() => {
    const search = lucideSearch().toLowerCase();
    const allIcons = Object.entries(Icons);
    if (!search) return allIcons;
    return allIcons.filter(([name]) => name.toLowerCase().includes(search));
  });

  const filteredSvgIcons = createMemo(() => {
    const search = svgSearch().toLowerCase();
    if (!search) return SVG_ICONS;
    return SVG_ICONS.filter((name) => name.toLowerCase().includes(search));
  });

  const filteredFlagIcons = createMemo(() => {
    const search = flagsSearch().toLowerCase();
    if (!search) return FLAG_ICONS;
    return FLAG_ICONS.filter((name) => name.toLowerCase().includes(search));
  });

  // Icons to display (limited or all)
  const displayedLucideIcons = createMemo(() => {
    const icons = filteredLucideIcons();
    return showAllLucide() ? icons : icons.slice(0, 24);
  });

  const displayedSvgIcons = createMemo(() => {
    const icons = filteredSvgIcons();
    return showAllSvg() ? icons : icons.slice(0, 24);
  });

  const displayedFlagIcons = createMemo(() => {
    const icons = filteredFlagIcons();
    return showAllFlags() ? icons : icons.slice(0, 24);
  });

  return (
    <main class="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Title>Icon Components Demo</Title>

      {/* Navigation */}
      <nav class="sticky top-0 z-50 bg-black/40 backdrop-blur-sm">
        <div class="mx-auto max-w-6xl px-4 py-4">
          <div class="flex items-center justify-between">
            <A href="/ui" class="text-xl font-bold">
              ← Back to UI Components
            </A>
            <div class="flex space-x-4">
              <A href="#lucide" class="text-sm hover:text-green-400">
                Lucide Icons
              </A>
              <A href="#svg" class="text-sm hover:text-green-400">
                SVG Icons
              </A>
              <A href="#flags" class="text-sm hover:text-green-400">
                Flag Icons
              </A>
              <A href="#categories" class="text-sm hover:text-green-400">
                Categories
              </A>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="relative flex h-screen items-center justify-center overflow-hidden">
        <ParallaxScroll speed={0.05} direction="up" className="absolute inset-0">
          <div class="h-full w-full bg-linear-to-r from-green-600/20 to-emerald-600/20" />
        </ParallaxScroll>

        <div class="relative z-10 text-center">
          <TypingAnimation
            text="Icon Components"
            speed="normal"
            cursor="line"
            className="mb-4 text-4xl font-bold md:text-6xl"
          />
          <FadeInSection
            delay={1}
            direction="up"
            className="mt-3 text-xl opacity-80"
          >
            Beautiful, customizable icon components
          </FadeInSection>
        </div>
      </section>

      {/* Lucide Icons */}
      <section id="lucide" class="px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <FadeInSection direction="up" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">Lucide Icons</h2>
            <p class="text-gray-300">
              Clean, consistent Lucide icons for modern interfaces
            </p>
          </FadeInSection>

          {/* Search and Size Controls */}
          <FadeInSection direction="up" className="mb-8">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Search Lucide icons..."
                    value={lucideSearch()}
                    onInput={(e) => setLucideSearch(e.currentTarget.value)}
                    class="w-full rounded-lg bg-white/10 px-4 py-2 pr-10 text-white placeholder-gray-400 backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-64"
                  />
                  <Icons.Search
                    size={16}
                    class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <label
                    id="lucide-icon-size-select-label"
                    for="lucide-icon-size-select"
                    class="text-sm text-gray-300"
                  >
                    Size:
                  </label>
                  <select
                    id="lucide-icon-size-select"
                    aria-labelledby="lucide-icon-size-select-label"
                    value={iconSize()}
                    onChange={(e) => setIconSize(Number(e.currentTarget.value))}
                    class="rounded-lg bg-white/10 px-3 py-1 text-white backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {SIZE_OPTIONS.map((option) => (
                      <option
                        value={option.value}
                        selected={option.value === iconSize()}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="flex items-center gap-2">
                  <label
                    id="icon-size-custom-label"
                    for="icon-size-custom"
                    class="text-sm text-gray-300"
                  >
                    Custom:
                  </label>
                  <input
                    id="icon-size-custom"
                    type="number"
                    min="8"
                    max="128"
                    aria-labelledby="icon-size-custom-label"
                    value={iconSize()}
                    onInput={(e) => setIconSize(Number(e.currentTarget.value))}
                    class="w-20 rounded-lg bg-white/10 px-3 py-1 text-white backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div class="flex items-center gap-2">
                  <label
                    id="icon-color-select-label"
                    for="icon-color-select"
                    class="text-sm text-gray-300"
                  >
                    Color:
                  </label>
                  <select
                    id="icon-color-select"
                    aria-labelledby="icon-color-select-label"
                    value={iconColor()}
                    onChange={(e) => setIconColor(e.currentTarget.value)}
                    class="rounded-lg bg-white/10 px-3 py-1 text-white backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {COLOR_OPTIONS.map((option) => (
                      <option
                        value={option.value}
                        selected={option.value === iconColor()}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="flex items-center gap-2">
                  <label
                    id="icon-color-custom-label"
                    for="icon-color-custom"
                    class="text-sm text-gray-300"
                  >
                    Custom:
                  </label>
                  <input
                    id="icon-color-custom"
                    type="color"
                    aria-labelledby="icon-color-custom-label"
                    value={iconColor()}
                    onInput={(e) => setIconColor(e.currentTarget.value)}
                    class="h-8 w-12 rounded-lg border-0 bg-transparent focus:outline-none"
                  />
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-300">Direction:</span>
                  <button
                    onClick={() => setIsRTL(!isRTL())}
                    class={`flex items-center gap-2 rounded-lg px-3 py-1 text-sm transition-all duration-300 ${
                      isRTL()
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <span>{isRTL() ? 'RTL' : 'LTR'}</span>
                    <Icons.ArrowRightLeft size={14} />
                  </button>
                </div>
              </div>
            </div>
          </FadeInSection>

          <div
            class="grid gap-4 md:grid-cols-5 lg:grid-cols-6"
            dir={isRTL() ? 'rtl' : 'ltr'}
          >
            {displayedLucideIcons().map(([name, Icon], index) => (
              <FadeInSection
                direction="up"
                delay={index * 0.05}
                className="group rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                <div class="mb-2 flex justify-center">
                  <Icon
                    size={iconSize()}
                    style={{
                      color: iconColor(),
                      transform: isRTL() ? 'scaleX(-1)' : 'none',
                    }}
                  />
                </div>
                <p class="text-xs text-gray-300 group-hover:text-white">{name}</p>
              </FadeInSection>
            ))}
          </div>

          <div class="mt-8 text-center">
            <p class="text-gray-400">
              Showing {displayedLucideIcons().length} of{' '}
              {filteredLucideIcons().length} Lucide icons
              {lucideSearch() &&
                ` (filtered from ${Object.keys(Icons).length} total)`}
            </p>
            {!showAllLucide() &&
              displayedLucideIcons().length < filteredLucideIcons().length && (
                <button
                  onClick={() => setShowAllLucide(true)}
                  class="mt-4 rounded-lg bg-blue-500/20 px-6 py-2 text-blue-400 transition-all duration-300 hover:bg-blue-500/30 hover:text-blue-300"
                >
                  Show All Lucide Icons
                </button>
              )}
            {showAllLucide() && (
              <button
                onClick={() => setShowAllLucide(false)}
                class="mt-4 rounded-lg bg-gray-500/20 px-6 py-2 text-gray-400 transition-all duration-300 hover:bg-gray-500/30 hover:text-gray-300"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SVG Icons */}
      <section id="svg" class="bg-black/20 px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <FadeInSection direction="up" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">SVG Icons</h2>
            <p class="text-gray-300">Custom SVG icons from public/svg directory</p>
          </FadeInSection>

          {/* Search and Size Controls */}
          <FadeInSection direction="up" className="mb-8">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Search SVG icons..."
                    value={svgSearch()}
                    onInput={(e) => setSvgSearch(e.currentTarget.value)}
                    class="w-full rounded-lg bg-white/10 px-4 py-2 pr-10 text-white placeholder-gray-400 backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-green-500 focus:outline-none sm:w-64"
                  />
                  <Icons.Search
                    size={16}
                    class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div class="flex items-center gap-4">
                <p class="text-sm text-gray-400">
                  Click on any SVG icon to view it in full size
                </p>
              </div>
            </div>
          </FadeInSection>

          <div class="grid gap-4 md:grid-cols-5 lg:grid-cols-6">
            {displayedSvgIcons().map((name, index) => (
              <FadeInSection
                direction="up"
                delay={index * 0.05}
                className="group cursor-pointer rounded-lg bg-linear-to-br from-green-500/20 to-emerald-500/20 p-4 text-center transition-all duration-300 hover:scale-105 hover:from-green-500/30 hover:to-emerald-500/30"
              >
                <button
                  type="button"
                  onClick={() => setSelectedSvg(name)}
                  class="w-full text-left"
                >
                  <div class="mb-2 flex justify-center">
                    <img
                      src={`/svg/${name}.svg`}
                      alt={name}
                      width="48"
                      height="48"
                      class="transition-all duration-300 hover:scale-110"
                    />
                  </div>
                  <p class="text-xs text-gray-300 group-hover:text-white">{name}</p>
                </button>
              </FadeInSection>
            ))}
          </div>

          <div class="mt-8 text-center">
            <p class="text-gray-400">
              Showing {displayedSvgIcons().length} of {filteredSvgIcons().length}{' '}
              SVG icons
              {svgSearch() && ` (filtered from ${SVG_ICONS.length} total)`}
            </p>
            <p class="mt-2 text-sm text-gray-500">
              Custom SVG icons from public/svg directory
            </p>
            {!showAllSvg() &&
              displayedSvgIcons().length < filteredSvgIcons().length && (
                <button
                  onClick={() => setShowAllSvg(true)}
                  class="mt-4 rounded-lg bg-green-500/20 px-6 py-2 text-green-400 transition-all duration-300 hover:bg-green-500/30 hover:text-green-300"
                >
                  Show All SVG Icons
                </button>
              )}
            {showAllSvg() && (
              <button
                onClick={() => setShowAllSvg(false)}
                class="mt-4 rounded-lg bg-gray-500/20 px-6 py-2 text-gray-400 transition-all duration-300 hover:bg-gray-500/30 hover:text-gray-300"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Flag Icons */}
      <section id="flags" class="px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <FadeInSection direction="up" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">Flag Icons</h2>
            <p class="text-gray-300">
              Country and region flags from public/flags directory
            </p>
          </FadeInSection>

          {/* Search and Size Controls */}
          <FadeInSection direction="up" className="mb-8">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Search flag icons..."
                    value={flagsSearch()}
                    onInput={(e) => setFlagsSearch(e.currentTarget.value)}
                    class="w-full rounded-lg bg-white/10 px-4 py-2 pr-10 text-white placeholder-gray-400 backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-64"
                  />
                  <Icons.Search
                    size={16}
                    class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-4">
                <div class="flex items-center gap-2">
                  <label
                    id="flag-size-select-label"
                    for="flag-size-select"
                    class="text-sm text-gray-300"
                  >
                    Size:
                  </label>
                  <select
                    id="flag-size-select"
                    aria-labelledby="flag-size-select-label"
                    value={iconSize()}
                    onChange={(e) => setIconSize(Number(e.currentTarget.value))}
                    class="rounded-lg bg-white/10 px-3 py-1 text-white backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {SIZE_OPTIONS.map((option) => (
                      <option
                        value={option.value}
                        selected={option.value === iconSize()}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div class="flex items-center gap-2">
                  <label
                    id="flag-size-custom-label"
                    for="flag-size-custom"
                    class="text-sm text-gray-300"
                  >
                    Custom:
                  </label>
                  <input
                    id="flag-size-custom"
                    type="number"
                    min="16"
                    max="128"
                    aria-labelledby="flag-size-custom-label"
                    value={iconSize()}
                    onInput={(e) => setIconSize(Number(e.currentTarget.value))}
                    class="w-20 rounded-lg bg-white/10 px-2 py-1 text-white backdrop-blur-sm focus:bg-white/20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </FadeInSection>

          <div class="grid gap-4 md:grid-cols-5 lg:grid-cols-6">
            {displayedFlagIcons().map((name, index) => (
              <FadeInSection
                direction="up"
                delay={index * 0.05}
                className="group rounded-lg bg-linear-to-br from-blue-500/20 to-cyan-500/20 p-4 text-center transition-all duration-300 hover:scale-105 hover:from-blue-500/30 hover:to-cyan-500/30"
              >
                <div class="mb-2 flex justify-center">
                  <img
                    src={`/flags/${name}.svg`}
                    alt={name}
                    width={iconSize()}
                    height={iconSize()}
                    class="transition-all duration-300 hover:scale-110"
                  />
                </div>
                <p class="text-xs text-gray-300 group-hover:text-white">
                  {name.toUpperCase()}
                </p>
              </FadeInSection>
            ))}
          </div>

          <div class="mt-8 text-center">
            <p class="text-gray-400">
              Showing {displayedFlagIcons().length} of {filteredFlagIcons().length}{' '}
              flag icons
              {flagsSearch() && ` (filtered from ${FLAG_ICONS.length} total)`}
            </p>
            <p class="mt-2 text-sm text-gray-500">
              Country and region flags from public/flags directory
            </p>
            {!showAllFlags() &&
              displayedFlagIcons().length < filteredFlagIcons().length && (
                <button
                  onClick={() => setShowAllFlags(true)}
                  class="mt-4 rounded-lg bg-blue-500/20 px-6 py-2 text-blue-400 transition-all duration-300 hover:bg-blue-500/30 hover:text-blue-300"
                >
                  Show All Flag Icons
                </button>
              )}
            {showAllFlags() && (
              <button
                onClick={() => setShowAllFlags(false)}
                class="mt-4 rounded-lg bg-gray-500/20 px-6 py-2 text-gray-400 transition-all duration-300 hover:bg-gray-500/30 hover:text-gray-300"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Icon Categories */}
      <section id="categories" class="px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <FadeInSection direction="up" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">Icon Categories</h2>
            <p class="text-gray-300">Organized by functionality and use cases</p>
          </FadeInSection>

          <div class="grid gap-8 md:grid-cols-3" dir={isRTL() ? 'rtl' : 'ltr'}>
            <FadeInSection
              direction="up"
              delay={0.1}
              className="rounded-lg bg-linear-to-br from-blue-500/20 to-cyan-500/20 p-8"
            >
              <h3 class="mb-4 text-2xl font-semibold">Navigation</h3>
              <div class="grid grid-cols-4 gap-4">
                <Icons.House
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Search
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Menu
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.ArrowLeft
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.ArrowRight
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.ChevronUp
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.ChevronDown
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.ChevronLeft
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
              </div>
              <p class="mt-4 text-gray-300">Essential navigation icons</p>
            </FadeInSection>

            <FadeInSection
              direction="up"
              delay={0.2}
              className="rounded-lg bg-linear-to-br from-green-500/20 to-emerald-500/20 p-8"
            >
              <h3 class="mb-4 text-2xl font-semibold">Actions</h3>
              <div class="grid grid-cols-4 gap-4">
                <Icons.Plus
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Minus
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Check
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.X
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.SquarePlus
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Trash2
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.FileText
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Share2
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
              </div>
              <p class="mt-4 text-gray-300">Common action icons</p>
            </FadeInSection>

            <FadeInSection
              direction="up"
              delay={0.3}
              className="rounded-lg bg-linear-to-br from-purple-500/20 to-pink-500/20 p-8"
            >
              <h3 class="mb-4 text-2xl font-semibold">Interface</h3>
              <div class="grid grid-cols-4 gap-4">
                <Icons.User
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Cog
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Bell
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Mail
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Phone
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Globe
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Lock
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
                <Icons.Heart
                  size={iconSize()}
                  style={{
                    color: iconColor(),
                    transform: isRTL() ? 'scaleX(-1)' : 'none',
                  }}
                />
              </div>
              <p class="mt-4 text-gray-300">Interface and status icons</p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section class="bg-black/20 px-4 py-20">
        <div class="mx-auto max-w-4xl text-center">
          <FadeInSection direction="up" className="mb-8">
            <h2 class="mb-4 text-3xl font-bold">More Icon Components</h2>
            <p class="mb-8 text-gray-300">
              Additional icon components and features coming soon
            </p>
          </FadeInSection>

          <div class="grid gap-6 md:grid-cols-3">
            <FadeInSection
              direction="up"
              delay={0.1}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <div class="mb-4 text-3xl">🎨</div>
              <h3 class="mb-2 text-xl font-semibold">SVG Icons</h3>
              <p class="text-gray-300">Scalable vector icons</p>
            </FadeInSection>

            <FadeInSection
              direction="up"
              delay={0.2}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <div class="mb-4 text-3xl">🎭</div>
              <h3 class="mb-2 text-xl font-semibold">Icon Sets</h3>
              <p class="text-gray-300">Complete icon collections</p>
            </FadeInSection>

            <FadeInSection
              direction="up"
              delay={0.3}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <div class="mb-4 text-3xl">🔧</div>
              <h3 class="mb-2 text-xl font-semibold">Custom Builder</h3>
              <p class="text-gray-300">Build your own icons</p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-black/40 px-4 py-12">
        <div class="mx-auto max-w-4xl text-center">
          <FadeInSection direction="up" className="mb-4 text-2xl font-bold">
            Icon Components Demo
          </FadeInSection>
          <p class="text-gray-400">Built with SolidJS and modern CSS</p>
        </div>
      </footer>

      {/* SVG Modal */}
      {selectedSvg() && (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div class="relative max-h-[90vh] max-w-4xl overflow-auto rounded-lg bg-slate-900 p-8 shadow-2xl">
            <button
              onClick={() => setSelectedSvg(null)}
              class="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-all duration-300 hover:bg-white/20"
            >
              <Icons.X size={24} />
            </button>

            <div class="text-center">
              <h3 class="mb-6 text-2xl font-bold text-white">
                {selectedSvg()?.toUpperCase()}
              </h3>

              <div class="mb-6 flex justify-center">
                <img
                  src={`/svg/${selectedSvg()}.svg`}
                  alt={selectedSvg() || ''}
                  class="max-h-[60vh] max-w-full object-contain"
                />
              </div>

              <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = `/svg/${selectedSvg()}.svg`;
                    link.download = `${selectedSvg()}.svg`;
                    link.click();
                  }}
                  class="rounded-lg bg-green-500/20 px-6 py-3 text-green-400 transition-all duration-300 hover:bg-green-500/30 hover:text-green-300"
                >
                  Download SVG
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`/svg/${selectedSvg()}.svg`);
                  }}
                  class="rounded-lg bg-blue-500/20 px-6 py-3 text-blue-400 transition-all duration-300 hover:bg-blue-500/30 hover:text-blue-300"
                >
                  Copy Path
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
