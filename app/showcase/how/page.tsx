"use client";

import {
  Server,
  Smartphone,
  Link,
  AppWindow,
  Database,
  Code,
  Network,
  Wifi,
  Shield,
  Cpu,
  Code2,
  Package,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SectionContainer } from "../components/SectionContainer";
import { FeatureCard, InfoCard, InfoComponent } from "../components/InfoCards";
import { CodeBox, CodeComponent } from "../components/CodeComponent";
import { Suspense, useCallback, useMemo, useState, useTransition } from "react";
import { IconGithub } from "../../../components/assets/icons";
import { HowServerSection } from "../components/how/ServerSection";
import { ClientSection } from "../components/how/ClientSection";

export default function HowSection() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const [isPending, startTransition] = useTransition();

  // Then in your toggle function
  const toggleSection = (sectionId: string): void => {
    startTransition(() => {
      setOpenSections(prev => {
        const newOpenSections = new Set(prev);
        if (newOpenSections.has(sectionId)) {
          newOpenSections.delete(sectionId);
        } else {
          newOpenSections.add(sectionId);
        }
        return newOpenSections;
      });
    });
  };
  // Check if a section is open
  const isSectionOpen = (sectionId: string) => openSections.has(sectionId);

  const serverSection = useMemo(() => <HowServerSection />, []);
  const clientSection = useMemo(() => <ClientSection />, []);

  return (
    <div className="md:p-8 p-2 rounded-lg h-full">
      <h2 className="text-3xl font-bold mb-6">How does it work?</h2>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-2/3">
            <p>
              DeskThing uses a client-server architecture that allows any
              compatible device to connect to your computer and interact with
              applications hosted on it. The system leverages modern web
              technologies to provide a responsive experience with minimal
              resource usage.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="p-6 bg-neutral-800 rounded-full">
              <Server size={80} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-4">
          <SectionContainer
            title="Desktop Server"
            description="The DeskThing server runs on your computer, serving as the central hub for all connected devices and applications."
            icon={<Server className="w-5 h-5" />}
            iconBgColor="bg-green-500"
            index={0}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <InfoCard
                title={<span className="text-green-400">Architecture</span>}
                description="Built with Electron-Vite, React, TailwindCSS, NodeJS, and ExpressJS, the server implements a listener store architecture using dependency injection. This pattern allows for efficient state management and real-time updates across the entire system."
              />
              <InfoCard
                title={<span className="text-green-400">App Management</span>}
                description="Each app runs on its own thread, ensuring stability and isolation. The server can download both official and community apps directly from the internet, handling installation, updates, and dependency management automatically."
              />
              <InfoCard
                title={
                  <span className="text-green-400">Client Management</span>
                }
                description="The server tracks and manages all connected client devices, handling authentication, session management, and data synchronization. It can support multiple simultaneous connections, each with its own state and app configuration."
              />
              <InfoCard
                title={<span className="text-green-400">Communication</span>}
                description="WebSockets provide real-time bidirectional communication between the server and clients, enabling instant updates and responsive interactions regardless of the number of connected devices."
              />
            </div>

            {/* Add expandable section button */}
            <button
              onClick={() => toggleSection("server")}
              className="mt-4 flex items-center justify-center w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-all duration-300 group"
            >
              <span className="mr-2 text-green-400 font-medium">
                {isSectionOpen("server")
                  ? "Hide Technical Details"
                  : "Show Technical Details"}
              </span>
              <ChevronDown
                className={`w-5 h-5 ${
                  isSectionOpen("server")
                    ? "-rotate-180 group-hover:translate-y-[-2px]"
                    : "group-hover:translate-y-[2px]"
                } text-green-400 transition-transform duration-300`}
              />
            </button>
          </SectionContainer>

          {/* Server details section that expands/collapses */}
          {isSectionOpen("server") && (
            <div className="overflow-x-hidden transition-all duration-500 opacity-100 animate-dropIn">
              {serverSection}
            </div>
          )}

          <SectionContainer
            title="Client Devices"
            description="The DeskThing client runs on any device with a modern browser, transforming it into an interactive control surface and display for your applications."
            icon={<Smartphone className="w-5 h-5" />}
            iconBgColor="bg-blue-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <InfoCard
                title={
                  <span className="text-blue-400">Universal Compatibility</span>
                }
                description="Works on phones, tablets, computers, Car Thing devices, smart fridges, or anything that can run a browser and connect via cable or LAN to the desktop. No app installation required—just navigate to the provided URL."
              />
              <InfoCard
                title={
                  <span className="text-blue-400">Interactive Interface</span>
                }
                description="The client renders app UIs and allows users to navigate between apps, trigger actions, modify settings, and interact with content—all from the connected device. The interface adapts to different screen sizes and orientations automatically."
              />
              <InfoCard
                title={
                  <span className="text-blue-400">Reactive Architecture</span>
                }
                description="Built with Zustand for state management, along with Vite, React, and TailwindCSS, the client provides a fully reactive experience. UI updates happen instantly in response to state changes, without requiring page refreshes."
              />
              <InfoCard
                title={
                  <span className="text-blue-400">Offline Capabilities</span>
                }
                description="The client can cache certain app data and continue displaying information even during brief connection interruptions, ensuring a smooth user experience in less-than-ideal network conditions."
              />
            </div>

            <button
              onClick={() => toggleSection("client")}
              className="mt-4 flex items-center justify-center w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-all duration-300 group"
            >
              <span className="mr-2 text-blue-400 font-medium">
                {isSectionOpen("client")
                  ? "Hide Technical Details"
                  : "Show Technical Details"}
              </span>
              <ChevronDown
                className={`w-5 h-5 ${
                  isSectionOpen("client")
                    ? "-rotate-180 group-hover:translate-y-[-2px]"
                    : "group-hover:translate-y-[2px]"
                } text-blue-400 transition-transform duration-300`}
              />
            </button>
          </SectionContainer>

          {isSectionOpen("client") && (
            <div className="overflow-x-hidden transition-all duration-500 opacity-100 animate-dropIn">
              {clientSection}
            </div>
          )}

          <SectionContainer
            title="Links API Layer"
            description="The Links system serves as a sophisticated API layer that simplifies communication between app components and the DeskThing ecosystem."
            icon={<Link className="w-5 h-5" />}
            iconBgColor="bg-purple-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <InfoCard
                title={
                  <span className="text-purple-400">Unified Communication</span>
                }
                description="Imported as a node module into both the app's UI and backend, Links provides a consistent interface for listening, fetching, or sending data between the server and the app's components, abstracting away the complexity of network communication."
              />
              <InfoCard
                title={<span className="text-purple-400">Type Safety</span>}
                description="The API is fully typed using TypeScript, providing autocomplete suggestions, compile-time error checking, and documentation directly in the development environment, reducing bugs and improving developer productivity."
              />
              <InfoCard
                title={
                  <span className="text-purple-400">Component Integration</span>
                }
                description="Links simplifies the process of adding tasks, settings, mappings, keys, buttons, icons, and other UI elements that need to interact with the backend. Developers can define these components declaratively and Links handles the communication automatically."
              />
              <InfoCard
                title={
                  <span className="text-purple-400">State Synchronization</span>
                }
                description="The system ensures that state changes are properly synchronized between the frontend and backend, maintaining consistency across the entire application even when multiple clients are connected."
              />
            </div>
          </SectionContainer>

          <SectionContainer
            title="Community Apps"
            description="Apps are the heart of the DeskThing ecosystem, providing specialized functionality while maintaining a consistent user experience."
            icon={<AppWindow className="w-5 h-5" />}
            iconBgColor="bg-yellow-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <InfoCard
                title={
                  <span className="text-yellow-400">Dual Architecture</span>
                }
                description="Each app contains both UI and backend logic. The UI is essentially a web page with all the flexibility that web technologies offer, while the backend runs on a dedicated thread within the DeskThing server, providing access to system resources and persistent storage."
              />
              <InfoCard
                title={
                  <span className="text-yellow-400">Backend Capabilities</span>
                }
                description="The app backend has access to user-configurable settings, guided setup tasks, triggerable actions, and system APIs. It can perform operations that require elevated permissions or system access while maintaining security through the DeskThing sandbox."
              />
              <InfoCard
                title={
                  <span className="text-yellow-400">Development Tools</span>
                }
                description="Apps have access to a CLI during development that simplifies the build process, enables emulating the DeskThing environment for testing, and allows sending sample settings or data to the backend for debugging purposes without requiring a full deployment."
              />
              <InfoCard
                title={<span className="text-yellow-400">Distribution</span>}
                description="Once developed, apps can be packaged and distributed through the DeskThing app marketplace or shared directly as installation files. The DeskThing server handles installation, dependency resolution, and updates automatically."
              />
            </div>
          </SectionContainer>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Database className="w-6 h-6 mr-2" />
            Technical Architecture
          </h3>
          <div className="bg-neutral-800 p-4 rounded-lg font-mono text-sm">
            <pre className="whitespace-pre-wrap">
              {`DeskThing Architecture
├── Core Runtime (Node.js + Electron)
│   ├── Resource Manager
│   ├── App Lifecycle Manager
│   └── System Integration Layer
├── Express Web Server
│   ├── Client Connection Handler
│   └── WebSocket Communication
├── React + Vite Client Interface
│   ├── Layout Engine
│   └── Theme Manager
└── App SDK
    ├── Development Tools
    ├── Dual Architecture Components
    └── Backend Capabilities API  `}{" "}
            </pre>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<Network className="w-5 h-5 text-blue-400" />}
            title={<span className="text-blue-400">Data Flow Process</span>}
            description={
              <ol className="mt-4 list-decimal list-inside space-y-2 text-neutral-300">
                <li className="pl-2">
                  Client connects to server via local network
                </li>
                <li className="pl-2">
                  Server authenticates client and sends available apps
                </li>
                <li className="pl-2">Client requests specific app data</li>
                <li className="pl-2">
                  Server processes request, fetches data from relevant sources
                </li>
                <li className="pl-2">
                  Data is sent back to client for rendering
                </li>
                <li className="pl-2">
                  Real-time updates are pushed via WebSocket connection
                </li>
              </ol>
            }
          />
          <FeatureCard
            icon={<Code className="w-5 h-5 text-green-400" />}
            title={<span className="text-green-400">Technology Stack</span>}
            description={
              <ul className="mt-4 list-disc list-inside space-y-2 text-neutral-300">
                <li className="pl-2">
                  <span className="font-semibold text-white">Server:</span>{" "}
                  Node.js, Electron, Express.js
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-white">Client:</span>{" "}
                  React, Vite, Tailwind CSS
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-white">
                    Communication:
                  </span>{" "}
                  WebSockets, REST APIs
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-white">Development:</span>{" "}
                  TypeScript for type safety
                </li>
                <li className="pl-2">
                  <span className="font-semibold text-white">Packaging:</span>{" "}
                  Custom app bundling system
                </li>
              </ul>
            }
          />{" "}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2" />
            App Development Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-800 p-4 rounded-lg border-t-4 border-green-500 transition-all border-2 border-x-transparent hover:border-2 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center">
                <Code2 className="w-5 h-5 mr-2" />
                1. Development
              </h4>
              <p className="text-sm">
                Developers create apps using the DeskThing SDK, which provides a
                standardized interface for both frontend and backend components.
                Apps can be built with almost any software or framework, though
                the official apps use Node.js for the backend and React for the
                frontend.
              </p>
            </div>

            <div className="bg-neutral-800 p-4 rounded-lg border-t-4 border-blue-500 transition-all border-2 border-x-transparent hover:border-2 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                2. Packaging
              </h4>
              <p className="text-sm">
                Once developed, apps are compiled, zipped, and packaged into a
                format that can be easily installed on the DeskThing server.
                This package includes all necessary assets, dependencies, and
                configuration files needed for the app to function properly.
              </p>
            </div>

            <div className="bg-neutral-800 p-4 rounded-lg border-t-4 border-purple-500 transition-all border-2 border-x-transparent hover:border-2 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <h4 className="font-semibold text-purple-400 mb-2 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                3. Distribution
              </h4>
              <p className="text-sm">
                Packaged apps can be shared with other DeskThing users or
                submitted to the app marketplace. Installation is as simple as
                dropping the app package into the DeskThing server, which
                automatically handles extraction, registration, and
                initialization.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-neutral-800 p-5 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <Wifi className="w-6 h-6 mr-2" />
            Setup Process Simplicity
          </h3>
          <p className="mb-4">
            Despite the complex technology behind it, setting up DeskThing is
            remarkably simple:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-neutral-700 rounded-lg transition-all border-2 border-transparent hover:border-2 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <p>
                Install DeskThing on your computer with the provided installer
              </p>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg transition-all border-2 border-transparent hover:border-2 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <p>
                Navigate to the URL provided by DeskThing on your mobile device
              </p>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg transition-all border-2 border-transparent hover:border-2 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <p>
                Start using your device as a DeskThing with the installed apps
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoComponent
            icon={<Shield className="text-green-400" size={36} />}
            title="Security First"
            description="DeskThing operates exclusively on your local network, minimizing security risks associated with cloud-based solutions. All communication between the server and clients is handled within your network, ensuring that sensitive information remains private. The app validation process also includes security checks to prevent malicious code from being executed."
            className="border-green-500"
          />
          <InfoComponent
            icon={<Cpu className="text-blue-400" size={36} />}
            title="Efficient Resource Management"
            description="The DeskThing server includes a sophisticated resource manager that monitors and optimizes system usage. It allocates resources efficiently among running apps, ensures that background processes don't consume excessive CPU or memory, and implements throttling mechanisms when necessary to maintain overall system performance."
            className="border-blue-500"
          />
        </div>
        <div className="mt-8">
          <p className="text-center text-lg">
            DeskThing transforms the complex process of device communication
            into a seamless experience, making it accessible to users of all
            technical backgrounds while providing powerful tools for developers
            to create innovative applications.
          </p>
        </div>
      </div>
    </div>
  );
}
