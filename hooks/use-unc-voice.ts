"use client";

import { useState } from 'react';

export function useUncVoice() {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = async (text: string, voiceId?: string) => {
    if (isPlaying) return;

    try {
      setIsPlaying(true);
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text, 
          voiceId: voiceId || 'NJFaM5ouXwsuGSYeFRK3' 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };

      await audio.play();
    } catch (error) {
      console.error('Unc Voice Error:', error);
      setIsPlaying(false);
    }
  };

  return { speak, isPlaying };
}
