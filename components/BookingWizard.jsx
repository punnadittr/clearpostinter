'use client';

import React, { useState } from 'react';
import {
    Upload,
    CheckCircle,
    X,
    MessageCircle,
    Mail,
    Send
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const SHIPPING_CARRIERS = [
    { value: '', label: 'Select shipping carrier...' },
    { value: 'thaipost', label: 'Thai Post / EMS (ไปรษณีย์ไทย)' },
    { value: 'express', label: 'DHL / FedEx / UPS / TNT' },
    { value: 'freight', label: 'General Air Freight / Sea Freight' },
    { value: 'handcarry', label: 'Hand Carry (Hold Baggage)' }
];

const CURRENT_STATUS_OPTIONS = [
    { value: 'notification', label: 'I received a "Collection Notification" slip (ใบแจ้งให้ไปรับของ)' },
    { value: 'held', label: 'Tracking status says "Held by Customs"' },
    { value: 'documents', label: "Courier (DHL/FedEx) asks for documents I don't have" },
    { value: 'preimport', label: "Shipping hasn't arrived yet (Pre-import consultation)" }
];

const LICENSE_STATUS_OPTIONS = [
    { value: 'yes', label: 'Yes, I have all documents' },
    { value: 'no', label: "No, I don't have an Import License" },
    { value: 'unknown', label: "I don't know what is needed" }
];

const formSchema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    whatsappNumber: yup.string().required('WhatsApp number is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    shippingCarrier: yup.string().required('Please select a shipping carrier'),
    itemDescription: yup.string().required('Please describe what is inside the package'),
    currentStatus: yup.string().required('Please select your current status'),
    licenseStatus: yup.string().required('Please indicate your license status')
});

export default function BookingWizard({ onClose }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: '',
        whatsappNumber: '',
        email: '',
        shippingCarrier: '',
        trackingNumber: '',
        itemDescription: '',
        currentStatus: '',
        licenseStatus: '',
        files: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFormData(prev => ({
                ...prev,
                files: [...prev.files, ...Array.from(e.target.files)]
            }));
        }
    };

    const removeFile = (index) => {
        setFormData(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await formSchema.validate(formData, { abortEarly: false });
            setErrors({});

            // Check if we have files to upload
            const hasFiles = formData.files.length > 0;

            if (hasFiles) {
                // Use FormData for file uploads (don't set Content-Type header)
                const formPayload = new FormData();
                formPayload.append('form-name', 'customs-assessment');
                formPayload.append('fullName', formData.fullName);
                formPayload.append('whatsappNumber', formData.whatsappNumber);
                formPayload.append('email', formData.email);
                formPayload.append('shippingCarrier', formData.shippingCarrier);
                formPayload.append('trackingNumber', formData.trackingNumber || '');
                formPayload.append('itemDescription', formData.itemDescription);
                formPayload.append('currentStatus', formData.currentStatus);
                formPayload.append('licenseStatus', formData.licenseStatus);

                // Append files
                formData.files.forEach((file) => {
                    formPayload.append('evidence', file);
                });

                await fetch('/', {
                    method: 'POST',
                    body: formPayload,
                });
            } else {
                // Use URL-encoded format for forms without files
                const formPayload = new URLSearchParams({
                    'form-name': 'customs-assessment',
                    'fullName': formData.fullName,
                    'whatsappNumber': formData.whatsappNumber,
                    'email': formData.email,
                    'shippingCarrier': formData.shippingCarrier,
                    'trackingNumber': formData.trackingNumber || '',
                    'itemDescription': formData.itemDescription,
                    'currentStatus': formData.currentStatus,
                    'licenseStatus': formData.licenseStatus,
                }).toString();

                await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formPayload,
                });
            }

            setIsSuccess(true);
        } catch (err) {
            if (err.inner) {
                const newErrors = {};
                err.inner.forEach(error => {
                    if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });
                setErrors(newErrors);
            } else {
                console.error('Submission error:', err);
                alert('Something went wrong. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success State
    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
                <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in-up">
                    <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600">
                        <X size={24} />
                    </button>

                    <div className="text-center py-6">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Assessment Request Received!</h3>
                        <p className="text-slate-600 mb-6">
                            Our expert is now reviewing your case. We will contact you via <strong>WhatsApp</strong> within 1-2 hours.
                        </p>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-left mb-6">
                            <p className="text-sm font-semibold text-blue-800 mb-2">📋 While you wait, please prepare:</p>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Photo of the product/package</li>
                                <li>• Invoice or receipt (if available)</li>
                                <li>• Any customs notification documents</li>
                            </ul>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
                            <Mail size={16} />
                            <span>Confirmation sent to <strong>{formData.email}</strong></span>
                        </div>

                        <button
                            onClick={() => { if (onClose) onClose(); else router.push('/') }}
                            className="w-full px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 z-10">
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <h2 className="text-xl md:text-2xl font-bold mb-2 pr-8">
                        Get Your Free Customs Clearance Assessment
                    </h2>
                    <p className="text-blue-100 text-sm md:text-base">
                        Please provide details below. We will review your case and contact you via WhatsApp within 1-2 hours.
                    </p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="space-y-8">

                        {/* Section 1: Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                                Contact Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="John Doe"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.fullName ? 'border-red-400' : 'border-slate-200 focus:border-blue-400'}`}
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        WhatsApp Number * <span className="text-green-600 text-xs font-normal">(Recommended for fastest response)</span>
                                    </label>
                                    <div className="relative">
                                        <MessageCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" />
                                        <input
                                            type="tel"
                                            name="whatsappNumber"
                                            placeholder="+66 or your country code"
                                            className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.whatsappNumber ? 'border-red-400' : 'border-slate-200 focus:border-blue-400'}`}
                                            value={formData.whatsappNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.email ? 'border-red-400' : 'border-slate-200 focus:border-blue-400'}`}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Shipment Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                                Shipment Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Shipping Carrier *</label>
                                    <select
                                        name="shippingCarrier"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white ${errors.shippingCarrier ? 'border-red-400' : 'border-slate-200 focus:border-blue-400'}`}
                                        value={formData.shippingCarrier}
                                        onChange={handleInputChange}
                                    >
                                        {SHIPPING_CARRIERS.map(carrier => (
                                            <option key={carrier.value} value={carrier.value}>{carrier.label}</option>
                                        ))}
                                    </select>
                                    {errors.shippingCarrier && <p className="text-red-500 text-xs mt-1">{errors.shippingCarrier}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tracking Number <span className="text-slate-400 font-normal">(Optional)</span></label>
                                    <input
                                        type="text"
                                        name="trackingNumber"
                                        placeholder="e.g., EE123456789TH"
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                                        value={formData.trackingNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">What is inside the package? (Be specific) *</label>
                                    <textarea
                                        name="itemDescription"
                                        placeholder="e.g., 5kg of Supplements, 2 used iPhones, Personal Sex Toys, Cosmetics for sale."
                                        rows={3}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none ${errors.itemDescription ? 'border-red-400' : 'border-slate-200 focus:border-blue-400'}`}
                                        value={formData.itemDescription}
                                        onChange={handleInputChange}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        🔒 Please be 100% honest so we can find the right solution for you. We value your privacy.
                                    </p>
                                    {errors.itemDescription && <p className="text-red-500 text-xs mt-1">{errors.itemDescription}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 3: The Problem */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                                The Problem
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-3">Current Status *</label>
                                    <div className="space-y-2">
                                        {CURRENT_STATUS_OPTIONS.map(option => (
                                            <label key={option.value} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${formData.currentStatus === option.value ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                                                <input
                                                    type="radio"
                                                    name="currentStatus"
                                                    value={option.value}
                                                    checked={formData.currentStatus === option.value}
                                                    onChange={handleInputChange}
                                                    className="mt-0.5 w-4 h-4 text-blue-600"
                                                />
                                                <span className="text-sm text-slate-700">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.currentStatus && <p className="text-red-500 text-xs mt-1">{errors.currentStatus}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-3">Do you have the required Import License? *</label>
                                    <div className="space-y-2">
                                        {LICENSE_STATUS_OPTIONS.map(option => (
                                            <label key={option.value} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${formData.licenseStatus === option.value ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                                                <input
                                                    type="radio"
                                                    name="licenseStatus"
                                                    value={option.value}
                                                    checked={formData.licenseStatus === option.value}
                                                    onChange={handleInputChange}
                                                    className="mt-0.5 w-4 h-4 text-blue-600"
                                                />
                                                <span className="text-sm text-slate-700">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.licenseStatus && <p className="text-red-500 text-xs mt-1">{errors.licenseStatus}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Evidence Upload */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                                Upload Evidence <span className="text-slate-400 font-normal text-sm">(Optional)</span>
                            </h3>

                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                <Upload className="mx-auto text-slate-400 mb-3" size={28} />
                                <p className="font-semibold text-slate-700 text-sm">Click to upload photo of Tracking status or Notification Slip</p>
                                <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG accepted</p>
                            </div>

                            <p className="text-xs text-slate-500">
                                💡 If you upload your notification slip, we can immediately see which tariff code applies and give you a more accurate assessment.
                            </p>

                            {formData.files.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-slate-700">Attached Files:</p>
                                    {formData.files.map((f, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded border border-slate-100">
                                            <span className="truncate max-w-[250px]">{f.name}</span>
                                            <button type="button" onClick={() => removeFile(i)} className="text-red-500 hover:text-red-700 ml-2">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {/* Footer / Submit */}
                <div className="p-6 border-t border-slate-100 bg-slate-50">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            'Processing...'
                        ) : (
                            <>
                                <Send size={20} />
                                Assess My Case Now
                            </>
                        )}
                    </button>
                    <p className="text-xs text-slate-400 text-center mt-3">
                        🔒 Your data is strictly confidential and used only for customs assessment purposes.
                    </p>
                </div>

                {/* Hidden Form for Netlify Detection */}
                <form name="customs-assessment" method="POST" data-netlify="true" encType="multipart/form-data" hidden>
                    <input type="hidden" name="form-name" value="customs-assessment" />
                    <input type="text" name="fullName" />
                    <input type="tel" name="whatsappNumber" />
                    <input type="email" name="email" />
                    <input type="text" name="shippingCarrier" />
                    <input type="text" name="trackingNumber" />
                    <textarea name="itemDescription" />
                    <input type="text" name="currentStatus" />
                    <input type="text" name="licenseStatus" />
                    <input type="file" name="evidence" multiple />
                </form>
            </div>
        </div>
    );
}
