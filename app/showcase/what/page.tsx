"use client";
import {
  MonitorSmartphone,
  Recycle,
  Cpu,
  Code,
  Puzzle,
  Zap,
  Globe,
  ShieldCheck,
  AppWindow,
} from "lucide-react";
import { SectionContainer } from "../components/SectionContainer";
import { FeatureCard, InfoCard, InfoComponent } from "../components/InfoCards";

interface ChecklistItemProps {
  text: string;
  label: string;
}

interface AppCardProps {
  title: string;
  description: string;
}

function ChecklistItem({ text, label }: ChecklistItemProps) {
  return (
    <div className="flex items-center">
      <div className="mt-1 mr-3 w-6 h-6 rounded-full bg-green-900 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold">✓</span>
      </div>
      <p>
        <span className="font-medium">{label}</span> {text}
      </p>
    </div>
  );
}

function AppCard({ title, description }: AppCardProps) {
  return (
    <a
      href="/apps"
      className="bg-neutral-800 p-3 rounded-lg hover:bg-neutral-900 transition-colors"
    >
      <h4 className="font-medium text-green-400">{title}</h4>
      <p className="text-sm mt-1">{description}</p>
    </a>
  );
}

function FeaturesGrid() {
  const features = [
    {
      icon: <Recycle className="text-green-400" size={24} />,
      title: "Upcycle Old Devices",
      description:
        "Instead of discarding your outdated smartphones, tablets, or Car Thing devices, DeskThing gives them new purpose as dedicated displays and control surfaces for your computer. This extends their useful lifespan and reduces electronic waste.",
      iconColor: "text-green-400",
    },
    {
      icon: <Cpu className="text-blue-400" size={24} />,
      title: "Enhance Your Workflow",
      description:
        "Free up valuable screen space on your main computer by offloading monitoring tasks, controls, and information displays to connected devices. From system resources and weather updates to smart home controls and media players, DeskThing keeps important information visible without cluttering your primary workspace.",
      iconColor: "text-blue-400",
    },
    {
      icon: <Code className="text-purple-400" size={24} />,
      title: "Developer-Friendly",
      description:
        "With a comprehensive SDK and intuitive Links API layer, DeskThing makes it easy for developers of any skill level to create custom applications. The platform handles the complex communication between devices, allowing developers to focus on building functionality rather than managing connections.",
      iconColor: "text-purple-400",
    },
    {
      icon: <Puzzle className="text-yellow-400" size={24} />,
      title: "Modular App Ecosystem",
      description:
        "DeskThing features a growing library of both official and community-created apps. Each app is self-contained with both frontend and backend components, allowing for easy installation, updates, and customization. From system monitors to smart home controls, there's an app for almost every need.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}

export default function WhatSection() {
  const keyFeatures = [
    {
      label: "Cross-platform support",
      text: "for Windows, Mac, Linux, and any device with a modern browser",
    },
    {
      label: "Low resource utilization",
      text: "with less than 10% CPU usage on client devices",
    },
    {
      label: "Multi-device support",
      text: "with the ability to handle several devices connected simultaneously",
    },
    { label: "Real-time updates", text: "via secure WebSocket communication" },
    {
      label: "Comprehensive SDK",
      text: "with Links API for simplified app development",
    },
    {
      label: "Thread isolation",
      text: "for apps to ensure stability and security",
    },
    {
      label: "Reactive UI",
      text: "built with Zustand, React, and TailwindCSS",
    },
    { label: "Easy setup", text: "with no client-side installation required" },
  ];

  const infoCards = [
    {
      icon: <Globe className="text-green-400" size={36} />,
      title: "Universal Access",
      description:
        "Any device with a browser can connect to your DeskThing server over your local network. No app installation required—just navigate to the provided URL and start using your device as a DeskThing.",
      className: 'border-green-500'
    },
    {
      icon: <ShieldCheck className="text-blue-400" size={36} />,
      iconColor: "text-blue-400",
      title: "Secure By Design",
      description:
        "DeskThing operates exclusively on your local network, minimizing security risks. All communication between the server and clients is handled within your network, ensuring that sensitive information remains private.",
      className: 'border-blue-500'
    },
    {
      icon: <Puzzle className="text-purple-400" size={36} />,
      iconColor: "text-purple-400",
      title: "Expandable Platform",
      description:
        "The modular architecture allows for continuous expansion of capabilities through new apps and features. As the community grows, so does the ecosystem of available applications and use cases.",
      className: 'border-purple-500'
    },
  ];

  const coreApps = [
    {
      title: "System Monitor",
      description:
        "Track CPU, memory, disk usage, and network activity in real-time",
    },
    {
      title: "Weather",
      description: "Display current conditions and forecasts for your location",
    },
    {
      title: "Spotify Controller",
      description: "Control playback and view now-playing information",
    },
    {
      title: "Discord Status",
      description: "See active voice channels and participants",
    },
    {
      title: "Home Assistant",
      description: "Control smart home devices directly from your DeskThing",
    },
    {
      title: "And More...",
      description: "New official and community apps are added regularly",
    },
  ];

  return (
    <div className="p-2 md:p-8 rounded-lg h-full">
      <h2 className="text-3xl font-bold mb-6">What is DeskThing?</h2>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-2/3">
            <p className="text-lg leading-relaxed">
              DeskThing is an open-source platform that transforms any
              internet-connected device with a browser into an interactive
              digital assistant for your computer. By repurposing outdated
              hardware like old phones, tablets, or Spotify's discontinued Car
              Thing, DeskThing reduces electronic waste while adding valuable
              functionality to your workspace.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="p-6 bg-neutral-800 rounded-full">
              <MonitorSmartphone size={80} className="text-green-400" />
            </div>
          </div>
        </div>

        {FeaturesGrid()}

        <div className="mt-8 bg-neutral-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Zap className="text-green-400 mr-3" size={28} />
            <h3 className="text-2xl font-semibold">Key Features</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {keyFeatures.map((feature, index) => (
              <ChecklistItem key={index} {...feature} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoCards.map((card, index) => (
            <InfoComponent key={index} title={card.title} className={card.className} description={card.description} icon={card.icon} />
          ))}
        </div>

        <SectionContainer
          title="Core Applications"
          description="DeskThing comes with several official applications to get you started, with more being added regularly:"
          icon={<AppWindow className="w-5 h-5" />}
          iconBgColor="bg-green-500"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coreApps.map((app, index) => (
              <InfoCard
                key={index}
                title={<span className="text-green-400">{app.title}</span>}
                description={app.description}
              />
            ))}
          </div>
        </SectionContainer>

        <div className="mt-8 p-6 bg-neutral-800 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/3 flex justify-center">
              <img
                src="/imgs/DeskThing_Device.png"
                alt="DeskThing Device"
                className="w-48 h-auto object-contain"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold mb-3">
                More Than Just Software
              </h3>
              <p>
                DeskThing is more than just an application—it's a platform that
                fosters responsibility and creativity while enhancing
                productivity. By transforming unused devices into powerful
                tools, DeskThing not only reduces electronic waste but also
                empowers users and developers to create innovative solutions
                tailored to their specific needs.
              </p>
              <p className="mt-3">
                Whether you're looking to maximize the potential of your old
                devices, build and deploy apps with ease, or simply find ways to
                streamline your digital life, DeskThing offers a flexible,
                accessible, and sustainable platform that adapts to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
