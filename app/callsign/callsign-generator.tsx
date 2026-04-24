'use client';

import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

function generateCallsign(name: string, trade: string) {
  const str = (name + trade).toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);

  const prefixes = [
    'GHOST', 'WRENCH', 'HAMMER', 'PROXY', 'VIPER', 'NULL', 'VOID', 'STATIC', 
    'ECHO', 'STEEL', 'IRON', 'CARBON', 'SHADOW', 'STORM', 'ROUTER', 'KILO', 
    'TANGO', 'RAVEN', 'ROGUE', 'APEX', 'NEON', 'NOVA', 'CRUX', 'RUST', 'SLAG'
  ];
  const suffixes = [
    'ACTUAL', 'PRIME', 'ALPHA', 'OMEGA', 'LEAD', 'ZERO', 'ONE', 'NINE', 
    'X', '77', '99', '04', '01', 'ACTUAL'
  ];
  const units = [
    'NIGHT-SHIFT', 'HEAVY-DUTY', 'MAINTENANCE', 'LOGISTICS', 'OPERATIONS', 
    'FABRICATION', 'RECON', 'SUPPORT_SYS', 'ENGINEERING', 'TACTICAL'
  ];

  const prefix = prefixes[hash % prefixes.length];
  const suffix = suffixes[(hash >> 2) % suffixes.length];
  const unit = units[(hash >> 4) % units.length];
  const clearance = ((hash % 5) + 1).toString(); // 1-5
  const idHash = (hash >>> 0).toString(16).toUpperCase().padStart(8, '0');

  return { callsign: `${prefix}-${suffix}`, unit, clearance, idHash };
}

export default function CallsignGeneratorPage() {
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ callsign: string; unit: string; clearance: string; idHash: string } | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !trade.trim()) return;
    
    setIsGenerating(true);
    setResult(null);

    // Fake terminal thinking effect
    setTimeout(() => {
      setResult(generateCallsign(name, trade));
      setIsGenerating(false);
    }, 1500);
  };

  const reset = () => {
    setResult(null);
    setName('');
    setTrade('');
  };

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col selection:bg-white selection:text-black">
      <Header />

      <main className="flex-1 pt-14 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-sans uppercase tracking-tight mb-2">
              TERMINAL <span className="text-[#FF0000]">ACCESS</span>
            </h1>
            <p className="text-xs font-mono text-muted-foreground tracking-widest">
              INITIALIZE OPERATOR PROTOCOL
            </p>
          </div>

          {!result && !isGenerating && (
            <form onSubmit={handleGenerate} className="border border-border bg-black p-6 sm:p-8 flex flex-col gap-6 relative">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-widest text-muted-foreground uppercase flex justify-between">
                  <span>IDENTIFIER</span>
                  <span className="text-[10px] opacity-50">[NAME/ALIAS]</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={20}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border-b border-border/50 text-white font-mono text-lg py-2 focus:outline-none focus:border-white transition-colors uppercase"
                  placeholder="_"
                  spellCheck={false}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono tracking-widest text-muted-foreground uppercase flex justify-between">
                  <span>SECTOR</span>
                  <span className="text-[10px] opacity-50">[TRADE/INDUSTRY]</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={20}
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="bg-transparent border-b border-border/50 text-white font-mono text-lg py-2 focus:outline-none focus:border-white transition-colors uppercase"
                  placeholder="_"
                  spellCheck={false}
                />
              </div>

              <button
                type="submit"
                className="mt-4 border border-white bg-white text-black font-mono text-xs tracking-widest py-4 uppercase hover:bg-black hover:text-white transition-colors duration-0"
              >
                REQUEST CALLSIGN
              </button>
            </form>
          )}

          {isGenerating && (
            <div className="border border-border bg-black p-12 flex flex-col items-center justify-center gap-4 h-[350px]">
              <div className="w-8 h-8 border-t-2 border-r-2 border-[#FF0000] animate-spin mb-4 rounded-full" />
              <p className="text-xs font-mono tracking-widest text-muted-foreground animate-pulse">
                QUERYING DATABANKS...
              </p>
              <p className="text-[10px] font-mono tracking-widest text-white/20">
                DECRYPTING SECTOR INFO
              </p>
            </div>
          )}

          {result && !isGenerating && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* THE SHAREABLE CARD */}
              <div id="callsign-card" className="border border-white bg-black p-6 sm:p-8 relative overflow-hidden group">
                {/* Background Noise/Grid */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="absolute top-4 right-4 flex gap-1">
                  <div className="w-2 h-2 bg-[#FF0000] animate-pulse" />
                  <div className="w-2 h-2 bg-white/20" />
                </div>

                <div className="relative z-10">
                  <div className="border-b border-white/20 pb-4 mb-6">
                    <p className="text-[10px] font-mono tracking-widest text-[#FF0000] mb-1">
                      CHOPPED. TERMINAL // EST 02:00 AM
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">
                      ID: {result.idHash}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 mb-8">
                    <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                      ASSIGNED CALLSIGN
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-bold font-sans text-white uppercase tracking-tighter leading-none break-words">
                      {result.callsign}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                    <div>
                      <p className="text-[10px] font-mono tracking-widest text-muted-foreground mb-1 uppercase">OPERATOR</p>
                      <p className="text-sm font-mono text-white uppercase truncate">{name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest text-muted-foreground mb-1 uppercase">SECTOR</p>
                      <p className="text-sm font-mono text-white uppercase truncate">{trade}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest text-muted-foreground mb-1 uppercase">UNIT</p>
                      <p className="text-sm font-mono text-white uppercase">{result.unit}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest text-muted-foreground mb-1 uppercase">CLEARANCE</p>
                      <p className="text-sm font-mono text-white uppercase">LEVEL {result.clearance}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    // Quick copy text to clipboard for sharing
                    navigator.clipboard.writeText(`I'm ${result.callsign} in the ${result.unit} Unit.\nGet your midnight callsign: https://choppedunc.store/callsign\n\n#CHOPPED #TheFriction`);
                    alert('Copied to clipboard! Ready to paste on X/Twitter.');
                  }}
                  className="flex-1 bg-white text-black font-mono text-xs tracking-widest py-4 uppercase text-center hover:bg-white/90 transition-colors"
                >
                  COPY SHARE TEXT
                </button>
                <button
                  onClick={reset}
                  className="flex-1 border border-border bg-transparent text-white font-mono text-xs tracking-widest py-4 uppercase text-center hover:border-white transition-colors duration-0"
                >
                  RE-INITIALIZE
                </button>
              </div>
              
              <p className="text-[10px] text-center font-mono text-muted-foreground mt-2">
                * Take a screenshot to save your Operator ID Card.
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
