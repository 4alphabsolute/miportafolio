import { useState, FormEvent, ChangeEvent } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from 'emailjs-com';
import { translations } from '../translations';

interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

interface ContactFormProps {
  t: typeof translations['es'];
}

const ContactForm = ({ t }: ContactFormProps) => {
  const [form, setForm] = useState<FormData>({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // 🔹 1. Guarda en Firestore
      await addDoc(collection(db, 'mensajes'), {
        ...form,
        fecha: serverTimestamp(),
      });

      // 🔹 2. Envía correo con EmailJS
      await emailjs.send(
        'service_kfsvijd',     // ⬅️ tu Service ID
        'template_sgwzlwr',     // ⬅️ tu Template ID
        form as unknown as Record<string, unknown>,
        '7v50Xny8AMXCIriqU'            // ⬅️ tu Public Key
      );

      setEnviado(true);
      setForm({ nombre: '', email: '', mensaje: '' });
      setTimeout(() => setEnviado(false), 3000);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <input
        type="text"
        name="nombre"
        placeholder={t.contact.namePlaceholder}
        value={form.nombre}
        onChange={handleChange}
        className="block w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="email"
        name="email"
        placeholder={t.contact.emailPlaceholder}
        value={form.email}
        onChange={handleChange}
        className="block w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <textarea
        name="mensaje"
        placeholder={t.contact.messagePlaceholder}
        value={form.mensaje}
        onChange={handleChange}
        className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-[#0A66C2] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#084a8f] transition-all w-full"
      >
        {t.contact.sendButton}
      </button>
      {enviado && (
        <p className="text-green-600 font-medium mt-3 text-center animate-fade-in">
          ✅ {t.contact.successMessage}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
