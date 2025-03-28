'use client';

import { Calendar, Lightbulb, Monitor, Users, Zap, Megaphone, Boxes, ArrowRight, Bluetooth, Smartphone, UserCircle2, Keyboard, AppWindow, Mic, Cpu } from "lucide-react";

interface TimelineItemProps {
  borderColor: string;
  icon: React.ReactNode;
  title: string;
  date?: string;
  children: React.ReactNode;
}

interface RoadmapCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  textColor: string;
}

function TimelineItem({ borderColor, icon, title, date, children }: TimelineItemProps) {
  return (
    <div className={`relative pl-8 border-l-2 ${borderColor} pb-8`}>
      <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${borderColor.replace('border-', 'bg-')}`}></div>
      <h3 className="text-xl font-semibold flex items-center gap-2">
        {icon}
        {date ? `${title}: ${date}` : title}
      </h3>
      <div className="mt-2 text-gray-300">
        {children}
      </div>
    </div>
  );
}

function RoadmapCard({ icon, title, description, textColor }: RoadmapCardProps) {
  return (
    <div className="bg-neutral-700 p-3 rounded-lg">
      <h4 className={`text-md font-medium ${textColor} mb-1 flex items-center gap-2`}>
        {icon}
        {title}
      </h4>
      <p className="text-sm text-gray-300">
        {description}
      </p>
    </div>
  );
}

function Timeline() {
  return (
    <div className="mt-6 space-y-8">
      <TimelineItem borderColor="border-red-500" icon={<Megaphone className="w-5 h-5" />} title="August 2024" date="The Announcement">
        <p>
          Spotify announced that the Car Thing device would be permanently
          disabled on December 9th, 2024, effectively turning thousands of
          devices into e-waste. This announcement caught the attention of
          Nathan Emerick, who saw an opportunity to give these devices a
          second life.
        </p>
      </TimelineItem>

      <TimelineItem borderColor="border-yellow-500" icon={<Lightbulb className="w-5 h-5" />} title="Late August 2024" date="TODOThing is Born">
        <p>
          Nathan joined the ThingLabs community and began hacking the Car
          Thing device. The project was initially called "TODOThing" as a
          placeholder while exploring what could be done with the hardware.
          Early experiments focused on understanding the device's
          capabilities and limitations.
        </p>
      </TimelineItem>

      <TimelineItem borderColor="border-green-500" icon={<Monitor className="w-5 h-5" />} title="September 2024" date="From TODO to DESK">
        <p>
          As the project evolved, it became clear that the device had
          potential as a desktop companion. The name was changed from
          TODOThing to DeskThing, reflecting its new purpose as a
          productivity tool for desks. The first working prototype was
          developed, capable of displaying basic information.
        </p>
      </TimelineItem>

      <TimelineItem borderColor="border-blue-500" icon={<Users className="w-5 h-5" />} title="October 2024" date="Growing Community Interest">
        <p>
          Word began to spread about the project, attracting interest from
          Car Thing owners looking for alternatives to Spotify's shutdown.
          The ThingLabs Discord server saw an influx of new members, and
          early adopters began testing the software and providing valuable
          feedback.
        </p>
      </TimelineItem>

      <TimelineItem borderColor="border-purple-500" icon={<Zap className="w-5 h-5" />} title="November 2024" date="Viral Breakthrough">
        <p>
          DeskThing gained mainstream attention when YouTuber "Dammit Jeff"
          featured the project in a video that garnered millions of views.
          This exposure brought a wave of new users and contributors to the
          project, accelerating development and expanding the community.
        </p>
      </TimelineItem>

      <TimelineItem borderColor="border-pink-500" icon={<Boxes className="w-5 h-5" />} title="Current" date="A Growing Ecosystem">
        <p>
          Today, DeskThing is a thriving open-source project with version
          0.11.0 already available. The platform supports Windows, Mac,
          Android, and Linux, with a growing library of apps and an active
          community of developers and users. What started as a response to
          electronic waste has evolved into a versatile platform for desktop
          productivity.
        </p>
      </TimelineItem>
    </div>
  );
}

export default function WhenSection() {
  const roadmapItems = [
    {
      icon: <Bluetooth className="w-4 h-4" />,
      title: "Connectivity Expansion",
      description: "Bluetooth support will enable wireless connections to a wider range of devices, eliminating the need for physical connections and expanding placement options.",
      textColor: "text-green-400"
    },
    {
      icon: <Smartphone className="w-4 h-4" />,
      title: "Mobile Companion App",
      description: "A dedicated mobile application will provide remote management capabilities, allowing users to control their DeskThing setup from anywhere.",
      textColor: "text-blue-400"
    },
    {
      icon: <UserCircle2 className="w-4 h-4" />,
      title: "User Profiles",
      description: "Multi-user profile support will enable personalized experiences for different users or contexts, with customized layouts, apps, and settings for each scenario.",
      textColor: "text-purple-400"
    },
    {
      icon: <Keyboard className="w-4 h-4" />,
      title: "Advanced Controls",
      description: "Enhanced button mapping will provide deeper customization options, allowing users to create complex macros and context-sensitive controls for maximum efficiency.",
      textColor: "text-yellow-400"
    },
    {
      icon: <AppWindow className="w-4 h-4" />,
      title: "Expanded App Ecosystem",
      description: "Improved developer tools and documentation will make it easier for the community to create powerful, feature-rich applications that extend DeskThing's capabilities.",
      textColor: "text-pink-400"
    },
    {
      icon: <Mic className="w-4 h-4" />,
      title: "AI & Voice Integration",
      description: "Integration with AI services and voice assistants will enable hands-free operation and intelligent automation, making DeskThing even more versatile and responsive.",
      textColor: "text-teal-400"
    }
  ];

  return (
    <div className="md:p-8 p-2 bg-neutral-900 rounded-lg h-full">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        When did it all start?
      </h2>
      <div className="space-y-4">
        <p>
          DeskThing was born from a critical moment in tech history - when one
          company's discontinued product became the foundation for an innovative
          open-source project.
        </p>

        <Timeline />

        <div className="mt-8 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Current Release
          </h3>
          <p className="text-sm text-gray-400">Version 0.11.0</p>
          <ul className="list-disc pl-6 mt-2 text-gray-300">
            <li>Cross-platform support (Windows, Mac, Android, Linux)</li>
            <li>WebSocket communication for real-time updates</li>
            <li>Support for several simultaneous connected devices</li>
            <li>Advanced SDK for app development</li>
            <li>Resource optimization for client devices</li>
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Looking Forward
          </h3>
          <p className="text-sm text-gray-400">The Road Ahead</p>
          <p className="mt-2 text-gray-300">
            DeskThing continues to evolve with an ambitious roadmap focused on
            expanding capabilities and enhancing the user experience. What began
            as a rescue mission for abandoned hardware has blossomed into a
            thriving ecosystem with limitless potential.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmapItems.map((item, index) => (
              <RoadmapCard key={index} {...item} />
            ))}
          </div>

          <div className="mt-4 p-3 bg-neutral-700 rounded-lg border-l-4 border-orange-500">
            <h4 className="text-md font-medium text-orange-400 mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Beyond Software: ThingLabs Hardware
            </h4>
            <p className="text-sm text-gray-300">
              Perhaps most exciting is the exploration of custom hardware
              solutions that build upon the lessons learned from the Car Thing.
              These new devices will be purpose-built for the DeskThing
              ecosystem, offering enhanced capabilities while maintaining the
              same commitment to sustainability and accessibility that defines
              the project.
            </p>
          </div>

          <p className="mt-4 text-gray-300">
            With each update and new feature, DeskThing moves further from its
            origins as a salvage project and closer to its vision as a
            comprehensive platform for desktop enhancement. The community that
            formed around saving devices from obsolescence is now building
            something entirely new—a testament to what can be accomplished when
            technology is approached with creativity, sustainability, and
            collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}
