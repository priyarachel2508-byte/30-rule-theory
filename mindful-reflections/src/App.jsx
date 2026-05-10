import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashScreen from './screens/SplashScreen'
import HomeScreen from './screens/HomeScreen'
import CardDetailScreen from './screens/CardDetailScreen'
import ArticleScreen from './screens/ArticleScreen'

const slide = (dir = 1) => ({
  initial: { opacity: 0, x: 24 * dir },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 * dir },
  transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
})

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#c8b8a8] p-6">
      <div
        className="relative overflow-hidden bg-cream shadow-float"
        style={{ width: 390, height: 844, borderRadius: 44, flexShrink: 0 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {screen === 'splash' && (
            <motion.div key="splash" {...slide(1)} className="absolute inset-0">
              <SplashScreen onBegin={() => setScreen('home')} />
            </motion.div>
          )}
          {screen === 'home' && (
            <motion.div key="home" {...slide(1)} className="absolute inset-0">
              <HomeScreen
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpenCard={() => setScreen('card')}
                onOpenArticle={() => setScreen('article')}
              />
            </motion.div>
          )}
          {screen === 'card' && (
            <motion.div key="card" {...slide(1)} className="absolute inset-0">
              <CardDetailScreen onBack={() => setScreen('home')} />
            </motion.div>
          )}
          {screen === 'article' && (
            <motion.div key="article" {...slide(1)} className="absolute inset-0">
              <ArticleScreen onBack={() => setScreen('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
