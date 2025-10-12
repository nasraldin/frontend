import { isProd } from '~/utils/env';

export function TailwindIndicator() {
  if (isProd) return null;

  return (
    <div class="fixed bottom-16 left-[20px] z-50 flex size-9 flex-wrap items-center justify-center rounded-full bg-gray-700 font-bold text-white">
      <button class="hover:bg-accent rounded-full">
        <div class="block leading-none sm:hidden">xs</div>
        <div class="hidden p-1.5 sm:block md:hidden">sm</div>
        <div class="hidden p-1.5 md:block lg:hidden">md</div>
        <div class="hidden p-1.5 lg:block xl:hidden">lg</div>
        <div class="hidden p-1.5 xl:block 2xl:hidden">xl</div>
        <div class="hidden p-1.5 2xl:block">2xl</div>
      </button>
    </div>
  );
}
