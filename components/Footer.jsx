'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Mail, Phone, MessageCircle, MapPin, CheckCircle, Plane, X } from 'lucide-react';

export default function Footer() {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <>
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <img src="/logo-icon.png" alt="CP" className="w-5 h-5 object-contain" />
              </div>
              ClearPost
            </div>
            <p className="text-sm leading-relaxed mb-6">
              The modern antidote to Thai Customs chaos. We help you clear shipments faster, cheaper, and without the headaches.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"><Globe size={18} /></div>
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"><Mail size={18} /></div>
            </div>
          </div>



          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MessageCircle size={18} /> Line: @clearpost
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} /> support@clearpost.co.th
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} /> 02-XXX-XXXX
              </li>
              <li className="flex items-start gap-3 mt-4 text-slate-500">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span>1222/310 Liab Klong Rangsit Road,<br />Prachathipat, Thanyaburi, Pathum Thani 12130</span>
              </li>
            </ul>
          </div>

          {/* Compliance / Trust */}
          <div>
            <h4 className="text-white font-bold mb-6">Verified Business</h4>
            <div
              className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
              onClick={() => setShowCertificate(true)}
            >
              <p className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
                <CheckCircle size={14} className="text-green-500" />
                VAT Registered
              </p>
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-white/10">
                <Image
                  src="/images/trust/pp20.jpg"
                  alt="VAT Registration Certificate (Por Por 20)"
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">Click to Zoom</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 text-center">Tax ID Verified</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-900 text-center text-sm text-slate-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} ClearPost International Co., Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setShowCertificate(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
            >
              <X size={32} />
            </button>
            <div className="relative w-full h-auto max-h-[85vh] aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/trust/pp20.jpg"
                alt="VAT Certificate Full"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}