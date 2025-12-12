import Link from 'next/link';
import { ScrollText, ShieldAlert, Gavel, AlertTriangle, Clock, PackageCheck } from 'lucide-react';

export const metadata = {
  title: "Terms and Conditions | Clearpost",
  description: "Terms of service and conditions for using Clearpost logistics services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600">
      
      {/* --- Navbar (Consistent with inner pages) --- */}
      <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                    <img src="/logo-icon.png" alt="CP" className="w-6 h-6 object-contain" />
                </div>
                <span className="font-bold text-2xl text-slate-900 tracking-tight">Clearpost<span className="text-blue-500">.</span></span>
            </Link>

            <Link href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">
                &larr; Back to Home
            </Link>
        </div>
      </nav>

      {/* --- Header Section --- */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
            <ScrollText size={16} /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By proceeding with an order or auction, you agree to be bound by these conditions.
          </p>
        </div>
      </section>

      {/* --- Content Section --- */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 space-y-12">
            
            {/* 1. Pre-order Requirements */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                    Requirements Before Ordering or Bidding
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    Before authorizing the Company to proceed with any purchase or auction, you must thoroughly study the product details and the seller's reputation. Once the item has been exported from the country of origin, <strong>refunds or order cancellations are strictly prohibited.</strong> Cancellations or refund requests are only permissible if the item is still within the country of origin and strictly subject to the seller's return policy. Any return shipping costs will be charged according to the Company's rates.
                </p>
            </div>

            {/* 2. Company Responsibility */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                    Company Duties and Responsibilities
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    In cases where you use our purchasing or auction agent services, the Company acts solely as an <strong>intermediary</strong> for the transaction with your chosen seller. We are not liable for any errors committed by the seller, including but not limited to: items not matching the description, breakage, incorrect size, incomplete quantity, or the seller's refusal to refund. If issues arise from the purchase or auction, the Company will act only as a representative to follow up and inquire on your behalf.
                </p>
            </div>

            {/* 3. Seller Responsibility */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span>
                    Seller's Responsibility (Packaging)
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    Although the Company strives to inspect packaging from sellers, if we find it substandard, we may re-pack your item for safety during transport. However, we are not liable for damage caused by the seller's original packaging failing to meet international shipping safety standards or the conditions of the international freight carriers we utilize.
                </p>
            </div>

            {/* 4. Packing Responsibility */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">4</span>
                    Company's Packing Responsibility
                </h3>
                <div className="pl-11 space-y-4">
                    <p className="leading-relaxed text-slate-600">
                        The Company provides <strong>no warranty against breakage or damage</strong> caused by transport, even if we have packed the item according to international standards.
                    </p>
                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex gap-3 items-start">
                        <AlertTriangle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                        <p className="text-sm text-orange-800">
                            If your item is fragile, you must request <strong>extra safety packing</strong> (additional fees apply). The Company reserves the right to refuse orders for items that are highly prone to breakage.
                        </p>
                    </div>
                    <p className="leading-relaxed text-slate-600">
                        Coverage is provided <strong>only for lost items</strong> while under the Company's direct responsibility, in which case the Company will compensate the full value of the goods.
                    </p>
                </div>
            </div>

            {/* 5. Lost Items (Inspection) */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">5</span>
                    Liability for Loss Due to Inspection
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    Your shipment may be opened and inspected by government officials or legal authorities in both the origin and destination countries. The Company cannot be held responsible for damages such as missing items, quantity discrepancies, or cuts/damage to the product caused by such official inspections. However, we will do our utmost to protect your interests if such actions are deemed unlawful.
                </p>
            </div>

            {/* 6. Force Majeure (Damage) */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">6</span>
                    Liability for Force Majeure & Special Goods
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600 mb-4">
                    The Company is not liable for any damages caused by Force Majeure or events beyond our control, including:
                </p>
                <ul className="pl-11 list-disc list-inside space-y-2 text-slate-600 ml-4">
                    <li>Natural disasters (Earthquakes, Storms, Floods)</li>
                    <li>Uncontrollable events (War, Plane crashes, Aviation technology failure, Fire, Theft)</li>
                    <li>Goods sensitive to humidity (Wood, Canvas, etc.)</li>
                    <li>Goods sensitive to time (Expired products)</li>
                </ul>
                <p className="pl-11 mt-4 text-sm text-slate-500 italic">
                    Note: Protection against these events is available via Shipping Insurance (premiums apply).
                </p>
            </div>

            {/* 7. Coverage Scope */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">7</span>
                    Scope of Liability
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    The Company's responsibility covers the goods only while they are in transit from the seller to our Thailand office. Once the goods have been handed over to a domestic courier in Thailand, they are considered out of the Company's coverage. Subsequent loss or damage depends on the coverage of the domestic courier.
                </p>
            </div>

            {/* 8. Receipt of Goods */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">8</span>
                    Inspection Upon Receipt
                </h3>
                <div className="pl-11 space-y-4">
                    <p className="leading-relaxed text-slate-600">
                        Upon receiving your goods, you must inspect the box condition, quantity, and correctness immediately. Please take photos as evidence.
                    </p>
                    <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex gap-3 items-start">
                        <Clock className="text-red-500 mt-1 flex-shrink-0" size={18} />
                        <p className="text-sm text-red-800">
                            If you find any damage, loss, or abnormalities, <strong>you must notify the Company within 24 hours.</strong> You must retain all original packaging while the issue is being resolved.
                        </p>
                    </div>
                </div>
            </div>

            {/* 9. Domestic Delivery */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">9</span>
                    Domestic Delivery Responsibility
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    You have the right to choose your preferred domestic courier. However, if the chosen courier cannot deliver to your address due to force majeure, the Company reserves the right to change the courier without prior notice.
                </p>
            </div>

            {/* 10. Storage Policy */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">10</span>
                    Storage Policy
                </h3>
                <div className="pl-11 space-y-4">
                    <p className="leading-relaxed text-slate-600">
                        Goods can be stored at our Thailand office for up to <strong>30 days</strong> free of charge. We do not guarantee against damage caused by storage (humidity, temperature, expiration).
                    </p>
                    <div className="bg-slate-100 p-4 rounded-xl">
                        <p className="text-sm text-slate-700 font-medium">
                            If goods remain uncollected or unpaid for more than 30 days after notification, the Company reserves the right to sell or dispose of the items without prior notice.
                        </p>
                    </div>
                </div>
            </div>

            {/* 11. Payment */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">11</span>
                    Payment Terms
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    Service fees must be paid within <strong>7 days</strong> of notification that the goods have arrived in Thailand. The Company reserves the right to withhold delivery until payment is received.
                </p>
            </div>

            {/* 12. Delivery Time */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">12</span>
                    Delivery Estimates
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    Delivery times are estimates only. The Company is not liable for direct or indirect damages caused by delays. Delays may occur due to customs operations, natural disasters, strikes, terrorism, or other uncontrollable factors.
                </p>
            </div>

            {/* 13. Prohibited Goods */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">13</span>
                    Prohibited Goods & Compliance
                </h3>
                <div className="pl-11 space-y-4">
                    <p className="leading-relaxed text-slate-600">
                        As a licensed customs broker, we strictly adhere to the law. If we discover smuggled or prohibited items that result in seizure or damage to the Company, we reserve the right to claim compensation from you. We will fully cooperate with authorities, including providing testimony and evidence for legal proceedings.
                    </p>
                    <div className="flex gap-2 items-center text-red-600 font-bold text-sm">
                        <ShieldAlert size={18} />
                        STRICT ZERO TOLERANCE POLICY
                    </div>
                </div>
            </div>

             {/* 14. Inspection Rights */}
             <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">14</span>
                    Right to Inspect
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    The Company reserves the right to open and inspect goods without prior notice to identify/record product types and for customs clearance purposes.
                </p>
            </div>

             {/* 15. Price Changes */}
             <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">15</span>
                    Shipping Rate Adjustments
                </h3>
                <p className="pl-11 leading-relaxed text-slate-600">
                    The Company reserves the right to adjust shipping rates without prior notice in accordance with changes in operational costs.
                </p>
            </div>

        </div>
      </section>

      {/* Footer is handled globally in layout.jsx */}
    </div>
  );
}