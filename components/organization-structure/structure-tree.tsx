"use client"

import { useState } from "react"
import { Tree, type TreeItem } from "@/components/ui/tree"

export function StructureTree() {
  const [items] = useState<TreeItem[]>([
    {
      id: "org1",
      name: "Organization 1",
      children: [
        {
          id: "lob1",
          name: "Line of Business 1",
          children: [
            { id: "team1", name: "Team 1" },
            { id: "team2", name: "Team 2" },
          ],
        },
        {
          id: "lob2",
          name: "Line of Business 2",
          children: [
            { id: "team3", name: "Team 3" },
            { id: "team4", name: "Team 4" },
          ],
        },
      ],
    },
    {
      id: "org2",
      name: "Organization 2",
      children: [
        {
          id: "lob3",
          name: "Line of Business 3",
          children: [
            { id: "team5", name: "Team 5" },
            { id: "team6", name: "Team 6" },
          ],
        },
      ],
    },
  ])

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Organization Structure</h2>
      <Tree items={items} />
    </div>
  )
}

