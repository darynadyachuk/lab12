import { useState } from 'react';
import {
  Drawer, Box, Typography, Button, IconButton, Slider,
  Switch, FormControlLabel,  Stack, ToggleButton, ToggleButtonGroup,
  Paper
} from '@mui/material';
import {
  AccessibilityNew, Close, RestartAlt,
  FormatSize, FormatAlignLeft, FormatAlignCenter, FormatAlignRight,
  Palette, Mouse, DarkMode, LightMode
} from '@mui/icons-material';
import { useA11y } from '../a11y/useA11y';
import { useThemeMode } from "../theme/themeHooks";

const SettingSection = ({ title, icon, children }) => (
  <Paper 
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 2,
      bgcolor: 'background.default',
      border: '1px solid',
      borderColor: 'divider'
    }}
  >
    <Typography
      variant="subtitle2"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        color: 'text.secondary',
        letterSpacing: 1
      }}
    >
      {icon} {title}
    </Typography>
    {children}
  </Paper>
);

export default function AccessibilitySettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting, resetSettings } = useA11y();
  const { mode, toggleMode } = useThemeMode();

  const toggleDrawer = (open) => () => setIsOpen(open);

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': { backgroundColor: 'primary.dark', transform: 'scale(1.05)' },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 2000,
          width: 60,
          height: 60,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}
        aria-label="Налаштування доступності"
      >
        <AccessibilityNew fontSize="large" />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 380 }, p: 0, border: 'none' }
        }}
      >

        <Box sx={{ p: 0.5, display: 'flex', flexDirection: 'column' }}>
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
    <IconButton
      onClick={toggleDrawer(false)}
      sx={{
        color: 'text.secondary',
        mr: -1
      }}
    >
      <Close />
    </IconButton>
  </Box>
          <Stack spacing={3}>
            <SettingSection title="Текст та шрифт" icon={<FormatSize fontSize="small" />}>
              <Typography variant="caption" color="text.secondary">Масштаб тексту</Typography>
              <Slider
                value={settings.fontSize}
                step={0.1}
                min={0.8}
                max={1.8}
                onChange={(_, val) => updateSetting('fontSize', val)}
                sx={{ mb: 2 }}
              />

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Вирівнювання</Typography>
              <ToggleButtonGroup
                value={settings.textAlign}
                exclusive
                onChange={(_, val) => val && updateSetting('textAlign', val)}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              >
                <ToggleButton value="left"><FormatAlignLeft fontSize="small" /></ToggleButton>
                <ToggleButton value="center"><FormatAlignCenter fontSize="small" /></ToggleButton>
                <ToggleButton value="right"><FormatAlignRight fontSize="small" /></ToggleButton>
              </ToggleButtonGroup>

              <FormControlLabel
                control={<Switch
                  checked={settings.textTransform === 'uppercase'}
                  onChange={(e) => updateSetting('textTransform', e.target.checked ? 'uppercase' : 'none')}
                />}
                label={<Typography variant="body2">Тільки великі літери</Typography>}
              />
            </SettingSection>

            <SettingSection title="Колір та контраст" icon={<Palette fontSize="small" />}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <Button 
                  fullWidth
                  variant={mode === 'dark' ? "contained" : "outlined"} 
                  onClick={toggleMode}
                  startIcon={mode === 'dark' ? <LightMode /> : <DarkMode />}
                >
                  {mode === 'dark' ? 'Світла' : 'Темна'}
                </Button>
                <Button
                  variant={settings.contrast === 'high' ? "contained" : "outlined"} 
                  onClick={() => updateSetting('contrast', settings.contrast === 'high' ? 'normal' : 'high')}
                >
                  Контраст
                </Button>
                <Button
                  variant={settings.contrast === 'invert' ? "contained" : "outlined"} 
                  onClick={() => updateSetting('contrast', settings.contrast === 'invert' ? 'normal' : 'invert')}
                >
                  Інверсія
                </Button>
                <Button
                  variant={settings.contrast === 'normal' ? "contained" : "outlined"} 
                  onClick={() => updateSetting('contrast', 'normal')}
                >
                  Скинути
                </Button>
              </Box>
            </SettingSection>

            <SettingSection title="Інструменти" icon={<Mouse fontSize="small" />}>
              <Stack spacing={1}>
                <FormControlLabel
                  control={<Switch
                    checked={settings.highlightLinks}
                    onChange={(e) => updateSetting('highlightLinks', e.target.checked)}
                  />}
                  label={<Typography variant="body2">Підсвічувати посилання</Typography>}
                />
                <FormControlLabel
                  control={<Switch
                    checked={settings.pauseAnimations}
                    onChange={(e) => updateSetting('pauseAnimations', e.target.checked)}
                  />}
                  label={<Typography variant="body2">Вимкнути анімації</Typography>}
                />
              </Stack>

            </SettingSection>

            <Button
              fullWidth
              variant="text"
              color="error"
              startIcon={<RestartAlt />}
              onClick={resetSettings}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              Скинути всі налаштування
            </Button>

          </Stack>
        </Box>
      </Drawer>
    </>
  );
}