'use client';

import React, { useState, useEffect } from 'react';
import {
    Upload,
    CheckCircle,
    X,
    MessageCircle,
    Mail,
    Send,
    ArrowRight,
    ArrowLeft,
    ChevronRight,
    FileText,
    FileSpreadsheet,
    Image as ImageIcon,
    File as FileIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { supabase } from '../lib/supabase';

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

const STEPS = [
    { id: 1, title: 'Contact Info', fields: ['fullName', 'whatsappNumber', 'email'] },
    { id: 2, title: 'Shipment', fields: ['shippingCarrier', 'itemDescription'] },
    { id: 3, title: 'Problem', fields: ['currentStatus', 'licenseStatus'] },
    { id: 4, title: 'Evidence', fields: [] }
];

export default function BookingWizard({ onClose }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
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

    // Scroll to top when changing steps
    useEffect(() => {
        const formContainer = document.getElementById('wizard-form-container');
        if (formContainer) {
            formContainer.scrollTop = 0;
        }
    }, [currentStep]);

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
            const newFiles = Array.from(e.target.files).map(file =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            );
            setFormData(prev => ({
                ...prev,
                files: [...prev.files, ...newFiles]
            }));
        }
    };

    const removeFile = (index) => {
        setFormData(prev => {
            const fileToRemove = prev.files[index];
            if (fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            return {
                ...prev,
                files: prev.files.filter((_, i) => i !== index)
            };
        });
    };

    const validateStep = async () => {
        const currentFields = STEPS[currentStep - 1].fields;
        if (currentFields.length === 0) return true;

        const newErrors = {};
        let isValid = true;

        for (const field of currentFields) {
            try {
                await yup.reach(formSchema, field).validate(formData[field]);
            } catch (err) {
                newErrors[field] = err.message;
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = async () => {
        const isValid = await validateStep();
        if (isValid) {
            setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation just in case
        const isValid = await validateStep();
        if (!isValid) return;

        setIsSubmitting(true);

        try {
            let fileUrl = null;

            // Upload file to Supabase Storage if exists
            if (formData.files.length > 0 && formData.files[0]) {
                const file = formData.files[0];
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('evidence')
                    .upload(fileName, file);

                if (uploadError) {
                    console.error('File upload error:', uploadError);
                } else {
                    // Get public URL
                    const { data: urlData } = supabase.storage
                        .from('evidence')
                        .getPublicUrl(fileName);
                    fileUrl = urlData.publicUrl;
                }
            }

            // Save form data to Supabase database
            const { data, error } = await supabase
                .from('form_submissions')
                .insert([{
                    full_name: formData.fullName,
                    whatsapp_number: formData.whatsappNumber,
                    email: formData.email,
                    shipping_carrier: formData.shippingCarrier,
                    tracking_number: formData.trackingNumber || null,
                    item_description: formData.itemDescription,
                    current_status: formData.currentStatus,
                    license_status: formData.licenseStatus,
                    evidence_url: fileUrl,
                }]);

            if (error) {
                throw new Error('Failed to save form data');
            }

            setIsSuccess(true);
        } catch (err) {
            console.error('Submission error:', err);
            alert('Something went wrong. Please try again.');
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

                {/* Header with Steps */}
                <div className="p-6 pb-4 border-b border-slate-100 bg-white">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 pr-8">
                        Get Your Free Assessment
                    </h2>

                    {/* Progress Bar */}
                    <div className="w-full px-4 sm:px-8">
                        <div className="flex items-center justify-between w-full">
                            {STEPS.map((step, index) => (
                                <React.Fragment key={step.id}>
                                    {/* Step Circle & Label Container */}
                                    <div className="relative flex flex-col items-center z-10">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${currentStep >= step.id
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110'
                                                : 'bg-white border-2 border-slate-200 text-slate-400'
                                                }`}
                                        >
                                            {currentStep > step.id ? <CheckCircle size={18} /> : step.id}
                                        </div>
                                        <span className={`absolute top-12 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${currentStep >= step.id ? 'text-blue-600' : 'text-slate-400'
                                            }`}>
                                            {step.title}
                                        </span>
                                    </div>

                                    {/* Connector Line (except after last step) */}
                                    {index < STEPS.length - 1 && (
                                        <div className="flex-1 mx-2 sm:mx-4 h-1 rounded-full bg-slate-100 relative">
                                            <div
                                                className="absolute inset-y-0 left-0 bg-blue-600 rounded-full transition-all duration-500 ease-out"
                                                style={{ width: currentStep > index + 1 ? '100%' : '0%' }}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        {/* Spacer for labels */}
                        <div className="h-6 sm:h-8"></div>
                    </div>
                </div>

                {/* Form Content */}
                <form id="wizard-form-container" className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
                    <div className="max-w-xl mx-auto">

                        {/* Step 1: Contact Info */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-slate-900">Contact Information</h3>
                                    <p className="text-slate-500 text-sm">Where should we send your assessment?</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="John Doe"
                                            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-blue-400 bg-white'}`}
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            autoFocus
                                        />
                                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                                            WhatsApp Number * <span className="text-green-600 text-xs font-normal">(Recommended)</span>
                                        </label>
                                        <div className="relative">
                                            <MessageCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" />
                                            <input
                                                type="tel"
                                                name="whatsappNumber"
                                                placeholder="+66 or your country code"
                                                className={`w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.whatsappNumber ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-blue-400 bg-white'}`}
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
                                            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-blue-400 bg-white'}`}
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Shipment Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-slate-900">Shipment Details</h3>
                                    <p className="text-slate-500 text-sm">Tell us about your package.</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Shipping Carrier *</label>
                                        <select
                                            name="shippingCarrier"
                                            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.shippingCarrier ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-blue-400 bg-white'}`}
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
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all bg-white"
                                            value={formData.trackingNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">What is inside the package? *</label>
                                        <textarea
                                            name="itemDescription"
                                            placeholder="e.g., 5kg of Supplements, 2 used iPhones..."
                                            rows={4}
                                            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none ${errors.itemDescription ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-blue-400 bg-white'}`}
                                            value={formData.itemDescription}
                                            onChange={handleInputChange}
                                        />
                                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                            <span>🔒</span> Please be 100% honest. We value your privacy.
                                        </p>
                                        {errors.itemDescription && <p className="text-red-500 text-xs mt-1">{errors.itemDescription}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: The Problem */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-slate-900">Current Status</h3>
                                    <p className="text-slate-500 text-sm">What issues are you facing?</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-3">What is the status? *</label>
                                        <div className="space-y-2">
                                            {CURRENT_STATUS_OPTIONS.map(option => (
                                                <label key={option.value} className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${formData.currentStatus === option.value ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 bg-white'}`}>
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
                                        <label className="block text-sm font-semibold text-slate-700 mb-3">Do you have an Import License? *</label>
                                        <div className="space-y-2">
                                            {LICENSE_STATUS_OPTIONS.map(option => (
                                                <label key={option.value} className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${formData.licenseStatus === option.value ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 bg-white'}`}>
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
                        )}

                        {/* Step 4: Evidence Upload */}
                        {currentStep === 4 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-slate-900">Upload Evidence</h3>
                                    <p className="text-slate-500 text-sm">Optional but helpful</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative bg-white">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                        />
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Upload size={24} />
                                        </div>
                                        <p className="font-semibold text-slate-700">Click to upload documents</p>
                                        <p className="text-xs text-slate-400 mt-2">Notification Slip, Tracking Screenshot, etc.</p>
                                    </div>

                                    {formData.files.length > 0 && (
                                        <div className="space-y-3">
                                            <p className="text-sm font-semibold text-slate-700">Attached Files:</p>
                                            {formData.files.map((f, i) => {
                                                const ext = f.name.split('.').pop().toLowerCase();
                                                const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'].includes(ext) || f.type.startsWith('image/');
                                                const isPdf = ext === 'pdf';
                                                const isExcell = ['xls', 'xlsx', 'csv'].includes(ext);
                                                const isWord = ['doc', 'docx'].includes(ext);

                                                return (
                                                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in group">
                                                        {/* Preview/Icon */}
                                                        <div className="w-12 h-12 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center border border-slate-100">
                                                            {isImage ? (
                                                                <img
                                                                    src={f.preview}
                                                                    alt={f.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : isPdf ? (
                                                                <FileText className="text-red-500" size={24} />
                                                            ) : isExcell ? (
                                                                <FileSpreadsheet className="text-green-600" size={24} />
                                                            ) : isWord ? (
                                                                <FileText className="text-blue-600" size={24} />
                                                            ) : (
                                                                <FileIcon className="text-slate-400" size={24} />
                                                            )}
                                                        </div>

                                                        {/* Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-slate-700 truncate">{f.name}</p>
                                                            <p className="text-xs text-slate-500">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        </div>

                                                        {/* Delete */}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFile(i)}
                                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-sm text-blue-800">
                                        <span className="text-2xl">💡</span>
                                        <p>Uploading the "Notification Slip" allows us to see the exact tariff code and give you the most accurate assessment.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </form>

                {/* Footer Navigation */}
                <div className="p-4 md:p-6 border-t border-slate-100 bg-white">
                    <div className="flex gap-3 max-w-xl mx-auto">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-4 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                            >
                                <ArrowLeft size={20} />
                            </button>
                        )}

                        {currentStep < 4 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex-1 px-8 py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg flex items-center justify-center gap-2 transition-all group"
                            >
                                Next Step
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    'Processing...'
                                ) : (
                                    <>
                                        Submit Request
                                        <Send size={20} />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}