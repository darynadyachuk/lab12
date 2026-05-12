import { useState, useEffect, useCallback } from 'react';
import { AccessibilityContext } from './AccessibilityContext'; 
import { INITIAL_A11Y_SETTINGS } from './a11y-constants';

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(INITIAL_A11Y_SETTINGS);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(INITIAL_A11Y_SETTINGS);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.style.setProperty('--a11y-font-scale', settings.fontSize);
    root.style.setProperty('--a11y-line-height', settings.lineHeight);
    root.style.setProperty('--a11y-letter-spacing', `${settings.letterSpacing}px`);
    root.style.setProperty('--a11y-text-align', settings.textAlign);
    root.style.setProperty('--a11y-text-transform', settings.textTransform);

    const classesToRemove = Array.from(body.classList).filter(c => c.startsWith('a11y-'));
    body.classList.remove(...classesToRemove);

    if (settings.contrast !== 'normal') body.classList.add(`a11y-contrast-${settings.contrast}`);
    if (settings.saturation !== 'normal') body.classList.add(`a11y-saturation-${settings.saturation}`);
    if (settings.cursor !== 'default') body.classList.add(`a11y-cursor-${settings.cursor}`);

    if (settings.highlightLinks) body.classList.add('a11y-hl-links');
    if (settings.highlightHeaders) body.classList.add('a11y-hl-headers');
    if (settings.pauseAnimations) body.classList.add('a11y-no-anim');

  }, [settings]);

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
