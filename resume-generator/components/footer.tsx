'use client'

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 w-full py-4 text-center text-sm text-gray-600 bg-gradient-to-t from-white via-white to-transparent"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center justify-center gap-2"
      >
        Built with
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
          }}
          className="text-red-500"
        >
          ❤️
        </motion.span>
        by
        <a 
          href="https://iamjeevan.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          iamjeevan.com
        </a>
      </motion.div>
    </motion.footer>
  )
}
