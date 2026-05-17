import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Braces, ShieldCheck, Link2, Binary, FileText, ArrowRight, ArrowLeft, Layout, Layers,
    Image, Palette, Type, AlignLeft, FileCode, Code, Database, Terminal, Clock,
    Calendar, Search, Sliders, X,
    Eye
} from 'lucide-react';
import { useSEO } from './hooks/useSEO';

type ToolCategory = 'Developer' | 'Finance' | 'Invoices' | 'Marketing' | 'SEO';

interface ToolCard {
    id: string;
    title: string;
    description: string;
    icon: any;
    accent: string;
    category: ToolCategory;
}

export default function ToolsHub() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);

    // Inject ultimate SEO parameters for maximum online indexing and virality
    useSEO({
        title: '65 Free Developer, SEO, Copywriting, Finance & Business Tools | WebnexFusion',
        description: 'Accelerate your digital workflow with WebnexFusion 65 free online utilities! Includes HTML Meta Tag and Sitemap generators, Robots.txt editors, SERP visualizers, YouTube keyword tag managers, JSON prettifiers, secure password makers, SVG waves creators, CSS glassmorphism, EMI/SIP/Salary calculators, and 4 high-end print-ready PDF invoice templates.',
        keywords: '65 free online tools, seo meta tag generator, robots.txt crawl creator, xml sitemap index builder, google SERP mockup preview, youtube tag suggestions CTR, linkedin engagement formatter text, html to markdown translator, word counter syllable readability calculator, standard canonical url generator, open og tags generator, twitter visual mockup post, free developer tools, emi sip calculators, freelance invoices bill generator pdf'
    });

    const tools: ToolCard[] = [
        {
            id: 'json-formatter',
            title: 'JSON Formatter & Validator',
            description: 'Validate, clean, format, or minify complex JSON files and objects in real-time.',
            icon: Braces,
            accent: 'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30',
            category: 'Developer'
        },
        {
            id: 'password-generator',
            title: 'Password Generator',
            description: 'Instantly generate cryptographically random, custom, and highly secure passwords.',
            icon: ShieldCheck,
            accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
            category: 'Developer'
        },
        {
            id: 'url-encoder',
            title: 'URL Encoder / Decoder',
            description: 'Safely encode standard text to URL-compliant formats or decode them back to plain text.',
            icon: Link2,
            accent: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
            category: 'Developer'
        },
        {
            id: 'base64-converter',
            title: 'Base64 String Converter',
            description: 'Encode plaintext data to standard Base64 hashes, or decode Base64 strings to readable text.',
            icon: Binary,
            accent: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
            category: 'Developer'
        },
        {
            id: 'medium-prompt',
            title: 'Medium Prompt Generator',
            description: 'Generate viral, highly opinionated, SEO-optimized, and policy-compliant writing prompts.',
            icon: FileText,
            accent: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
            category: 'SEO'
        },
        {
            id: 'glassmorphism-generator',
            title: 'CSS Glassmorphism Generator',
            description: 'Design beautiful, modern frosted glass containers with customized blur, opacity, borders and copy CSS/Tailwind rules.',
            icon: Layout,
            accent: 'from-sky-500/20 to-indigo-500/20 text-sky-400 border-sky-500/30',
            category: 'Developer'
        },
        {
            id: 'wave-generator',
            title: 'SVG Wave Generator',
            description: 'Create layered, organic SVG section divider curves and waves. Randomize paths and copy optimized vector XML code.',
            icon: Layers,
            accent: 'from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/30',
            category: 'Developer'
        },
        {
            id: 'image-converter',
            title: 'Image Converter & Compressor',
            description: 'Convert and compress PNG, JPG, or WebP image formats client-side instantly with customizable quality.',
            icon: Image,
            accent: 'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30',
            category: 'SEO'
        },
        {
            id: 'color-palette-generator',
            title: 'Color Palette Generator',
            description: 'Create cohesive color schemes, randomize custom palettes, and lock specific hex codes instantly.',
            icon: Palette,
            accent: 'from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30',
            category: 'Developer'
        },
        {
            id: 'case-converter',
            title: 'Case Converter & Counter',
            description: 'Change string casing styles to Sentence case, camelCase, snake_case, PascalCase, and get live word counts.',
            icon: Type,
            accent: 'from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30',
            category: 'Developer'
        },
        {
            id: 'lorem-ipsum-generator',
            title: 'Lorem Ipsum Generator',
            description: 'Draft customized quantities of dummy text copy, list items, or words wrapped in HTML tags for mock interfaces.',
            icon: AlignLeft,
            accent: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
            category: 'Developer'
        },
        {
            id: 'markdown-previewer',
            title: 'Markdown Live Previewer',
            description: 'Format markdown syntax into clean structures, inspect live previews, and copy the compiled HTML code directly.',
            icon: FileCode,
            accent: 'from-fuchsia-500/20 to-purple-500/20 text-fuchsia-400 border-fuchsia-500/30',
            category: 'SEO'
        },
        {
            id: 'text-to-html',
            title: 'Text to HTML Converter',
            description: 'Convert plain text copy, lists, and links into perfectly structured HTML tags automatically.',
            icon: FileText,
            accent: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
            category: 'Developer'
        },
        {
            id: 'html-to-react',
            title: 'HTML to React Converter',
            description: 'Translate raw HTML code structures into React JSX components with styling objects and tag closures.',
            icon: Code,
            accent: 'from-indigo-500/20 to-violet-500/20 text-indigo-400 border-indigo-500/30',
            category: 'Developer'
        },
        {
            id: 'jwt-decoder',
            title: 'JWT Token Decoder',
            description: 'Split and unpack JSON Web Tokens safely. Read algorithm metadata and expiration status claims client-side.',
            icon: ShieldCheck,
            accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
            category: 'Developer'
        },
        {
            id: 'sql-formatter',
            title: 'SQL Query Formatter',
            description: 'Beautify messy raw database queries. Auto-capitalizes major SQL keywords and structures commands.',
            icon: Database,
            accent: 'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30',
            category: 'Developer'
        },
        {
            id: 'shadow-generator',
            title: 'CSS Box-Shadow Generator',
            description: 'Design beautiful outset or inset box shadows visually using sliders and export clean CSS rule declarations.',
            icon: Layout,
            accent: 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30',
            category: 'Developer'
        },
        {
            id: 'tailwind-builder',
            title: 'Tailwind Class Builder',
            description: 'Visually style elements by toggling layout classes and automatically generate compiled class lists.',
            icon: Layers,
            accent: 'from-sky-500/20 to-indigo-500/20 text-sky-400 border-sky-500/30',
            category: 'Developer'
        },
        {
            id: 'api-viewer',
            title: 'API Response Viewer',
            description: 'Simulate API endpoint response payloads client-side. Test CORS-enabled public APIs in real-time.',
            icon: Terminal,
            accent: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
            category: 'Developer'
        },
        {
            id: 'cron-parser',
            title: 'Cron Expression Parser',
            description: 'Decode timing schedules and cron strings into plain, easy human-readable English descriptions.',
            icon: Clock,
            accent: 'from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/30',
            category: 'Developer'
        },
        {
            id: 'age-calculator',
            title: 'Age Calculator',
            description: 'Determine your exact age down to months, days, and hours, and track a live countdown to your next birthday.',
            icon: Calendar,
            accent: 'from-blue-500/20 to-teal-500/20 text-blue-400 border-blue-500/30',
            category: 'Finance'
        },
        {
            id: 'sip-calculator',
            title: 'SIP Mutual Fund Calculator',
            description: 'Estimate future maturity wealth and accumulated returns for Systematic Investment Plans (SIP).',
            icon: Clock,
            accent: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30',
            category: 'Finance'
        },
        {
            id: 'emi-calculator',
            title: 'EMI Loan Calculator',
            description: 'Check monthly loan EMIs, total interest payable, and amortization splits using interactive sliders.',
            icon: Database,
            accent: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
            category: 'Finance'
        },
        {
            id: 'gst-calculator',
            title: 'GST Tax Calculator',
            description: 'Add or remove GST tax slabs. Formats CGST, SGST, Net and Gross invoice pricing dynamically.',
            icon: Braces,
            accent: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
            category: 'Finance'
        },
        {
            id: 'percentage-calculator',
            title: 'Percentage Calculator',
            description: 'Solve portions, ratios, fraction metrics, and percentage growth/change margins instantly.',
            icon: Binary,
            accent: 'from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30',
            category: 'Finance'
        },
        {
            id: 'fd-calculator',
            title: 'FD Deposit Calculator',
            description: 'Estimate Fixed Deposit maturity proceeds and compound interest earned across bank deposit tenures.',
            icon: Layers,
            accent: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
            category: 'Finance'
        },
        {
            id: 'salary-calculator',
            title: 'Take-Home Salary Calculator',
            description: 'Calculate net monthly in-hand take-home salary and estimate income tax slab cuts under the new tax regime.',
            icon: FileText,
            accent: 'from-indigo-500/20 to-violet-500/20 text-indigo-400 border-indigo-500/30',
            category: 'Finance'
        },
        {
            id: 'discount-calculator',
            title: 'Discount & Savings Calculator',
            description: 'Calculate final prices, stack dual discounts, and review absolute retail savings instantly.',
            icon: Palette,
            accent: 'from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30',
            category: 'Finance'
        },
        {
            id: 'bmi-calculator',
            title: 'BMI Health Calculator',
            description: 'Calculate Body Mass Index (BMI) body fat profiles and categorize weight categories with visual scale lines.',
            icon: Type,
            accent: 'from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30',
            category: 'Finance'
        },
        {
            id: 'loan-eligibility',
            title: 'Loan Eligibility Calculator',
            description: 'Assess maximum bank borrowing limits and loan affordability thresholds based on FOIR rules.',
            icon: ShieldCheck,
            accent: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
            category: 'Finance'
        },
        {
            id: 'invoice-generator',
            title: 'Invoice & Bill PDF Generator',
            description: 'Draft professional invoice letterheads, manage line items dynamically, calculate GST breakdown, and print / save as PDF.',
            icon: FileText,
            accent: 'from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30',
            category: 'Invoices'
        },
        {
            id: 'gst-invoice',
            title: 'GST Tax Invoice Generator',
            description: 'Generate B2B/B2C GST-compliant tax invoices with dynamic CGST, SGST, IGST calculations and HSN codes.',
            icon: FileText,
            accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
            category: 'Invoices'
        },
        {
            id: 'freelance-invoice',
            title: 'Freelance Invoice Generator',
            description: 'Create hourly or flat-fee client billing invoices. Includes portfolio links and payment terms.',
            icon: FileText,
            accent: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
            category: 'Invoices'
        },
        {
            id: 'quote-generator',
            title: 'Price Quote & Proposal Generator',
            description: 'Draft professional price quotes, estimates, and project deliverables with client signature boxes.',
            icon: FileText,
            accent: 'from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30',
            category: 'Invoices'
        },
        {
            id: 'profit-margin',
            title: 'Profit Margin & Markup Calculator',
            description: 'Calculate net profit amount, markup ratios, and gross profit margin percentages instantly.',
            icon: Database,
            accent: 'from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30',
            category: 'Invoices'
        },
        {
            id: 'pricing-calculator',
            title: 'Target Product Pricing Calculator',
            description: 'Model wholesale and retail pricing models based on target margin rates and sales tax.',
            icon: Layers,
            accent: 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30',
            category: 'Invoices'
        },
        {
            id: 'break-even',
            title: 'Break-even Sales Calculator',
            description: 'Evaluate contribution margins and target sales units required to cover fixed company costs.',
            icon: Binary,
            accent: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
            category: 'Invoices'
        },
        {
            id: 'revenue-calculator',
            title: 'Revenue Earnings Calculator',
            description: 'Multiply pricing with sales quantities and estimate net business earnings subtracting refunds.',
            icon: Clock,
            accent: 'from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/30',
            category: 'Invoices'
        },
        {
            id: 'roi-calculator',
            title: 'Marketing ROI Calculator',
            description: 'Calculate net investment gains, absolute campaign profits, and annualized ROI percentages instantly.',
            icon: Clock,
            accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
            category: 'Marketing'
        },
        {
            id: 'cpm-calculator',
            title: 'CPM Campaign Calculator',
            description: 'Solve for ad campaign budget costs, target CPM rates, or overall campaign impression volume.',
            icon: Clock,
            accent: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
            category: 'Marketing'
        },
        {
            id: 'cpc-calculator',
            title: 'CPC Campaign Calculator',
            description: 'Calculate marketing click volume, campaign budget costs, or click-through CPC rates.',
            icon: Clock,
            accent: 'from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30',
            category: 'Marketing'
        },
        {
            id: 'email-subject-tester',
            title: 'Email Subject Line Tester',
            description: 'Check email subject line character lengths, spam triggers, uppercase rules, and CTR scores.',
            icon: FileText,
            accent: 'from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30',
            category: 'SEO'
        },
        {
            id: 'cta-generator',
            title: 'Call-To-Action Copy Generator',
            description: 'Create high-converting landing page button labels and ad headers across diverse copy tones.',
            icon: FileText,
            accent: 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30',
            category: 'SEO'
        },
        {
            id: 'business-name-generator',
            title: 'SaaS & Agency Name Generator',
            description: 'Ideate professional brand corporate names and verify mock domain name extension availability.',
            icon: ShieldCheck,
            accent: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
            category: 'Marketing'
        },
        {
            id: 'slogan-generator',
            title: 'Brand Slogan & Tagline Generator',
            description: 'Generate catchy, memorable brand slogans and corporate taglines from seed keywords.',
            icon: FileText,
            accent: 'from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/30',
            category: 'Marketing'
        },
        {
            id: 'hashtag-generator',
            title: 'Social Media Hashtag Generator',
            description: 'Create viral Instagram, Twitter, and TikTok hashtags categorized across competition reach tiers.',
            icon: Code,
            accent: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30',
            category: 'SEO'
        },
        {
            id: 'utm-link-builder',
            title: 'UTM Campaign Link Builder',
            description: 'Build Google Analytics trackable web URLs with campaign source, medium, and term tracking parameters.',
            icon: Link2,
            accent: 'from-blue-500/20 to-teal-500/20 text-blue-400 border-blue-500/30',
            category: 'SEO'
        },
        {
            id: 'qr-code-generator',
            title: 'QR Code Graphic Generator',
            description: 'Encode links or text into custom-scaled high-resolution scannable QR Code raster or vector graphics.',
            icon: Layout,
            accent: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
            category: 'Marketing'
        },
        {
            id: 'meta-tags-generator',
            title: 'HTML Meta Tag Generator',
            description: 'Generate high-performance Meta keywords, robots indexing and author header tags for SEO ranking.',
            icon: FileText,
            accent: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
            category: 'SEO'
        },
        {
            id: 'seo-title-generator',
            title: 'SEO Article Title Generator',
            description: 'Ideate click-worthy, viral, and search-optimized meta titles based on target keywords.',
            icon: Type,
            accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
            category: 'SEO'
        },
        {
            id: 'slug-generator',
            title: 'URL Slug Cleaner & Generator',
            description: 'Convert messy article headers and page titles into lowercase, emoji-stripped URL slug links.',
            icon: Link2,
            accent: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
            category: 'SEO'
        },
        {
            id: 'robots-txt-generator',
            title: 'Robots.txt Crawl Directive Generator',
            description: 'Visually compile custom robots.txt directives and define allowed or disallowed site crawls.',
            icon: Terminal,
            accent: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
            category: 'SEO'
        },
        {
            id: 'sitemap-generator',
            title: 'XML Sitemap Index Builder',
            description: 'Compile valid static xml sitemaps to guide Google and Bing crawling pathways.',
            icon: Layers,
            accent: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
            category: 'SEO'
        },
        {
            id: 'open-graph-generator',
            title: 'Open Graph Meta Tag Generator',
            description: 'Create social share header tags (og:title, og:image) for LinkedIn, Facebook, and Slack previews.',
            icon: Layout,
            accent: 'from-sky-500/20 to-indigo-500/20 text-sky-400 border-sky-500/30',
            category: 'SEO'
        },
        {
            id: 'twitter-card-preview',
            title: 'Twitter X Card Preview Checker',
            description: 'Generate large-image summary card metadata and inspect live visual post feed mockups.',
            icon: Eye,
            accent: 'from-violet-500/20 to-fuchsia-500/20 text-violet-400 border-violet-500/30',
            category: 'SEO'
        },
        {
            id: 'keyword-density-checker',
            title: 'Keyword Density & Frequency Checker',
            description: 'Analyze article drafts, strip stopwords, and view primary keyword count densities.',
            icon: Code,
            accent: 'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30',
            category: 'SEO'
        },
        {
            id: 'word-counter',
            title: 'Word & Character Count Auditor',
            description: 'Audit total letters, words, sentence bounds, paragraphs, and estimate reading/speaking times.',
            icon: FileText,
            accent: 'from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30',
            category: 'SEO'
        },
        {
            id: 'readability-checker',
            title: 'SEO Readability Flesch Scale Checker',
            description: 'Verify copy reading ease levels using Flesch-Kincaid syllable analytics models.',
            icon: ShieldCheck,
            accent: 'from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30',
            category: 'SEO'
        },
        {
            id: 'serp-preview',
            title: 'Google SERP Snippet Visualizer',
            description: 'Check Google search meta title and description truncations on desktop or mobile previews.',
            icon: Eye,
            accent: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
            category: 'SEO'
        },
        {
            id: 'canonical-url-generator',
            title: 'Canonical URL Tag Generator',
            description: 'Generate link rel canonical absolute references to eliminate duplicate content Google penalties.',
            icon: Link2,
            accent: 'from-fuchsia-500/20 to-purple-500/20 text-fuchsia-400 border-fuchsia-500/30',
            category: 'SEO'
        },
        {
            id: 'youtube-tag-generator',
            title: 'YouTube Studio SEO Tag Generator',
            description: 'Extract search-targeted keyword tags to optimize YouTube video suggestions and rankings.',
            icon: Image,
            accent: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
            category: 'SEO'
        },
        {
            id: 'youtube-title-generator',
            title: 'YouTube Clickbait & CTR Title Generator',
            description: 'Ideate dramatic, curiosity-sparking, or search-optimized YouTube video headlines.',
            icon: Type,
            accent: 'from-indigo-500/20 to-violet-500/20 text-indigo-400 border-indigo-500/30',
            category: 'SEO'
        },
        {
            id: 'blog-title-generator',
            title: 'SEO Blog Post Topic Title Generator',
            description: 'Draft click-worthy informational, listicle, or problem-solving blog post headlines.',
            icon: FileText,
            accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
            category: 'SEO'
        },
        {
            id: 'linkedin-formatter',
            title: 'LinkedIn Engagement Post Formatter',
            description: 'Format raw drafts with scannable double linebreaks and converting headlines to bold unicode characters.',
            icon: AlignLeft,
            accent: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
            category: 'SEO'
        },
        {
            id: 'html-to-markdown',
            title: 'HTML to Markdown Compiler',
            description: 'Translate raw HTML codes and tags into simplified Markdown structural symbols.',
            icon: FileCode,
            accent: 'from-fuchsia-500/20 to-purple-500/20 text-fuchsia-400 border-fuchsia-500/30',
            category: 'SEO'
        }
    ];

    // Compute live count headers per categories
    const getCount = (cat: string) => {
        if (cat === 'All') return tools.length;
        return tools.filter(t => t.category === cat).length;
    };

    // Filter tools based on active state parameters
    const filteredTools = tools.filter((tool) => {
        const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
        const matchesSearch =
            tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categoryTabs = [
        { id: 'All', name: 'All Utilities' },
        { id: 'Developer', name: 'Developer Suite' },
        { id: 'Finance', name: 'Finance & Calculators' },
        { id: 'Invoices', name: 'Invoices & Business' },
        { id: 'Marketing', name: 'Marketing Suite' },
        { id: 'SEO', name: 'SEO & Content' }
    ];

    const ITEMS_PER_PAGE = 12;
    const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
    const paginatedTools = filteredTools.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#020617] text-white relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] grid-bg opacity-30 pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-4">
                        WebnexFusion Ultimate Tools
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                        Developer & Marketing Hub
                    </h1>
                    <p className="text-neutral-400 mt-4 text-base md:text-lg leading-relaxed">
                        A state-of-the-art suite of 65 production-grade online calculators, invoice systems, visual generators, and copywriting tools engineered to scale daily digital workflows.
                    </p>
                </div>

                {/* Filters & Search Control Bar */}
                <div className="space-y-6 mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search all 65 tools (e.g. JSON, CPC, Sitemap)..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full bg-black/45 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-xs text-white outline-none focus:border-indigo-500 transition"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Summary indicator */}
                        <div className="text-neutral-400 text-xs px-2 flex items-center gap-1.5 shrink-0">
                            <Sliders className="h-4 w-4 text-indigo-400" />
                            Showing <strong className="text-white">{filteredTools.length}</strong> of {tools.length} premium utilities
                        </div>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
                        {categoryTabs.map((tab) => {
                            const isActive = selectedCategory === tab.id;
                            const count = getCount(tab.id);
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setSelectedCategory(tab.id);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-200 flex items-center gap-2 ${isActive
                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)]'
                                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                                        }`}
                                >
                                    <span>{tab.name}</span>
                                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold ${isActive ? 'bg-white/25 text-white' : 'bg-white/10 text-neutral-400'
                                        }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Grid layout */}
                {filteredTools.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl max-w-xl mx-auto space-y-4">
                        <p className="text-base font-bold text-white">No tools match your criteria</p>
                        <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                            Try checking for spelling errors, clearing your search query, or switching the selected category filter tabs.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                                setCurrentPage(1);
                            }}
                            className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-2"
                        >
                            Reset Dashboard Filters
                        </button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedTools.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.id}
                                        to={`/resources/tools/${tool.id}`}
                                        className="group relative flex flex-col justify-between p-6 bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                {/* Icon */}
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.accent} border flex items-center justify-center`}>
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                {/* Category Tag */}
                                                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                                                    {tool.category}
                                                </span>
                                            </div>

                                            {/* Title & Desc */}
                                            <div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                                                    {tool.title}
                                                </h3>
                                                <p className="text-sm text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                                                    {tool.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Link Indicator */}
                                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                                            <span>Launch Utility</span>
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Pagination Bar */}
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                                <div className="text-xs text-neutral-400">
                                    Showing <strong className="text-white">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredTools.length)}</strong> to{' '}
                                    <strong className="text-white">{Math.min(currentPage * ITEMS_PER_PAGE, filteredTools.length)}</strong> of{' '}
                                    <strong className="text-white">{filteredTools.length}</strong> premium utilities
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Prev Button */}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="py-2 px-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-neutral-400 hover:text-white hover:border-white/20 disabled:opacity-40 disabled:hover:text-neutral-400 disabled:hover:border-white/10 transition-all flex items-center gap-1.5"
                                    >
                                        <ArrowLeft className="h-3.5 w-3.5" /> Prev
                                    </button>

                                    {/* Page Numbers */}
                                    {Array.from({ length: totalPages }, (_, idx) => {
                                        const pageNum = idx + 1;
                                        const isActive = currentPage === pageNum;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-8 h-8 rounded-xl border text-xs font-bold font-mono transition-all ${isActive
                                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_4px_15px_rgba(79,70,229,0.3)]'
                                                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    {/* Next Button */}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="py-2 px-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-neutral-400 hover:text-white hover:border-white/20 disabled:opacity-40 disabled:hover:text-neutral-400 disabled:hover:border-white/10 transition-all flex items-center gap-1.5"
                                    >
                                        Next <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
