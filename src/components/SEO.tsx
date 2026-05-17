import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
    image?: string;
    type?: string;
    author?: string;
}

const SEO = ({ title, description, keywords, canonicalUrl, image, type = "website", author }: SEOProps) => {
    const defaultKeywords = "WebnexFusion, web development company, digital marketing agency, website design, SEO services, app development, UI UX design, branding, online marketing, IT company";
    const siteName = "WebnexFusion";
    const defaultDesc = "WebnexFusion offers top-tier web development, app development, UI/UX design, and digital marketing services to grow your business.";

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{title} | {siteName}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            {author && <meta name="author" content={author} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description || defaultDesc} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description || defaultDesc} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Canonical Link */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        </Helmet>
    );
};

export default SEO;
