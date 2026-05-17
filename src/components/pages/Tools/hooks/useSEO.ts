import { useEffect } from 'react';

interface SeoProps {
    title: string;
    description: string;
    keywords: string;
}

export function useSEO({ title, description, keywords }: SeoProps) {
    useEffect(() => {
        // 1. Update Title
        document.title = title;

        // 2. Update Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);

        // 3. Update Keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', keywords);

        // 4. Update OpenGraph Tags
        const ogTags = [
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'website' }
        ];

        ogTags.forEach(tag => {
            let el = document.querySelector(`meta[property="${tag.property}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute('property', tag.property);
                document.head.appendChild(el);
            }
            el.setAttribute('content', tag.content);
        });
    }, [title, description, keywords]);
}
