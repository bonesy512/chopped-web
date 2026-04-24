'use client';

export function JoinForm() {
  return (
    <div className="mt-12 pt-8 border-t border-border text-center">
      <form
        className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = '/transmit';
        }}
      >
        <input
          type="text"
          placeholder="> ENTER CALLSIGN"
          className="flex-1 bg-transparent border border-border border-r-0 px-4 py-4 text-xs font-mono text-white placeholder:text-muted-foreground focus:outline-none focus:border-white transition-colors"
        />
        <button
          type="submit"
          className="border border-white bg-black text-white px-6 py-4 text-xs font-mono tracking-widest hover:bg-white hover:text-black transition-colors duration-0"
        >
          TRANSMIT →
        </button>
      </form>
    </div>
  );
}
