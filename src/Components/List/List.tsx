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