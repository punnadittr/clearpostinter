import React from 'react';
import Link from 'next/link';
import { Globe, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6 text-white">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <img src="/logo-icon.png" alt="CP" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-bold text-2xl">Clearpost.</span>
          </div>
          <p className="max-w-xs mb-8 leading-relaxed">
            Modern logistics for the modern importer. We simplify the complex world of Thai Customs regulations.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"><Globe size={18} /></div>
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"><Mail size={18} /></div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 hover:text-blue-400 cursor-pointer transition-colors">
              <Phone size={20} className="mt-1 flex-shrink-0" />
              <span>+66 8X XXX XXXX<br /><span className="text-xs text-slate-500">Mon-Fri, 9am - 6pm</span></span>
            </li>
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer transition-colors">
              <Mail size={20} className="flex-shrink-0" /> contact@clearpost-th.com
            </li>
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer transition-colors">
              <MessageCircle size={20} className="flex-shrink-0" /> WhatsApp Support
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Office</h4>
          <div className="flex gap-3 items-start">
            <MapPin size={20} className="flex-shrink-0 mt-1" />
            <p>123 Logistics Park,<br />Klong Luang, Pathum Thani<br />Thailand 12120</p>
          </div>
          <p className="mt-4 text-xs text-slate-600">
            *Meetings by appointment only
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-900 text-center text-sm text-slate-600 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Clearpost Logistics Co., Ltd.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}