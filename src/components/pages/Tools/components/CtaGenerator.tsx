import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Copy, Check, Megaphone } from 'lucide-react';
import toast from 'react-hot-toast';

type CtaGoal = 'Buy' | 'SignUp' | 'LearnMore' | 'Download' | 'Contact';
type CtaTone = 'Urgent' | 'Professional' | 'Friendly' | 'Playful';

export default function CtaGenerator() {
    const [goal, setGoal] = useState<CtaGoal>('Buy');
    const [tone, setTone] = useState<CtaTone>('Urgent');
    const [productName, setProductName] = useState('Premium Membership');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [ctas, setCtas] = useState<string[]>([]);

    const ctaTemplates: Record<CtaGoal, Record<CtaTone, string[]>> = {
        Buy: {
            Urgent: [
                'Buy Now & Save 50% Today!',
                'Claim Your Limited-Time Offer Now',
                'Hurry! Grab Your [Product] Before It Sells Out',
                'Get Instant Access [Product] - Only 3 Left!',
            ],
            Professional: [
                'Secure Your [Product] License Today',
                'Invest in Premium Growth Now',
                'Complete Your Secure Purchase',
                'Yes, Upgrade to [Product] Corporate',
            ],
            Friendly: [
                'Ready to Start? Purchase [Product]',
                'Let\'s Get Started - Order Today',
                'Join Us & Try [Product] Risk-Free',
                'Treat Yourself - Grab [Product] Now',
            ],
            Playful: [
                'Unleash the Magic - Get [Product]!',
                'Yes, I Want to Be Awesome - Buy Now',
                'Ready to Rock? Secure Your Seat!',
                'Tap Here to Change Your Workflow Forever',
            ]
        },
        SignUp: {
            Urgent: [
                'Join Today Only & Lock in 2026 Prices!',
                'Register Now - Event Closes in 2 Hours',
                'Claim Your Free Account Before Spots Fill!',
                'Sign Up Now & Start Coding Instantly',
            ],
            Professional: [
                'Create Your Enterprise Account',
                'Register for Premium Access Portal',
                'Unlock Industry Analytics - Sign Up Now',
                'Get Professional Onboarding',
            ],
            Friendly: [
                'Join Our Community Today!',
                'Sign Up Free - We Promise Never to Spam',
                'Let\'s Grow Together - Register Now',
                'Get Your Free Invites - Sign Up',
            ],
            Playful: [
                'Step Inside - Let\'s Make Something Cool!',
                'Unlock the Secret Vault - Sign Up Free',
                'Yes, Count Me In! Create Account',
                'Click Here to Join the Revolution',
            ]
        },
        LearnMore: {
            Urgent: [
                'Reveal the [Product] Secrets Now!',
                'Hurry! Read the Case Study Today',
                'Unlock Immediate Insights',
                'See the Data Before it Changes',
            ],
            Professional: [
                'Download Full Capabilities Statement',
                'Schedule a Live Technical Demo',
                'Read the Academic Whitepaper',
                'Explore Our Architecture Details',
            ],
            Friendly: [
                'Take a Quick Look Inside [Product]',
                'How it Works - Learn the Simple Steps',
                'Discover What We Can Build For You',
                'Want to Learn More? Read Our Story',
            ],
            Playful: [
                'Curious? Peek Behind the Curtain!',
                'Let\'s See What the Buzz is About',
                'Show Me the Magic Secrets!',
                'Find Out Why We Are Different',
            ]
        },
        Download: {
            Urgent: [
                'Download [Product] Instantly - Expires Tonight!',
                'Grab Your E-Book Copy Now',
                'Claim Your PDF Template Immediately',
                'Hurry! Download Your Free Assets',
            ],
            Professional: [
                'Download Corporate Case Study PDF',
                'Access High-Resolution Media Kit',
                'Get the Whitepaper Instantly',
                'Download Developer Integration Guide',
            ],
            Friendly: [
                'Grab Your Free Checklist Guide',
                'Download & Start Simplifying Your Week',
                'Get Your PDF Copy Sent to Inbox',
                'Get Your Assets - Ready to Use!',
            ],
            Playful: [
                'Snag Your Free Goodies Here!',
                'Yes, Give Me the Free E-book!',
                'Tap to Unwrap Your Free Assets',
                'Download & Let\'s Start the Party!',
            ]
        },
        Contact: {
            Urgent: [
                'Contact Our Engineers Now - Line Active!',
                'Schedule Your Emergency Call Today',
                'Call Us Immediately for Assistance',
                'Hurry! Book Your Strategy Session',
            ],
            Professional: [
                'Request a Formal Consultation Quote',
                'Connect with a Solution Architect',
                'Request Corporate Account Callbacks',
                'Submit an Enterprise RFQ Proposal',
            ],
            Friendly: [
                'Have a Question? Let\'s Chat!',
                'Get in Touch - We Love Hearing From You',
                'Drop Us a Quick Message',
                'Say Hello to Our Friendly Team',
            ],
            Playful: [
                'Let\'s Make Something Awesome - Call Us!',
                'Got Big Ideas? Let\'s Talk Shop!',
                'Shoot Us a Message - We Reply Fast!',
                'Ready to Jam? Get in Touch',
            ]
        }
    };

    const generateCtas = () => {
        const selectedList = ctaTemplates[goal][tone];
        const processed = selectedList.map(template => 
            template.replace(/\[Product\]/g, productName || 'Our Product')
        );
        setCtas(processed);
    };

    useEffect(() => {
        generateCtas();
    }, [goal, tone, productName]);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        toast.success('CTA copied to clipboard!');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Call-To-Action (CTA) Copy Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Create highly persuasive, conversion-focused landing page button labels and marketing headlines instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Product Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Product / Service Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="e.g. Premium Membership"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* CTA Goal */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Target Conversion Goal</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value as CtaGoal)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="Buy">Direct Purchase (E-commerce / SaaS)</option>
                            <option value="SignUp">Registration (Account Sign Up)</option>
                            <option value="LearnMore">Curiosity (Learn More / Demo)</option>
                            <option value="Download">Asset Access (Download PDF/Guide)</option>
                            <option value="Contact">Leads (Contact Us / Consult)</option>
                        </select>
                    </div>

                    {/* CTA Tone */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Copywriting Tone</label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value as CtaTone)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="Urgent">Urgent / High Friction FOMO</option>
                            <option value="Professional">Professional / High Trust B2B</option>
                            <option value="Friendly">Friendly / Inviting & Safe</option>
                            <option value="Playful">Playful / Curious & Bold</option>
                        </select>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Landing Page Copy:
                    </span>

                    <div className="grid grid-cols-1 gap-3">
                        {ctas.map((cta, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleCopy(cta, idx)}
                                className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition duration-200 flex justify-between items-center group gap-4"
                            >
                                <span className="text-xs text-neutral-200 font-semibold group-hover:text-white transition-colors leading-relaxed">
                                    {cta}
                                </span>
                                <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-indigo-600 group-hover:border-indigo-500 transition text-neutral-400 group-hover:text-white shrink-0">
                                    {copiedIndex === idx ? (
                                        <Check className="h-3.5 w-3.5" />
                                    ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
