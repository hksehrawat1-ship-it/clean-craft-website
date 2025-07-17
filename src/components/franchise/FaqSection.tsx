import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

const FaqSection = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqItems = [
    {
      id: "fee",
      question: 'Is the "franchise fee" just the beginning of my spending?',
      answer:
        "Truth: Many brands highlight a low franchise fee but hide real costs under setup, marketing, training, or tech charges. Always demand a total investment breakdown — including hidden costs like branding materials, uniforms, or opening stock.",
    },
    {
      id: "control",
      question: "Will I have control over pricing, marketing, or operations?",
      answer:
        "Truth: Some franchises don't let you decide anything — not even discounts or how to promote locally. Ask in advance: What freedom will I have to run and grow my store?",
    },
    {
      id: "success",
      question: "Are there any real success stories – or just promises?",
      answer:
        "Truth: Many brands show you model stores or selective success cases. Insist on talking directly to 3–5 existing franchisees (not handpicked by the brand) before signing. Ask them about profits, support, and the reality on ground.",
    },
    {
      id: "location",
      question: "What happens if my location doesn't perform?",
      answer:
        "Truth: Most franchise agreements do not refund your money if business is slow. Some brands even force you to continue without support. Always check if there's a performance clause, support guarantee, or exit plan in writing.",
    },
    {
      id: "supplies",
      question:
        "Will I be forced to buy supplies only from the brand – at higher rates?",
      answer:
        "Truth: Many franchisors tie you into overpriced vendor agreements for raw materials, packaging, or tech. Check if you're allowed to source locally at better rates. Otherwise, your margins can vanish fast.",
    },
    {
      id: "care",
      question: "Do they genuinely care after you've paid them?",
      answer:
        'Truth: Sadly, some brands become "ghosts" after onboarding. They\'ll stop responding, delay support, or blame the franchisee for failure. Choose a brand with an active community, regular reviews, and transparent escalation policies.',
    },
    {
      id: "expanding",
      question: "Are they expanding too fast – without real support?",
      answer:
        "Truth: Rapid franchise expansion looks flashy, but if the support team is tiny or overwhelmed, you'll be left managing on your own. Ask: How many franchises do you manage per support manager? More than 20 = red flag.",
    },
  ];

  return (
    <section id="faq" className="section bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="bg-laundry-secondary text-laundry-dark mb-4">
            Industry Insights
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            7 Hidden Things You Should Know Before Buying a Laundry Franchise in
            India
          </h2>
          <p className="text-gray-600 text-lg">
            Make an informed decision with these crucial insights about
            franchise ownership.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <Collapsible
              key={item.id}
              open={openItems[item.id]}
              onOpenChange={() => toggleItem(item.id)}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full md:p-5 py-2 px-2 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-lg  font-semibold">
                    {item.id.charAt(0).toUpperCase() + item.id.slice(1)}.
                  </span>
                  <h6 className="md:text-lg text-[14px] font-medium">
                    {item.question}
                  </h6>
                </div>
                {openItems[item.id] ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5">
                <div className="pt-2 flex gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-green-500" />
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
