import React, { useState } from 'react';
import { Briefcase, MapPin, Mail, Phone, Send, User, ChevronRight, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import API_BASE_URL from '../../config/api';

export default function Careers() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        pincode: '',
        profile: '',
        experience_level: 'Fresher'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/careers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                setSubmitted(true);
                toast.success("Application submitted successfully!");
            } else {
                toast.error(result.message || "Failed to submit application");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 flex items-center justify-center">
                <div className="max-w-md w-full text-center space-y-6 p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
                    <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Application Sent!</h2>
                    <p className="text-neutral-400">
                        Thank you for your interest in joining our team. We'll review your profile and get back to you soon.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-lg shadow-indigo-600/20"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                        Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Career</span> With Us
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Join a team of visionaries and creators. We're looking for passionate individuals who want to redefine the future of technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Benefits/Info Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
                            <h3 className="text-xl font-bold text-white">Why join us?</h3>
                            <div className="space-y-4">
                                {[
                                    'Innovative Environment',
                                    'Remote-Friendly Work',
                                    'Growth Opportunities',
                                    'Competitive Compensation'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-neutral-300">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                            <ChevronRight className="w-4 h-4 text-indigo-500" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white space-y-4 shadow-2xl shadow-indigo-500/20">
                            <h3 className="text-xl font-bold">Have Questions?</h3>
                            <p className="text-indigo-100 opacity-90 leading-relaxed">
                                Feel free to reach out to our HR team directly.
                            </p>
                            <div className="pt-4 space-y-3">
                                <a href="mailto:hr@webnexfusion.com" className="flex items-center gap-3 text-sm font-medium hover:underline">
                                    <Mail className="w-4 h-4" /> hr@webnexfusion.com
                                </a>
                                <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-3 text-sm font-medium hover:underline">
                                    <Phone className="w-4 h-4" /> +91 XXX-XXX-XXXX
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className="lg:col-span-8">
                        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-neutral-400 ml-1">First Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                            <input 
                                                required name="first_name" value={formData.first_name} onChange={handleChange}
                                                type="text" placeholder="John"
                                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-neutral-400 ml-1">Last Name</label>
                                        <input 
                                            required name="last_name" value={formData.last_name} onChange={handleChange}
                                            type="text" placeholder="Doe"
                                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-neutral-400 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                            <input 
                                                required name="email" value={formData.email} onChange={handleChange}
                                                type="email" placeholder="john@example.com"
                                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-neutral-400 ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                            <input 
                                                required name="phone" value={formData.phone} onChange={handleChange}
                                                type="tel" placeholder="+91 123 456 7890"
                                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="md:col-span-3 space-y-2">
                                        <label className="text-sm font-medium text-neutral-400 ml-1">Full Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-neutral-500" />
                                            <textarea 
                                                name="address" value={formData.address} onChange={handleChange}
                                                placeholder="Street, City, State" rows={2}
                                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-neutral-400 ml-1">Pincode</label>
                                        <input 
                                            name="pincode" value={formData.pincode} onChange={handleChange}
                                            type="text" placeholder="123456"
                                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-neutral-400 ml-1">Experience Level</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                                            <select 
                                                name="experience_level" value={formData.experience_level} onChange={handleChange}
                                                className="w-full pl-12 pr-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition appearance-none cursor-pointer"
                                            >
                                                <option value="Fresher" className="bg-[#020617]">Fresher</option>
                                                <option value="Experience" className="bg-[#020617]">Experience</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                                <ChevronRight className="w-5 h-5 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-neutral-400 ml-1">Profile / Bio</label>
                                        <input 
                                            name="profile" value={formData.profile} onChange={handleChange}
                                            type="text" placeholder="E.g. Full Stack Developer"
                                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" disabled={loading}
                                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 disabled:opacity-50"
                                >
                                    {loading ? 'Submitting...' : (
                                        <>
                                            Submit Application <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
