import { useState } from 'react';
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';
import ContactForm from './ContactForm';
import { translations } from '../translations';

interface ContactProps {
  t: typeof translations['es'];
}

export default function Contact({ t }: ContactProps) {
  const [showForm, setShowForm] = useState(false);

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: t.contact.email,
      value: 'soyandresalmeida@gmail.com',
      link: 'mailto:soyandresalmeida@gmail.com',
    },
    {
      icon: <Phone size={24} />,
      label: t.contact.phone,
      value: '+34 633 084 828',
      link: 'tel:+34633084828',
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/soyandresalmeida',
      link: 'https://linkedin.com/in/soyandresalmeida',
    },
    {
      icon: <Instagram size={24} />,
      label: 'Instagram',
      value: '@soyandresalmeida',
      link: '#',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          {t.contact.title}
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          {t.contact.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="text-[#0A66C2]">{item.icon}</div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">{item.label}</p>
                <p className="text-gray-900 font-medium">{item.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Botón que despliega el formulario */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#0A66C2] hover:bg-[#084a8f] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          >
            {showForm ? t.contact.hideForm : t.contact.showForm}
          </button>
        </div>

        {/* Formulario visible al presionar el botón */}
        <div
          className={`transition-all duration-700 ease-in-out transform ${
           showForm
              ? 'opacity-100 scale-100 blur-0 mt-8'
              : 'opacity-0 scale-95 blur-sm max-h-0 overflow-hidden'
        }`}
        >
          <div className="backdrop-blur-sm bg-white/70 rounded-2xl shadow-xl p-4">
             <ContactForm t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}
