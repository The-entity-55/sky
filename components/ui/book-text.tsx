"use client"

import { BookText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookTextProps {
  text: string
  className?: string
  iconClassName?: string
}

export function BookTextItem({
  text,
  className,
  iconClassName
}: BookTextProps) {
  return (
    <li className={cn("flex items-center space-x-2", className)}>
      <BookText className={cn("w-5 h-5 text-blue-500", iconClassName)} />
      <span>{text}</span>
    </li>
  )
}

interface BookTextListProps {
  items: string[]
  className?: string
  itemClassName?: string
  iconClassName?: string
}

export function BookTextList({
  items,
  className,
  itemClassName,
  iconClassName
}: BookTextListProps) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <BookTextItem
          key={index}
          text={item}
          className={itemClassName}
          iconClassName={iconClassName}
        />
      ))}
    </ul>
  )
}
