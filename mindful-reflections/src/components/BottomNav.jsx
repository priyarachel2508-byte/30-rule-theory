import { Home, CreditCard, BookOpen, BookMarked, User } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'cards', label: 'Cards', Icon: CreditCard },
  { id: 'journal', label: 'Journal', Icon: BookMarked },
  { id: 'blog', label: 'Blog', Icon: BookOpen },
  { id: 'profile', label: 'Profile', Icon: User },
]

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-end justify-around bg-parchment px-2 pb-5 pt-3"
      style={{ borderTop: '1px solid #e8ddd4' }}
    >
      {tabs.map(({ id, label, Icon }) => {
        const active = activeTab === id
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex flex-col items-center gap-1"
          >
            <Icon
              size={22}
              strokeWidth={active ? 2 : 1.5}
              color={active ? '#c4674a' : '#9a8880'}
            />
            <span
              className="text-[10px] font-medium tracking-wide"
              style={{ color: active ? '#c4674a' : '#9a8880' }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
