import { useState } from 'react';
import { website_name } from '../../utils/constants';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                className="flex items-center justify-between w-full py-4 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium text-gray-900">
                    {question}
                </span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`} >
                <p className="text-gray-600">{answer}</p>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const faqs = [
        {
            question: 'How do Astrology predictions help me deal with my problems?',
            answer:
                'Astrology predictions can warn about challenges and obstacles in advance, allowing you to prepare for the future. These predictions are a form of guidance regarding important life decisions about your career, business choices, relationships and marriage selections.',
        },
        {
            question: `Why should you choose ${website_name} for online astrology consultation?`,
            answer:
                `${website_name} astrologers offer you top-quality guidance on personal life, marriage, career, finances and more. With phenomenal ratings and reviews by thousands of people, ${website_name} offers a variety of online astrology services like Vastu advice, Horoscope predictions, Kundli reading, tarot reading, numerology, astro consultation and more.`,
        },
        {
            question: 'Are astrology predictions true?',
            answer:
                'Yes, Astrology predictions can be trusted. These are predictions about our lives based on the movements of planets and stars. So, instead of exactly knowing what the future has in store for you, it guides you to follow certain paths and avoid particular mistakes for situations in the coming time.',
        },
        {
            question: 'What type of questions can I ask an online astrologer?',
            answer:
                `Astrology has an answer for all situations of life. In an online Jyotish consultation, you may ask anything related to health issues, current love situations, career possibilities, financial conditions, luck and much more. If I wish to consult a good astrologer near me who has handled the most difficult questions about life, the answer is ${website_name}.`,
        },
        {
            question: 'How can online astro consultation help in predicting future?',
            answer:
                `The best astrologer online will help you find clarity on situations of the future by looking at your birth chart or Kundli. They will observe the position of planets in a house where your zodiac sign is placed and predict insights to help you plan a better day personally or professionally. ${website_name} offers two options to do this - call and chat.`,
        },

        {
            question: 'Do I need to provide my personal details for a consultation?',
            answer:
                `Yes. To get an accurate astrological consultation, some personal details like your name, date of birth, place of birth, and time of birth are required. At ${website_name}, we keep all your details 100% confidential and secure. If I need to contact the top astrologer near me who also makes sure of security, reach out to ${website_name}.`,
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Understanding Astrology
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                    Frequently Asked Questions
                </p>
            </div>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </section>
    );
};

export default FAQSection;