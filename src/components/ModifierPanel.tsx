import * as React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modifiers } from '@/lib/odds-engine';
import { Team } from '@/data/teams';
import { Users, Zap, TrendingDown } from 'lucide-react';

interface ModifierPanelProps {
  team: Team | null;
  modifiers: Modifiers;
  onChange: (mods: Modifiers) => void;
  side: 'Home' | 'Away';
  report?: string | null;
}

export function ModifierPanel({ team, modifiers, onChange, side, report }: ModifierPanelProps) {
  if (!team) return null;

  const handleMissingPlayersChange = (val: string) => {
    const value = parseInt(val) || 0;
    onChange({ ...modifiers, missingPlayersValue: Math.min(team.marketValue, value) });
  };

  const handleMotivationChange = (vals: number[]) => {
    onChange({ ...modifiers, motivation: vals[0] });
  };

  const effectiveValue = Math.max(0, (team.marketValue - modifiers.missingPlayersValue) * (modifiers.motivation / 100));

  return (
    <div className="space-y-6 p-6 rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          {side} Modifiers
        </h3>
        <span className="text-xs font-mono px-2 py-1 bg-muted rounded uppercase tracking-wider">
          {team.type}
        </span>
      </div>

      {report && (
        <div className="mb-6 p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-muted-foreground italic leading-relaxed animate-in fade-in slide-in-from-top-1 duration-500">
          <div className="flex items-center gap-1.5 text-primary font-bold uppercase tracking-wider mb-1">
            <Zap className="w-3 h-3" /> Analysis Report
          </div>
          {report}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <Label htmlFor={`missing-${side}`} className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            Missing Players MV (€m)
          </Label>
          <span className="text-xs text-muted-foreground">Max €{team.marketValue}m</span>
        </div>
        <div className="flex gap-4 items-center">
          <Input
            id={`missing-${side}`}
            type="number"
            value={modifiers.missingPlayersValue}
            onChange={(e) => handleMissingPlayersChange(e.target.value)}
            className="w-24 font-mono"
            min={0}
            max={team.marketValue}
          />
          <div className="flex-1 text-sm text-muted-foreground italic flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            Reduces team strength
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center">
          <Label className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-yellow-500" />
            Motivation / Form
          </Label>
          <span className="font-mono text-sm font-bold text-primary">{modifiers.motivation}%</span>
        </div>
        <Slider
          value={[modifiers.motivation]}
          onValueChange={handleMotivationChange}
          max={100}
          min={1}
          step={1}
          className="py-4"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-medium">
          <span>Low</span>
          <span>Normal</span>
          <span>Peak</span>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Effective Value:</span>
          <span className="text-lg font-bold text-foreground">€{effectiveValue.toFixed(1)}m</span>
        </div>
      </div>
    </div>
  );
}
