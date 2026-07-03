import * as React from 'react';
import { TeamSelector } from './TeamSelector';
import { ModifierPanel } from './ModifierPanel';
import { OddsDisplay } from './OddsDisplay';
import { calculateOdds, Modifiers, PredictionResult } from '@/lib/odds-engine';
import { Team, mockTeams } from '@/data/teams';
import { Search, RotateCcw, Info, Swords, Loader2, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { simulateOnlineCheck } from '@/lib/news-sim';

export function MatchDashboard() {
  const [homeTeam, setHomeTeam] = React.useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = React.useState<Team | null>(null);
  const [quickSearch, setQuickSearch] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [homeReport, setHomeReport] = React.useState<string | null>(null);
  const [awayReport, setAwayReport] = React.useState<string | null>(null);
  
  const [homeMods, setHomeMods] = React.useState<Modifiers>({
    missingPlayersValue: 0,
    motivation: 100,
  });

  const [awayMods, setAwayMods] = React.useState<Modifiers>({
    missingPlayersValue: 0,
    motivation: 100,
  });

  const [result, setResult] = React.useState<PredictionResult | null>(null);

  // Auto-calculate when anything changes
  React.useEffect(() => {
    if (homeTeam && awayTeam) {
      const res = calculateOdds(homeTeam.marketValue, awayTeam.marketValue, homeMods, awayMods);
      setResult(res);
    } else {
      setResult(null);
    }
  }, [homeTeam, awayTeam, homeMods, awayMods]);

  // Auto-analyze when teams change
  React.useEffect(() => {
    const analyze = async () => {
      if (homeTeam && awayTeam) {
        setIsAnalyzing(true);
        
        // Simulate "checking online"
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const homeResult = simulateOnlineCheck(homeTeam.name, homeTeam.marketValue);
        const awayResult = simulateOnlineCheck(awayTeam.name, awayTeam.marketValue);
        
        setHomeMods({
          missingPlayersValue: homeResult.missingPlayersValue,
          motivation: homeResult.motivation,
        });
        setAwayMods({
          missingPlayersValue: awayResult.missingPlayersValue,
          motivation: awayResult.motivation,
        });
        
        setHomeReport(homeResult.report);
        setAwayReport(awayResult.report);
        
        toast.success("Online analysis complete: Situational factors applied.");
        setIsAnalyzing(false);
      }
    };

    analyze();
  }, [homeTeam?.id, awayTeam?.id]);

  const handleQuickSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const parts = quickSearch.toLowerCase().split(/\s+vs\s+/);
    if (parts.length !== 2) {
      toast.error('Use "Team A vs Team B" format');
      return;
    }

    setIsSearching(true);

    const findTeam = (query: string) => {
      return mockTeams.find(t => 
        t.name.toLowerCase().includes(query.trim()) || 
        (t.country && t.country.toLowerCase().includes(query.trim()))
      );
    };

    // Simulate "searching the web"
    await new Promise(resolve => setTimeout(resolve, 800));

    const teamA = findTeam(parts[0]);
    const teamB = findTeam(parts[1]);

    if (teamA) setHomeTeam(teamA);
    if (teamB) setAwayTeam(teamB);

    if (teamA && teamB) {
      toast.success(`Matched: ${teamA.name} vs ${teamB.name}`);
    } else if (!teamA && !teamB) {
      toast.error('Could not find either team');
    } else {
      toast.warning(`Matched only ${teamA ? teamA.name : teamB?.name}`);
    }

    setIsSearching(false);
  };

  const reset = () => {
    setHomeTeam(null);
    setAwayTeam(null);
    setQuickSearch('');
    setHomeMods({ missingPlayersValue: 0, motivation: 100 });
    setAwayMods({ missingPlayersValue: 0, motivation: 100 });
    setHomeReport(null);
    setAwayReport(null);
  };

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 pt-4">
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl text-foreground">
          Betting <span className="text-primary">Master</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Type the teams and our engine will analyze Transfermarkt values, motivation, and missing players.
        </p>

        <form onSubmit={handleQuickSearch} className="max-w-md mx-auto relative group pt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors mt-2" />
          <Input
            placeholder="Type 'Man City vs Real Madrid'..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            className="pl-10 h-12 rounded-full border-2 focus-visible:ring-primary shadow-lg bg-background"
          />
          <Button 
            type="submit" 
            className="absolute right-1 top-1 h-10 rounded-full px-6 mt-2"
            variant="default"
            disabled={isSearching}
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyze Match'}
          </Button>
        </form>
      </section>

      {/* Analysis Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-3 py-4 text-primary font-bold bg-primary/5 rounded-2xl border-2 border-primary/20 animate-pulse"
          >
            <Globe className="w-5 h-5 animate-spin-slow" />
            Checking online for team motivation and missing players...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Comparison Area */}
      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start relative">
        {/* Home Team */}
        <div className="space-y-6">
          <TeamSelector 
            label="Home Team" 
            selectedTeam={homeTeam} 
            onSelect={setHomeTeam} 
          />
          <ModifierPanel 
            side="Home" 
            team={homeTeam} 
            modifiers={homeMods} 
            onChange={setHomeMods} 
            report={homeReport}
          />
        </div>

        {/* VS Divider */}
        <div className="hidden lg:flex flex-col items-center justify-center h-full pt-16">
          <div className="w-px h-full bg-border relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-background border-2 border-border shadow-sm">
              <Swords className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className="space-y-6">
          <TeamSelector 
            label="Away Team" 
            selectedTeam={awayTeam} 
            onSelect={setAwayTeam} 
          />
          <ModifierPanel 
            side="Away" 
            team={awayTeam} 
            modifiers={awayMods} 
            onChange={setAwayMods} 
            report={awayReport}
          />
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pt-8 border-t border-border"
          >
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black">Match Prediction</h2>
                <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              <OddsDisplay 
                result={result} 
                homeTeamName={homeTeam?.name} 
                awayTeamName={awayTeam?.name} 
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {!result && !isAnalyzing && (
        <div className="pt-8 border-t border-border">
          <div className="max-w-2xl mx-auto">
            <OddsDisplay result={null} />
          </div>
        </div>
      )}
    </div>
  );
}
