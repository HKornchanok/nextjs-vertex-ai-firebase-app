export default function Home() {
  return (
    <div className="p-4">
      {/* Input section - 1/10 of screen height */}
      <div className="input-section">
        <h2 className="section-title">Input Section</h2>
        <input 
          type="text" 
          className="w-full p-2 border rounded"
          placeholder="Enter your input here..."
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-[80vh]">
        {/* Left section - 2/3 width on desktop, full width on mobile */}
        <div className="w-full md:w-2/3 rounded-lg flex flex-col gap-4">
          {/* Top subsection - 2/3 height */}
          <div className="card-section h-70/100">
            <h2 className="section-title">Top Section (2/3 height)</h2>
            <p>This section takes up 2/3 of the height.</p>
          </div>
          
          {/* Bottom subsection - 1/3 height */}
          <div className="card-section h-3/10">
            <h2 className="section-title">Bottom Section (1/3 height)</h2>
            <p>This section takes up 1/3 of the height.</p>
          </div>
        </div>
        
        {/* Right section - 1/3 width on desktop, full width on mobile */}
        <div className="w-full md:w-2/3 rounded-lg flex flex-col gap-4">
          <div className="card-section h-30/100">
            <h2 className="section-title">Bottom Section (1/3 height)</h2>
            <p>This section takes up 1/3 of the height.</p>
          </div>
          <div className="card-section h-30/100">
            <h2 className="section-title">Bottom Section (1/3 height)</h2>
            <p>This section takes up 1/3 of the height.</p>
          </div>
          <div className="card-section h-40/100"></div>
        </div>
      </div>
    </div>
  );
}
