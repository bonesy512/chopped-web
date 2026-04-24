'use client';

export function TransmitForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend / email service
    alert('TRANSMISSION RECEIVED. STAND BY.');
  };

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
            className="flex-1 bg-transparent text-white text-xs font-mono px-4 py-4 placeholder:text-muted-foreground focus:outline-none focus:bg-white/5 transition-colors"
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
          className="flex-1 bg-transparent text-white text-xs font-mono px-4 py-4 placeholder:text-muted-foreground focus:outline-none focus:bg-white/5 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <div className="p-4 flex justify-end">
        <button
          type="submit"
          className="border border-white bg-black text-white text-xs font-mono tracking-widest py-3 px-8 hover:bg-white hover:text-black transition-colors duration-0"
        >
          TRANSMIT →
        </button>
      </div>

      <p className="text-xs font-mono text-muted-foreground p-4 border-t border-border">
        SYSTEM FRICTION DETECTED? RE-TRANSMIT. Response time: [REDACTED].
      </p>
    </form>
  );
}
