import * as React from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { mockTeams, Team } from '@/data/teams';

interface TeamSelectorProps {
  selectedTeam: Team | null;
  onSelect: (team: Team) => void;
  label: string;
}

export function TeamSelector({ selectedTeam, onSelect, label }: TeamSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 text-left font-normal border-2 hover:border-primary/50 transition-colors"
          >
            {selectedTeam ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{selectedTeam.name}</span>
                <span className="text-xs text-muted-foreground">€{selectedTeam.marketValue}m</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Select team...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command className="border-none">
            <CommandInput placeholder="Search team or country..." />
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup heading="Clubs">
                {mockTeams
                  .filter((t) => t.type === 'club')
                  .map((team) => (
                    <CommandItem
                      key={team.id}
                      value={team.name}
                      onSelect={() => {
                        onSelect(team);
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedTeam?.id === team.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{team.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {team.country} • €{team.marketValue}m
                        </span>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandGroup heading="Countries">
                {mockTeams
                  .filter((t) => t.type === 'country')
                  .map((team) => (
                    <CommandItem
                      key={team.id}
                      value={team.name}
                      onSelect={() => {
                        onSelect(team);
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedTeam?.id === team.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{team.name}</span>
                        <span className="text-xs text-muted-foreground">
                          National Team • €{team.marketValue}m
                        </span>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
