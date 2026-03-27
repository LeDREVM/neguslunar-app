import React from 'react'
import NegusLunar from './components/NegusLunar'
import { ProfileProvider, useProfile } from './context/ProfileContext'
import { ProfileSelector } from './components/ProfileSwitcher'

const AppInner = () => {
  const { activeProfile } = useProfile()
  if (!activeProfile) return <ProfileSelector />
  return <NegusLunar />
}

function App() {
  return (
    <ProfileProvider>
      <AppInner />
    </ProfileProvider>
  )
}

export default App
