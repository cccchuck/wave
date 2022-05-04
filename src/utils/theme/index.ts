function getIsDark(): boolean {
  let isDark: string | null = localStorage.getItem('isDark')
  if (isDark !== null) return isDark === 'true'

  const { matches }: { matches: boolean } = window.matchMedia(
    '(prefers-color-scheme: dark)'
  )
  return matches
}

function setIsDark(isDark: boolean) {
  localStorage.setItem('isDark', isDark.toString())
}

function setTheme(isDark: boolean) {
  if (isDark) {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
}

export { getIsDark, setIsDark, setTheme }
