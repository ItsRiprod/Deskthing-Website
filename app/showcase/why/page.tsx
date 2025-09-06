"use client";

import {
  Recycle,
  LineChart,
  Code,
  Cpu,
  Globe,
  Puzzle,
  MessageSquareQuote,
  Lightbulb,
} from "lucide-react";
import { InfoCard, StatCard } from "../components/InfoCards";
import { TestimonialCard } from "../components/TestimonialCard";
import { WhyFeatureCard } from "../components/WhyFeatureCard";
import { QuoteCard } from "../components/QuoteCard";
import { SectionContainer } from "../components/SectionContainer";

export default function WhySection() {
  return (
    <div className="md:p-8 p-2 rounded-lg h-full">
      <h2 className="text-3xl font-bold mb-6">Why should you use it?</h2>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-2/3">
            <p className="text-lg leading-relaxed">
              DeskThing offers a unique combination of environmental
              responsibility, productivity enhancement, and technological
              flexibility. Whether you're looking to repurpose old devices,
              streamline your workflow, or develop custom applications,
              DeskThing provides a platform that adapts to your needs.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="p-6 bg-neutral-800 rounded-full">
              <Lightbulb size={80} className="text-yellow-400" />
            </div>
          </div>
        </div>

        <WhyFeatureCard icon={Recycle} title="Reduce E-Waste" color="green">
          <p>
            Modern smartphones have a relatively short shelf life, with most
            becoming obsolete within a few years. DeskThing gives new life to
            these devices that would otherwise end up as electronic waste,
            extending their useful lifespan and reducing environmental impact.
            As Christians are called to be good stewards of what we're given,
            DeskThing helps you recycle and add use to what you already own
            rather than contributing to more e-waste.
          </p>
          <QuoteCard
            quote="According to a SellCell survey, '80.2% of Americans and 80.5% of Brits have two or more unused devices lying around at home.' This highlights the significant number of devices that could be repurposed rather than sitting idle. For more details, you can"
            link={{
              text: "visit the survey results",
              url: "https://www.sellcell.com/blog/electronics-hoarding-survey/",
            }}
            background="bg-neutral-700"
          />
        </WhyFeatureCard>

        <WhyFeatureCard
          icon={LineChart}
          title="Enhance Productivity"
          color="blue"
        >
          <p>
            For many users, especially in creative fields, managing multiple
            applications on a single screen can be overwhelming and inefficient.
            DeskThing transforms your desk with a customizable heads-up display
            that offloads non-essential applications to a secondary device,
            maintaining a clean desktop experience. From monitoring system
            resources to tracking stocks, weather, and sports scores, DeskThing
            complements your primary workstation without consuming valuable
            screen space.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard
              value={<span className="text-blue-400">30%</span>}
              label="Reduction in context switching"
            />
            <StatCard
              value={<span className="text-blue-400">100%</span>}
              label="Main screen dedicated to primary tasks"
            />
            <StatCard
              value={<span className="text-blue-400">24/7 access</span>}
              label="Continuous access to important information"
            />
          </div>
        </WhyFeatureCard>

        <WhyFeatureCard
          icon={Code}
          title="Open Source Advantage"
          color="purple"
        >
          <p>
            As an open-source platform, DeskThing benefits from community
            contributions, transparent development, and no hidden costs or data
            collection. The comprehensive SDK puts all the controls into
            developers' hands in an easy and intuitive way, with a low barrier
            to entry for full-stack web development. Whether you're looking to
            use existing apps or create your own, DeskThing's open ecosystem
            empowers both users and developers.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={<Code size={32} className="text-purple-400" />}
              title={<span className="text-purple-400">Comprehensive SDK</span>}
              description="Develop apps using familiar web technologies like React and Node.js"
            />
            <InfoCard
              icon={<Globe size={32} className="text-purple-400" />}
              title={<span className="text-purple-400">Community Support</span>}
              description="Active Discord server and Github community for collaboration"
            />
          </div>
        </WhyFeatureCard>

        <WhyFeatureCard icon={Cpu} title="Resource Efficiency" color="yellow">
          <p>
            DeskThing is designed to be lightweight, using minimal system
            resources on both the server and client sides. The core engine
            manages system resources efficiently, handles app communication
            seamlessly, and provides the foundation for all functionality while
            using less than 100MB of RAM and minimal CPU when idle. This ensures
            smooth performance even on older hardware, making it accessible to a
            wide range of devices that might otherwise be considered obsolete.
          </p>
          <div className="mt-4 px-3 rounded-lg">
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatCard
                value={
                  <span className="text-yellow-400 font-medium">{`<10%`}</span>
                }
                label="CPU usage on client devices"
              />
              <StatCard
                value={
                  <span className="text-yellow-400 font-medium">{`<100MB`}</span>
                }
                label="RAM usage when idle"
              />
              <StatCard
                value={<span className="text-yellow-400 font-medium">7+</span>}
                label="Simultaneous device connections"
              />
            </div>
          </div>
        </WhyFeatureCard>

        <WhyFeatureCard
          icon={Globe}
          title="Cross-Platform Compatibility"
          color="teal"
        >
          <p>
            DeskThing works across multiple operating systems (Windows, macOS,
            Linux) and can connect to any device with a browser. There's no need
            for specialized hardware or complex setup—simply install DeskThing
            on your computer, navigate to the provided URL on your device, and
            you're ready to go. This universal compatibility ensures a
            consistent experience regardless of your technology ecosystem.
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              value={<span className="font-medium text-teal-400">Windows</span>}
            />
            <StatCard
              value={<span className="font-medium text-teal-400">macOS</span>}
            />
            <StatCard
              value={<span className="font-medium text-teal-400">Linux</span>}
            />
            <StatCard
              value={
                <span className="font-medium text-teal-400">Any Browser</span>
              }
            />{" "}
          </div>
        </WhyFeatureCard>

        <WhyFeatureCard icon={Puzzle} title="Modular App System" color="pink">
          <p>
            DeskThing features a modular app system where both official and
            community-created apps can be installed to extend functionality.
            Apps are self-contained modules that provide specific functionality,
            communicating with the core through a secure API. They can be
            installed, updated, or removed without affecting the rest of the
            system, allowing you to customize your experience to match your
            specific needs and workflow.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <InfoCard
              title={
                <span className="font-medium text-pink-400">
                  System Monitoring
                </span>
              }
              description="Track CPU, memory, and network usage"
            />
            <InfoCard
              title={
                <span className="font-medium text-pink-400">
                  Media Controls
                </span>
              }
              description="Control music and video playback"
            />
            <InfoCard
              title={
                <span className="font-medium text-pink-400">Smart Home</span>
              }
              description="Manage connected devices and scenes"
            />
            <InfoCard
              title={<span className="font-medium text-pink-400">Weather</span>}
              description="Real-time forecasts and conditions"
            />
            <InfoCard
              title={
                <span className="font-medium text-pink-400">Calendar</span>
              }
              description="View upcoming events and reminders"
            />
            <InfoCard
              title={
                <span className="font-medium text-pink-400">And More...</span>
              }
              description="Expanding library of applications"
            />
          </div>
        </WhyFeatureCard>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MessageSquareQuote className="text-green-400 mr-3" size={24} />
            Community Feedback
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <TestimonialCard
              quote="DeskThing is a fantastic project that breathes new life into the Car Thing device. It's amazing to see the community come together to repurpose this hardware."
              author="@JoshHendrickson"
              link="https://arstechnica.com/civis/threads/firmware-hacks-are-rejuvenating-spotify%E2%80%99s-car-thing-before-the-company-bricks-it.1504069/"
              linkText="View on Ars Technica Forum"
              color="green"
              avatar={{
                type: "image",
                src: "https://cdn.arstechnica.net/civis/data/avatars/m/502/502117.jpg?1731438555",
                srcSet:
                  "https://cdn.arstechnica.net/civis/data/avatars/m/502/502117.jpg?1731438555 1x, https://cdn.arstechnica.net/civis/data/avatars/l/502/502117.jpg?1731438555 2x",
              }}
            />
            <TestimonialCard
              quote="I appreciate the effort behind DeskThing. It's great to see developers creating alternative uses for discontinued products, turning them into useful tools."
              author="@rockbruno"
              link="https://news.ycombinator.com/item?id=42034362"
              linkText="View on Hacker News"
              color="blue"
              avatar={{
                type: "initials",
                initials: "RB",
              }}
            />
          </div>
        </div>
        <SectionContainer 
          title="The DeskThing Vision" 
          icon={<Lightbulb className="w-5 h-5 text-green-500" />}
          description="DeskThing is more than just an application—it's a platform that fosters responsibility and creativity while enhancing productivity."
          className="border-l-green-500 border-l-4"
        >
          <p className="text-zinc-100">
            By transforming unused devices into powerful tools, DeskThing not
            only reduces electronic waste but also empowers users and developers
            to create innovative solutions tailored to their specific needs.
          </p>
          <p className="text-zinc-100 mt-3">
            Whether you're looking to maximize the potential of your old
            devices, build and deploy apps with ease, or simply find ways to
            streamline your digital life, DeskThing offers a flexible,
            accessible, and sustainable platform that adapts to you. The
            project's commitment to open-source principles ensures that it will
            continue to evolve based on community needs and contributions.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard
              title={
                <span className="text-green-400">Environmental Impact</span>
              }
              description="By extending the useful life of devices, DeskThing helps reduce the 53.6 million metric tons of e-waste generated globally each year."
            />
            <InfoCard
              title={<span className="text-blue-400">Accessibility</span>}
              description="DeskThing's low resource requirements make it accessible to users with older hardware or limited technical resources."
            />
            <InfoCard
              title={<span className="text-purple-400">Community Growth</span>}
              description="The expanding ecosystem of apps and developers creates a positive feedback loop of innovation and improvement."
            />
          </div>
          <p className="text-gray-200 mt-4">
            As Christians are called to be good stewards of what we're given,
            DeskThing embodies this principle by helping users make the most of
            existing technology rather than contributing to a culture of
            disposability. This approach not only benefits the environment but
            also promotes a mindset of resourcefulness and creativity that can
            extend beyond technology into other areas of life.
          </p>
        </SectionContainer>
        <div className="mt-8 bg-neutral-900 border-neutral-700 p-6 rounded-lg border border-l-4 border-l-green-500">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <Lightbulb size={64} className="text-yellow-400" />
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2">
                Ready to Get Started?
              </h3>
              <p>
                Join the growing community of DeskThing users and developers who
                are transforming their digital workspaces while giving new life
                to old devices. Whether you're a developer looking to create
                custom solutions or a user seeking to enhance your productivity,
                DeskThing provides the tools and flexibility you need.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="/releases"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                >
                  Download Now
                </a>
                <a
                  href="https://carthing.wiki"
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg font-medium transition-colors"
                >
                  Read Documentation
                </a>
                <a
                  href="/discord"
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg font-medium transition-colors"
                >
                  Join Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
