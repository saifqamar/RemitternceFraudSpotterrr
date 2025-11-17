'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { Shield, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { analyzeFraud } from '@/app/actions';
import type { FraudAnalysisResult } from '@/lib/types';

import FraudForm from '@/components/fraud-form';
import ResultsDisplay from '@/components/results-display';
import AuditTrail from '@/components/audit-trail';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const initialState: { data: FraudAnalysisResult | null, error: string | null } = {
  data: null,
  error: null,
};

export default function Home() {
  const [state, formAction] = useFormState(analyzeFraud, initialState);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (state.data || state.error) {
      setIsPending(false);
    }
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Analysis Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-primary/10 text-primary py-2 px-4 rounded-full mb-4">
          <Shield className="w-6 h-6" />
          <h1 className="text-3xl md:text-4xl font-headline font-bold">
            FraudSpotter
          </h1>
        </div>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Proactively detect and prevent fraudulent transactions with our AI-powered analysis engine.
        </p>
      </header>

      <section className="mb-12">
        <FraudForm formAction={formAction} onFormSubmit={() => setIsPending(true)} />
      </section>

      <section>
        {isPending && <LoadingState />}
        {!isPending && state.data && (
          <div className="space-y-8 animate-in fade-in-0 duration-500">
            <ResultsDisplay results={state.data} />
            <AuditTrail auditTrail={state.data.auditTrail} />
          </div>
        )}
        {!isPending && !state.data && <InitialState />}
      </section>

      <footer className="text-center mt-16 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} FraudSpotter. All rights reserved.</p>
      </footer>
    </main>
  );
}


function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-12 w-3/4" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <Skeleton className="h-8 w-1/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InitialState() {
  return (
    <Card className="border-dashed">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-secondary rounded-full">
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 font-headline">Awaiting Analysis</h3>
        <p className="text-muted-foreground">
          Your fraud analysis results will appear here once you submit the data.
        </p>
      </CardContent>
    </Card>
  )
}
