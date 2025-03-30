import { FC } from "react"
import { IconGithub } from "../../../../components/assets/icons"
import { CodeBox } from "../CodeComponent"

const ZustandStateCode = `import { create } from 'zustand';

interface SettingsState {
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    screensaverType: string;
  };
  updatePreferences: (newPrefs: Partial<SettingsState['preferences']>) => void;
  updateCurrentView: (view: AppView) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  preferences: {
    theme: 'system',
    notifications: true,
    screensaverType: 'clock'
  },
  updatePreferences: (newPrefs) => set((state) => ({
    preferences: { ...state.preferences, ...newPrefs }
  })),
  updateCurrentView: (view) => set((state) => ({
    preferences: {
      ...state.preferences,
      currentView: view
    }
  }))
}));`;

const WebSocketCode = `export class WebSocketManager {
  private socket: WebSocket | null = null;
  private listeners: Array<(message: any) => void> = [];
  private reconnectAttempts = 0;
  private url: string = '';

  connect(url: string): void {
    this.url = url;
    this.socket = new WebSocket(url);
    
    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.notifyListeners(data);
    };
    
    this.socket.onclose = () => {
      if (this.reconnectAttempts < 5) {
        setTimeout(() => this.reconnect(), 1000 * Math.pow(2, this.reconnectAttempts));
        this.reconnectAttempts++;
      }
    };
  }
  
  async send(message: any): Promise<void> {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }
  
  private notifyListeners(message: any): void {
    this.listeners.forEach(listener => listener(message));
  }
}`;

const ScreenSaverCode = `const ScreenSaverWrapper: React.FC = () => {
  const { screensaverType } = useSettingsStore((state) => state.preferences);
  const [isActive, setIsActive] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start screen saver after inactivity
  useEffect(() => {
    if (isDismissed) return;
    
    inactivityTimeoutRef.current = setTimeout(() => {
      setIsActive(true);
    }, 60000); // 1 minute of inactivity
    
    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [isActive, isDismissed]);

  // Render appropriate screensaver based on settings
  const renderScreenSaver = () => {
    switch (screensaverType) {
      case 'clock':
        return <DigitalClock />;
      case 'logo':
        return <BrandLogo />;
      default:
        return <DarkScreen />;
    }
  };

  return (
    <div 
      className={\`fixed inset-0 z-50 transition-opacity duration-1000 \${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }\`}
    >
      {renderScreenSaver()}
    </div>
  );
};`;

const AppTrayCode = `const AppTrayButton: React.FC<{ app: AppInfo }> = ({ app }) => {
  const { getAppIcon } = useAppStore();
  const { updateCurrentView } = useSettingsStore();
  const [appIcon, setAppIcon] = useState<string>("");

  useEffect(() => {
    // Load app icon asynchronously
    const loadAppIcon = async () => {
      const iconUrl = await getAppIcon(app);
      setAppIcon(iconUrl);
    };
    
    loadAppIcon();
  }, [app, getAppIcon]);

  const handleAppLaunch = () => {
    updateCurrentView({
      name: app.name,
      enabled: true,
      running: true,
      timeStarted: Date.now(),
      prefIndex: 0
    });
  };

  return (
    <Button 
      onClick={handleAppLaunch} 
      className="w-24 h-24 m-2 flex flex-col items-center justify-center rounded-xl hover:bg-gray-700/30"
    >
      <img 
        src={appIcon} 
        alt={app.name} 
        className="w-12 h-12 mb-2" 
      />
      <span className="text-sm text-center">{app.manifest?.label || app.name}</span>
    </Button>
  );
};`;

const SettingsComponentCode = `export const SettingsBooleanComponent: React.FC<{
  setting: {
    key: string;
    label: string;
    description?: string;
    value: boolean;
    disabled?: boolean;
  };
  onChange: (value: boolean) => void;
}> = ({ setting, onChange }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h3 className="text-lg font-medium">{setting.label}</h3>
        {setting.description && (
          <p className="text-sm text-gray-500">{setting.description}</p>
        )}
      </div>
      
      <button
        disabled={setting.disabled}
        onClick={() => onChange(!setting.value)}
        className={\`w-14 h-8 rounded-full relative transition-colors \${
          setting.value ? 'bg-blue-500' : 'bg-gray-300'
        }\`}
      >
        <span 
          className={\`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform \${
            setting.value ? 'translate-x-7' : 'translate-x-1'
          }\`} 
        />
      </button>
    </div>
  );
};`;

export const ClientSection: FC = () => {
  return (
    <div className="bg-neutral-900 border-l-4 border-blue-500 p-6 rounded-lg mt-2">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">Client Technical Implementation</h3>
      
      <div className="mt-8 flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">
              Smart State Management with Zustand
            </h4>
            <p className="mb-4">
              DeskThing client uses Zustand for state management, providing a lightweight yet powerful 
              solution with TypeScript integration. This enables type-safe state updates and simplified 
              component access to global state without complex providers.
            </p>
          </div>
          <div className="md:w-1/2 transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={ZustandStateCode} forceOpen />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">
              Real-time Communication with WebSockets
            </h4>
            <p className="mb-4">
              The client maintains a persistent connection to the server using WebSockets, 
              enabling real-time updates and interactions. The WebSocketManager handles 
              connection management, automatic reconnection with exponential backoff, and 
              message distribution to registered listeners.
            </p>
          </div>
          <div className="md:w-1/2 transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={WebSocketCode} forceOpen />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">
              Elegant Screen Saver Implementation
            </h4>
            <p className="mb-4">
              DeskThing includes a sophisticated screen saver system that activates after 
              a period of inactivity. The implementation uses React hooks for state management 
              and cleanup, with smooth transitions and support for multiple screen saver types 
              that can be configured in settings.
            </p>
          </div>
          <div className="md:w-1/2 transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={ScreenSaverCode} forceOpen />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">
              App Tray for Quick Access
            </h4>
            <p className="mb-4">
              The App Tray provides quick access to installed applications with a clean, 
              responsive interface. Each app button asynchronously loads its icon and 
              provides visual feedback on interaction, creating a native-like experience 
              in the browser.
            </p>
          </div>
          <div className="md:w-1/2 transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={AppTrayCode} forceOpen />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">
              Settings Management with Type Safety
            </h4>
            <p className="mb-4">
              DeskThing's settings components are fully typed with TypeScript, ensuring 
              type safety throughout the application. This component demonstrates the 
              toggle switch UI with proper accessibility support, visual feedback, and 
              clean integration with the settings system.
            </p>
          </div>
          <div className="md:w-1/2 transform hover:translate-y-[-8px] transition-transform duration-300 shadow-xl">
            <CodeBox code={SettingsComponentCode} forceOpen />
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <a 
            href="https://github.com/ItsRiprod/DeskThing/tree/main/DeskThingClient" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-6 py-3 text-base font-medium bg-neutral-800/50 border border-neutral-700 rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:border-blue-500 transition-all duration-300"
          >
            <IconGithub />
            View Client on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
