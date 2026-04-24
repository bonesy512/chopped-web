'use client';

import { useState } from 'react';

export function TransmitForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      callsign: formData.get('callsign'),
      channel: formData.get('channel'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/transmit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Transmission failed');
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-[#FF0000] p-12 text-center bg-[#FF0000]/10">
        <h3 className="text-[#FF0000] font-bold text-xl tracking-[0.2em] mb-4">TRANSMISSION SUCCESSFUL</h3>
        <p className="text-muted-foreground font-mono text-sm tracking-widest">
          YOUR MESSAGE HAS BEEN RECEIVED BY THE SYSTEM. WE WILL RESPOND SHORTLY.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-0 border border-border" onSubmit={handleSubmit}>
      {[
        { id: 'callsign', label: 'CALLSIGN', type: 'text', placeholder: '> ENTER HANDLE OR NAME', required: true },
        { id: 'channel', label: 'CHANNEL', type: 'email', placeholder: '> ENTER EMAIL', required: true },
        { id: 'subject', label: 'SUBJECT', type: 'text', placeholder: '> PRESS / WHOLESALE / ADVISORY / OTHER', required: true },
      ].map((field) => (
        <div key={field.id} className="border-b border-border flex flex-col sm:flex-row">
          <label
            htmlFor={field.id}
            className="text-xs font-mono text-muted-foreground tracking-widest px-4 py-4 sm:w-32 shrink-0 border-b sm:border-b-0 sm:border-r border-border"
          >
            {field.label}
          </label>
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            disabled={status === 'loading'}
            className="flex-1 bg-transparent text-white text-xs font-mono px-4 py-4 placeholder:text-muted-foreground focus:outline-none focus:bg-white/5 transition-colors disabled:opacity-50"
          />
        </div>
      ))}

      {/* Message textarea */}
      <div className="flex flex-col sm:flex-row border-b border-border">
        <label
          htmlFor="message"
          className="text-xs font-mono text-muted-foreground tracking-widest px-4 py-4 sm:w-32 shrink-0 border-b sm:border-b-0 sm:border-r border-border"
        >
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="> TRANSMIT YOUR MESSAGE. MAX 300 WORDS."
          required
          disabled={status === 'loading'}
          className="flex-1 bg-transparent text-white text-xs font-mono px-4 py-4 placeholder:text-muted-foreground focus:outline-none focus:bg-white/5 transition-colors resize-none disabled:opacity-50"
        />
      </div>

      {/* Submit */}
      <div className="p-4 flex justify-between items-center bg-black">
        <div className="text-[#FF0000] text-xs font-mono tracking-widest">
          {status === 'error' && 'ERROR DETECTED. PLEASE RETRY.'}
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="border border-white bg-black text-white text-xs font-mono tracking-widest py-4 px-8 hover:bg-white hover:text-black transition-colors duration-0 disabled:opacity-50"
        >
          {status === 'loading' ? 'TRANSMITTING...' : 'TRANSMIT →'}
        </button>
      </div>

      <p className="text-xs font-mono text-muted-foreground p-4 border-t border-border bg-[#080808]">
        SYSTEM FRICTION DETECTED? RE-TRANSMIT. Response time: [REDACTED].
      </p>
    </form>
  );
}
