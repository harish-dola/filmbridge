import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary/5 text-primary border border-primary/10',
    secondary: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
    outline: 'border border-zinc-200 text-zinc-500',
  };

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
