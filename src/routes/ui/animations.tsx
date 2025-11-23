import { Title } from '@solidjs/meta';
import { A } from '@solidjs/router';

import {
  FadeInSection,
  MagneticButton,
  ParallaxScroll,
  ScaleIn,
  ShowOffers,
  SlideIn,
  StaggerAnimation,
  TypingAnimation,
} from '~/components/animations';

export default function AnimationsPage() {
  return (
    <main class="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Title>Animation Components Demo</Title>

      {/* Navigation */}
      <nav class="sticky top-0 z-50 bg-black/40 backdrop-blur-sm">
        <div class="mx-auto max-w-6xl px-4 py-4">
          <div class="flex items-center justify-between">
            <A href="/ui" class="text-xl font-bold">
              ← Back to UI Components
            </A>
            <div class="flex space-x-4">
              <A href="#fade" class="text-sm hover:text-blue-400">
                Fade
              </A>
              <A href="#slide" class="text-sm hover:text-blue-400">
                Slide
              </A>
              <A href="#scale" class="text-sm hover:text-blue-400">
                Scale
              </A>
              <A href="#stagger" class="text-sm hover:text-blue-400">
                Stagger
              </A>
              <A href="#typing" class="text-sm hover:text-blue-400">
                Typing
              </A>
              <A href="#offers" class="text-sm hover:text-blue-400">
                Offers
              </A>
              <A href="#magnetic" class="text-sm hover:text-blue-400">
                Magnetic
              </A>
              <A href="#parallax" class="text-sm hover:text-blue-400">
                Parallax
              </A>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="relative flex h-screen items-center justify-center overflow-hidden">
        <ParallaxScroll speed={0.05} direction="up" className="absolute inset-0">
          <div class="h-full w-full bg-linear-to-r from-blue-600/20 to-purple-600/20" />
        </ParallaxScroll>

        <div class="relative z-10 text-center">
          <TypingAnimation
            text="Animation Components"
            speed="normal"
            cursor="line"
            className="mb-4 text-4xl font-bold md:text-6xl"
          />
          <FadeInSection
            delay={1}
            direction="up"
            className="mt-4 text-xl opacity-80"
          >
            Smooth, elegant animations for your SolidJS app
          </FadeInSection>
        </div>
      </section>

      {/* FadeInSection Examples */}
      <section id="fade" class="px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <FadeInSection direction="up" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">Fade In Animations</h2>
            <p class="text-gray-300">
              Elements that fade in from different directions
            </p>
          </FadeInSection>

          <div class="grid gap-8 md:grid-cols-3">
            <FadeInSection
              direction="up"
              delay={0.1}
              duration={0.8}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <h3 class="mb-2 text-xl font-semibold">Fade Up</h3>
              <p class="text-gray-300">This card fades in from the bottom</p>
            </FadeInSection>

            <FadeInSection
              direction="left"
              delay={0.2}
              duration={0.8}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <h3 class="mb-2 text-xl font-semibold">Fade Left</h3>
              <p class="text-gray-300">This card fades in from the right</p>
            </FadeInSection>

            <FadeInSection
              direction="right"
              delay={0.3}
              duration={0.8}
              className="rounded-lg bg-white/10 p-6 backdrop-blur-sm"
            >
              <h3 class="mb-2 text-xl font-semibold">Fade Right</h3>
              <p class="text-gray-300">This card fades in from the left</p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* SlideIn Examples */}
      <section id="slide" class="bg-black/20 px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <SlideIn direction="up" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">Slide Animations</h2>
            <p class="text-gray-300">
              Elements that slide in with different triggers
            </p>
          </SlideIn>

          <div class="grid gap-8 md:grid-cols-2">
            <SlideIn
              direction="up"
              trigger="scroll"
              className="rounded-lg bg-linear-to-r from-pink-500/20 to-rose-500/20 p-8"
            >
              <h3 class="mb-4 text-2xl font-semibold">Scroll Trigger</h3>
              <p class="mb-4 text-gray-300">
                This slides in when scrolled into view
              </p>
              <div class="h-32 w-full rounded-lg bg-linear-to-r from-pink-500 to-rose-500 opacity-50" />
            </SlideIn>

            <SlideIn
              direction="left"
              trigger="hover"
              duration={0.8}
              easing="ease-out"
              className="rounded-lg bg-linear-to-r from-cyan-500/20 to-blue-500/20 p-8"
            >
              <h3 class="mb-4 text-2xl font-semibold">Hover Trigger</h3>
              <p class="mb-4 text-gray-300">
                Hover over this card to see the animation
              </p>
              <div class="h-32 w-full rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 opacity-50" />
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ScaleIn Examples */}
      <section id="scale" class="px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <ScaleIn type="bounce" trigger="scroll" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">Scale Animations</h2>
            <p class="text-gray-300">
              Elements that scale in with different effects
            </p>
          </ScaleIn>

          <div class="grid gap-6 md:grid-cols-4">
            <ScaleIn
              type="grow"
              origin="center"
              trigger="scroll"
              duration={0.8}
              delay={0.1}
              className="rounded-lg bg-linear-to-br from-green-500/20 to-emerald-500/20 p-6 text-center"
            >
              <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500" />
              <h4 class="font-semibold">Grow</h4>
            </ScaleIn>

            <ScaleIn
              type="bounce"
              origin="center"
              trigger="scroll"
              duration={0.9}
              delay={0.2}
              className="rounded-lg bg-linear-to-br from-yellow-500/20 to-orange-500/20 p-6 text-center"
            >
              <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-yellow-500" />
              <h4 class="font-semibold">Bounce</h4>
            </ScaleIn>

            <ScaleIn
              type="elastic"
              origin="center"
              trigger="scroll"
              duration={1}
              delay={0.3}
              className="rounded-lg bg-linear-to-br from-purple-500/20 to-pink-500/20 p-6 text-center"
            >
              <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-purple-500" />
              <h4 class="font-semibold">Elastic</h4>
            </ScaleIn>

            <ScaleIn
              type="shrink"
              origin="center"
              trigger="scroll"
              duration={0.7}
              delay={0.4}
              className="rounded-lg bg-linear-to-br from-red-500/20 to-rose-500/20 p-6 text-center"
            >
              <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-red-500" />
              <h4 class="font-semibold">Shrink</h4>
            </ScaleIn>
          </div>

          {/* Mixed triggers for comparison */}
          <div class="mt-16">
            <h3 class="mb-8 text-center text-2xl font-bold">
              Mixed Triggers (Scroll vs Hover)
            </h3>
            <div class="grid gap-6 md:grid-cols-2">
              <div class="text-center">
                <h4 class="mb-4 text-lg font-semibold">Scroll Trigger</h4>
                <ScaleIn
                  type="bounce"
                  origin="center"
                  trigger="scroll"
                  duration={0.8}
                  className="mx-auto inline-block rounded-lg bg-linear-to-br from-blue-500/20 to-cyan-500/20 p-8"
                >
                  <div class="mx-auto mb-4 h-20 w-20 rounded-full bg-blue-500" />
                  <p class="text-sm">Scroll to see animation</p>
                </ScaleIn>
              </div>

              <div class="text-center">
                <h4 class="mb-4 text-lg font-semibold">Hover Trigger</h4>
                <ScaleIn
                  type="bounce"
                  origin="center"
                  trigger="hover"
                  duration={0.6}
                  className="mx-auto inline-block rounded-lg bg-linear-to-br from-pink-500/20 to-rose-500/20 p-8"
                >
                  <div class="mx-auto mb-4 h-20 w-20 rounded-full bg-pink-500" />
                  <p class="text-sm">Hover to see animation</p>
                </ScaleIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* StaggerAnimation Examples */}
      <section id="stagger" class="bg-black/20 px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <StaggerAnimation direction="up" className="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold">Staggered Animations</h2>
            <p class="text-gray-300">Multiple elements animating in sequence</p>
          </StaggerAnimation>

          <StaggerAnimation
            direction="up"
            staggerDelay={0.1}
            className="grid gap-6 md:grid-cols-3"
          >
            <div class="rounded-lg bg-linear-to-br from-indigo-500/20 to-purple-500/20 p-6">
              <h3 class="mb-2 text-xl font-semibold">Card 1</h3>
              <p class="text-gray-300">First to animate</p>
            </div>
            <div class="rounded-lg bg-linear-to-br from-purple-500/20 to-pink-500/20 p-6">
              <h3 class="mb-2 text-xl font-semibold">Card 2</h3>
              <p class="text-gray-300">Second to animate</p>
            </div>
            <div class="rounded-lg bg-linear-to-br from-pink-500/20 to-rose-500/20 p-6">
              <h3 class="mb-2 text-xl font-semibold">Card 3</h3>
              <p class="text-gray-300">Third to animate</p>
            </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* TypingAnimation Examples */}
      <section id="typing" class="px-4 py-20">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="mb-8 text-3xl font-bold">Typing Animations</h2>

          <div class="space-y-8">
            <div class="rounded-lg bg-white/10 p-8 backdrop-blur-sm">
              <TypingAnimation
                text="This is a typing animation with a blinking cursor!"
                speed="normal"
                cursor="line"
                className="text-2xl"
              />
            </div>

            <div class="rounded-lg bg-white/10 p-8 backdrop-blur-sm">
              <TypingAnimation
                text="Fast typing speed with block cursor"
                speed="fast"
                cursor="block"
                className="text-xl"
              />
            </div>

            <div class="rounded-lg bg-white/10 p-8 backdrop-blur-sm">
              <TypingAnimation
                text="Loop animation that repeats forever"
                speed="slow"
                cursor="underline"
                loop={true}
                className="text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ShowOffers Examples */}
      <section id="offers" class="px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <h2 class="mb-16 text-center text-3xl font-bold">
            Show Offers Animations
          </h2>
          <p class="mb-12 text-center text-gray-300">
            Eye-catching animations perfect for promotional content and offers
          </p>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ShowOffers
              animation="pulse"
              intensity="high"
              trigger="scroll"
              className="rounded-lg bg-linear-to-br from-red-500/20 to-pink-500/20 p-6 text-center"
            >
              <div class="mb-4 text-2xl font-bold text-white">50% OFF</div>
              <p class="text-gray-200">Limited Time Offer</p>
            </ShowOffers>

            <ShowOffers
              animation="wave"
              intensity="high"
              trigger="scroll"
              className="rounded-lg bg-linear-to-br from-blue-500/20 to-cyan-500/20 p-6 text-center"
            >
              <div class="mb-4 text-2xl font-bold text-white">FREE SHIPPING</div>
              <p class="text-gray-200">On Orders Over $50</p>
            </ShowOffers>

            <ShowOffers
              animation="glow"
              intensity="high"
              trigger="scroll"
              className="rounded-lg bg-linear-to-br from-green-500/20 to-emerald-500/20 p-6 text-center"
            >
              <div class="mb-4 text-2xl font-bold text-white">NEW ARRIVAL</div>
              <p class="text-gray-200">Latest Collection</p>
            </ShowOffers>

            <ShowOffers
              animation="rainbow"
              intensity="high"
              trigger="scroll"
              className="rounded-lg bg-linear-to-br from-purple-500/20 to-violet-500/20 p-6 text-center"
            >
              <div class="mb-4 text-2xl font-bold text-white">FLASH SALE</div>
              <p class="text-gray-200">Ends in 24 Hours</p>
            </ShowOffers>

            <ShowOffers
              animation="ocean"
              intensity="medium"
              trigger="scroll"
              className="rounded-lg bg-linear-to-br from-teal-500/20 to-blue-500/20 p-6 text-center"
            >
              <div class="mb-4 text-2xl font-bold text-white">SUMMER SALE</div>
              <p class="text-gray-200">Up to 70% Off</p>
            </ShowOffers>

            <ShowOffers
              animation="aurora"
              intensity="high"
              trigger="scroll"
              className="rounded-lg bg-linear-to-br from-indigo-500/20 to-purple-500/20 p-6 text-center"
            >
              <div class="mb-4 text-2xl font-bold text-white">VIP ACCESS</div>
              <p class="text-gray-200">Exclusive Deals</p>
            </ShowOffers>
          </div>

          {/* Always-on animations */}
          <div class="mt-16">
            <h3 class="mb-8 text-center text-2xl font-bold">
              Always-On Flowing Colors
            </h3>
            <div class="flex flex-wrap justify-center gap-6">
              <ShowOffers
                animation="bounce-glow"
                intensity="medium"
                trigger="always"
                className="rounded-lg bg-linear-to-r from-red-500/30 to-pink-500/30 px-6 py-3 text-white"
              >
                <span class="font-semibold">🔥 Hot Deal</span>
              </ShowOffers>

              <ShowOffers
                animation="rainbow"
                intensity="high"
                trigger="always"
                className="rounded-lg bg-linear-to-r from-yellow-500/30 to-orange-500/30 px-6 py-3 text-white"
              >
                <span class="font-semibold">⭐ Featured</span>
              </ShowOffers>

              <ShowOffers
                animation="float"
                intensity="medium"
                trigger="always"
                className="rounded-lg bg-linear-to-r from-green-500/30 to-emerald-500/30 px-6 py-3 text-white"
              >
                <span class="font-semibold">✨ New</span>
              </ShowOffers>

              <ShowOffers
                animation="shimmer"
                intensity="high"
                trigger="always"
                className="rounded-lg bg-linear-to-r from-purple-500/30 to-violet-500/30 px-6 py-3 text-white"
              >
                <span class="font-semibold">💎 Premium</span>
              </ShowOffers>

              <ShowOffers
                animation="wiggle"
                intensity="low"
                trigger="always"
                className="rounded-lg bg-linear-to-r from-blue-500/30 to-cyan-500/30 px-6 py-3 text-white"
              >
                <span class="font-semibold">🎯 Special</span>
              </ShowOffers>
            </div>
          </div>
        </div>
      </section>

      {/* MagneticButton Examples */}
      <section id="magnetic" class="bg-black/20 px-4 py-20">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="mb-8 text-3xl font-bold">Magnetic Buttons</h2>
          <p class="mb-12 text-gray-300">
            Hover over these buttons to see the magnetic effect
          </p>

          <div class="flex flex-wrap justify-center gap-6">
            <MagneticButton strength="weak" className="inline-block">
              <button class="rounded-lg bg-linear-to-r from-blue-500 to-purple-600 px-8 py-4 font-semibold text-white transition-shadow hover:shadow-lg">
                Weak Magnetic
              </button>
            </MagneticButton>

            <MagneticButton strength="medium" className="inline-block">
              <button class="rounded-lg bg-linear-to-r from-green-500 to-teal-600 px-8 py-4 font-semibold text-white transition-shadow hover:shadow-lg">
                Medium Magnetic
              </button>
            </MagneticButton>

            <MagneticButton strength="strong" className="inline-block">
              <button class="rounded-lg bg-linear-to-r from-red-500 to-pink-600 px-8 py-4 font-semibold text-white transition-shadow hover:shadow-lg">
                Strong Magnetic
              </button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ParallaxScroll Examples */}
      <section id="parallax" class="px-4 py-20">
        <div class="mx-auto max-w-6xl">
          <h2 class="mb-16 text-center text-3xl font-bold">Parallax Scrolling</h2>

          <div class="space-y-32">
            <ParallaxScroll
              speed={0.08}
              direction="up"
              className="rounded-lg bg-linear-to-r from-blue-500/30 to-purple-500/30 p-12 text-center"
            >
              <h3 class="mb-4 text-2xl font-bold">Parallax Up</h3>
              <p class="text-gray-300">This element moves slower than the scroll</p>
            </ParallaxScroll>

            <ParallaxScroll
              speed={-0.06}
              direction="down"
              className="rounded-lg bg-linear-to-r from-green-500/30 to-teal-500/30 p-12 text-center"
            >
              <h3 class="mb-4 text-2xl font-bold">Parallax Down</h3>
              <p class="text-gray-300">
                This element moves in the opposite direction
              </p>
            </ParallaxScroll>

            <ParallaxScroll
              speed={0.04}
              direction="left"
              className="rounded-lg bg-linear-to-r from-yellow-500/30 to-orange-500/30 p-12 text-center"
            >
              <h3 class="mb-4 text-2xl font-bold">Parallax Left</h3>
              <p class="text-gray-300">Horizontal parallax movement</p>
            </ParallaxScroll>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-black/40 px-4 py-12">
        <div class="mx-auto max-w-4xl text-center">
          <FadeInSection direction="up" className="mb-4 text-2xl font-bold">
            Animation Components Demo
          </FadeInSection>
          <p class="text-gray-400">Built with SolidJS and modern CSS animations</p>
        </div>
      </footer>
    </main>
  );
}
