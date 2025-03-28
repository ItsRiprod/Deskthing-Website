'use client';
import { 
  Rocket, 
  Zap, 
  Globe, 
  Shield, 
  Cpu, 
  Users, 
  Building, 
  Smartphone, 
  Cloud, 
  Code, 
  Bot, 
  Lightbulb, 
  MessageSquare,
  Box,
  GitPullRequest
} from 'lucide-react';
import { FeatureCardB } from '../components/FeatureCard'

interface PhilosophyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

interface RoadmapItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  status: string;
  statusColor: string;
  children: React.ReactNode;
  borderColor: string;
}

function RoadmapItem({ icon, title, description, iconColor }: RoadmapItemProps) {
  return (
    <div className="p-3 rounded-lg flex">
      <div className="mr-3 mt-1 flex-shrink-0">
        <div className={iconColor}>{icon}</div>
      </div>
      <div>
        <p className="font-medium  text-xl">{title}</p>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
}

function TimelineItem({ icon, title, status, statusColor, children, borderColor }: TimelineItemProps) {
  return (
    <div className={`relative pl-8 border-l-2 ${borderColor} pb-8`}>
      <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full ${borderColor.replace('border', 'bg')} flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className="text-3xl font-semibold mb-3 flex items-center">
        {title}
        <span className={`ml-3 text-sm ${statusColor} py-1 px-2 rounded-full`}>{status}</span>
      </h3>
      {children}
    </div>
  );
}

export default function WhereSection() {
  const philosophyItems = [
    {
      icon: <Cpu size={20} />,
      title: "Resource Efficiency",
      description: "All new features must maintain DeskThing's low resource footprint to ensure compatibility with older devices.",
      iconColor: "text-green-400"
    },
    {
      icon: <Shield size={20} />,
      title: "Security First",
      description: "Security considerations are prioritized in all development decisions to protect user data and systems.",
      iconColor: "text-blue-400"
    },
    {
      icon: <Users size={20} />,
      title: "Community Driven",
      description: "Development priorities are influenced by community feedback and contributions from developers of all skill levels.",
      iconColor: "text-purple-400"
    }
  ];

  const nearTermItems = [
    {
      icon: <Code size={18} />,
      title: "Enhanced SDK Documentation",
      description: "Comprehensive guides, tutorials, and API references for app developers",
      iconColor: "text-green-400"
    },
    {
      icon: <Smartphone size={18} />,
      title: "App Marketplace",
      description: "Centralized repository with ratings, reviews, and one-click installation",
      iconColor: "text-green-400"
    },
    {
      icon: <Zap size={18} />,
      title: "Performance Optimization",
      description: "Improved resource management for lower-end systems and devices",
      iconColor: "text-green-400"
    },
    {
      icon: <Lightbulb size={18} />,
      title: "Official App Expansion",
      description: "New productivity, monitoring, and entertainment applications",
      iconColor: "text-green-400"
    }
  ];

  const midTermItems = [
    {
      icon: <Cloud size={18} />,
      title: "Third-Party Integrations",
      description: "Native integration with popular productivity tools and services",
      iconColor: "text-blue-400"
    },
    {
      icon: <Smartphone size={18} />,
      title: "Cross-Device Synchronization",
      description: "Seamless experience across multiple connected devices",
      iconColor: "text-blue-400"
    },
    {
      icon: <Shield size={18} />,
      title: "Enhanced Security",
      description: "Advanced authentication and data protection features",
      iconColor: "text-blue-400"
    },
    {
      icon: <Code size={18} />,
      title: "Advanced Theming Engine",
      description: "Customizable interfaces with theme sharing capabilities",
      iconColor: "text-blue-400"
    }
  ];

  const longTermItems = [
    {
      icon: <Smartphone size={18} />,
      title: "Extended Device Support",
      description: "Compatibility with smartwatches, vehicles, TVs, and other displays",
      iconColor: "text-purple-400"
    },
    {
      icon: <Bot size={18} />,
      title: "AI Integration",
      description: "AI-powered customization and automation capabilities",
      iconColor: "text-purple-400"
    },
    {
      icon: <Users size={18} />,
      title: "Community Framework",
      description: "Enhanced tools for community contributions and collaboration",
      iconColor: "text-purple-400"
    },
    {
      icon: <Building size={18} />,
      title: "Enterprise Features",
      description: "Advanced capabilities for business and organizational use",
      iconColor: "text-purple-400"
    }
  ];

  const communityItems = [
    {
      icon: <MessageSquare size={18} />,
      title: "Feature Requests",
      description: "Submit ideas and vote on proposed features through GitHub issues or the community Discord server.",
      textColor: "text-green-400",
      iconColor: "text-green-400"
    },
    {
      icon: <GitPullRequest size={18} />,
      title: "Code Contributions",
      description: "Contribute directly to the codebase through pull requests for features, bug fixes, or documentation.",
      textColor: "text-blue-400",
      iconColor: "text-blue-400"
    },
    {
      icon: <Box size={18} />,
      title: "App Development",
      description: "Create and share your own apps to expand the ecosystem and inspire new use cases for the platform.",
      textColor: "text-purple-400",
      iconColor: "text-purple-400"
    }
  ];
  return (
    <div className="md:p-8 p-2 bg-neutral-900 rounded-lg h-full">
      <h2 className="text-3xl font-bold mb-6">Where is it going?</h2>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-2/3">
            <p className="text-lg leading-relaxed">
              DeskThing has an ambitious roadmap focused on expanding device compatibility, enhancing the app 
              ecosystem, and improving performance while maintaining stability. As an open-source project, 
              the development direction is shaped by both core team priorities and community contributions.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="p-6 bg-neutral-800 rounded-full">
              <Rocket size={80} className="text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Zap className="text-green-400 mr-3" size={28} />
            <h3 className="text-2xl font-semibold">Development Philosophy</h3>
          </div>
          <p className="mb-6">
            DeskThing development follows these core principles that guide all future enhancements:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {philosophyItems.map((item, index) => (
              <FeatureCardB key={index} {...item} />
            ))}
          </div>
        </div>
        
        <div className="mt-8 space-y-8">
          <TimelineItem 
            icon={<Globe size={16} />}
            title="Near Term: Ecosystem Expansion"
            status="In Progress"
            statusColor="bg-green-900 text-green-300"
            borderColor="border-green-500"
          >
            <p className="mb-4 text-gray-300">
              The current development focus is on expanding the app ecosystem and improving developer tools to 
              encourage community contributions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearTermItems.map((item, index) => (
                <RoadmapItem key={index} {...item} />
              ))}
            </div>
          </TimelineItem>
          
          <TimelineItem
            icon={<Cloud size={16} />}
            title="Mid Term: Integration & Performance"
            status="Planning"
            statusColor="bg-blue-900 text-blue-300"
            borderColor="border-blue-500"
          >
            <p className="mb-4 text-gray-300">
              Once the ecosystem is established, focus will shift to deeper integration with other tools and 
              services while enhancing the overall user experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {midTermItems.map((item, index) => (
                <RoadmapItem key={index} {...item} />
              ))}
            </div>
          </TimelineItem>
          
          <TimelineItem
            icon={<Building size={16} />}
            title="Long Term: Expanded Compatibility"
            status="Vision"
            statusColor="bg-purple-900 text-purple-300"
            borderColor="border-purple-500"
          >
            <p className="mb-4 text-gray-300">
              The long-term vision includes expanding beyond traditional devices and incorporating advanced 
              technologies to create a comprehensive ecosystem.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {longTermItems.map((item, index) => (
                <RoadmapItem key={index} {...item} />
              ))}
            </div>
          </TimelineItem>
        </div>
        
        <div className="mt-10  p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Community Involvement</h3>
          <p className="mb-4">
            The future of DeskThing is shaped by its community. There are several ways to influence the project's direction:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {communityItems.map((item, index) => (
              <FeatureCardB key={index} {...item} />
            ))}
          </div>
        </div>
        
        <div className="mt-8 bg-neutral-700 p-6 rounded-lg border-l-4 border-green-500">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <Lightbulb size={80} className="text-yellow-400" />
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-3">The Long-Term Vision</h3>
              <p>
                The ultimate goal for DeskThing is to create a sustainable ecosystem that not only reduces 
                electronic waste but also maximizes the functionality of aging technology across a wide range 
                of devices and use cases. By building a platform that's accessible to developers of all skill 
                levels, DeskThing aims to foster innovation and collaboration that extends beyond what any 
                single developer could create.
              </p>
              <p className="mt-3">
                As technology continues to evolve, DeskThing will adapt to incorporate new capabilities while 
                maintaining its core commitment to sustainability, accessibility, and user empowerment. The 
                vision is not just about software, but about creating a movement that changes how we think 
                about and use our devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
