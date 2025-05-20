export default function Home() {
  return (
    <div className=" min-h-screen p-4">
      <div className="flex flex-col md:flex-row gap-4 h-screen">
        {/* Left section - 2/3 width on desktop, full width on mobile */}
        <div className="w-full md:w-2/3 rounded-lg flex flex-col gap-4">
          {/* Top subsection - 2/3 height */}
          <div className="h-61/100 p-4 rounded-lg bg-card">
            <h2 className="text-xl font-bold mb-4">Top Section (2/3 height)</h2>
            <p>This section takes up 2/3 of the height.</p>
          </div>
          
          {/* Bottom subsection - 1/3 height */}
          <div className="h-3/10 p-4 rounded-lg bg-card">
            <h2 className="text-xl font-bold mb-4">Bottom Section (1/3 height)</h2>
            <p>This section takes up 1/3 of the height.</p>
          </div>
        </div>
        
        {/* Right section - 1/3 width on desktop, full width on mobile */}
        <div className="w-full md:w-2/3 rounded-lg flex flex-col gap-4">
          <div className="h-3/10 p-4 rounded-lg bg-card"></div>
          <div className="h-3/10 p-4 rounded-lg bg-card"></div>
          <div className="h-3/10 p-4 rounded-lg bg-card"></div>
        </div>
      </div>
    </div>
  );
}
