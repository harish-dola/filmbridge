import React from 'react';

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-sm font-medium text-zinc-400 ml-1">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 outline-none focus:border-primary transition ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 ml-1">{error}</p>
      )}
    </div>
  );
};
