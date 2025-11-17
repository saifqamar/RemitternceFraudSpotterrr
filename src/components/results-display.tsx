import type { FraudAnalysisResult } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type ResultsDisplayProps = {
  results: FraudAnalysisResult;
};

const riskConfig = {
  Low: {
    icon: <ShieldCheck className="w-full h-full text-chart-2" />,
    badgeClass: 'bg-chart-2/20 text-chart-2 border-chart-2/40',
    progressClass: 'bg-chart-2',
  },
  Medium: {
    icon: <ShieldAlert className="w-full h-full text-chart-4" />,
    badgeClass: 'bg-chart-4/20 text-chart-4 border-chart-4/40',
    progressClass: 'bg-chart-4',
  },
  High: {
    icon: <ShieldX className="w-full h-full text-destructive" />,
    badgeClass: 'bg-destructive/20 text-destructive border-destructive/40',
    progressClass: 'bg-destructive',
  },
};

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const config = riskConfig[results.riskLevel];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center flex-grow">
          <div className="w-24 h-24 mb-4">
            {config.icon}
          </div>
          <Badge variant="outline" className={`text-lg px-4 py-1 font-semibold ${config.badgeClass}`}>{results.riskLevel} Risk</Badge>
          <p className="text-5xl font-bold font-headline mt-4">{results.riskScore}</p>
          <p className="text-sm text-muted-foreground">Risk Score (out of 100)</p>
          <div className="w-full mt-6">
            <Progress value={results.riskScore} className="h-3" indicatorClassName={config.progressClass} />
          </div>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Triggered Flags</CardTitle>
          </CardHeader>
          <CardContent>
            {results.flags.length > 0 ? (
              <ul className="space-y-3">
                {results.flags.map((flag, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 mt-0.5 text-chart-4 shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 bg-secondary/50 rounded-lg">
                <ShieldCheck className="w-10 h-10 text-chart-2 mb-2" />
                <p className="font-semibold">No Flags Triggered</p>
                <p className="text-sm text-muted-foreground">The transaction passed all checks.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl">
              <BrainCircuit className="w-6 h-6" />
              AI-Powered Reasoning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 leading-relaxed">
              {results.aiReasoning}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
