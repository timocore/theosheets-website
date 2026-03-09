"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string | React.ReactNode;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

interface FAQAccordionProps {
  sections: FAQSection[];
}

export function FAQAccordion({ sections }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-2">
        {sections.map((section, index) => (
          <button
            key={section.title}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="px-3 py-1.5 text-sm text-charcoal-light hover:text-honey hover:bg-parchment-dark rounded transition-colors"
          >
            {section.title}
          </button>
        ))}
      </nav>
      <div className="space-y-2">
      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={section.title}
            className="border border-border-warm rounded-lg overflow-hidden bg-white/60"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-serif text-lg text-charcoal hover:bg-parchment-dark/50 transition-colors"
            >
              <span>{section.title}</span>
              <svg
                className={`w-5 h-5 text-charcoal-light transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-0 border-t border-border-warm">
                <div className="space-y-6 pt-4">
                  {section.items.map((item) => (
                    <div key={item.q}>
                      <h4 className="font-medium text-charcoal mb-2">{item.q}</h4>
                      <div className="text-charcoal-light text-sm leading-relaxed">
                        {typeof item.a === "string" ? item.a : item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}
