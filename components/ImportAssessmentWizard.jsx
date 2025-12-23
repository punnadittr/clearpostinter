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
    File as FileIcon,
    Loader2
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
    { value: 'notification', label: 'I received a "Collection Notification" slip (ใบแจ้งให้ไปรับของ)', allowedCarriers: ['thaipost'] },
    { value: 'held', label: 'Tracking status says "Held by Customs"', allowedCarriers: ['thaipost', 'express', 'freight'] },
    { value: 'documents', label: "Courier (DHL/FedEx) asks for documents I don't have", allowedCarriers: ['express'] },
    { value: 'freight_arrival', label: "Airline/Forwarder notified me of arrival", allowedCarriers: ['freight'] },
    { value: 'baggage_retained', label: "My baggage was retained at the airport (I have a receipt)", allowedCarriers: ['handcarry'] },
    { value: 'preimport', label: "Shipping hasn't arrived yet (Pre-import consultation)", allowedCarriers: ['thaipost', 'express', 'freight', 'handcarry'] }
];

const LICENSE_STATUS_OPTIONS = [
    { value: 'yes', label: 'Yes, I have all documents' },
    { value: 'no', label: "No, I don't have an Import License" },
    { value: 'unknown', label: "I don't know what is needed" }
];

const EXAMPLE_DOCUMENTS = [
    { src: '/assets/examples/thai-post-notification.png', label: 'Notification Slip', desc: 'Blue/White Card', allowedCarriers: ['thaipost'] },
    { src: '/assets/examples/waybill.jpg', label: 'Airway Bill', desc: 'Tracking Label', allowedCarriers: ['express'] },
    { src: '/assets/examples/cargo-awb.jpg', label: 'Airway Bill', desc: 'Cargo Format', allowedCarriers: ['freight'] },
    { src: '/assets/examples/invoice.jpg', label: 'Invoice', desc: 'Product Details', allowedCarriers: ['express', 'freight'] },
    { src: '/assets/examples/customs-receipt.jpg', label: 'Customs Receipt', desc: 'White Form', allowedCarriers: ['handcarry'] },
    { src: '/assets/examples/customs-receipt-green.jpg', label: 'Customs Receipt', desc: 'Green Form', allowedCarriers: ['handcarry'] },
    { src: '/assets/examples/handcarry-invoice.jpg', label: 'Invoice', desc: 'Proof of Purchase', allowedCarriers: ['handcarry'] },
    { src: '/assets/examples/receipt.jpg', label: 'Purchase Receipt', desc: 'Proof of Payment', allowedCarriers: ['thaipost'] }
];

const POPULAR_ITEMS = [
    "Vitamins/Supplements", "Cosmetics", "Clothing",
    "Electronics", "Auto Parts", "Toys/Figures",
    "Bag", "Shoes", "Documents"
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

export default function ImportAssessmentWizard({ onClose }) {
    const router = useRouter();
    const [viewingImage, setViewingImage] = useState(null);
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
            let evidencePayload = null;
            const uploadedUrls = [];

            // Upload files sequentially to avoid race conditions and improved error handling
            if (formData.files.length > 0) {
                for (const file of formData.files) {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('evidence')
                        .upload(fileName, file);

                    if (uploadError) {
                        console.error('File upload error:', uploadError);
                        // We continue with other files or throw depending on strictness. 
                        // Let's throw to let user know something went wrong.
                        throw new Error(`File upload failed for ${file.name}: ${uploadError.message}`);
                    }

                    // Get public URL
                    const { data: urlData } = supabase.storage
                        .from('evidence')
                        .getPublicUrl(fileName);

                    if (urlData?.publicUrl) {
                        uploadedUrls.push(urlData.publicUrl);
                    }
                }

                if (uploadedUrls.length === 1) {
                    evidencePayload = uploadedUrls[0];
                } else if (uploadedUrls.length > 1) {
                    evidencePayload = JSON.stringify(uploadedUrls);
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
                    evidence_url: evidencePayload,
                }]);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            // Helper to get labels
            const getLabel = (options, value) => {
                const found = options.find(opt => opt.value === value);
                return found ? found.label : value;
            };

            const shippingLabel = getLabel(SHIPPING_CARRIERS, formData.shippingCarrier);
            const statusLabel = getLabel(CURRENT_STATUS_OPTIONS, formData.currentStatus);
            const licenseLabel = getLabel(LICENSE_STATUS_OPTIONS, formData.licenseStatus);

            // Send confirmation email
            try {
                await fetch('/api/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: formData.email,
                        subject: 'Import Assessment Request Received - Clearpost',
                        html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Submission Received</title>
                        </head>
                        <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                                <!-- Header -->
                                <tr>
                                    <td style="background-color: #1e3a8a; padding: 40px 0; text-align: center;">
                                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">CLEARPOST</h1>
                                        <p style="color: #93c5fd; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Import Solutions</p>
                                    </td>
                                </tr>

                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 20px;">Hello ${formData.fullName},</h2>
                                        <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin: 0 0 30px 0;">
                                            We have received your request for an import assessment. Our team is currently reviewing your details and will contact you shortly via WhatsApp.
                                        </p>

                                        <!-- Summary Card -->
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; border-radius: 8px; margin-bottom: 30px;">
                                            <tr>
                                                <td style="padding: 24px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td style="padding-bottom: 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Request Details</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 12px 0 4px 0; color: #6b7280; font-size: 14px;">Item Description</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding-bottom: 16px; color: #111827; font-size: 16px; font-weight: 500;">${formData.itemDescription}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 12px 0 4px 0; color: #6b7280; font-size: 14px;">Shipping Carrier</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding-bottom: 16px; color: #111827; font-size: 16px; font-weight: 500;">${shippingLabel}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 12px 0 4px 0; color: #6b7280; font-size: 14px;">Current Status</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding-bottom: 16px; color: #111827; font-size: 16px; font-weight: 500;">${statusLabel}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 12px 0 4px 0; color: #6b7280; font-size: 14px;">License Status</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding-bottom: 0; color: #111827; font-size: 16px; font-weight: 500;">${licenseLabel}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin: 0;">
                                            If you have any urgent questions, please feel free to reply to this email.
                                        </p>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                        <p style="color: #9ca3af; font-size: 14px; margin: 0 0 8px 0;">&copy; ${new Date().getFullYear()} Clearpost International</p>
                                        <p style="color: #9ca3af; font-size: 14px; margin: 0;">Bangkok, Thailand</p>
                                    </td>
                                </tr>
                            </table>
                        </body>
                        </html>
                    `
                    })
                });
            } catch (emailErr) {
                console.error('Email sending failed:', emailErr);
                // We do NOT block success here, just log it.
            }

            setIsSuccess(true);
        } catch (err) {
            console.error('Submission error:', err);
            alert(`Error: ${err.message}`);
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

                {/* Loading Overlay */}
                {isSubmitting && (
                    <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
                        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center max-w-sm w-full mx-4">
                            <div className="relative w-20 h-20 mb-6">
                                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                <Loader2 className="absolute inset-0 w-full h-full text-blue-600 p-6 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Processing...</h3>
                            <p className="text-slate-500 text-center text-sm">
                                {formData.files.length > 0 ? "Securely uploading your documents and submitting request..." : "Submitting your request..."}
                            </p>
                        </div>
                    </div>
                )}

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

                                        {/* Quick Add Tags */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {POPULAR_ITEMS.map(item => (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            itemDescription: prev.itemDescription
                                                                ? prev.itemDescription + ', ' + item
                                                                : item
                                                        }));
                                                        // Clear error if exists
                                                        if (errors.itemDescription) {
                                                            setErrors(prev => ({ ...prev, itemDescription: null }));
                                                        }
                                                    }}
                                                    className="text-xs bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 rounded-full px-3 py-1 transition-all flex items-center gap-1"
                                                >
                                                    <span>+</span> {item}
                                                </button>
                                            ))}
                                        </div>
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
                                            {CURRENT_STATUS_OPTIONS.filter(opt => opt.allowedCarriers.includes(formData.shippingCarrier)).map(option => (
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

                                {/* Example Documents Gallery */}
                                <div className="mb-6">
                                    <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                        <span>👀</span> Helpful Examples (Scroll to view)
                                    </p>

                                    <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                                        {EXAMPLE_DOCUMENTS
                                            .filter(doc => doc.allowedCarriers.includes(formData.shippingCarrier))
                                            .map((doc, idx) => (
                                                <div
                                                    key={idx}
                                                    className="snap-start flex-shrink-0 w-32 md:w-40 flex flex-col gap-2 group cursor-zoom-in"
                                                    onClick={() => setViewingImage(doc)}
                                                >
                                                    <div className="aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-50 transition-all group-hover:shadow-md group-hover:border-blue-200">
                                                        <img
                                                            src={doc.src}
                                                            alt={doc.label}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                            <div className="bg-white/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                                <div className="w-4 h-4 text-slate-900">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center px-1">
                                                        <p className="text-xs font-bold text-slate-700 leading-tight">{doc.label}</p>
                                                        <p className="text-[10px] text-slate-500 mt-0.5">{doc.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
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

            {/* Image Lightbox */}
            {viewingImage && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in" onClick={() => setViewingImage(null)}>
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 transition-colors"
                        onClick={() => setViewingImage(null)}
                    >
                        <X size={32} />
                    </button>
                    <div className="relative max-w-4xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        <img
                            src={viewingImage.src}
                            alt={viewingImage.label}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                        />
                        <div className="mt-4 text-white text-center">
                            <p className="font-bold text-lg">{viewingImage.label}</p>
                            <p className="text-slate-300">{viewingImage.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}