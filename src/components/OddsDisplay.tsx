import * as React from 'react';
import { PredictionResult } from '@/lib/odds-engine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Scale, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OddsDisplayProps {
  result: PredictionResult | null;
  homeTeamName?: string;
  awayTeamName?: string;
}

export function OddsDisplay({ result, homeTeamName, awayTeamName }: OddsDisplayProps) {
  if (!result) return (
    <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-2xl bg-muted/30">
      <Scale className="w-12 h-12 text-muted-foreground/30 mb-4" />
      <h3 className="text-xl font-semibold text-muted-foreground">Select two teams to compare</h3>
      <p className="text-sm text-muted-foreground max-w-xs mt-2">
        Odds are calculated strictly based on market values and situational modifiers.
      </p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter bg-background">
            Live Prediction
          </Badge>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium italic">Source: Transfermarkt Real-Time Valuation Mock</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Home Win */}
        <div className="flex flex-col items-center p-6 rounded-2xl bg-card border-2 border-border shadow-sm group hover:border-primary/50 transition-all">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Home (1)</span>
          <div className="text-4xl font-black text-primary mb-2 font-mono">{result.homeWin.toFixed(2)}</div>
          <Badge variant="secondary" className="font-mono">{result.homeProb}%</Badge>
        </div>

        {/* Draw */}
        <div className="flex flex-col items-center p-6 rounded-2xl bg-card border-2 border-border shadow-sm group hover:border-primary/50 transition-all">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Draw (X)</span>
          <div className="text-4xl font-black text-foreground mb-2 font-mono">{result.draw.toFixed(2)}</div>
          <Badge variant="secondary" className="font-mono">{result.drawProb}%</Badge>
        </div>

        {/* Away Win */}
        <div className="flex flex-col items-center p-6 rounded-2xl bg-card border-2 border-border shadow-sm group hover:border-primary/50 transition-all">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Away (2)</span>
          <div className="text-4xl font-black text-primary mb-2 font-mono">{result.awayWin.toFixed(2)}</div>
          <Badge variant="secondary" className="font-mono">{result.awayProb}%</Badge>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4" />
            Probability Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-10 w-full rounded-full overflow-hidden flex shadow-inner bg-muted">
            <div 
              style={{ width: `${result.homeProb}%` }} 
              className="h-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground transition-all duration-1000 ease-out"
            >
              {result.homeProb > 10 && 'HOME'}
            </div>
            <div 
              style={{ width: `${result.drawProb}%` }} 
              className="h-full bg-muted-foreground/30 flex items-center justify-center text-[10px] font-bold text-foreground transition-all duration-1000 ease-out border-x border-background/20"
            >
              {result.drawProb > 10 && 'DRAW'}
            </div>
            <div 
              style={{ width: `${result.awayProb}%` }} 
              className="h-full bg-primary/80 flex items-center justify-center text-[10px] font-bold text-primary-foreground transition-all duration-1000 ease-out"
            >
              {result.awayProb > 10 && 'AWAY'}
            </div>
          </div>
          
          <div className="flex justify-between text-xs font-medium px-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>{homeTeamName || 'Home'} Win</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              <span>Draw</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary/80" />
              <span>{awayTeamName || 'Away'} Win</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-3">
        <Trophy className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-primary">Market Value Advantage</h4>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {result.homeValue > result.awayValue 
              ? `${homeTeamName || 'Home team'} has a €${(result.homeValue - result.awayValue).toFixed(0)}m value advantage after modifiers.`
              : `${awayTeamName || 'Away team'} has a €${(result.awayValue - result.homeValue).toFixed(0)}m value advantage after modifiers.`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
