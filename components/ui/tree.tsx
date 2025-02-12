"use client"

import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

export interface TreeItem {
  id: string
  name: string
  children?: TreeItem[]
}

interface TreeProps {
  items: TreeItem[]
}

interface TreeNodeProps {
  item: TreeItem
  level?: number
}

const TreeNode: React.FC<TreeNodeProps> = ({ item, level = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const hasChildren = item.children && item.children.length > 0

  return (
    <div className="ml-4">
      <div className="flex items-center cursor-pointer" onClick={() => hasChildren && setIsOpen(!isOpen)}>
        {hasChildren && <span className="mr-1">{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>}
        <span>{item.name}</span>
      </div>
      {isOpen &&
        hasChildren &&
        item.children!.map((child) => <TreeNode key={child.id} item={child} level={level + 1} />)}
    </div>
  )
}

export const Tree: React.FC<TreeProps> = ({ items }) => {
  return (
    <div className="tree">
      {items.map((item) => (
        <TreeNode key={item.id} item={item} />
      ))}
    </div>
  )
}

