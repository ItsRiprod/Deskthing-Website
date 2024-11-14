import { Button } from '@/components/ui/button';
import {
  Github,
  MonitorSmartphone,
  Recycle,
  Rocket,
  Zap,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CommunityApps } from '@/components/community-apps';
import React from 'react'
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-48 max-w-screen-xl">
          <div className="relative h-full block lg:hidden pb-12">
            <div className="absolute top-[15%] left-0 w-40 h-20 bg-primary/80 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/60 rounded-full blur-3xl opacity-20" />
            <div className="h-[300px] w-full rounded-lg overflow-visible transform rotate-3 transition-transform hover:rotate-1 hover:scale-105">
              <Image
                src="https://i.imgur.com/r1XRVVe.png"
                alt="DeskThing Interface"
                fill
                className="object-contain drop-shadow-png"
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:mt-4 lg:px-16 z-10">
              <h1 className="text-5xl font-bold font-mono bg-gradient-to-r from-primary to-primary/60 text-transparent pb-6 bg-clip-text">
                Take Back The
                <br />
                Car Thing
              </h1>
              <p className="text-muted-foreground max-w-2xl mb-8 xl:mr-8">
                Upcycle your discontinued Car Thing into a versatile desktop
                assistant that enhances your flow. Reduce e-waste and boost your
                productivity in the process. Everyone wins.
              </p>
              <div className="flex gap-4">
                <Button>
                  Get Started
                  <Rocket className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">
                  Documentation
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] hidden lg:block right-24">
              <div className="absolute -bottom-5 right-[50%] w-[320px] h-[180px] rounded-lg overflow-hidden shadow-2xl transform -rotate-6 transition-transform hover:-rotate-3 hover:scale-105 rounded-xl">
                <Image
                  src="https://i.imgur.com/H95qxxs.png"
                  alt="DeskThing Weather"
                  fill
                  className="object-contain rounded-xl"
                />
              </div>

              <div className="absolute top-0 left-[68%] w-[320px] h-[180px] rounded-lg overflow-hidden shadow-2xl transform rotate-12 transition-transform hover:rotate-3 hover:scale-105">
                <Image
                  src="https://i.imgur.com/dEpykEP.png"
                  alt="DeskThing Audio"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute top-14 left-[10%] h-[300px] w-full rounded-lg overflow-visible transform rotate-3 transition-transform hover:-rotate-1 hover:scale-105">
                <Image
                  src="https://i.imgur.com/r1XRVVe.png"
                  alt="DeskThing Interface"
                  fill
                  className="object-contain drop-shadow-png"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-[45%] left-20 w-20 h-20 bg-primary/80 rounded-full blur-3xl opacity-20" />
              <div className="absolute bottom-20 left-10 w-32 h-32 bg-primary/80 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why DeskThing?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-primary/20 bg-background/40">
                <Recycle className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Sustainable Computing
                </h3>
                <p className="text-muted-foreground">
                  Give your CarThing a second life instead of contributing to
                  e-waste. Sustainability meets productivity.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-primary/20 bg-background/40">
                <MonitorSmartphone className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Enhanced Features</h3>
                <p className="text-muted-foreground">
                  Local audio support, weather reporting, and more. Transform
                  your CarThing into a versatile desktop companion.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-primary/20 bg-background/40">
                <Github className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">100% Open Source</h3>
                <p className="text-muted-foreground">
                  Built by the community, for the community. Contribute and help
                  shape the future of DeskThing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Apps Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Apps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-md">
              Explore community-built applications that expand your Car Thing's
              functionality. From current weather to song lyrics, there's an app
              for almost every need. And if you want, it's easy to create your
              own.
            </p>
          </div>
          <CommunityApps limit={6} />
          <div className="flex align-center justify-center mt-4">
            <Link href="/apps">
              <Button variant="outline">
                  More apps
                  <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="container mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            The DeskThing Journey
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-4">
              <div className="w-24 text-primary text-right">2022</div>
              <div className="flex-1 pb-8 border-l border-primary/20 pl-8 relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px]" />
                <h3 className="font-bold mb-2">
                  CarThing Launch & Discontinuation
                </h3>
                <p className="text-muted-foreground">
                  Spotify launches and quickly discontinues the CarThing,
                  leaving users with potential e-waste.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 text-primary text-right">2023</div>
              <div className="flex-1 pb-8 border-l border-primary/20 pl-8 relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px]" />
                <h3 className="font-bold mb-2">DeskThing Project Begins</h3>
                <p className="text-muted-foreground">
                  A hobby project transforms into a mission to repurpose and
                  enhance the CarThing.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 text-primary text-right">2024</div>
              <div className="flex-1 pb-8 border-l border-primary/20 pl-8 relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px]" />
                <h3 className="font-bold mb-2">Official Support Ends</h3>
                <p className="text-muted-foreground">
                  As Spotify ends support on December 9th, DeskThing emerges as
                  the sustainable alternative.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
