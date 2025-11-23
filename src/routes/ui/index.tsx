import { Title } from '@solidjs/meta';
import { A } from '@solidjs/router';

import {
  FadeInSection,
  ParallaxScroll,
  TypingAnimation,
} from '~/components/animations';

export default function UiIndex() {
  return (
    <main class="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Title>UI Components Showcase</Title>

      {/* Hero Section */}
      <section class="relative flex h-screen items-center justify-center overflow-hidden">
        <ParallaxScroll speed={0.05} direction="up" className="absolute inset-0">
          <div class="h-full w-full bg-linear-to-r from-blue-600/20 to-purple-600/20" />
        </ParallaxScroll>

        <div class="relative z-10 text-center">
          <TypingAnimation
            text="UI Components Showcase"
            speed="normal"
            cursor="line"
            className="mb-4 text-4xl font-bold md:text-6xl"
            loop={true}
          />
          <FadeInSection
            delay={1}
            direction="up"
            className="mt-4 text-xl opacity-80"
          >
            Modern, elegant components for your SolidJS app
          </FadeInSection>
        </div>
      </section>

      {/* Navigation Cards */}
      <section class="px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <FadeInSection direction="up" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">Component Categories</h2>
            <p class="text-gray-300">Explore our collection of UI components</p>
          </FadeInSection>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Animations Card */}
            <A href="/ui/animations">
              <FadeInSection
                direction="up"
                delay={0.1}
                className="group cursor-pointer rounded-lg bg-linear-to-br from-blue-500/20 to-purple-500/20 p-8 transition-all duration-300 hover:scale-105 hover:bg-linear-to-br hover:from-blue-500/30 hover:to-purple-500/30"
              >
                <div class="mb-4 text-4xl">🎬</div>
                <h3 class="mb-2 text-2xl font-bold">Animations</h3>
                <p class="mb-4 text-gray-300">
                  Smooth, elegant animations including fade, slide, scale, and more
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-blue-500/20 px-3 py-1 text-sm">
                    FadeIn
                  </span>
                  <span class="rounded-full bg-blue-500/20 px-3 py-1 text-sm">
                    SlideIn
                  </span>
                  <span class="rounded-full bg-blue-500/20 px-3 py-1 text-sm">
                    ScaleIn
                  </span>
                  <span class="rounded-full bg-blue-500/20 px-3 py-1 text-sm">
                    Parallax
                  </span>
                  <span class="rounded-full bg-blue-500/20 px-3 py-1 text-sm">
                    ShowOffers
                  </span>
                </div>
                <div class="mt-4 text-blue-400 group-hover:text-blue-300">
                  View Animations →
                </div>
              </FadeInSection>
            </A>

            {/* Icons Card */}
            <A href="/ui/icons">
              <FadeInSection
                direction="up"
                delay={0.2}
                className="group cursor-pointer rounded-lg bg-linear-to-br from-green-500/20 to-emerald-500/20 p-8 transition-all duration-300 hover:scale-105 hover:bg-linear-to-br hover:from-green-500/30 hover:to-emerald-500/30"
              >
                <div class="mb-4 text-4xl">🎨</div>
                <h3 class="mb-2 text-2xl font-bold">Icons</h3>
                <p class="mb-4 text-gray-300">
                  Beautiful icon components with customizable styles and animations
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-green-500/20 px-3 py-1 text-sm">
                    SVG Icons
                  </span>
                  <span class="rounded-full bg-green-500/20 px-3 py-1 text-sm">
                    Animated
                  </span>
                  <span class="rounded-full bg-green-500/20 px-3 py-1 text-sm">
                    Customizable
                  </span>
                  <span class="rounded-full bg-green-500/20 px-3 py-1 text-sm">
                    Responsive
                  </span>
                </div>
                <div class="mt-4 text-green-400 group-hover:text-green-300">
                  View Icons →
                </div>
              </FadeInSection>
            </A>

            {/* Coming Soon Card */}
            <FadeInSection
              direction="up"
              delay={0.3}
              className="rounded-lg bg-linear-to-br from-gray-500/20 to-slate-500/20 p-8 opacity-75"
            >
              <div class="mb-4 text-4xl">🚀</div>
              <h3 class="mb-2 text-2xl font-bold">More Components</h3>
              <p class="mb-4 text-gray-300">
                Additional component categories coming soon
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-gray-500/20 px-3 py-1 text-sm">
                  Forms
                </span>
                <span class="rounded-full bg-gray-500/20 px-3 py-1 text-sm">
                  Layouts
                </span>
                <span class="rounded-full bg-gray-500/20 px-3 py-1 text-sm">
                  Navigation
                </span>
                <span class="rounded-full bg-gray-500/20 px-3 py-1 text-sm">
                  Data Display
                </span>
              </div>
              <div class="mt-4 text-gray-400">Coming Soon</div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class="bg-black/20 px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <FadeInSection direction="up" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">Why Choose Our Components?</h2>
            <p class="text-gray-300">
              Built with modern web standards and best practices
            </p>
          </FadeInSection>

          <div class="grid gap-8 md:grid-cols-3">
            <FadeInSection
              direction="up"
              delay={0.1}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <div class="mb-4 text-3xl">⚡</div>
              <h3 class="mb-2 text-xl font-bold">Performance</h3>
              <p class="text-gray-300">
                Optimized for 60fps animations with GPU acceleration
              </p>
            </FadeInSection>

            <FadeInSection
              direction="up"
              delay={0.2}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <div class="mb-4 text-3xl">🎨</div>
              <h3 class="mb-2 text-xl font-bold">Customizable</h3>
              <p class="text-gray-300">
                Easy to customize with props and CSS variables
              </p>
            </FadeInSection>

            <FadeInSection
              direction="up"
              delay={0.3}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <div class="mb-4 text-3xl">📱</div>
              <h3 class="mb-2 text-xl font-bold">Responsive</h3>
              <p class="text-gray-300">
                Works perfectly on all devices and screen sizes
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-black/40 px-4 py-12">
        <div class="mx-auto max-w-4xl text-center">
          <FadeInSection direction="up" className="mb-4 text-2xl font-bold">
            UI Components Showcase
          </FadeInSection>
          <p class="text-gray-400">Built with SolidJS and modern CSS animations</p>
        </div>
      </footer>
    </main>
  );
}
