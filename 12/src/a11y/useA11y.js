import { useContext } from 'react';
import { AccessibilityContext } from './AccessibilityContext';

export const useA11y = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useA11y must be used within an AccessibilityProvider');
  }
  return context;
};