'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { updateBlockOrder, toggleBlockActive } from '@/app/dashboard/actions'
import { DeleteBlockButton } from './DeleteBlockButton'
import { BlockModal } from './BlockModal'

interface Block {
  id: string
  title: string
  url: string
  type: string
  is_active: boolean
  sort_order: number
}

function SortableBlockItem({ 
  block, 
  onEdit 
}: { 
  block: Block
  onEdit: (b: Block) => void 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-background border rounded-2xl p-4 flex items-center gap-4 transition-all group ${
        isDragging ? 'shadow-lg border-foreground' : 'border-border hover:shadow-sm'
      } ${!block.is_active ? 'opacity-60' : ''}`}
    >
      <div {...attributes} {...listeners} className="text-muted-foreground cursor-grab active:cursor-grabbing p-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded uppercase">{block.type}</span>
          <h4 className="font-semibold truncate">{block.title}</h4>
        </div>
        <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground hover:underline truncate block mt-1">
          {block.url}
        </a>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => toggleBlockActive(block.id, !block.is_active)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${block.is_active ? 'bg-green-500' : 'bg-muted'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${block.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>

        <button 
          onClick={() => onEdit(block)}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
        </button>
        <DeleteBlockButton id={block.id} />
      </div>
    </div>
  )
}

export function DraggableBlockList({ initialBlocks }: { initialBlocks: Block[] }) {
  const [blocks, setBlocks] = useState(initialBlocks)
  const [editingBlock, setEditingBlock] = useState<Block | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        
        const newArray = arrayMove(items, oldIndex, newIndex)
        
        // Prepare bulk update
        const updates = newArray.map((b, index) => ({ id: b.id, sort_order: index }))
        
        // Optimistic UI, fire async update
        updateBlockOrder(updates)
        
        return newArray
      })
    }
  }

  return (
    <>
      <div className="mb-8">
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="w-full bg-background border-2 border-dashed border-border hover:border-foreground hover:bg-muted/50 text-foreground font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
          Add New Block
        </button>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={blocks.map(b => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {blocks.map((block) => (
              <SortableBlockItem 
                key={block.id} 
                block={block} 
                onEdit={setEditingBlock} 
              />
            ))}
            
            {blocks.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                No blocks added yet. Click above to add one.
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add Modal */}
      <BlockModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {/* Edit Modal */}
      {editingBlock && (
        <BlockModal 
          block={editingBlock} 
          isOpen={!!editingBlock} 
          onClose={() => setEditingBlock(null)} 
        />
      )}
    </>
  )
}
