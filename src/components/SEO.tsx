import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
}

const SEO = ({ title, description, keywords, canonicalUrl }: SEOProps) => {
    const defaultKeywords = "WebnexFusion, web development company, digital marketing agency, website design, SEO services, app development, UI UX design, branding, online marketing, IT company";
    const siteName = "WebnexFusion";

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{title} | {siteName}</title>
            <meta name="description" content={description || "WebnexFusion offers top-tier web development, app development, UI/UX design, and digital marketing services to grow your business."} />
            <meta name="keywords" content={keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description || "WebnexFusion offers top-tier web development, app development, UI/UX design, and digital marketing services to grow your business."} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description || "WebnexFusion offers top-tier web development, app development, UI/UX design, and digital marketing services to grow your business."} />

            {/* Canonical Link */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        </Helmet>
    );
};

export default SEO;
