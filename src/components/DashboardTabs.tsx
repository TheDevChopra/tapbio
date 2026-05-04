'use client'

import { useState } from 'react'
import { DraggableBlockList } from '@/components/DraggableBlockList'
import { SettingsForm } from '@/components/SettingsForm'
import { AnalyticsTab } from '@/components/AnalyticsTab'

export function DashboardTabs({ blocks, profile, analytics }: { blocks: any[], profile: any, analytics: { views: number, clicks: Record<string, number> } }) {
  const [activeTab, setActiveTab] = useState<'blocks' | 'settings' | 'analytics'>('blocks')

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-4 border-b border-border mb-6">
        <button 
          onClick={() => setActiveTab('blocks')}
          className={`pb-3 font-semibold transition-colors ${activeTab === 'blocks' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Links
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`pb-3 font-semibold transition-colors ${activeTab === 'settings' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Design & Profile
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 font-semibold transition-colors ${activeTab === 'analytics' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Analytics
        </button>
      </div>

      <div className="flex-1">
        {activeTab === 'blocks' && <DraggableBlockList initialBlocks={blocks} />}
        {activeTab === 'settings' && <SettingsForm profile={profile} />}
        {activeTab === 'analytics' && <AnalyticsTab blocks={blocks} analytics={analytics} />}
      </div>
    </div>
  )
}
