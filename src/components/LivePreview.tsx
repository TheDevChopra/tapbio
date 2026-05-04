'use client'

export function LivePreview({ username }: { username: string }) {
  // Using an iframe to render the actual public profile page.
  // This ensures 100% fidelity without duplicating rendering logic.
  // We append a timestamp or unique query parameter to bust cache if needed, 
  // but Next.js Server Actions with revalidatePath usually handle this.
  
  return (
    <div className="sticky top-24 w-full flex items-center justify-center p-8">
      <div className="relative w-[320px] h-[680px] bg-black rounded-[3rem] p-3 shadow-2xl ring-1 ring-border">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
          <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
        </div>
        
        {/* Screen */}
        <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
          <iframe 
            src={`/${username}`}
            className="w-full h-full border-0"
            title="Live Preview"
          />
        </div>
      </div>
    </div>
  )
}
