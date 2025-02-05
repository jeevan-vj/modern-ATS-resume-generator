import { create } from 'zustand';
import { ResumeData } from '@/lib/types';

interface ResumeStore {
  parsedResume: ResumeData | null;
  setParsedResume: (data: ResumeData) => void;
  clearParsedResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  parsedResume: null,
  setParsedResume: (data) => set({ parsedResume: data }),
  clearParsedResume: () => set({ parsedResume: null }),
}));
