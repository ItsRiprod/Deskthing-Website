import { FC } from "react";
import { IconGithub } from "../../../../components/assets/icons";
import { CodeBox } from "../CodeComponent";
import {
  Layers,
  Workflow,
  Plug,
  Cpu,
  BarChart3,
  Database,
  ArrowDownUp,
  Zap,
  Clock,
  ArrowDown,
  Smartphone,
  Monitor,
} from "lucide-react";
import { InfoCard, InfoComponent, StatCard } from "../InfoCards";

const StoreProviderCode = `class StoreProvider {
  // Singleton pattern for managing application stores
  private static instance: StoreProvider
  private stores = {
    platformStore: null,
    appStore: null,
    expressStore: null,
    websocketStore: null
  }

  static getInstance(): StoreProvider {
    if (!StoreProvider.instance) {
      StoreProvider.instance = new StoreProvider()
    }
    return StoreProvider.instance
  }

  async getStore(storeId: string): Promise<any> {
    if (!this.stores[storeId]) {
      this.stores[storeId] = await this.initializeStore(storeId)
    }
    return this.stores[storeId]
  }
}`;
const PlatformStoreCode = `class PlatformStore {
  private platforms = {
    adb: null,
    websocket: null,
    express: null
  }
  private clients = new Map()

  async initializePlatforms(): Promise<void> {
    this.platforms.adb = new ADBPlatform()
    this.platforms.websocket = new WebSocketPlatform()
    this.platforms.express = new ExpressPlatform()
    
    // Setup listeners for each platform
    Object.values(this.platforms).forEach(platform => {
      this.setupListeners(platform)
    })
  }

  async handleDeviceConnection(device): Promise<void> {
    // First connect via ADB for configuration
    await this.platforms.adb.configureDevice(device)
    
    // Then establish other connections as needed
    this.platforms.websocket.connectDevice(device)
  }

  async routeMessage(source, target, data): Promise<void> {
    // Route messages between platforms, clients, and apps
    const platform = this.getPlatformForTarget(target)
    platform.sendMessage(target, data)
  }
}`;

// Update AppStoreCode to show relationship with AppProcessStore
const AppStoreCode = `class AppStore {
  private appProcessStore = null
  private appSettings = {}
  private appTasks = {}
  
  constructor() {
    this.appProcessStore = new AppProcessStore()
  }

  async runApp(appId: string): Promise<void> {
    try {
      // Load app settings
      const settings = await this.getAppSettings(appId)
      
      // Start the app process via AppProcessStore
      await this.appProcessStore.startApp(appId, settings)
      
      // Register app communication channels
      this.registerAppEventHandlers(appId)
    } catch (error) {
      console.error('Failed to run app:', error)
    }
  }
  
  // Handle inter-app communication
  async routeAppMessage(sourceApp, targetApp, data): Promise<void> {
    if (this.appProcessStore.isAppRunning(targetApp)) {
      await this.appProcessStore.sendToApp(targetApp, data)
    }
  }
  
  // Handle app-client communication
  async routeAppToClient(appId, clientId, data): Promise<void> {
    // Get platform store to send to client
    const platformStore = await StoreProvider.getInstance().getStore('platformStore')
    platformStore.routeMessage('app', clientId, data)
  }
}`;

// Add new code block for IPC Handlers
const IPCHandlersCode = `// IPC Handler setup for Electron frontend-backend communication
function setupIPCHandlers(): void {
  // Handle UI requests to manage apps
  ipcMain.handle('app:start', async (event, appId) => {
    const appStore = await StoreProvider.getInstance().getStore('appStore')
    return await appStore.runApp(appId)
  })
  
  // Handle UI requests for platform operations
  ipcMain.handle('platform:getDevices', async () => {
    const platformStore = await StoreProvider.getInstance().getStore('platformStore')
    return await platformStore.getConnectedDevices()
  })
  
  // Handle UI requests for client operations
  ipcMain.handle('client:sendMessage', async (event, clientId, message) => {
    const platformStore = await StoreProvider.getInstance().getStore('platformStore')
    return await platformStore.routeMessage('ui', clientId, message)
  })
}`;

// Add new code block for Client Connection Flow
const ClientConnectionCode = `// Client connection flow
async function handleNewClient(req, res): Promise<void> {
  // Express platform handles initial connection
  const expressStore = await StoreProvider.getInstance().getStore('expressStore')
  const clientInfo = await expressStore.registerClient(req)
  
  // Serve client app and connection details
  res.json({
    clientId: clientInfo.id,
    wsEndpoint: expressStore.getWebSocketEndpoint()
  })
  
  // After client receives connection info, they'll connect to WebSocket
  const websocketStore = await StoreProvider.getInstance().getStore('websocketStore')
  websocketStore.awaitClientConnection(clientInfo.id)
}`;

export const HowServerSection: FC = () => {
  return (
    <div className="bg-neutral-900 border-l-4 flex flex-col gap-4 border-green-500 p-6 rounded-lg mt-2">
      <h3 className="text-xl font-semibold mb-4 text-green-400">
        Desktop Server Technical Implementation
      </h3>

      <div className="mt-8 flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-green-400">
              Store Provider System
            </h4>
            <p className="mb-4">
              DeskThing implements a sophisticated store provider system with
              lazy loading and dependency injection, ensuring stores are only
              initialized when needed and dependencies are properly managed.
            </p>
          </div>
          <div className="md:w-1/2 transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={StoreProviderCode} forceOpen />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-green-400">
              IPC Communication Handlers
            </h4>
            <p className="mb-4">
              DeskThing implements comprehensive IPC handlers to manage
              communication between the Electron frontend and backend, handling
              app management, platform operations, and client messaging.
            </p>
          </div>
          <div className="md:w-1/2 transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={IPCHandlersCode} forceOpen />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-green-400">
              Client Connection Flow
            </h4>
            <p className="mb-4">
              DeskThing handles client connections through a sophisticated flow
              that manages initial HTTP connections, client registration, and
              subsequent WebSocket connections for real-time communication.
            </p>
          </div>
          <div className="md:w-1/2 transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={ClientConnectionCode} forceOpen />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-green-400">
              Cross-Platform Communication System
            </h4>
            <p className="mb-4">
              DeskThing's platform system enables seamless communication across
              different devices and platforms, with a unified API for sending
              and receiving data regardless of the underlying connection method.
            </p>
          </div>
          <div className="md:w-1/2 transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={PlatformStoreCode} forceOpen />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-green-400">
              Comprehensive App Management
            </h4>
            <p className="mb-4">
              DeskThing's app management system provides a robust framework for
              installing, running, and communicating with apps, complete with
              progress tracking and error handling.
            </p>
          </div>
          <div className="md:w-1/2 max-w-screen transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={AppStoreCode} forceOpen />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <a
            href="https://github.com/ItsRiprod/DeskThing/tree/main/DeskThingServer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-base font-medium bg-neutral-800/50 border border-neutral-700 rounded-lg hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:border-green-500 transition-all duration-300"
          >
            <IconGithub />
            View on GitHub
          </a>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-neutral-700 pt-8">
        <h4 className="text-lg font-semibold mb-6 text-green-400 flex items-center">
          <Layers className="w-5 h-5 mr-2" />
          Architecture Overview
        </h4>
        {/* Layered Architecture Diagram - REVISED */}
        <div className="mb-12 overflow-hidden">
          <div className="flex gap-4 flex-col justify-between">
            {/* UI Layer */}
            <InfoCard
              icon={
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-white" />
                </div>
              }
              title={
                <h5 className="font-medium text-green-400">
                  UI Layer (Electron Frontend)
                </h5>
              }
              description={
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    User Interface
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    UI Events
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    UI State
                  </span>
                </div>
              }
            />

            {/* IPC Handler Layer */}
            <InfoCard
              icon={
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <ArrowDownUp className="w-4 h-4 text-white" />
                </div>
              }
              title={
                <h5 className="font-medium text-green-400">
                  IPC Handler Layer
                </h5>
              }
              description={
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    Frontend-Backend Communication
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    Event Routing
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    Request Handling
                  </span>
                </div>
              }
            />

            {/* Store Provider Layer */}
            <InfoCard
              icon={
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Database className="w-4 h-4 text-white" />
                </div>
              }
              title={
                <h5 className="font-medium text-green-400">
                  Store Provider Layer
                </h5>
              }
              description={
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    StoreProvider
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    Store Initialization
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    Dependency Management
                  </span>
                </div>
              }
            />

            {/* Platform Layer */}
            <InfoCard
              icon={
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Workflow className="w-4 h-4 text-white" />
                </div>
              }
              title={
                <h5 className="font-medium text-green-400">Platform Layer</h5>
              }
              description={
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    ADB Platform
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    WebSocket Platform
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    Express Platform
                  </span>
                </div>
              }
            />

            {/* App Management Layer */}
            <InfoCard
              icon={
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-white" />
                </div>
              }
              title={
                <h5 className="font-medium text-green-400">
                  App Management Layer
                </h5>
              }
              description={
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    AppStore
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    AppProcessStore
                  </span>
                  <span className="px-2 py-1 bg-green-800/50 rounded text-xs">
                    Multi-threaded Apps
                  </span>
                </div>
              }
            />
          </div>
        </div>

        {/* Data Flow Diagram - NEW ADDITION */}
        <h4 className="text-lg font-semibold mb-6 text-green-400 flex items-center">
          <ArrowDownUp className="w-5 h-5 mr-2" />
          Data Flow Architecture
        </h4>
        <div className="bg-neutral-800/50 border border-green-500/30 rounded-lg p-6 mb-8">
          <div className="flex flex-col items-center">
            {/* UI and IPC Layer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
              <div className="bg-neutral-700 rounded-lg p-3 text-center">
                <span className="text-sm font-medium">Electron UI</span>
              </div>
              <div className="bg-neutral-700 rounded-lg p-3 text-center">
                <span className="text-sm font-medium">IPC Handlers</span>
              </div>
            </div>

            {/* Down Arrow */}
            <ArrowDown className="text-green-500 my-2" />

            {/* Store Provider */}
            <div className="bg-green-600/20 rounded-lg p-3 text-center border border-green-500/50 w-full mb-4">
              <span className="text-sm font-medium">Store Provider</span>
            </div>

            {/* Store Layer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-4">
              <div className="bg-neutral-700 rounded-lg p-3 text-center">
                <span className="text-sm font-medium">Platform Store</span>
                <div className="grid grid-cols-3 gap-1 mt-2">
                  <div className="bg-neutral-800 rounded p-1 text-xs">ADB</div>
                  <div className="bg-neutral-800 rounded p-1 text-xs">
                    WebSocket
                  </div>
                  <div className="bg-neutral-800 rounded p-1 text-xs">
                    Express
                  </div>
                </div>
              </div>
              <div className="bg-neutral-700 rounded-lg p-3 text-center">
                <span className="text-sm font-medium">App Store</span>
                <div className="mt-2 bg-neutral-800 rounded p-1 text-xs">
                  AppProcessStore
                </div>
              </div>
              <div className="bg-neutral-700 rounded-lg p-3 text-center">
                <span className="text-sm font-medium">Other Stores</span>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  <div className="bg-neutral-800 rounded p-1 text-xs">
                    Settings
                  </div>
                  <div className="bg-neutral-800 rounded p-1 text-xs">Data</div>
                </div>
              </div>
            </div>

            {/* Down Arrow */}
            <ArrowDown className="text-green-500 my-2" />

            {/* External Connections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <StatCard
                value={
                  <>
                    <span className="text-sm font-medium">Devices</span>
                    <div className="mt-2 text-xs text-neutral-400">
                      via ADB Platform
                    </div>
                  </>
                }
              />
              <StatCard
                value={
                  <>
                    <span className="text-sm font-medium">Clients</span>
                    <div className="mt-2 text-xs text-neutral-400">
                      via Express & WebSocket
                    </div>
                  </>
                }
              />
              <StatCard
                value={
                  <>
                    <span className="text-sm font-medium">Apps</span>
                    <div className="mt-2 text-xs text-neutral-400">
                      via Worker Threads
                    </div>
                  </>
                }
              />{" "}
            </div>
          </div>
        </div>

        {/* Connection Flow Diagrams - NEW ADDITION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <InfoComponent
            icon={
              <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-green-400" />
              </div>
            }
            title="Client Connection Flow"
            description="How clients connect to the DeskThing server"
            className="border-green-500 bg-neutral-800/50"
          >
            <div className="flex mt-4 justify-center">
              <div className="w-full max-w-xs">
                <div className="bg-neutral-700 rounded-lg p-3 text-center">
                  <span className="text-sm">Client Device</span>
                </div>
                <div className="h-8 w-0.5 flex-grow-0 bg-green-900 mx-auto"></div>
                <div className="bg-green-600/20 rounded-lg p-3 text-center border border-green-500/50">
                  <span className="text-sm">Express Platform</span>
                  <div className="text-xs text-green-300 mt-1">
                    Initial Connection & Registration
                  </div>
                </div>
                <div className="h-8 w-0.5 flex-grow-0 bg-green-900 mx-auto"></div>
                <div className="bg-green-600/20 rounded-lg p-3 text-center border border-green-500/50">
                  <span className="text-sm">WebSocket Platform</span>
                  <div className="text-xs text-green-300 mt-1">
                    Realtime Communication
                  </div>
                </div>
              </div>
            </div>
          </InfoComponent>

          <InfoComponent
            icon={
              <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-green-400" />
              </div>
            }
            title="App Communication Flow"
            description="How apps communicate within the system"
            className="border-green-500 bg-neutral-800/50"
          >
            <div className="flex mt-4 justify-center">
              <div className="w-full max-w-xs">
                <div className="bg-neutral-700 rounded-lg p-3 text-center">
                  <span className="text-sm">App (Worker Thread)</span>
                </div>
                <div className="h-8 w-0.5 flex-grow-0 bg-green-900 mx-auto"></div>
                <div className="bg-green-600/20 rounded-lg p-3 text-center border border-green-500/50">
                  <span className="text-sm">AppProcessStore</span>
                  <div className="text-xs text-green-300 mt-1">
                    Thread Management
                  </div>
                </div>
                <div className="h-8 w-0.5 flex-grow-0 bg-green-900 mx-auto"></div>
                <div className="bg-green-600/20 rounded-lg p-3 text-center border border-green-500/50">
                  <span className="text-sm">AppStore</span>
                  <div className="text-xs text-green-300 mt-1">
                    Settings, Tasks, Actions
                  </div>
                </div>
                <div className="flex gap-2 justify-between items-start mt-2">
                  <div className="flex flex-col items-center w-1/2">
                    <div className="h-8 w-0.5 bg-green-500/50"></div>
                    <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                      <span className="text-xs">Other Apps</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-1/2">
                    <div className="h-8 w-0.5 bg-green-500/50"></div>
                    <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                      <span className="text-xs">Clients</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InfoComponent>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <InfoComponent
            icon={
              <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <Workflow className="w-6 h-6 text-green-400" />
              </div>
            }
            title="Event-Driven Architecture"
            description="Central event bus for cross-component communication"
            className="border-green-500 bg-neutral-800/50"
          >
            <div className="flex mt-4 justify-center">
              <div className="w-full max-w-xs">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-neutral-700 rounded-lg p-2 text-center">
                    <span className="text-xs">UI Events</span>
                  </div>
                  <div className="bg-neutral-700 rounded-lg p-2 text-center">
                    <span className="text-xs">App Events</span>
                  </div>
                  <div className="bg-neutral-700 rounded-lg p-2 text-center">
                    <span className="text-xs">Client Events</span>
                  </div>
                </div>
                <div className="h-8 w-0.5 flex-grow-0 bg-green-900 mx-auto"></div>
                <div className="bg-green-600/20 rounded-lg p-3 text-center border border-green-500/50">
                  <span className="text-sm">Central Event Bus</span>
                </div>
                <div className="flex gap-2 justify-between items-start">
                  <div className="flex flex-col items-center w-1/3">
                    <div className="h-8 w-0.5 bg-green-500/50"></div>
                    <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                      <span className="text-xs">Store Listeners</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-1/3">
                    <div className="h-8 w-0.5 bg-green-500/50"></div>
                    <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                      <span className="text-xs">Platform Listeners</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-1/3">
                    <div className="h-8 w-0.5 bg-green-500/50"></div>
                    <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                      <span className="text-xs">App Listeners</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InfoComponent>

          <InfoComponent
            icon={
              <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <Plug className="w-6 h-6 text-green-400" />
              </div>
            }
            title="Store Provider System"
            description="Centralized store management with dependency injection"
            className="border-green-500 bg-neutral-800/50"
          >
            <div className="flex mt-4 justify-center">
              <div className="relative w-full max-w-xs">
                <div className="bg-green-600/20 rounded-lg p-3 text-center border border-green-500/50">
                  <span className="text-sm">StoreProvider</span>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-neutral-700 rounded p-1 text-xs">
                      PlatformStore
                    </div>
                    <div className="bg-neutral-700 rounded p-1 text-xs">
                      AppStore
                    </div>
                    <div className="bg-neutral-700 rounded p-1 text-xs">
                      ExpressStore
                    </div>
                    <div className="bg-neutral-700 rounded p-1 text-xs">
                      WebSocketStore
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-between items-start mt-4">
                  <div className="flex flex-col items-center w-1/3">
                    <div className="h-8 w-0.5 bg-green-500/50"></div>
                    <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                      <span className="text-xs">IPC Handlers</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-1/3">
                    <div className="h-8 w-0.5 bg-green-500/50"></div>
                    <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                      <span className="text-xs">App Processes</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-1/3">
                    <div className="h-8 w-0.5 bg-green-500/50"></div>
                    <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                      <span className="text-xs">Platform Services</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InfoComponent>
        </div>

        <h4 className="text-lg font-semibold mb-6 text-green-400 flex items-center mt-12">
          <Zap className="w-5 h-5 mr-2" />
          Performance Optimizations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Memory Management - REVISED */}
          <div className="bg-neutral-800 p-5 rounded-lg border-t-4 border-green-500 transform transition-all hover:scale-101 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-3">
                <Cpu className="w-6 h-6 text-green-400" />
              </div>
              <h5 className="font-medium text-green-400">
                Multi-threaded Architecture
              </h5>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Isolated app processes</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Worker thread pooling</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Process crash isolation</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Parallel execution</span>
              </li>
            </ul>
          </div>

          {/* Store Management - REVISED */}
          <div className="bg-neutral-800 p-5 rounded-lg border-t-4 border-green-500 transform transition-all hover:scale-101 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-3">
                <Database className="w-6 h-6 text-green-400" />
              </div>
              <h5 className="font-medium text-green-400">Store Management</h5>
            </div>
            <div className="space-y-3">
              <div className="bg-neutral-700 rounded-lg p-2 text-sm flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Lazy store initialization</span>
              </div>
              <div className="bg-neutral-700 rounded-lg p-2 text-sm flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Dependency injection</span>
              </div>
              <div className="bg-neutral-700 rounded-lg p-2 text-sm flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Centralized state management</span>
              </div>
            </div>
          </div>

          {/* Communication Optimization - NEW */}
          <div className="bg-neutral-800 p-5 rounded-lg border-t-4 border-green-500 transform transition-all hover:scale-101 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-3">
                <ArrowDownUp className="w-6 h-6 text-green-400" />
              </div>
              <h5 className="font-medium text-green-400">
                Communication Optimization
              </h5>
            </div>
            <div className="space-y-3">
              <div className="bg-neutral-700 rounded-lg p-2 text-sm flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Message batching</span>
              </div>
              <div className="bg-neutral-700 rounded-lg p-2 text-sm flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Efficient IPC channels</span>
              </div>
              <div className="bg-neutral-700 rounded-lg p-2 text-sm flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Targeted event routing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Caching Strategies - REVISED */}
        <InfoComponent
          icon={<Clock className="w-6 h-6 text-green-400" />}
          title="Data Management Strategy"
          description="Optimized data flow and storage across the system"
          className="border-green-500 bg-neutral-800/50 mt-6"
        >
          <div className="pt-6 flex flex-col justify-center items-center">
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col items-center">
                <div className="bg-green-600/20 rounded-lg p-2 text-center border border-green-500/50 w-full">
                  <span className="text-sm">UI Data</span>
                </div>
                <ArrowDown className="text-green-500 my-2" />
                <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                  <span className="text-sm">IPC Handlers</span>
                </div>
                <ArrowDown className="text-green-500 my-2" />
                <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                  <span className="text-sm">Store Layer</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-green-600/20 rounded-lg p-2 text-center border border-green-500/50 w-full">
                  <span className="text-sm">App Data</span>
                </div>
                <ArrowDown className="text-green-500 my-2" />
                <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                  <span className="text-sm">AppProcessStore</span>
                </div>
                <ArrowDown className="text-green-500 my-2" />
                <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                  <span className="text-sm">AppStore</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-green-600/20 rounded-lg p-2 text-center border border-green-500/50 w-full">
                  <span className="text-sm">Client Data</span>
                </div>
                <ArrowDown className="text-green-500 my-2" />
                <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                  <span className="text-sm">Platform Stores</span>
                </div>
                <ArrowDown className="text-green-500 my-2" />
                <div className="bg-neutral-700 rounded-lg p-2 text-center w-full">
                  <span className="text-sm">Store Layer</span>
                </div>
              </div>
            </div>
          </div>
        </InfoComponent>
      </div>

      {/* Technical Highlights */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-800 p-3 rounded-lg text-center transform transition-all hover:scale-102 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-2">
            <Zap className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">~5ms</div>
          <div className="text-xs text-neutral-400">Avg Response Time</div>
        </div>

        <div className="bg-neutral-800 p-3 rounded-lg text-center transform transition-all hover:scale-102 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-2">
            <ArrowDownUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">99.9%</div>
          <div className="text-xs text-neutral-400">Uptime</div>
        </div>

        <div className="bg-neutral-800 p-3 rounded-lg text-center transform transition-all hover:scale-102 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-2">
            <Database className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">100+</div>
          <div className="text-xs text-neutral-400">Apps Supported</div>
        </div>

        <div className="bg-neutral-800 p-3 rounded-lg text-center transform transition-all hover:scale-102 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-2">
            <Cpu className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">~2%</div>
          <div className="text-xs text-neutral-400">CPU Usage</div>
        </div>
      </div>
    </div>
  );
};
