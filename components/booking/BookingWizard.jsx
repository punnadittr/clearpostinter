"use client";

import { useState, useEffect } from "react";
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { Calendar, Clock, User, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function BookingWizard({ onCancel }) {
    const [step, setStep] = useState(1); // 1: Date, 2: Time, 3: Details, 4: Success
    const [selectedDate, setSelectedDate] = useState(addDays(startOfToday(), 1));
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null); // { time: "09:00", iso: "..." }
    const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingRef, setBookingRef] = useState(null);

    // Generate next 30 days starting from tomorrow
    const dates = Array.from({ length: 30 }, (_, i) => addDays(startOfToday(), i + 1));

    // Fetch slots when date changes
    useEffect(() => {
        async function fetchSlots() {
            setLoadingSlots(true);
            try {
                const dateStr = format(selectedDate, 'yyyy-MM-dd');
                const res = await fetch(`/api/booking/availability?date=${dateStr}`);
                const data = await res.json();
                if (data.slots) {
                    setAvailableSlots(data.slots);
                }
            } catch (err) {
                console.error("Failed to load slots", err);
            } finally {
                setLoadingSlots(false);
            }
        }
        fetchSlots();
    }, [selectedDate]);

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
        setStep(3);
    };

    const handleSubmit = async () => {
        if (!formData.name) return;
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/booking/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_name: formData.name,
                    customer_email: formData.email,
                    whatsapp: formData.whatsapp,
                    appointment_time: selectedSlot.iso
                })
            });

            const data = await res.json();
            if (res.ok) {
                setBookingRef(data.booking.id);
                setStep(4);
            } else {
                alert(data.error || "Booking failed");
            }
        } catch (err) {
            alert("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl md:shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 max-w-2xl mx-auto">
            {/* Header */}
            <div className="bg-white px-6 py-4 md:px-8 md:py-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">Select Appointment</h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">For identity verification video call</p>
                </div>

            </div>

            <div className="p-5 md:p-8">
                {step === 1 || step === 2 ? (
                    <div className="space-y-6 md:space-y-8">
                        {/* Date Picker (Horizontal) */}
                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-3 md:mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">1</span>
                                Select Date
                            </label>
                            <div className="flex gap-3 overflow-x-auto py-2 md:py-4 -mx-2 px-2 scrollbar-hide">
                                {dates.map((date) => {
                                    const isSelected = isSameDay(date, selectedDate);
                                    return (
                                        <button
                                            key={date.toISOString()}
                                            onClick={() => { setSelectedDate(date); setSelectedSlot(null); setStep(2); }}
                                            className={`flex-shrink-0 w-20 md:w-[5.5rem] py-3 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-200 group relative overflow-hidden ${isSelected
                                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20 transform scale-105 z-10'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-md'
                                                }`}
                                        >
                                            <div className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-0.5 md:mb-1 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                                                {format(date, 'EEE')}
                                            </div>
                                            <div className={`text-xl md:text-2xl font-bold mb-0.5 md:mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                                {format(date, 'd')}
                                            </div>
                                            <div className={`text-[9px] md:text-[10px] font-medium ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                                                {format(date, (date.getMonth() === 11 || date.getMonth() === 0) ? 'MMM yyyy' : 'MMM')}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <label className="text-sm font-semibold text-slate-700 mb-3 md:mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">2</span>
                                Select Time
                            </label>

                            {loadingSlots ? (
                                <div className="flex justify-center py-8 md:py-12 text-slate-400">
                                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                </div>
                            ) : availableSlots.length === 0 ? (
                                <div className="text-center py-8 md:py-12 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                    <p className="text-slate-500 font-medium">No slots available for this date.</p>
                                    <p className="text-sm text-slate-400 mt-1">Please try selecting another day.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
                                    {availableSlots.map((slot) => (
                                        <button
                                            key={slot.iso}
                                            onClick={() => slot.available && handleSlotSelect(slot)}
                                            disabled={!slot.available}
                                            className={`py-2 px-2 md:py-3 md:px-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold border transition-all duration-200 ${!slot.available
                                                ? 'bg-slate-50 text-slate-300 border-transparent cursor-not-allowed decoration-slate-300'
                                                : selectedSlot?.iso === slot.iso
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 scale-105'
                                                    : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:shadow-sm'
                                                }`}
                                        >
                                            {slot.time}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}

                {step === 3 && (
                    <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-8 duration-300">
                        <button
                            onClick={() => setStep(2)}
                            className="group flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors pl-1"
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Back to time selection</span>
                        </button>

                        <div className="bg-slate-900 rounded-xl md:rounded-2xl p-4 md:p-6 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
                            <div className="relative z-10 flex items-start gap-4">
                                <div className="p-2 md:p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-300" />
                                </div>
                                <div>
                                    <p className="text-blue-200 text-xs md:text-sm font-medium mb-1">Passpost Verification</p>
                                    <p className="text-xl md:text-2xl font-bold tracking-tight">
                                        {format(selectedDate, 'EEEE, MMMM do')}
                                    </p>
                                    <p className="text-base md:text-lg text-slate-300 font-medium mt-1">
                                        at {selectedSlot?.time}
                                    </p>
                                </div>
                            </div>
                            {/* Decorative gradient blob */}
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                        </div>

                        <div className="space-y-4 md:space-y-5">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3 md:top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700">WhatsApp Number</label>
                                <input
                                    type="tel"
                                    placeholder="+66 81 234 5678"
                                    className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                    value={formData.whatsapp}
                                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                                <p className="text-xs text-slate-500">We will update you via WhatsApp regarding your status.</p>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !formData.name || !formData.email || !formData.whatsapp}
                            className="w-full py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base md:text-lg shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:shadow-none transition-all transform active:scale-[0.98]"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>Confirm Appointment</>
                            )}
                        </button>

                        <p className="text-center text-xs text-slate-400 mt-6">
                            By booking, you agree to our <a href="/terms" className="underline hover:text-slate-600 transition-colors">Terms of Service</a> and <a href="/privacy" className="underline hover:text-slate-600 transition-colors">Privacy Policy</a>.
                            <br />Your personal information is securely processed for customs verification only.
                        </p>
                    </div>
                )}

                {step === 4 && (
                    <div className="text-center py-8 md:py-12 animate-in zoom-in duration-300">
                        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">You're Booked!</h3>
                        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 max-w-sm mx-auto">
                            <p className="text-slate-500 text-sm uppercase tracking-wide font-semibold mb-2">Appointment Time</p>
                            <p className="text-xl font-bold text-slate-900">
                                {format(selectedDate, 'MMM do')} <span className="text-slate-400 mx-2">|</span> {selectedSlot?.time}
                            </p>
                        </div>
                        <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                            We have sent a confirmation email to <strong>{formData.email}</strong>.<br />
                            Please check your inbox (and spam folder) for the meeting link.
                        </p>
                        <button
                            onClick={onCancel}
                            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                        >
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
