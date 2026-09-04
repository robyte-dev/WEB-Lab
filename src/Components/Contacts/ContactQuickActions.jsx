import React from 'react';
import { Phone, MessageSquare, Send, Mail, MessageCircle } from 'lucide-react';

export default function ContactQuickActions({ phone, email, telegramHandle }) {
  // Clean phone number for tel/sms/whatsapp links
  const cleanPhone = phone ? phone.replace(/[^\d+]/g, '') : '';
  const cleanTelegram = telegramHandle ? telegramHandle.replace('@', '') : '';

  const actions = [
    {
      name: 'Call',
      icon: Phone,
      href: cleanPhone ? `tel:${cleanPhone}` : '#',
      color: 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border-emerald-500/30',
      label: 'Call Contact'
    },
    {
      name: 'SMS',
      icon: MessageSquare,
      href: cleanPhone ? `sms:${cleanPhone}` : '#',
      color: 'bg-sky-600/20 text-sky-400 hover:bg-sky-600 hover:text-white border-sky-500/30',
      label: 'Send SMS'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: cleanPhone ? `https://wa.me/${cleanPhone.replace('+', '')}` : '#',
      color: 'bg-green-600/20 text-green-400 hover:bg-green-600 hover:text-white border-green-500/30',
      label: 'WhatsApp Chat'
    },
    {
      name: 'Telegram',
      icon: Send,
      href: cleanTelegram ? `https://t.me/${cleanTelegram}` : (cleanPhone ? `https://t.me/+${cleanPhone.replace('+', '')}` : '#'),
      color: 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border-blue-500/30',
      label: 'Telegram Message'
    },
    {
      name: 'Email',
      icon: Mail,
      href: email ? `mailto:${email}` : '#',
      color: 'bg-amber-600/20 text-amber-400 hover:bg-amber-600 hover:text-white border-amber-500/30',
      label: 'Send Email'
    }
  ];

  return (
    <div className="grid grid-cols-5 gap-2 py-3 border-y border-slate-800/80 my-3">
      {actions.map((act, idx) => {
        const Icon = act.icon;
        return (
          <a
            key={idx}
            href={act.href}
            target={act.href.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            title={act.label}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 cursor-pointer text-center group ${act.color}`}
          >
            <Icon className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium tracking-tight">{act.name}</span>
          </a>
        );
      })}
    </div>
  );
}
