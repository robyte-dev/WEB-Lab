import React from 'react';
import ContactCard from './Contacts/ContactCard';

export default function Contact(props) {
  // Backwards compatibility layer mapping legacy props to new Truecaller style ContactCard
  const legacyContact = {
    id: props.id || 1,
    name: props.name,
    email: props.email,
    phone: props.phone,
    profile_picture: props.profile_picture,
    telegram: props.telegram || `@${props.name ? props.name.toLowerCase().replace(/\s+/g, '_') : 'user'}`,
    location: props.location || 'Addis Ababa, Ethiopia',
    carrier: props.carrier || 'Ethio Telecom',
    isFavorite: props.isFavorite || false,
    isVerified: props.isVerified !== undefined ? props.isVerified : true,
    isSpam: props.isSpam || false,
    notes: props.notes || 'Verified contact card.'
  };

  return (
    <ContactCard
      contact={legacyContact}
      onToggleFavorite={props.onToggleFavorite || (() => {})}
      onEdit={props.onEdit || (() => {})}
      onDelete={props.onDelete || (() => {})}
      onShare={props.onShare || (() => {})}
    />
  );
}
