import { useState } from 'react';
import { Check, X, Zap, Server, Cloud, Code, Shield, Globe } from 'lucide-react';

interface Feature {
  text: string;
  included: boolean;
}

interface DeploymentOption {
  name: string;
  icon: any;
  price: string;
  period: string;
  description: string;
  highlight: string;
  features: Feature[];
  cta: string;
  ctaLink: string;
  recommended: boolean;
  comingSoon?: boolean;
}

interface InfrastructureCost {
  provider: string;
  plan: string;
  monthlyPrice: string;
  guests: string;
  link: string;
}

interface ComparisonTool {
  name: string;
  logo: string;
  pricing: string;
  guestLimit: string;
  obs: boolean;
  perGuestFeeds: boolean;
  openSource: boolean;
  selfHost: boolean;
  latency: string;
  branding: string;
}

interface FAQ {
  q: string;
  a: string;
}

export default function PricingPage(){
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const deploymentOptions: DeploymentOption[] = [
    {
      name: "Self-Hosted",
      icon: <Server className="w-8 h-8" />,
      price: "Free",
      period: "Forever",
      description: "Deploy on your own infrastructure. Full control, zero cost.",
      highlight: "Most Popular",
      features: [
        { text: "Unlimited guests", included: true },
        { text: "Unlimited rooms", included: true },
        { text: "No time limits", included: true },
        { text: "Full source code access", included: true },
        { text: "Self-hosted on your VPS", included: true },
        { text: "Community support (GitHub/Discord)", included: true },
        { text: "Optional paid support available", included: true },
        { text: "No vendor lock-in", included: true }
      ],
      cta: "View Deployment Docs",
      ctaLink: "/docs",
      recommended: true
    },
    {
      name: "Cloud Starter",
      icon: <Cloud className="w-8 h-8" />,
      price: billingCycle === 'monthly' ? "$29" : "$24",
      period: billingCycle === 'monthly' ? "/month" : "/month (billed annually)",
      description: "Managed deployment on our infrastructure. Zero maintenance.",
      highlight: "Coming Soon",
      features: [
        { text: "Up to 10 concurrent guests", included: true },
        { text: "Unlimited rooms", included: true },
        { text: "99.9% uptime SLA", included: true },
        { text: "Automatic updates", included: true },
        { text: "Email support", included: true },
        { text: "CDN-powered delivery", included: true },
        { text: "Recording & storage (50GB)", included: true },
        { text: "Priority feature requests", included: false }
      ],
      cta: "Join Waitlist",
      ctaLink: "#waitlist",
      recommended: false,
      comingSoon: true
    },
    {
      name: "Cloud Pro",
      icon: <Zap className="w-8 h-8" />,
      price: billingCycle === 'monthly' ? "$99" : "$82",
      period: billingCycle === 'monthly' ? "/month" : "/month (billed annually)",
      description: "Advanced features for professional streamers and teams.",
      highlight: "Coming Soon",
      features: [
        { text: "Up to 50 concurrent guests", included: true },
        { text: "Unlimited rooms", included: true },
        { text: "99.99% uptime SLA", included: true },
        { text: "Automatic updates", included: true },
        { text: "Priority support (24/7)", included: true },
        { text: "Global CDN", included: true },
        { text: "Recording & storage (500GB)", included: true },
        { text: "Custom branding", included: true },
        { text: "API access", included: true },
        { text: "Advanced analytics", included: true }
      ],
      cta: "Join Waitlist",
      ctaLink: "#waitlist",
      recommended: false,
      comingSoon: true
    }
  ];

  const infrastructureCosts: InfrastructureCost[] = [
    {
      provider: "DigitalOcean",
      plan: "Droplet - 2GB RAM",
      monthlyPrice: "$12/mo",
      guests: "5-10 guests",
      link: "https://digitalocean.com"
    },
    {
      provider: "Hetzner",
      plan: "CX21",
      monthlyPrice: "€5.83/mo",
      guests: "5-10 guests",
      link: "https://hetzner.com"
    },
    {
      provider: "AWS EC2",
      plan: "t3.small",
      monthlyPrice: "$15/mo",
      guests: "5-10 guests",
      link: "https://aws.amazon.com"
    },
    {
      provider: "Linode",
      plan: "2GB Shared",
      monthlyPrice: "$12/mo",
      guests: "5-10 guests",
      link: "https://linode.com"
    }
  ];

  const comparisonTools: ComparisonTool[] = [
    {
      name: "OBSBridge (Self-Hosted)",
      logo: "🔗",
      pricing: "Free",
      guestLimit: "Unlimited",
      obs: true,
      perGuestFeeds: true,
      openSource: true,
      selfHost: true,
      latency: "Low (<500ms)",
      branding: "Full control"
    },
    {
      name: "StreamYard",
      logo: "🎬",
      pricing: "$20-$49/mo",
      guestLimit: "6-10",
      obs: false,
      perGuestFeeds: false,
      openSource: false,
      selfHost: false,
      latency: "Medium (1-3s)",
      branding: "Limited"
    },
    {
      name: "Restream Studio",
      logo: "📡",
      pricing: "$19-$99/mo",
      guestLimit: "8-10",
      obs: false,
      perGuestFeeds: false,
      openSource: false,
      selfHost: false,
      latency: "Medium (1-3s)",
      branding: "Watermark"
    },
    {
      name: "vMix Call",
      logo: "🎥",
      pricing: "$60-$350",
      guestLimit: "8+",
      obs: false,
      perGuestFeeds: true,
      openSource: false,
      selfHost: true,
      latency: "Low (<500ms)",
      branding: "Full control"
    },
    {
      name: "OBS + Google Meet",
      logo: "👥",
      pricing: "Free",
      guestLimit: "100",
      obs: true,
      perGuestFeeds: false,
      openSource: true,
      selfHost: false,
      latency: "High (2-5s)",
      branding: "Screen capture"
    }
  ];

  const faqs: FAQ[] = [
    {
      q: "Is OBSBridge really free?",
      a: "Yes! OBSBridge is 100% open-source under the MIT license. You can deploy it on your own infrastructure at no cost. We may offer managed cloud hosting in the future for those who prefer not to self-host."
    },
    {
      q: "What hardware do I need to self-host?",
      a: "A basic VPS with 2GB RAM and 2 CPU cores can handle 5-10 concurrent guests. For larger deployments, scale up to 4-8GB RAM. Most cloud providers offer suitable servers for $10-20/month."
    },
    {
      q: "Can I white-label OBSBridge?",
      a: "Absolutely! Since it's open-source, you can customize the branding, UI, and any other aspect of the software. Perfect for agencies or companies wanting to offer streaming services."
    },
    {
      q: "How does the managed cloud option differ?",
      a: "With managed cloud hosting (coming soon), we handle infrastructure, updates, scaling, and support. Self-hosting gives you full control but requires technical setup and maintenance."
    },
    {
      q: "What about TURN servers for NAT traversal?",
      a: "OBSBridge includes Coturn configuration out of the box. The self-hosting guide covers setting up TURN for reliable connections behind firewalls and NATs."
    },
    {
      q: "Can I contribute to the project?",
      a: "We'd love your contributions! Check out our GitHub repository for contribution guidelines, open issues, and feature requests."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Deployment Options</span>
          </div>
          <a href="/" className="text-gray-400 hover:text-gray-100 transition">← Back to Home</a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Open Source. <span className="bg-linear-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">Self-Hostable.</span>
            <br />
            Always Free.
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Deploy on your own infrastructure for free, or use our managed cloud service (coming soon).
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-gray-900 border border-gray-800 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition ${
                billingCycle === 'monthly' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md transition ${
                billingCycle === 'annual' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Annual
              <span className="ml-2 text-xs text-green-400">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {deploymentOptions.map((option, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl border ${
                  option.recommended 
                    ? 'bg-linear-to-b from-blue-500/10 to-purple-500/10 border-blue-500/50' 
                    : 'bg-gray-900 border-gray-800'
                } ${option.comingSoon ? 'opacity-75' : ''}`}
              >
                {option.highlight && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold ${
                    option.recommended 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {option.highlight}
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-blue-400">
                    {option.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{option.price}</span>
                    <span className="text-gray-400 text-sm ml-2">{option.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={option.ctaLink}
                  className={`block w-full py-3 text-center rounded-lg font-semibold transition ${
                    option.recommended
                      ? 'bg-linear-to-br from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50'
                      : option.comingSoon
                      ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-800 hover:bg-gray-750'
                  }`}
                >
                  {option.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Hosting Costs */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Self-Hosting Infrastructure Costs</h2>
            <p className="text-xl text-gray-400">
              Deploy OBSBridge on popular VPS providers. Estimated monthly costs:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructureCosts.map((infra, index) => (
              <a
                key={index}
                href={infra.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all"
              >
                <h3 className="text-xl font-bold mb-2">{infra.provider}</h3>
                <p className="text-gray-400 text-sm mb-3">{infra.plan}</p>
                <div className="text-2xl font-bold text-blue-400 mb-2">{infra.monthlyPrice}</div>
                <div className="text-sm text-gray-500">{infra.guests}</div>
              </a>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Additional Requirements
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Domain name: ~$10-15/year (optional)</li>
              <li>• SSL certificate: Free with Let's Encrypt</li>
              <li>• TURN server: Included in OBSBridge (uses Coturn)</li>
              <li>• Storage: Most VPS plans include 25-50GB SSD</li>
              <li>• Bandwidth: Most VPS plans include 1-5TB/month</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Compare</h2>
            <p className="text-xl text-gray-400">
              See how OBSBridge stacks up against other solutions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 font-semibold text-gray-300 min-w-50">Solution</th>
                  <th className="p-4 font-semibold text-gray-300">Pricing</th>
                  <th className="p-4 font-semibold text-gray-300">Guest Limit</th>
                  <th className="p-4 font-semibold text-gray-300">OBS Native</th>
                  <th className="p-4 font-semibold text-gray-300">Per-Guest Feeds</th>
                  <th className="p-4 font-semibold text-gray-300">Open Source</th>
                  <th className="p-4 font-semibold text-gray-300">Self-Host</th>
                  <th className="p-4 font-semibold text-gray-300">Latency</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTools.map((tool, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-800/50 ${
                      index === 0 ? 'bg-blue-500/5' : 'hover:bg-gray-900/30'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tool.logo}</span>
                        <span className={`font-semibold ${index === 0 ? 'text-blue-400' : 'text-gray-300'}`}>
                          {tool.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-gray-300">{tool.pricing}</td>
                    <td className="p-4 text-center text-gray-300">{tool.guestLimit}</td>
                    <td className="p-4 text-center">
                      {tool.obs ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {tool.perGuestFeeds ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {tool.openSource ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {tool.selfHost ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center text-gray-300 text-sm">{tool.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Deploy?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Get started with OBSBridge in minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/docs" 
              className="flex items-center gap-2 px-8 py-4 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              <Code className="w-5 h-5" />
              Deploy Now (Free)
            </a>
            <a 
              href="https://github.com" 
              className="flex items-center gap-2 px-8 py-4 bg-gray-800 border border-gray-700 rounded-lg font-semibold hover:bg-gray-750 transition"
            >
              <Globe className="w-5 h-5" />
              View Source Code
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
