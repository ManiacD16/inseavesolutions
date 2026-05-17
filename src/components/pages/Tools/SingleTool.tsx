import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Braces, ShieldCheck, Link2, Binary, FileText, Layout, Layers, 
    Image, Palette, Type, AlignLeft, FileCode, Code, Database, Terminal, Clock, Calendar, Eye
} from 'lucide-react';
import { useSEO } from './hooks/useSEO';
import JsonFormatter from './components/JsonFormatter';
import PasswordGenerator from './components/PasswordGenerator';
import UrlEncoder from './components/UrlEncoder';
import Base64Converter from './components/Base64Converter';
import MediumPromptGenerator from './components/MediumPromptGenerator';
import GlassmorphismGenerator from './components/GlassmorphismGenerator';
import SvgWaveGenerator from './components/SvgWaveGenerator';
import ImageConverter from './components/ImageConverter';
import ColorPaletteGenerator from './components/ColorPaletteGenerator';
import CaseConverter from './components/CaseConverter';
import LoremIpsumGenerator from './components/LoremIpsumGenerator';
import MarkdownPreviewer from './components/MarkdownPreviewer';
import TextToHtmlConverter from './components/TextToHtmlConverter';
import HtmlToReactConverter from './components/HtmlToReactConverter';
import JwtDecoder from './components/JwtDecoder';
import SqlFormatter from './components/SqlFormatter';
import ShadowGenerator from './components/ShadowGenerator';
import TailwindBuilder from './components/TailwindBuilder';
import ApiResponseViewer from './components/ApiResponseViewer';
import CronParser from './components/CronParser';
import AgeCalculator from './components/AgeCalculator';
import SipCalculator from './components/SipCalculator';
import EmiCalculator from './components/EmiCalculator';
import GstCalculator from './components/GstCalculator';
import PercentageCalculator from './components/PercentageCalculator';
import FdCalculator from './components/FdCalculator';
import SalaryCalculator from './components/SalaryCalculator';
import DiscountCalculator from './components/DiscountCalculator';
import BmiCalculator from './components/BmiCalculator';
import LoanEligibilityCalculator from './components/LoanEligibilityCalculator';
import InvoiceGenerator from './components/InvoiceGenerator';
import GstInvoiceGenerator from './components/GstInvoiceGenerator';
import FreelanceInvoiceGenerator from './components/FreelanceInvoiceGenerator';
import QuoteGenerator from './components/QuoteGenerator';
import ProfitMarginCalculator from './components/ProfitMarginCalculator';
import PricingCalculator from './components/PricingCalculator';
import BreakEvenCalculator from './components/BreakEvenCalculator';
import RevenueCalculator from './components/RevenueCalculator';
import RoiCalculator from './components/RoiCalculator';
import CpmCalculator from './components/CpmCalculator';
import CpcCalculator from './components/CpcCalculator';
import EmailSubjectTester from './components/EmailSubjectTester';
import CtaGenerator from './components/CtaGenerator';
import BusinessNameGenerator from './components/BusinessNameGenerator';
import SloganGenerator from './components/SloganGenerator';
import HashtagGenerator from './components/HashtagGenerator';
import UtmBuilder from './components/UtmBuilder';
import QrCodeGenerator from './components/QrCodeGenerator';
import MetaTagGenerator from './components/MetaTagGenerator';
import SeoTitleGenerator from './components/SeoTitleGenerator';
import SlugGenerator from './components/SlugGenerator';
import RobotsTxtGenerator from './components/RobotsTxtGenerator';
import SitemapGenerator from './components/SitemapGenerator';
import OpenGraphGenerator from './components/OpenGraphGenerator';
import TwitterCardPreview from './components/TwitterCardPreview';
import KeywordDensityChecker from './components/KeywordDensityChecker';
import WordCounter from './components/WordCounter';
import ReadabilityChecker from './components/ReadabilityChecker';
import SerpPreview from './components/SerpPreview';
import CanonicalUrlGenerator from './components/CanonicalUrlGenerator';
import YoutubeTagGenerator from './components/YoutubeTagGenerator';
import YoutubeTitleGenerator from './components/YoutubeTitleGenerator';
import BlogTitleGenerator from './components/BlogTitleGenerator';
import LinkedinFormatter from './components/LinkedinFormatter';
import HtmlToMarkdown from './components/HtmlToMarkdown';

type ToolId = 
    | 'json-formatter' 
    | 'password-generator' 
    | 'url-encoder' 
    | 'base64-converter' 
    | 'medium-prompt'
    | 'glassmorphism-generator'
    | 'wave-generator'
    | 'image-converter'
    | 'color-palette-generator'
    | 'case-converter'
    | 'lorem-ipsum-generator'
    | 'markdown-previewer'
    | 'text-to-html'
    | 'html-to-react'
    | 'jwt-decoder'
    | 'sql-formatter'
    | 'shadow-generator'
    | 'tailwind-builder'
    | 'api-viewer'
    | 'cron-parser'
    | 'age-calculator'
    | 'sip-calculator'
    | 'emi-calculator'
    | 'gst-calculator'
    | 'percentage-calculator'
    | 'fd-calculator'
    | 'salary-calculator'
    | 'discount-calculator'
    | 'bmi-calculator'
    | 'loan-eligibility'
    | 'invoice-generator'
    | 'gst-invoice'
    | 'freelance-invoice'
    | 'quote-generator'
    | 'profit-margin'
    | 'pricing-calculator'
    | 'break-even'
    | 'revenue-calculator'
    | 'roi-calculator'
    | 'cpm-calculator'
    | 'cpc-calculator'
    | 'email-subject-tester'
    | 'cta-generator'
    | 'business-name-generator'
    | 'slogan-generator'
    | 'hashtag-generator'
    | 'utm-link-builder'
    | 'qr-code-generator'
    | 'meta-tags-generator'
    | 'seo-title-generator'
    | 'slug-generator'
    | 'robots-txt-generator'
    | 'sitemap-generator'
    | 'open-graph-generator'
    | 'twitter-card-preview'
    | 'keyword-density-checker'
    | 'word-counter'
    | 'readability-checker'
    | 'serp-preview'
    | 'canonical-url-generator'
    | 'youtube-tag-generator'
    | 'youtube-title-generator'
    | 'blog-title-generator'
    | 'linkedin-formatter'
    | 'html-to-markdown';

interface ToolItem {
    id: ToolId;
    title: string;
    description: string;
    icon: any;
    component: any;
}

const toolsList: ToolItem[] = [
    {
        id: 'json-formatter',
        title: 'JSON Formatter & Validator',
        description: 'Validate, format, or minify JSON data',
        icon: Braces,
        component: JsonFormatter
    },
    {
        id: 'password-generator',
        title: 'Password Generator',
        description: 'Generate cryptographically random passwords',
        icon: ShieldCheck,
        component: PasswordGenerator
    },
    {
        id: 'url-encoder',
        title: 'URL Encoder / Decoder',
        description: 'Encode standard text to URL safe strings',
        icon: Link2,
        component: UrlEncoder
    },
    {
        id: 'base64-converter',
        title: 'Base64 String Converter',
        description: 'Convert plaintext to Base64 and vice versa',
        icon: Binary,
        component: Base64Converter
    },
    {
        id: 'medium-prompt',
        title: 'Medium Prompt Generator',
        description: 'Generate viral, policy-compliant Medium prompts',
        icon: FileText,
        component: MediumPromptGenerator
    },
    {
        id: 'glassmorphism-generator',
        title: 'CSS Glassmorphism Generator',
        description: 'Design modern frosted glass UI with real-time CSS export',
        icon: Layout,
        component: GlassmorphismGenerator
    },
    {
        id: 'wave-generator',
        title: 'SVG Wave Generator',
        description: 'Create layered organic section divider curves',
        icon: Layers,
        component: SvgWaveGenerator
    },
    {
        id: 'image-converter',
        title: 'Image Converter & Compressor',
        description: 'Convert and compress images client-side instantly',
        icon: Image,
        component: ImageConverter
    },
    {
        id: 'color-palette-generator',
        title: 'Color Palette Generator',
        description: 'Generate harmonious locked designer color schemes',
        icon: Palette,
        component: ColorPaletteGenerator
    },
    {
        id: 'case-converter',
        title: 'Case Converter & Counter',
        description: 'Convert string cases and calculate text statistics',
        icon: Type,
        component: CaseConverter
    },
    {
        id: 'lorem-ipsum-generator',
        title: 'Lorem Ipsum Generator',
        description: 'Generate customizable dummy placeholder copy text',
        icon: AlignLeft,
        component: LoremIpsumGenerator
    },
    {
        id: 'markdown-previewer',
        title: 'Markdown Live Previewer',
        description: 'Write markdown, see live formatting and export HTML',
        icon: FileCode,
        component: MarkdownPreviewer
    },
    {
        id: 'text-to-html',
        title: 'Text to HTML Converter',
        description: 'Convert raw text into clean semantic HTML tags',
        icon: FileText,
        component: TextToHtmlConverter
    },
    {
        id: 'html-to-react',
        title: 'HTML to React Converter',
        description: 'Convert raw HTML into React JSX components',
        icon: Code,
        component: HtmlToReactConverter
    },
    {
        id: 'jwt-decoder',
        title: 'JWT Decoder',
        description: 'Decode and inspect JSON Web Tokens client-side',
        icon: ShieldCheck,
        component: JwtDecoder
    },
    {
        id: 'sql-formatter',
        title: 'SQL Query Formatter',
        description: 'Beautify and auto-align raw SQL queries',
        icon: Database,
        component: SqlFormatter
    },
    {
        id: 'shadow-generator',
        title: 'CSS Box-Shadow Generator',
        description: 'Design box shadows and copy custom CSS rules',
        icon: Layout,
        component: ShadowGenerator
    },
    {
        id: 'tailwind-builder',
        title: 'Tailwind Class Builder',
        description: 'Visually build components and compile Tailwind classes',
        icon: Layers,
        component: TailwindBuilder
    },
    {
        id: 'api-viewer',
        title: 'API Response Viewer',
        description: 'Simulate public CORS HTTP requests client-side',
        icon: Terminal,
        component: ApiResponseViewer
    },
    {
        id: 'cron-parser',
        title: 'Cron Expression Parser',
        description: 'Translate cron strings to human-readable schedules',
        icon: Clock,
        component: CronParser
    },
    {
        id: 'age-calculator',
        title: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days',
        icon: Calendar,
        component: AgeCalculator
    },
    {
        id: 'sip-calculator',
        title: 'SIP Calculator',
        description: 'Estimate mutual fund investments maturity values',
        icon: Clock,
        component: SipCalculator
    },
    {
        id: 'emi-calculator',
        title: 'EMI Calculator',
        description: 'Calculate monthly EMIs and loan interest payouts',
        icon: Database,
        component: EmiCalculator
    },
    {
        id: 'gst-calculator',
        title: 'GST Calculator',
        description: 'Calculate exclusive/inclusive GST tax slabs',
        icon: Braces,
        component: GstCalculator
    },
    {
        id: 'percentage-calculator',
        title: 'Percentage Calculator',
        description: 'Solve portion ratios and percentage changes',
        icon: Binary,
        component: PercentageCalculator
    },
    {
        id: 'fd-calculator',
        title: 'FD Interest Calculator',
        description: 'Estimate bank Fixed Deposit maturity sums',
        icon: Layers,
        component: FdCalculator
    },
    {
        id: 'salary-calculator',
        title: 'Salary Calculator',
        description: 'Calculate net take-home pay and tax slabs',
        icon: FileText,
        component: SalaryCalculator
    },
    {
        id: 'discount-calculator',
        title: 'Discount Calculator',
        description: 'Calculate product discounts and total savings',
        icon: Palette,
        component: DiscountCalculator
    },
    {
        id: 'bmi-calculator',
        title: 'BMI Health Calculator',
        description: 'Compute BMI body mass index classifications',
        icon: Type,
        component: BmiCalculator
    },
    {
        id: 'loan-eligibility',
        title: 'Loan Eligibility Calculator',
        description: 'Calculate maximum bank borrowing capacities',
        icon: ShieldCheck,
        component: LoanEligibilityCalculator
    },
    {
        id: 'invoice-generator',
        title: 'Invoice & Bill Generator',
        description: 'Create professional client invoices and download printable PDFs',
        icon: FileText,
        component: InvoiceGenerator
    },
    {
        id: 'gst-invoice',
        title: 'GST Tax Invoice Generator',
        description: 'Generate GST-compliant tax invoices with CGST/SGST/IGST and HSN codes',
        icon: FileText,
        component: GstInvoiceGenerator
    },
    {
        id: 'freelance-invoice',
        title: 'Freelance Invoice Generator',
        description: 'Draft professional hourly or flat rate freelance invoices with portfolio links',
        icon: FileText,
        component: FreelanceInvoiceGenerator
    },
    {
        id: 'quote-generator',
        title: 'Price Quote & Proposal Generator',
        description: 'Draft price quotes, estimates, and project scopes with client sign-off lines',
        icon: FileText,
        component: QuoteGenerator
    },
    {
        id: 'profit-margin',
        title: 'Profit Margin & Markup Calculator',
        description: 'Calculate net profit amount, gross margin %, and markup rates dynamically',
        icon: Database,
        component: ProfitMarginCalculator
    },
    {
        id: 'pricing-calculator',
        title: 'Target Product Pricing Calculator',
        description: 'Establish retail prices based on product COGS, margins, and sales tax slabs',
        icon: Layers,
        component: PricingCalculator
    },
    {
        id: 'break-even',
        title: 'Break-even Sales Calculator',
        description: 'Calculate target sales units and revenues needed to cover fixed overheads',
        icon: Binary,
        component: BreakEvenCalculator
    },
    {
        id: 'revenue-calculator',
        title: 'Revenue Earnings Calculator',
        description: 'Multiply quantities, average prices, and estimate gross vs net operational revenues',
        icon: Clock,
        component: RevenueCalculator
    },
    {
        id: 'roi-calculator',
        title: 'Marketing ROI Calculator',
        description: 'Calculate net investment gains and annualized return on investment rates',
        icon: Clock,
        component: RoiCalculator
    },
    {
        id: 'cpm-calculator',
        title: 'CPM Campaign Calculator',
        description: 'Solve for ad campaign budget cost, CPM rates, or overall impressions',
        icon: Clock,
        component: CpmCalculator
    },
    {
        id: 'cpc-calculator',
        title: 'CPC Campaign Calculator',
        description: 'Calculate ad click costs, cost per click rates, or total campaign traffic clicks',
        icon: Clock,
        component: CpcCalculator
    },
    {
        id: 'email-subject-tester',
        title: 'Email Subject Line Tester',
        description: 'Check email subject line lengths, spam triggers, emojis, and CTR rating grades',
        icon: FileText,
        component: EmailSubjectTester
    },
    {
        id: 'cta-generator',
        title: 'Call-To-Action Copy Generator',
        description: 'Generate high-converting landing page button labels and ad headlines',
        icon: FileText,
        component: CtaGenerator
    },
    {
        id: 'business-name-generator',
        title: 'SaaS & Agency Business Name Generator',
        description: 'Ideate corporate names based on seed keywords and select domain extension availability',
        icon: ShieldCheck,
        component: BusinessNameGenerator
    },
    {
        id: 'slogan-generator',
        title: 'Brand Slogan & Tagline Generator',
        description: 'Generate memorable slogans and taglines for websites and social campaigns',
        icon: FileText,
        component: SloganGenerator
    },
    {
        id: 'hashtag-generator',
        title: 'Social Media Hashtag Generator',
        description: 'Generate viral Instagram/TikTok hashtags split across popularity reach tiers',
        icon: Code,
        component: HashtagGenerator
    },
    {
        id: 'utm-link-builder',
        title: 'UTM Campaign Link Builder',
        description: 'Visually build trackable analytics URLs with campaign source, medium, and term parameters',
        icon: Link2,
        component: UtmBuilder
    },
    {
        id: 'qr-code-generator',
        title: 'QR Code Graphic Generator',
        description: 'Encode links or text into custom-scaled high-resolution scannable QR Code graphics',
        icon: Layout,
        component: QrCodeGenerator
    },
    {
        id: 'meta-tags-generator',
        title: 'HTML Meta Tag Generator',
        description: 'Generate high-performance Meta keywords, robots indexing and author header tags for SEO ranking',
        icon: FileText,
        component: MetaTagGenerator
    },
    {
        id: 'seo-title-generator',
        title: 'SEO Article Title Generator',
        description: 'Ideate click-worthy, viral, and search-optimized meta titles based on target keywords',
        icon: Type,
        component: SeoTitleGenerator
    },
    {
        id: 'slug-generator',
        title: 'URL Slug Cleaner & Generator',
        description: 'Convert messy article headers and page titles into lowercase, emoji-stripped URL slug links',
        icon: Link2,
        component: SlugGenerator
    },
    {
        id: 'robots-txt-generator',
        title: 'Robots.txt Crawl Directive Generator',
        description: 'Visually compile custom robots.txt directives and define allowed or disallowed site crawls',
        icon: Terminal,
        component: RobotsTxtGenerator
    },
    {
        id: 'sitemap-generator',
        title: 'XML Sitemap Index Builder',
        description: 'Compile valid static xml sitemaps to guide Google and Bing crawling pathways',
        icon: Layers,
        component: SitemapGenerator
    },
    {
        id: 'open-graph-generator',
        title: 'Open Graph Meta Tag Generator',
        description: 'Create social share header tags (og:title, og:image) for LinkedIn, Facebook, and Slack previews',
        icon: Layout,
        component: OpenGraphGenerator
    },
    {
        id: 'twitter-card-preview',
        title: 'Twitter X Card Preview Checker',
        description: 'Generate large-image summary card metadata and inspect live visual post feed mockups',
        icon: Eye,
        component: TwitterCardPreview
    },
    {
        id: 'keyword-density-checker',
        title: 'Keyword Density & Frequency Checker',
        description: 'Analyze article drafts, strip stopwords, and view primary keyword count densities',
        icon: Code,
        component: KeywordDensityChecker
    },
    {
        id: 'word-counter',
        title: 'Word & Character Count Auditor',
        description: 'Audit total letters, words, sentence bounds, paragraphs, and estimate reading/speaking times',
        icon: FileText,
        component: WordCounter
    },
    {
        id: 'readability-checker',
        title: 'SEO Readability Flesch Scale Checker',
        description: 'Verify copy reading ease levels using Flesch-Kincaid syllable analytics models',
        icon: ShieldCheck,
        component: ReadabilityChecker
    },
    {
        id: 'serp-preview',
        title: 'Google SERP Snippet Visualizer',
        description: 'Check Google search meta title and description truncations on desktop or mobile previews',
        icon: Eye,
        component: SerpPreview
    },
    {
        id: 'canonical-url-generator',
        title: 'Canonical URL Tag Generator',
        description: 'Generate link rel canonical absolute references to eliminate duplicate content Google penalties',
        icon: Link2,
        component: CanonicalUrlGenerator
    },
    {
        id: 'youtube-tag-generator',
        title: 'YouTube Studio SEO Tag Generator',
        description: 'Extract search-targeted keyword tags to optimize YouTube video suggestions and rankings',
        icon: Image,
        component: YoutubeTagGenerator
    },
    {
        id: 'youtube-title-generator',
        title: 'YouTube Clickbait & CTR Title Generator',
        description: 'Ideate dramatic, curiosity-sparking, or search-optimized YouTube video headlines',
        icon: Type,
        component: YoutubeTitleGenerator
    },
    {
        id: 'blog-title-generator',
        title: 'SEO Blog Post Topic Title Generator',
        description: 'Draft click-worthy informational, listicle, or problem-solving blog post headlines',
        icon: FileText,
        component: BlogTitleGenerator
    },
    {
        id: 'linkedin-formatter',
        title: 'LinkedIn Engagement Post Formatter',
        description: 'Format raw drafts with scannable double linebreaks and converting headlines to bold unicode characters',
        icon: AlignLeft,
        component: LinkedinFormatter
    },
    {
        id: 'html-to-markdown',
        title: 'HTML to Markdown Compiler',
        description: 'Translate raw HTML codes and tags into simplified Markdown structural symbols',
        icon: FileCode,
        component: HtmlToMarkdown
    }
];

const seoMap: Record<ToolId, { title: string; desc: string; keywords: string }> = {
    'json-formatter': {
        title: 'JSON Formatter, Validator & Prettifier Online | WebnexFusion Tools',
        desc: 'Prettify, validate, parse, clean, or minify JSON objects and files instantly online. Check and format syntax errors dynamically.',
        keywords: 'online JSON formatter, validate JSON online, clean JSON data, minify JSON free, best JSON validator, parse JSON code'
    },
    'password-generator': {
        title: 'Secure Random Password Generator Online | WebnexFusion Tools',
        desc: 'Create highly secure, cryptographically random, custom passwords with length and characters customizing sliders. Free strong password creator.',
        keywords: 'secure password generator online, strong password creator, generate random password, best password generator tool, free random passwords'
    },
    'url-encoder': {
        title: 'URL Encoder & Decoder Online - Percentage Encoding | WebnexFusion Tools',
        desc: 'Encode text strings to secure URL-safe percent-encoded format, or decode them back to plain English text strings instantly.',
        keywords: 'URL encoder online, decode URL string, percent encoding tool, encode url component, online URL decoder, free URL formatter'
    },
    'base64-converter': {
        title: 'Base64 Encoder & Decoder Online Converter | WebnexFusion Tools',
        desc: 'Convert plain text data to Base64 code, or decode standard Base64 hashes back into human-readable text strings dynamically.',
        keywords: 'Base64 encoder online, decode base64 to text, base64 string converter, binary to base64 tool, base64 encoder decoder'
    },
    'medium-prompt': {
        title: 'Medium Prompt Generator - Write Viral Blog Articles | WebnexFusion Tools',
        desc: 'Create highly viral, SEO-compliant, opinionated blog writing prompts designed for Medium writers to stay compliant with AI guidelines.',
        keywords: 'Medium article prompt generator, viral writing prompts AI, Medium policy compliant prompts, blog post topic generator, custom prompts'
    },
    'glassmorphism-generator': {
        title: 'CSS Glassmorphism Generator - Frosted Glass Card Creator | WebnexFusion Tools',
        desc: 'Design beautiful modern frosted glass containers with customized blur, background opacity, border outlines, and corner radius. Copy CSS & Tailwind.',
        keywords: 'CSS glassmorphism generator online, glassmorphic CSS card maker, frosted glass effect CSS, backdrop blur generator tool, tailwind glass'
    },
    'wave-generator': {
        title: 'SVG Wave Generator - Layered Section Dividers Maker | WebnexFusion Tools',
        desc: 'Generate gorgeous organic layered SVG section divider curves and background waves. Customize amplitude, layers, colors, and copy clean XML code.',
        keywords: 'SVG wave generator online, organic wave svg generator, curvy wave backgrounds generator, free SVG curve maker, layered waves code'
    },
    'image-converter': {
        title: 'Free Image Converter & Compressor Online | WebnexFusion Tools',
        desc: 'Convert any JPEG, PNG, or WebP image formats client-side and adjust output resolution and quality dynamically. Fast and secure.',
        keywords: 'online image converter, compress image free, convert png to webp, webp to jpg converter, browser image compression'
    },
    'color-palette-generator': {
        title: 'Online Color Palette Generator - Scheme Maker | WebnexFusion Tools',
        desc: 'Create beautiful, harmonized 5-color palettes. Customize shades, lock colors you love, and copy HEX or RGB codes in one click.',
        keywords: 'color palette generator, custom scheme creator, website colors generator, locks palette maker, web designer colors'
    },
    'case-converter': {
        title: 'Text Case Converter & Word Counter Online | WebnexFusion Tools',
        desc: 'Transform strings into Sentence case, Title Case, camelCase, snake_case, or UPPERCASE instantly. View real-time character and word analytics.',
        keywords: 'case converter online, camelcase snakecase tool, upper lower converter, online word counter, string stats analyzer'
    },
    'lorem-ipsum-generator': {
        title: 'Lorem Ipsum Text Generator - Free Dummy Text | WebnexFusion Tools',
        desc: 'Generate customizable quantities of Lorem Ipsum placeholder text, lists, and words. Optional HTML paragraph tags wrapping.',
        keywords: 'lorem ipsum text generator, dummy copy generator, online paragraph builder, custom placeholder text creator'
    },
    'markdown-previewer': {
        title: 'Markdown Previewer & Live HTML Editor Online | WebnexFusion Tools',
        desc: 'Write markdown syntax, inspect real-time formatted previews, and copy the compiled pure HTML markup instantly for blog publishing.',
        keywords: 'markdown previewer online, markdown HTML compiler, live markdown editor, compile markdown to html'
    },
    'text-to-html': {
        title: 'Text to HTML Converter Online - Free Format Writer | WebnexFusion Tools',
        desc: 'Convert plain text copy, lists, and links into perfectly structured HTML tags automatically. Perfect for bloggers, developers and content creators.',
        keywords: 'text to html converter, online plain text formatter, html tag wrapper, convert txt to html, free semantic markup generator'
    },
    'html-to-react': {
        title: 'HTML to React JSX Converter Online | WebnexFusion Tools',
        desc: 'Translate raw HTML code structures into clean React JSX components. Formats inline styles to JS objects, fixes self-closing tags and element classes.',
        keywords: 'html to react converter online, html to jsx translator, convert class to classname online, react style object formatter, react web developer utility'
    },
    'jwt-decoder': {
        title: 'JWT Decoder & Claims Inspector Online | WebnexFusion Tools',
        desc: 'Unpack JSON Web Tokens client-side. Inspect algorithm properties, header keys, data payloads, and check expiration values dynamically.',
        keywords: 'JWT decoder online, JSON Web Token parser, check jwt exp claim, client side jwt reader, unpack jwt base64'
    },
    'sql-formatter': {
        title: 'SQL Formatter & Query Beautifier Online | WebnexFusion Tools',
        desc: 'Format, align, and clean raw SQL queries. Automatically capitalizes major syntax keywords and indents nested joins.',
        keywords: 'SQL formatter online, query beautifier, format raw sql, capitalization sql keyword, sql script editor free'
    },
    'shadow-generator': {
        title: 'CSS Box-Shadow Generator - Live Shadow Maker | WebnexFusion Tools',
        desc: 'Create beautiful CSS box shadows visually. Customize offset, spread, blur, and opacity with sliders. Copy CSS box-shadow code.',
        keywords: 'CSS box-shadow generator, online shadow creator, visual CSS shadow editor, frosted shadow spread, box shadow styling code'
    },
    'tailwind-builder': {
        title: 'Tailwind CSS Component Visual Class Builder | WebnexFusion Tools',
        desc: 'Build web elements visually by configuring corner curves, padding spacings, borders, and margins, and compile matching Tailwind CSS classes.',
        keywords: 'Tailwind class builder online, tailwind components editor, visual css styling tailwind, compiled tailwind class lists'
    },
    'api-viewer': {
        title: 'API Response Viewer & Mock HTTP Client | WebnexFusion Tools',
        desc: 'Dispatch client-side HTTP requests (GET, POST, PUT) and format status codes, response headers, and JSON payloads instantly.',
        keywords: 'API response viewer, online http client, rest request mock client, parse response body json, testing CORS api free'
    },
    'cron-parser': {
        title: 'Cron Expression Parser - Schedule Translator | WebnexFusion Tools',
        desc: 'Decode cron expression strings into standard human-readable English syntax profiles dynamically. Debug cron tasks in real-time.',
        keywords: 'cron parser online, translate cron schedule, human readable cron string, check cron time values, cron timing presets'
    },
    'age-calculator': {
        title: 'Age Calculator Online - Exact Age & Date Finder | WebnexFusion Tools',
        desc: 'Calculate your exact age in years, months, days, weeks, and hours. Track upcoming next birthday countdowns instantly.',
        keywords: 'age calculator online, exact age finder, birthday countdown tool, birth date age, days since birth date'
    },
    'sip-calculator': {
        title: 'SIP Calculator Online - Mutual Fund Wealth Planner | WebnexFusion Tools',
        desc: 'Calculate Systematic Investment Plan (SIP) future values, principal investments, and estimated returns with sliders.',
        keywords: 'SIP calculator online, mutual fund returns planner, SIP wealth builder, maturity proceeds estimator, investment compounding'
    },
    'emi-calculator': {
        title: 'EMI Loan Calculator Online - Monthly Installment Finder | WebnexFusion Tools',
        desc: 'Check monthly EMIs, principal, and total interest payouts for home, car, or personal loans dynamically.',
        keywords: 'EMI calculator online, monthly loan emi, calculate home loan emi, interest payable calculator, bank borrowing pay'
    },
    'gst-calculator': {
        title: 'GST Tax Calculator Online - CGST & SGST Invoice Maker | WebnexFusion Tools',
        desc: 'Add or remove GST tax slabs. Calculate net base cost, CGST, SGST, and final gross pricing with sliders.',
        keywords: 'GST calculator online, tax slab invoice, cgst sgst calculator, add exclusive gst, remove inclusive tax'
    },
    'percentage-calculator': {
        title: 'Percentage Calculator Online - General Math Solver | WebnexFusion Tools',
        desc: 'Calculate what is X% of Y, portion ratios, fractions, and percentage changes (growths/depreciations) online.',
        keywords: 'percentage calculator online, math percent fraction, growth percentage increase, decrease percentage change'
    },
    'fd-calculator': {
        title: 'FD Interest Calculator Online - Fixed Deposit Maturity | WebnexFusion Tools',
        desc: 'Estimate Fixed Deposit (FD) maturity values and compound interest earned with monthly or quarterly frequencies.',
        keywords: 'FD calculator online, bank deposit maturity, compound interest fd, quarterly compounding interest, fd gains planner'
    },
    'salary-calculator': {
        title: 'Salary Take-Home Calculator Online - Income Tax slab | WebnexFusion Tools',
        desc: 'Calculate annual gross salaries, PF deductions, insurance, new regime tax distributions, and net in-hand pays.',
        keywords: 'salary calculator online, take home pay in hand, calculate net salary, pf contribution deduction, income tax slab new regime'
    },
    'discount-calculator': {
        title: 'Discount & Savings Calculator Online - Stacking Deals | WebnexFusion Tools',
        desc: 'Calculate final deal pricing, absolute savings, and double-stack multiple custom discount percentages.',
        keywords: 'discount calculator online, calculate savings deal, original price coupon off, stacking discount percentages'
    },
    'bmi-calculator': {
        title: 'BMI Health Calculator Online - Body Mass Index Scale | WebnexFusion Tools',
        desc: 'Check your Body Mass Index (BMI) score, category, and health guidelines using simple weight and height sliders.',
        keywords: 'BMI calculator online, check body mass index, weight height bmi scale, fitness classification category'
    },
    'loan-eligibility': {
        title: 'Loan Eligibility & Borrowing Power Calculator | WebnexFusion Tools',
        desc: 'Check maximum home or personal bank borrowing eligibility and monthly EMI affordability based on take-home income.',
        keywords: 'loan eligibility calculator, bank borrowing power, monthly emi affordability, foir banking ratio test'
    },
    'invoice-generator': {
        title: 'Free Invoice & Bill PDF Generator Online | WebnexFusion Tools',
        desc: 'Generate customized professional invoices and receipts. Add billing details, stack dynamic line items, calculate CGST/SGST/VAT automatically, and save as PDF.',
        keywords: 'free invoice generator online, dynamic billing sheet creator, custom receipt maker, print gst invoice, save bill pdf'
    },
    'gst-invoice': {
        title: 'GST Invoice Generator Online - Tax Bill Maker | WebnexFusion Tools',
        desc: 'Generate Indian GST compliant B2B tax invoices. Itemize CGST, SGST, IGST, HSN codes, and download custom invoice PDFs.',
        keywords: 'GST invoice generator, tax invoice maker, Indian GST billing software, CGST SGST HSN bill, print invoice pdf'
    },
    'freelance-invoice': {
        title: 'Freelance Invoice Generator Online - Devs & Designers | WebnexFusion Tools',
        desc: 'Draft customizable freelance developer or designer invoices. Set hourly rates or flat rate milestones, add payment details, and print PDFs.',
        keywords: 'freelance invoice generator, hourly developer bill, freelance consultant invoice, flat rate milestone payment, print client bill'
    },
    'quote-generator': {
        title: 'Price Quote & Project Proposal Generator | WebnexFusion Tools',
        desc: 'Generate professional project cost estimates and B2B quotations. Configure scope timelines, validity terms, and sign-off sheets.',
        keywords: 'quote generator online, price estimate creator, business proposal quote, client sign off signature sheet, printable project quotation'
    },
    'profit-margin': {
        title: 'Profit Margin & Markup Calculator Online | WebnexFusion Tools',
        desc: 'Calculate gross profit margins, markups, and absolute net profits instantly from Cost Price and Selling Price fields.',
        keywords: 'profit margin calculator, markup calculator online, gross profit margin percent, calculate profit selling price'
    },
    'pricing-calculator': {
        title: 'Target Pricing Calculator - Retail Margins & Tax | WebnexFusion Tools',
        desc: 'Model optimal product selling prices based on Cost of Goods Sold (COGS), target margin percentages, and regional GST values.',
        keywords: 'pricing calculator online, retail pricing modeler, target margin price, cost of goods sold cogs calculator, add tax inclusive price'
    },
    'break-even': {
        title: 'Break-even Sales Volume Calculator | WebnexFusion Tools',
        desc: 'Evaluate contribution margins, break-even unit sales, and required revenues to cover fixed operational costs.',
        keywords: 'break even calculator, break even analysis sales, contribution margin ratio, fixed variable cost per unit volume'
    },
    'revenue-calculator': {
        title: 'Revenue Calculator - Gross vs Net Business Earnings | WebnexFusion Tools',
        desc: 'Multiply product/service pricing and sales volumes, subtract refunds or discount ratios, and review net operational revenues.',
        keywords: 'revenue calculator online, calculate gross revenue, net operational earnings, units sold pricing calculator'
    },
    'roi-calculator': {
        title: 'Marketing ROI Calculator - Return on Investment | WebnexFusion Tools',
        desc: 'Measure campaign profitability and annualized returns based on ad spend investments and earned revenues.',
        keywords: 'marketing ROI calculator, calculate return on investment, annualized ROI, ad spend revenue profit'
    },
    'cpm-calculator': {
        title: 'CPM Campaign Calculator - Cost Per Mille Online | WebnexFusion Tools',
        desc: 'Calculate total cost, CPM rates, or ad impressions. Perfect media planner tool for modern paid campaigns.',
        keywords: 'CPM calculator online, cost per mille, calculate impressions CPM, media budget calculation'
    },
    'cpc-calculator': {
        title: 'CPC Campaign Calculator - Cost Per Click Online | WebnexFusion Tools',
        desc: 'Evaluate CPC rates, clicks, or ad costs dynamically. Optimize paid traffic budgets and check CPC value metrics.',
        keywords: 'CPC calculator online, cost per click, ad click cost, calculate marketing clicks budget'
    },
    'email-subject-tester': {
        title: 'Email Subject Line CTR Tester & Grade Analyzer | WebnexFusion Tools',
        desc: 'Audit email subject lines for optimal lengths, uppercase screamers, spam trigger terms, and emojis. Boost newsletter open rates.',
        keywords: 'email subject tester, check spam words subject line, email CTR optimizer, grading email subject'
    },
    'cta-generator': {
        title: 'High-Conversion CTA Copy & Button Generator | WebnexFusion Tools',
        desc: 'Generate 12 high-converting button CTAs for landing pages, social ads, or SaaS popups based on custom goals.',
        keywords: 'CTA generator, call to action copy, high converting buttons, newsletter button text, click triggers'
    },
    'business-name-generator': {
        title: 'SaaS & Agency Business Name Generator | WebnexFusion Tools',
        desc: 'Create brandable business names from custom seed keywords. Details compound and modern styles with mock domain checkers.',
        keywords: 'business name generator, brandable domain ideator, premium SaaS agency names, company name creator'
    },
    'slogan-generator': {
        title: 'Brand Slogan & Tagline Generator Online | WebnexFusion Tools',
        desc: 'Draft catchy, professional taglines and slogans for websites, products, and ads from primary keywords.',
        keywords: 'slogan generator online, website tagline creator, business catchphrase ideator, clever slogans'
    },
    'hashtag-generator': {
        title: 'Viral Social Media Hashtag Generator | WebnexFusion Tools',
        desc: 'Generate highly optimized Instagram, Twitter, and TikTok hashtags categorized across high, medium, and low reach tiers.',
        keywords: 'hashtag generator online, tiktok hashtags copy, viral instagram hashtags, competition reach social media tags'
    },
    'utm-link-builder': {
        title: 'UTM Campaign URL Builder & Tracker | WebnexFusion Tools',
        desc: 'Visually assemble trackable web marketing links with utm_source, utm_medium, utm_campaign, and utm_term. 100% Google Analytics safe.',
        keywords: 'utm builder online, UTM link tracker, google analytics utm url builder, campaign tracking parameter links'
    },
    'qr-code-generator': {
        title: 'QR Code Generator Online - Custom Scaled Graphics | WebnexFusion Tools',
        desc: 'Generate high-resolution custom QR Code graphics. Download PNG or vector SVG graphics completely client-side.',
        keywords: 'QR code generator online, convert url to qr code, download svg vector qr code, print scannable barcode'
    },
    'meta-tags-generator': {
        title: 'HTML Meta Tag Generator Online | WebnexFusion Tools',
        desc: 'Generate custom meta keyword, index crawls, and author headers. Boost search rankings dynamically.',
        keywords: 'html meta tag generator, custom website header tags, google crawl index settings, meta keywords description'
    },
    'seo-title-generator': {
        title: 'SEO Title Headline Generator - Viral Ideas | WebnexFusion Tools',
        desc: 'Draft 15 click-worthy, viral article and SEO page titles. Boost site click-through-rates instantly.',
        keywords: 'seo title generator, viral blog headlines ideator, click worthy meta title, increase article CTR'
    },
    'slug-generator': {
        title: 'SEO URL Slug Generator & Cleaner | WebnexFusion Tools',
        desc: 'Convert any text line to standard URL-compliant, emoji-stripped, lowercase link slugs.',
        keywords: 'slug generator online, url safe slug converter, strip emojis from link, clean slug lowercase'
    },
    'robots-txt-generator': {
        title: 'Robots.txt Crawl Directive File Generator | WebnexFusion Tools',
        desc: 'Generate valid custom robots.txt crawler settings. Easily specify sitemap paths and disallowed folders.',
        keywords: 'robots txt generator, crawler access robots file, visual robots settings, block directory bots'
    },
    'sitemap-generator': {
        title: 'XML Sitemap Schema Generator Online | WebnexFusion Tools',
        desc: 'Visually compile static XML sitemaps to index all subpages. Choose frequency and crawl priorities.',
        keywords: 'xml sitemap generator, compile sitemap indexing schema, standard website url index, sitemap xml code'
    },
    'open-graph-generator': {
        title: 'Open Graph Meta Tag Generator | WebnexFusion Tools',
        desc: 'Create beautiful Open Graph tags (og:title, og:image) for Facebook, LinkedIn and social previews.',
        keywords: 'open graph generator, facebook meta preview, og tags creator, social link cover previews'
    },
    'twitter-card-preview': {
        title: 'Twitter Card Preview & Meta Generator | WebnexFusion Tools',
        desc: 'Design Large Image Twitter card sharing headers and preview visual mockup post cards dynamically.',
        keywords: 'twitter card preview online, x card meta tags, large image post sharing, twitter card creator'
    },
    'keyword-density-checker': {
        title: 'Keyword Density & Word Count Checker | WebnexFusion Tools',
        desc: 'Check keyword frequencies inside article copy. Filter stopwords and inspect density percentages.',
        keywords: 'keyword density checker, copy density frequency online, check writing stopwords, optimal keyword density'
    },
    'word-counter': {
        title: 'Word, Character, & Read Time Counter | WebnexFusion Tools',
        desc: 'Audit word limits, sentence subdivisions, and estimate reading/speaking times for drafts.',
        keywords: 'word counter online, character count no space, count sentence paragraph lines, estimate speaking read time'
    },
    'readability-checker': {
        title: 'SEO Readability Flesch Grade Checker | WebnexFusion Tools',
        desc: 'Measure reading ease with Flesch-Kincaid syllable parsing algorithms. Optimize copywriting.',
        keywords: 'readability checker online, Flesch reading ease formula, syllable count text difficulty, grade level copywriter'
    },
    'serp-preview': {
        title: 'Google SERP Snippet Preview Tool | WebnexFusion Tools',
        desc: 'Visualize Google desktop and mobile search snippet results and inspect character limit cutoffs.',
        keywords: 'google serp preview online, metadata truncation checker, mobile search snippet visualizer, seo snippet editor'
    },
    'canonical-url-generator': {
        title: 'Canonical URL HTML Link Tag Generator | WebnexFusion Tools',
        desc: 'Avoid search engine index duplicate content penalties. Clean and format canonical link elements.',
        keywords: 'canonical url generator, link rel canonical tag, standard absolute page url, avoid duplicate content indexing'
    },
    'youtube-tag-generator': {
        title: 'YouTube Video SEO Studio Tag Generator | WebnexFusion Tools',
        desc: 'Extract highly search-optimized YouTube tags. Click to copy comma-separated video keywords.',
        keywords: 'youtube tag generator, video tags extractor studio, copy video keywords, youtube SEO tags free'
    },
    'youtube-title-generator': {
        title: 'YouTube CTR Clickbait Video Title Generator | WebnexFusion Tools',
        desc: 'Create curiosity-sparking, dramatic, or SEO search-optimized YouTube video headlines.',
        keywords: 'youtube title generator, CTR clickbait headlines, viral video titles, dramatic youtube catchphrases'
    },
    'blog-title-generator': {
        title: 'SEO Blog Title Topic Generator | WebnexFusion Tools',
        desc: 'Ideate click-worthy informational, listicle, or problem-solving blog post title ideas from keywords.',
        keywords: 'blog title generator, click worthy article headlines, informational guides topics, listicle topics creator'
    },
    'linkedin-formatter': {
        title: 'LinkedIn Engagement Post Formatter | WebnexFusion Tools',
        desc: 'Convert LinkedIn posts to double-spaced scannable lines and make first headers bold unicode text.',
        keywords: 'linkedin formatter tool, bold unicode text converter, copywriter double space linebreaks, increase linkedin reach'
    },
    'html-to-markdown': {
        title: 'HTML to Markdown Symbol Compiler | WebnexFusion Tools',
        desc: 'Translate rich raw HTML markup syntax and lists into standard structural Markdown text.',
        keywords: 'html to markdown converter, markdown translator online, parse html tags, convert bold links markdown'
    }
};

export default function SingleTool() {
    const { toolId } = useParams<{ toolId: string }>();
    const navigate = useNavigate();

    const tool = toolsList.find(t => t.id === toolId);

    // Call dynamic SEO hook based on current active tool
    if (tool && seoMap[tool.id]) {
        useSEO(seoMap[tool.id]);
    }

    if (!tool) {
        return (
            <div className="pt-32 pb-20 min-h-screen bg-[#020617] flex items-center justify-center text-center px-4">
                <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <h2 className="text-2xl font-bold text-white mb-3">Tool Not Found</h2>
                    <p className="text-neutral-400 mb-6">The tool you are looking for does not exist or has been moved.</p>
                    <button
                        onClick={() => navigate('/resources/tools')}
                        className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Tools Hub
                    </button>
                </div>
            </div>
        );
    }

    const Icon = tool.icon;
    const ActiveComponent = tool.component;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#020617] text-white relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        to="/resources/tools"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition text-sm font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Tools Hub
                    </Link>
                </div>

                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 rounded-xl">
                            <Icon className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">{tool.title}</h1>
                            <p className="text-neutral-400 text-sm mt-1">{tool.description}</p>
                        </div>
                    </div>
                </div>

                {/* Main Tool Container */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl backdrop-blur-md">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
}
