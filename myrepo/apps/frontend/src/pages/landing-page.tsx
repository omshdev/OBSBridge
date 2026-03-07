import { useState } from 'react';
import { Github, Zap, Video, Users, Code, Server, Radio, ExternalLink, Check, X } from 'lucide-react';

interface Feature {
  icon: any;
  title: string;
  description: string;
}

interface ComparisonRow {
  feature: string;
  us: boolean;
  meet: boolean;
  streamyard: boolean;
}

interface Step {
  number: string;
  title: string;
  description: string;
  code: string;
}

interface Audience {
  title: string;
  description: string;
  icon: any;
}

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const features: Feature[] = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "Per-Guest Stream URLs",
      description: "Each guest gets a unique stream URL. Add them as individual Browser Sources in OBS for complete control."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Many-to-Many WebRTC",
      description: "Low-latency real-time communication using Selective Forwarding Unit (SFU) architecture."
    },
    {
      icon: <Radio className="w-6 h-6" />,
      title: "OBS-First Workflow",
      description: "Designed for creators who want to stay in OBS. No forced layouts, no platform switching."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Open Source & Self-Hostable",
      description: "Full control over your infrastructure. Deploy on your own servers, customize as needed."
    }
  ];

  const comparison: ComparisonRow[] = [
    { feature: "Clean per-guest feeds", us: true, meet: false, streamyard: false },
    { feature: "OBS-native integration", us: true, meet: false, streamyard: false },
    { feature: "No screen capture needed", us: true, meet: false, streamyard: true },
    { feature: "Self-hostable", us: true, meet: false, streamyard: false },
    { feature: "No account linking", us: true, meet: true, streamyard: false },
    { feature: "Open source", us: true, meet: false, streamyard: false },
    { feature: "Full layout control", us: true, meet: false, streamyard: false },
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Create a Room",
      description: "Launch a new streaming room with a single click. Get your unique room ID instantly.",
      code: "curl -X POST /api/rooms"
    },
    {
      number: "02",
      title: "Invite Guests",
      description: "Share a simple browser link. Guests join with camera & mic—no downloads required.",
      code: "https://your-host/room/abc123"
    },
    {
      number: "03",
      title: "Add to OBS",
      description: "Copy each guest's stream URL into OBS as a Browser Source. Position and layer as needed.",
      code: "obs://stream/guest-1"
    },
    {
      number: "04",
      title: "Go Live",
      description: "Stream directly from OBS to YouTube, Twitch, or any RTMP platform. You're in control.",
      code: "rtmp://youtube.com/live"
    }
  ];

  const audiences: Audience[] = [
    {
      title: "Streamers",
      description: "YouTube and Twitch creators who want professional multi-guest streams without leaving OBS.",
      icon: <Radio className="w-8 h-8" />
    },
    {
      title: "Podcasters",
      description: "Audio and video podcasters who need precise control over guest positioning and mixing.",
      icon: <Video className="w-8 h-8" />
    },
    {
      title: "Developers",
      description: "Engineers interested in WebRTC, SFU architecture, and open-source streaming infrastructure.",
      icon: <Code className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              OBSBridge
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-gray-100 transition">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-gray-100 transition">How It Works</a>
            <a href="#open-source" className="text-gray-400 hover:text-gray-100 transition">Open Source</a>
            <a href="https://github.com/OmSharma42306/OBSBridge" className="flex items-center gap-2 text-gray-400 hover:text-gray-100 transition">
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-8">
              <Zap className="w-4 h-4" />
              Open-source WebRTC streaming for creators
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Invite guests.
              <br />
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Stream with OBS.
              </span>
              <br />
              No lock-in.
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              WebRTC guests join via browser → Individual stream URLs → OBS layers → YouTube Live.
              <br />
              Stay in control. Stay in OBS.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://github.com/OmSharma42306/OBSBridge" 
                className="group flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                <Github className="w-5 h-5" />
                View on GitHub
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#how-it-works" 
                className="flex items-center gap-3 px-8 py-4 bg-gray-800 border border-gray-700 rounded-lg font-semibold hover:bg-gray-750 transition"
              >
                <Server className="w-5 h-5" />
                Self-host in minutes
              </a>
            </div>

            {/* Flow Diagram */}
            <div className="mt-20 p-8 bg-gray-900 border border-gray-800 rounded-2xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-30 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <Video className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-sm font-mono text-gray-400">Browser</p>
                </div>
                
                <div className="text-gray-600">→</div>
                
                <div className="flex-1 min-w-30 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Server className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-sm font-mono text-gray-400">SFU Server</p>
                </div>
                
                <div className="text-gray-600">→</div>
                
                <div className="flex-1 min-w-30 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center">
                    <Radio className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-sm font-mono text-gray-400">OBS Studio</p>
                </div>
                
                <div className="text-gray-600">→</div>
                
                <div className="flex-1 min-w-30 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center">
                    <Video className="w-8 h-8 text-red-400" />
                  </div>
                  <p className="text-sm font-mono text-gray-400">YouTube</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Four simple steps to professional multi-guest streaming</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group p-8 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-5xl font-bold text-gray-800 group-hover:text-blue-500/30 transition">
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    <div className="p-3 bg-gray-950 border border-gray-800 rounded-lg font-mono text-sm text-blue-400">
                      {step.code}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Not Google Meet or StreamYard?</h2>
            <p className="text-xl text-gray-400">Built for creators who demand control</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 font-semibold text-gray-300">Feature</th>
                  <th className="p-4 font-semibold text-blue-400">OBSBridge</th>
                  <th className="p-4 font-semibold text-gray-500">Google Meet</th>
                  <th className="p-4 font-semibold text-gray-500">StreamYard</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/30">
                    <td className="p-4 text-gray-300">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.us ? (
                        <Check className="w-6 h-6 text-green-400 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.meet ? (
                        <Check className="w-6 h-6 text-gray-600 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.streamyard ? (
                        <Check className="w-6 h-6 text-gray-600 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Features</h2>
            <p className="text-xl text-gray-400">Everything you need for professional streaming</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                className={`p-6 rounded-xl border transition-all cursor-pointer ${
                  activeFeature === index 
                    ? 'bg-linear-to-br from-blue-500/10 to-purple-500/10 border-blue-500/50' 
                    : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  activeFeature === index ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-400'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Who It's For</h2>
            <p className="text-xl text-gray-400">Built for creators and developers who value control</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {audiences.map((audience, index) => (
              <div key={index} className="p-8 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-400">
                  {audience.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{audience.title}</h3>
                <p className="text-gray-400">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section id="open-source" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-8">
            <Code className="w-4 h-4" />
            100% Open Source
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Community-Driven Development</h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Built by creators, for creators. Every line of code is open, auditable, and improvable.
            <br />
            Self-host on your infrastructure. Customize to your needs. No vendor lock-in.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg font-mono text-sm">
              <span className="text-gray-500">License:</span> <span className="text-blue-400">MIT</span>
            </div>
            <div className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg font-mono text-sm">
              <span className="text-gray-500">Stars:</span> <span className="text-yellow-400">★ 2.4k</span>
            </div>
            <div className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg font-mono text-sm">
              <span className="text-gray-500">Forks:</span> <span className="text-green-400">⑂ 180</span>
            </div>
            <div className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg font-mono text-sm">
              <span className="text-gray-500">Contributors:</span> <span className="text-purple-400">👥 42</span>
            </div>
          </div>

          <div className="p-8 bg-gray-950 border border-gray-800 rounded-xl text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-gray-500 font-mono ml-4">docker-compose.yml</span>
            </div>
            <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
{`version: '3.8'
services:
  sfu:
    image: OBSBridge/sfu:latest
    ports:
      - "3000:3000"
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - TURN_SECRET=your-secret-here
  
  web:
    image: OBSBridge/web:latest
    ports:
      - "80:80"
    depends_on:
      - sfu`}
            </pre>
          </div>

          <div className="mt-12">
            <a 
              href="https://github.com/OmSharma42306/OBSBridge" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              <Github className="w-5 h-5" />
              Star on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Radio className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">OBSBridge</span>
              </div>
              <p className="text-gray-400 text-sm">
                Open-source WebRTC streaming for OBS creators.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-gray-100 transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-gray-100 transition">How It Works</a></li>
                <li><a href="#open-source" className="hover:text-gray-100 transition">Open Source</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://docs.example.com" className="hover:text-gray-100 transition">Documentation</a></li>
                <li><a href="https://github.com" className="hover:text-gray-100 transition">GitHub</a></li>
                <li><a href="#" className="hover:text-gray-100 transition">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-gray-100 transition">Discord</a></li>
                <li><a href="https://github.com/issues" className="hover:text-gray-100 transition">GitHub Issues</a></li>
                <li><a href="#" className="hover:text-gray-100 transition">Discussions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 OBSBridge. Released under MIT License.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://github.com" className="text-gray-400 hover:text-gray-100 transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-100 transition text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-gray-100 transition text-sm">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
