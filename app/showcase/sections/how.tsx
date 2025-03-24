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
} from "lucide-react";
import { FeatureCardA, FeatureCardC } from "../components/FeatureCard";
import { SectionContainer } from "../components/SectionContainer"

export default function HowSection() {
  return (
    <div className="md:p-8 p-2 bg-neutral-900 rounded-lg h-full">
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
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <FeatureCardA
                title="Architecture"
                titleColor="text-green-400"
                description="Built with Electron-Vite, React, TailwindCSS, NodeJS, and ExpressJS, the server implements a listener store architecture using dependency injection. This pattern allows for efficient state management and real-time updates across the entire system."
              />
              <FeatureCardA
                title="App Management"
                titleColor="text-green-400"
                description="Each app runs on its own thread, ensuring stability and isolation. The server can download both official and community apps directly from the internet, handling installation, updates, and dependency management automatically."
              />
              <FeatureCardA
                title="Client Management"
                titleColor="text-green-400"
                description="The server tracks and manages all connected client devices, handling authentication, session management, and data synchronization. It can support multiple simultaneous connections, each with its own state and app configuration."
              />
              <FeatureCardA
                title="Communication"
                titleColor="text-green-400"
                description="WebSockets provide real-time bidirectional communication between the server and clients, enabling instant updates and responsive interactions regardless of the number of connected devices."
              />
            </div>
          </SectionContainer>

          <SectionContainer
            title="Client Devices"
            description="The DeskThing client runs on any device with a modern browser, transforming it into an interactive control surface and display for your applications."
            icon={<Smartphone className="w-5 h-5" />}
            iconBgColor="bg-blue-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <FeatureCardA
                title="Universal Compatibility"
                titleColor="text-blue-400"
                description="Works on phones, tablets, computers, Car Thing devices, smart fridges, or anything that can run a browser and connect via cable or LAN to the desktop. No app installation required—just navigate to the provided URL."
              />
              <FeatureCardA
                title="Interactive Interface"
                titleColor="text-blue-400"
                description="The client renders app UIs and allows users to navigate between apps, trigger actions, modify settings, and interact with content—all from the connected device. The interface adapts to different screen sizes and orientations automatically."
              />
              <FeatureCardA
                title="Reactive Architecture"
                titleColor="text-blue-400"
                description="Built with Zustand for state management, along with Vite, React, and TailwindCSS, the client provides a fully reactive experience. UI updates happen instantly in response to state changes, without requiring page refreshes."
              />
              <FeatureCardA
                title="Offline Capabilities"
                titleColor="text-blue-400"
                description="The client can cache certain app data and continue displaying information even during brief connection interruptions, ensuring a smooth user experience in less-than-ideal network conditions."
              />
            </div>
          </SectionContainer>

          <SectionContainer
            title="Links API Layer"
            description="The Links system serves as a sophisticated API layer that simplifies communication between app components and the DeskThing ecosystem."
            icon={<Link className="w-5 h-5" />}
            iconBgColor="bg-purple-500"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <FeatureCardA
                title="Unified Communication"
                titleColor="text-purple-400"
                description="Imported as a node module into both the app's UI and backend, Links provides a consistent interface for listening, fetching, or sending data between the server and the app's components, abstracting away the complexity of network communication."
              />
              <FeatureCardA
                title="Type Safety"
                titleColor="text-purple-400"
                description="The API is fully typed using TypeScript, providing autocomplete suggestions, compile-time error checking, and documentation directly in the development environment, reducing bugs and improving developer productivity."
              />
              <FeatureCardA
                title="Component Integration"
                titleColor="text-purple-400"
                description="Links simplifies the process of adding tasks, settings, mappings, keys, buttons, icons, and other UI elements that need to interact with the backend. Developers can define these components declaratively and Links handles the communication automatically."
              />
              <FeatureCardA
                title="State Synchronization"
                titleColor="text-purple-400"
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
              <FeatureCardA
                title="Dual Architecture"
                titleColor="text-yellow-400"
                description="Each app contains both UI and backend logic. The UI is essentially a web page with all the flexibility that web technologies offer, while the backend runs on a dedicated thread within the DeskThing server, providing access to system resources and persistent storage."
              />
              <FeatureCardA
                title="Backend Capabilities"
                titleColor="text-yellow-400"
                description="The app backend has access to user-configurable settings, guided setup tasks, triggerable actions, and system APIs. It can perform operations that require elevated permissions or system access while maintaining security through the DeskThing sandbox."
              />
              <FeatureCardA
                title="Development Tools"
                titleColor="text-yellow-400"
                description="Apps have access to a CLI during development that simplifies the build process, enables emulating the DeskThing environment for testing, and allows sending sample settings or data to the backend for debugging purposes without requiring a full deployment."
              />
              <FeatureCardA
                title="Distribution"
                titleColor="text-yellow-400"
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
          <div className="bg-neutral-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-400 flex items-center">
              <Network className="w-5 h-5 mr-2" />
              Data Flow Process
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Client connects to server via local network</li>
              <li>Server authenticates client and sends available apps</li>
              <li>Client requests specific app data</li>
              <li>
                Server processes request, fetches data from relevant sources
              </li>
              <li>Data is sent back to client for rendering</li>
              <li>Real-time updates are pushed via WebSocket connection</li>
            </ol>
          </div>

          <div className="bg-neutral-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-purple-400 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Technology Stack
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Server:</span> Node.js,
                Electron, Express.js
              </li>
              <li>
                <span className="font-semibold">Client:</span> React, Vite,
                Tailwind CSS
              </li>
              <li>
                <span className="font-semibold">Communication:</span>{" "}
                WebSockets, REST APIs
              </li>
              <li>
                <span className="font-semibold">Development:</span> TypeScript
                for type safety
              </li>
              <li>
                <span className="font-semibold">Packaging:</span> Custom app
                bundling system
              </li>
            </ul>
          </div>
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
          <FeatureCardC
            icon={<Shield size={36} />}
            iconColor="text-green-400"
            title="Security First"
            description="DeskThing operates exclusively on your local network, minimizing security risks associated with cloud-based solutions. All communication between the server and clients is handled within your network, ensuring that sensitive information remains private. The app validation process also includes security checks to prevent malicious code from being executed."
            borderColor="border-green-500"
          />
          <FeatureCardC
            icon={<Cpu size={36} />}
            iconColor="text-blue-400"
            title="Efficient Resource Management"
            description="The DeskThing server includes a sophisticated resource manager that monitors and optimizes system usage. It allocates resources efficiently among running apps, ensures that background processes don't consume excessive CPU or memory, and implements throttling mechanisms when necessary to maintain overall system performance."
            borderColor="border-blue-500"
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
