"use client";

import Image from "next/image";
import { useState } from "react";

interface SavedCard {
  id: string;
  issuer_name: string;
  issuer_logo: string;
  last_four_digits: string;
  expiration: string;
}

interface SavedCardSelectorProps {
  cards: SavedCard[];
  selectedCardId: string;
  onChange: (id: string) => void;
}

export default function SavedCardSelector({
  cards,
  selectedCardId,
  onChange,
}: SavedCardSelectorProps) {
  return (
    <div className="rounded-lg border border-gray-200 divide-y divide-gray-200 overflow-hidden bg-white">
      {cards.map((card) => {
        const isSelected = card.id === selectedCardId;

        return (
          <label
            key={card.id}
            onClick={() => onChange(card.id)}
            className={`relative flex items-center gap-3 p-4 cursor-pointer transition ${
              isSelected ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            {/* Borde azul a la izquierda si está seleccionado */}
            {isSelected && (
              <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-lg" />
            )}

            <Image
              src={card.issuer_logo}
              alt={card.issuer_name}
              width={32}
              height={24}
              className="rounded"
            />

            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-gray-900">
                •••• {card.last_four_digits}
              </span>
              <span className="text-xs text-gray-500">{card.expiration}</span>
            </div>
          </label>
        );
      })}
    </div>
  );
}
