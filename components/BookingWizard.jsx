'use client';

import React, { useState } from 'react';
import {
    Truck,
    Plane,
    User,
    Upload,
    CreditCard,
    CheckCircle,
    AlertCircle,
    FileText,
    X,
    Plus,
    ArrowRight,
    ArrowLeft,
    Download
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { exportToExcel } from '../utils/excelExport';

const STEPS = [
    { id: 'location', title: 'Clearance Location' },
    { id: 'documents', title: 'Documents' },
    { id: 'success', title: 'Confirmation' }
];

const LOCATIONS = [
    { id: 'post', label: 'Thailand Post', icon: Truck, desc: 'For EMS, Registered Mail' },
    { id: 'courier', label: 'Courier (FedEx/DHL/UPS)', icon: Plane, desc: 'Express shipments' },
    { id: 'passenger', label: 'Passenger / Airport', icon: User, desc: 'Hand-carry items' }
];

const schemas = {
    0: yup.object().shape({
        serviceType: yup.string().required('Please select a service type'),
        location: yup.string().required('Please select a location')
    }),
    1: yup.object().shape({
        contactName: yup.string().required('Name is required'),
        contactEmail: yup.string().email('Invalid email').required('Email is required'),
        contactPhone: yup.string().matches(/^[0-9+\-\s]+$/, 'Invalid phone number').required('Phone is required'),
        hasInvoice: yup.boolean(),
        files: yup.array().when('hasInvoice', {
            is: true,
            then: (schema) => schema.min(1, 'Please upload at least one document')
        }),
        items: yup.array().when('hasInvoice', {
            is: false,
            then: (schema) => schema.of(
                yup.object().shape({
                    desc: yup.string().required('Description required'),
                    qty: yup.number().min(1, 'Min 1').required(),
                    value: yup.number().min(0).required()
                })
            ).min(1, 'Add at least one item')
        })
    })
};

export default function BookingWizard({ onClose }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        serviceType: 'general', // Default
        location: '',
        hasInvoice: true,
        files: [],
        items: [{ desc: '', qty: 1, value: 0 }], // For manual entry
        contactName: '',
        contactEmail: '',
        contactPhone: ''
    });

    const handleNext = async () => {
        try {
            if (schemas[currentStep]) {
                await schemas[currentStep].validate(formData, { abortEarly: false });
                setErrors({});
            }
            if (currentStep < STEPS.length - 1) {
                // If moving from step 1 to 2, we actually submit
                if (currentStep === 1) {
                    await handleSubmit();
                } else {
                    setCurrentStep(curr => curr + 1);
                }
            }
        } catch (err) {
            const newErrors = {};
            if (err.inner) {
                err.inner.forEach(error => {
                    if (error.path && error.path.startsWith('items[')) {
                        newErrors['items'] = 'Please complete all item fields';
                    } else if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });
            } else {
                console.error(err);
            }
            setErrors(newErrors);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(curr => curr - 1);
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

    const updateItem = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData(prev => ({ ...prev, items: newItems }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { desc: '', qty: 1, value: 0 }]
        }));
    };

    const removeItem = (index) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    // Prepare data for Netlify submission
    const encode = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === 'files') {
                // File upload handling
            } else if (key === 'items') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        });
        return formData;
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);

        try {
            const formPayload = new FormData();
            formPayload.append('form-name', 'customs-request');
            formPayload.append('serviceType', formData.serviceType);
            formPayload.append('location', formData.location);
            formPayload.append('hasInvoice', formData.hasInvoice.toString());
            formPayload.append('items', JSON.stringify(formData.items));
            formPayload.append('contactName', formData.contactName);
            formPayload.append('contactEmail', formData.contactEmail);
            formPayload.append('contactPhone', formData.contactPhone);

            // Append files if present
            formData.files.forEach((file) => {
                formPayload.append('docs', file);
            });

            await fetch('/', {
                method: 'POST',
                body: formPayload,
            });

            // Auto-export Excel
            // exportToExcel(formData, `Clearpost_Booking_${Date.now()}.xlsx`);

            setCurrentStep(curr => curr + 1); // Go to success
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">1. Service Type</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {[
                                    { id: 'general', label: 'General Import', desc: 'Standard goods' },
                                    { id: 'restricted', label: 'Restricted', desc: 'FDA, TISI, Permits' },
                                    { id: 'consultation', label: 'Consultation', desc: 'Advice only' }
                                ].map(type => (
                                    <label key={type.id} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.serviceType === type.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                                        <input
                                            type="radio"
                                            name="serviceType"
                                            value={type.id}
                                            checked={formData.serviceType === type.id}
                                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                            className="sr-only"
                                        />
                                        <div className="font-bold text-slate-900">{type.label}</div>
                                        <div className="text-xs text-slate-500">{type.desc}</div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">2. Service Point</h3>
                            {errors.location && <p className="text-red-500 text-sm font-medium">{errors.location}</p>}
                            <div className="grid gap-3">
                                {LOCATIONS.map(loc => (
                                    <label key={loc.id} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${formData.location === loc.id ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'}`}>
                                        <input
                                            type="radio"
                                            name="location"
                                            value={loc.id}
                                            checked={formData.location === loc.id}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-5 h-5 text-blue-600"
                                        />
                                        <div className={`p-3 rounded-full ${formData.location === loc.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            <loc.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{loc.label}</p>
                                            <p className="text-sm text-slate-500">{loc.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-6 animate-fade-in-up">
                        <h3 className="text-2xl font-bold text-slate-900">Documents</h3>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.contactName ? 'border-red-400 focus:border-red-400' : 'focus:border-blue-400'}`}
                                    value={formData.contactName}
                                    onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                                />
                                {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.contactEmail ? 'border-red-400 focus:border-red-400' : 'focus:border-blue-400'}`}
                                    value={formData.contactEmail}
                                    onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                                />
                                {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+66 81 234 5678"
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-all ${errors.contactPhone ? 'border-red-400 focus:border-red-400' : 'focus:border-blue-400'}`}
                                    value={formData.contactPhone}
                                    onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                                />
                                {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                            <div className="flex items-center gap-2 text-yellow-800">
                                <AlertCircle size={20} className="shrink-0" />
                                <span className="font-medium text-sm sm:text-base">Do you have a Commercial Invoice?</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto mt-2 sm:mt-0">
                                <input type="checkbox" className="sr-only peer" checked={formData.hasInvoice} onChange={() => setFormData(prev => ({ ...prev, hasInvoice: !prev.hasInvoice }))} />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shrink-0"></div>
                                <span className={`ml-3 text-sm font-medium ${formData.hasInvoice ? 'text-blue-600' : 'text-slate-500'}`}>
                                    {formData.hasInvoice ? 'Yes, I have it' : "No, I don't"}
                                </span>
                            </label>
                        </div>

                        {formData.hasInvoice ? (
                            <>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative">
                                    <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                                    <Upload className="mx-auto text-slate-400 mb-4" size={32} />
                                    <p className="font-bold text-slate-700">Click to upload Invoice / Airway Bill</p>
                                    <p className="text-sm text-slate-500 mt-2">PDF, JPG, PNG accepted</p>
                                </div>
                                {errors.files && <p className="text-red-500 text-sm font-medium mt-1">{errors.files}</p>}
                            </>
                        ) : (
                            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                                {formData.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                                            <input
                                                type="text"
                                                placeholder="Item Description"
                                                className="w-full p-2 border rounded-lg text-sm"
                                                value={item.desc}
                                                onChange={e => updateItem(idx, 'desc', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Qty</label>
                                            <input
                                                type="number"
                                                placeholder="1"
                                                className="w-16 p-2 border rounded-lg text-sm"
                                                value={item.qty}
                                                onChange={e => updateItem(idx, 'qty', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Value (THB)</label>
                                            <input
                                                type="number"
                                                placeholder="500"
                                                className="w-24 p-2 border rounded-lg text-sm"
                                                value={item.value}
                                                onChange={e => updateItem(idx, 'value', parseFloat(e.target.value))}
                                            />
                                        </div>
                                        <button onClick={() => removeItem(idx)} className="p-2 text-red-400 hover:text-red-600"><X size={16} /></button>
                                    </div>
                                ))}
                                <button onClick={addItem} className="text-sm text-blue-600 font-bold flex items-center gap-1 hover:underline">
                                    <Plus size={16} /> Add Item
                                </button>
                                {errors.items && <p className="text-red-500 text-xs">{errors.items}</p>}
                            </div>
                        )
                        }

                        {
                            formData.files.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-slate-700">Attached Files:</p>
                                    {formData.files.map((f, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded border border-slate-100">
                                            <span className="truncate max-w-[200px]">{f.name}</span>
                                            <button onClick={() => removeFile(i)} className="text-red-500 hover:text-red-700"><X size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div >
                );

            case 2:
                // Success Step
                return (
                    <div className="text-center py-8 animate-fade-in-up">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h3>
                        <p className="text-slate-600 mb-8 max-w-md mx-auto">
                            We have received your shipment details. Our team is now reviewing your documents and will contact you shortly via <strong>{formData.contactEmail}</strong>.
                        </p>



                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <button
                                onClick={() => router.push('/pay')}
                                className="w-full max-w-sm mx-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 animate-bounce-subtle"
                            >
                                <CreditCard size={20} />
                                Pay Deposit (350 THB)
                            </button>
                            <p className="text-sm text-slate-400 mt-3">Required to start processing your request</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 z-10">
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="p-8 border-b border-slate-100">
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pr-8">
                        Clearpost<span className="text-blue-600">.</span> Consultation
                    </h2>
                    {/* Progress Bar */}
                    <div className="flex items-center mt-6 relative">
                        <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-100 -z-10"></div>
                        {STEPS.map((step, idx) => (
                            <div key={idx} className={`flex-1 flex flex-col items-center gap-2 ${idx <= currentStep ? 'opacity-100' : 'opacity-40'}`}>
                                <div className={`w-3 h-3 rounded-full ${idx <= currentStep ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'}`}></div>
                                <span className="text-xs font-bold uppercase hidden sm:block">{step.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {renderStepContent()}
                </div>

                {/* Footer */}
                {currentStep < 2 && (
                    <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`px-6 py-3 rounded-xl font-bold transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-200'}`}
                        >
                            Back
                        </button>

                        {currentStep === STEPS.length - 2 ? (
                            <button
                                onClick={handleNext}
                                disabled={isSubmitting}
                                className="px-8 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 flex items-center gap-2"
                            >
                                {isSubmitting ? 'Processing...' : 'Request Consultation'} <ArrowRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg flex items-center gap-2"
                            >
                                Next Step <ArrowRight size={20} />
                            </button>
                        )}
                    </div>
                )}

                {/* Hidden Form for Netlify Detection */}
                <form name="customs-request" method="POST" data-netlify="true" encType="multipart/form-data" hidden>
                    <input type="hidden" name="form-name" value="customs-request" />
                    <input type="hidden" name="serviceType" />
                    <input type="hidden" name="location" />
                    <input type="checkbox" name="hasInvoice" />
                    <textarea name="items" />
                    <input type="text" name="contactName" />
                    <input type="email" name="contactEmail" />
                    <input type="tel" name="contactPhone" />
                    <input type="file" name="docs" multiple />
                </form>
            </div>
        </div>
    );
}
