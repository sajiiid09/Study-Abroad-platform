import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Trophy, MapPin } from "lucide-react";

interface University {
  name: string;
  worldRanking: number;
  city: string;
  specialties: string[];
}

interface UniversitiesDialogProps {
  country: string;
  flag: string;
  universities: University[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UniversitiesDialog = ({ country, flag, universities, open, onOpenChange }: UniversitiesDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-3">
            <span className="text-3xl">{flag}</span>
            Top Universities in {country}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {universities.map((uni, index) => (
            <div
              key={uni.name}
              className="p-4 rounded-xl border border-border bg-card hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{uni.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{uni.city}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {uni.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">World Rank</span>
                  <span className="font-display font-bold text-lg text-foreground">#{uni.worldRanking}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Rankings based on QS World University Rankings 2024
        </p>
      </DialogContent>
    </Dialog>
  );
};
