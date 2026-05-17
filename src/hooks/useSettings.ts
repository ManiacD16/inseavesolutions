import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

interface SiteSettings {
    contact_email: string;
    contact_phone: string;
    site_name: string;
}

const defaultSettings: SiteSettings = {
    contact_email: 'webnexfusion@gmail.com',
    contact_phone: '+91-7067164631',
    site_name: 'Inseave Solutions'
};

export const useSettings = () => {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/settings.php`);
                const result = await response.json();
                if (result.status === 'success') {
                    setSettings(result.data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, loading };
};
