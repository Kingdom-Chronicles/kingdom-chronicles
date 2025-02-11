import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Feedback: React.FC = () => {
  const { theme } = useTheme();

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8 text-indigo-600" />,
      title: 'Email',
      value: 'support@kingdomchroniclesug.com',
      link: 'mailto:masikotimo@gmail.com',
      description: 'Send us your detailed feedback via email'
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: 'WhatsApp',
      value: '+256787219625',
      link: 'https://wa.me/256787219625',
      description: 'Chat with us on WhatsApp'
    },
    {
      icon: <Phone className="w-8 h-8 text-blue-600" />,
      title: 'Phone',
      value: '+256777127289',
      link: 'tel:+256777127289',
      description: 'Call us directly'
    }
  ];

  return (
    <div className={`theme-base min-h-screen ${theme === 'night' ? 'bg-gray-900' : 'bg-gradient-to-b from-indigo-50 to-white'}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-3xl font-bold mb-4 ${theme === 'night' ? 'text-white' : 'text-gray-900'}`}>
            We'd Love to Hear From You
          </h1>
          <p className={`text-lg ${theme === 'night' ? 'text-gray-300' : 'text-gray-600'}`}>
            Your feedback helps us improve Kingdom Chronicles for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.link}
              className={`block p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                theme === 'night' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{method.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'night' ? 'text-white' : 'text-gray-900'}`}>
                  {method.title}
                </h3>
                <p className={`font-medium mb-2 ${theme === 'night' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {method.value}
                </p>
                <p className={`text-sm ${theme === 'night' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {method.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;