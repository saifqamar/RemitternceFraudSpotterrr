import type { AuditEvent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, Globe, LocateFixed } from 'lucide-react';
import { format } from 'date-fns';

type AuditTrailProps = {
  auditTrail: AuditEvent[];
};

export default function AuditTrail({ auditTrail }: AuditTrailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <History className="w-5 h-5" />
          Audit Trail
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Timestamp</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>
                  <div className='flex items-center gap-2'>
                    <LocateFixed className="w-4 h-4"/>
                    IP Address
                  </div>
                </TableHead>
                <TableHead>
                  <div className='flex items-center gap-2'>
                    <Globe className="w-4 h-4"/>
                    Geo-Location
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditTrail.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    {format(new Date(event.timestamp), "MMM d, yyyy, h:mm:ss a")}
                  </TableCell>
                  <TableCell>{event.event}</TableCell>
                  <TableCell className="font-mono text-sm">{event.ipAddress}</TableCell>
                  <TableCell>{event.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
