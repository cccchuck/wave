type TIsDark = '1' | '0' | null

interface IModeVariable {
  [key: string]: string
}

const sunVariables: IModeVariable = {
  '--color-heading': '#272343',
  '--color-content': '#2d334a',
  '--color-background': '#e3f6f5',
  '--color-background-btn': 'var(--color-heading)',
  '--color-text-btn': '#fffffe',
  '--color-highlight-text': '#fffffe',
  '--color-box-shadow': 'rgba(0, 0, 0, 0.1)',
}

const darkVariables: IModeVariable = {
  '--color-heading': '#fffffe',
  '--color-content': '#b8c1ec',
  '--color-background': '#232946',
  '--color-background-btn': '#d4939d',
  '--color-text-btn': '#fffffe',
  '--color-highlight-text': '#d4939d',
  '--color-box-shadow': 'rgba(255, 255, 255, 0.1)',
}

/**
 * Change the show mode(sun or dark)
 */
function toggleShowMode() {
  const isDark: TIsDark = (localStorage.getItem('isDark')) as TIsDark

  if (isDark === '0') {
    localStorage.setItem('isDark', '1');
    Object.keys(darkVariables).forEach((key) => {
      document.documentElement.style.setProperty(key, darkVariables[key])
    });
  } else if (isDark === '1') {
    localStorage.setItem('isDark', '0');
    Object.keys(sunVariables).forEach((key) => {
      document.documentElement.style.setProperty(key, sunVariables[key])
    });
  }
  return isDark
}

export default toggleShowMode;