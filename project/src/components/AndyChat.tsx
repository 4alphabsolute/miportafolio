import { useState, useRef, useEffect } from 'react';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

export default function AndyChat({ canvasId }: { canvasId?: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const id = canvasId || (import.meta.env.VITE_FLOWISE_CANVAS_ID as string) || '';
  const proxyBase = (import.meta.env.VITE_FLOWISE_PROXY as string) || 'http://localhost:4000';
  const [sending, setSending] = useState(false);

  const send = async () => {
    console.log('[AndyChat] send() called, input=', input);
    if (!input.trim()) {
      console.log('[AndyChat] send aborted: empty input');
      return;
    }
    const question = input.trim();
    setMessages((m) => [...m, { from: 'user', text: question }]);
    setInput('');

    try {
      setSending(true);
      
      // Usar Vercel function en producción o localhost en desarrollo
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/chat'
        : `${proxyBase}/api/andybot/${id}`;
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`API error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      
      // Manejar respuesta de Vercel o Flowise
      let text: string;
      if (typeof data === 'string') {
        text = data;
      } else if (data.text) {
        text = data.text;
      } else if (data.output) {
        text = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
      } else {
        text = JSON.stringify(data);
      }

      setMessages((m) => [...m, { from: 'bot', text }]);
      console.log('[AndyChat] received bot text:', text);
    } catch (err: any) {
      console.error('[AndyChat] send error', err);
      setMessages((m) => [...m, { from: 'bot', text: 'Error en la comunicación con AndyBot.' }]);
    } finally {
      setSending(false);
    }
  };

  // autoscroll to bottom when messages change
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-gradient-to-r from-[#0A66C2] to-[#0052A3] text-white rounded-full p-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center gap-2">
            {open ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                <span className="hidden group-hover:inline text-sm">Cerrar</span>
              </>
            ) : (
              <>
                <span className="text-xl">🤖</span>
                <span className="text-sm font-medium">AndyChat</span>
              </>
            )}
          </div>
        </button>
      </div>

      {open && (
        <div className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A66C2] to-[#0052A3] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3 className="font-semibold">AndyBot</h3>
                <p className="text-xs opacity-90">Asistente de Andrés Almeida</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-auto space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <div className="text-4xl mb-2">💼</div>
                <p className="font-medium">¡Hola! Soy AndyBot</p>
                <p className="text-sm">Pregúntame sobre la experiencia,</p>
                <p className="text-sm">habilidades y proyectos de Andrés</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                  m.from === 'user' 
                    ? 'bg-[#0A66C2] text-white rounded-br-md' 
                    : 'bg-white text-gray-800 rounded-bl-md border'
                }`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                  <div className={`text-xs mt-1 opacity-70 ${
                    m.from === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-md border shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">AndyBot está escribiendo...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !sending && send()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent" 
                disabled={sending} 
              />
              <button 
                onClick={send} 
                className="bg-[#0A66C2] text-white p-3 rounded-xl hover:bg-[#0052A3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={sending || !input.trim()}
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
