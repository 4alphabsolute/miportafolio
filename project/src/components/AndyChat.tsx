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
    if (!input.trim() || !id) {
      console.log('[AndyChat] send aborted: empty input or missing id', { input, id });
      return;
    }
    const question = input.trim();
    setMessages((m) => [...m, { from: 'user', text: question }]);
    setInput('');

    try {
      setSending(true);
      const res = await fetch(`${proxyBase}/api/andybot/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Proxy error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      // Flowise prediction response shape may vary; try common fields
      let text: string;
      if (typeof data === 'string') text = data;
      else if (data.text) text = data.text;
      else if (data.output) text = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
      else text = JSON.stringify(data);

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
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-[#0A66C2] text-white rounded-full p-3 shadow-lg hover:opacity-90"
        >
          {open ? 'Cerrar Andy' : 'AndyChat'}
        </button>
      </div>

      {open && (
        <div className="fixed bottom-20 left-6 w-96 h-96 bg-white rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
          <div className="p-3 border-b">AndyBot</div>
          <div ref={scrollRef} className="flex-1 p-3 overflow-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.from === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block p-2 rounded ${m.from === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border p-2 rounded" disabled={sending} />
            <button onClick={send} className="bg-[#0A66C2] text-white px-4 rounded" disabled={sending}>
              {sending ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
