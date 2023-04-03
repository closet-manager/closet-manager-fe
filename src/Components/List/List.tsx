import { useState } from 'react';
import React from "react";

interface ListDetails {
  id: number;
  name: string;
  items: string[];
}

interface ListProps {
  listId: number;
  onBack: () => void;
}

export const List: React.FC<ListProps> = ({ listId, onBack }) => {
  const [listDetails, setListDetails] = useState<ListDetails>({ id: 0, name: '', items: [] });
  const [error, setError] = useState<string | null>(null);
}