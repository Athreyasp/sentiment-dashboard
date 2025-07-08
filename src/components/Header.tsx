
import { AttractiveHeader } from './AttractiveHeader'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return <AttractiveHeader />
}
