import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Gear Protocol - Early Access 02:00 AM',
  description: 'Enter your protocol code for early access to Vol 01. The world sleeps at midnight. We drop at 02:00 AM. High-performance armor for the nocturnal veteran.',
};

export default function SecureGearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
