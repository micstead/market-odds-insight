import { MatchDashboard } from './components/MatchDashboard';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[5%] left-[20%] w-[35%] h-[35%] bg-primary/3 rounded-full blur-[110px]" />
        
        {/* Background Image with overlay */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6cd87a8f-9c62-4d33-9527-a7612483bbc0/soccer-analytics-background-f3c9a41e-1783020693580.webp" 
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <main className="relative z-0">
        <MatchDashboard />
      </main>

      <footer className="py-12 text-center text-xs text-muted-foreground border-t border-border/40 mt-auto">
        <p>© {new Date().getFullYear()} ValueOdds Engine. All data based on Transfermarkt valuations.</p>
        <p className="mt-2">Odds are mathematical projections and should be used for informational purposes only.</p>
      </footer>

      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
}

export default App;
