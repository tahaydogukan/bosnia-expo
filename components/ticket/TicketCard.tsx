'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Download, Calendar, MapPin, User, Building2, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Invitation } from '@/types';
import { EVENT_INFO } from '@/lib/constants';

interface TicketCardProps {
  invitation: Invitation;
}

export default function TicketCard({ invitation }: TicketCardProps) {
  const isVisitor = invitation.type === 'visitor';
  const displayName = isVisitor
    ? invitation.full_name
    : invitation.company_name;
  const subtitle = isVisitor
    ? invitation.interest_area
    : invitation.contact_name;

  const handleDownload = () => {
    // Create a printable version
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ticket - ${invitation.ticket_no}</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            padding: 40px;
            max-width: 600px;
            margin: 0 auto;
          }
          .ticket {
            border: 2px dashed #e2e8f0;
            border-radius: 16px;
            padding: 32px;
            position: relative;
          }
          .header {
            text-align: center;
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid #e2e8f0;
          }
          .event-name {
            font-size: 24px;
            font-weight: bold;
            color: #0f172a;
          }
          .event-details {
            color: #64748b;
            margin-top: 8px;
          }
          .content {
            display: flex;
            gap: 24px;
          }
          .info {
            flex: 1;
          }
          .label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
          }
          .value {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 16px;
          }
          .ticket-no {
            font-size: 24px;
            font-weight: bold;
            color: #0ea5e9;
            text-align: center;
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid #e2e8f0;
          }
          .qr {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .badge {
            display: inline-block;
            padding: 4px 12px;
            background: ${isVisitor ? '#0ea5e9' : '#10b981'};
            color: white;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="header">
            <div class="event-name">${EVENT_INFO.name}</div>
            <div class="event-details">${EVENT_INFO.date} | ${EVENT_INFO.venue}</div>
          </div>
          <div class="content">
            <div class="info">
              <div class="label">Type</div>
              <div class="value"><span class="badge">${invitation.type}</span></div>
              <div class="label">${isVisitor ? 'Name' : 'Company'}</div>
              <div class="value">${displayName}</div>
              <div class="label">${isVisitor ? 'Interest Area' : 'Contact Person'}</div>
              <div class="value">${subtitle}</div>
              <div class="label">Email</div>
              <div class="value">${invitation.email}</div>
            </div>
            <div class="qr">
              <img src="${document.querySelector('.qr-code-svg')?.outerHTML ? 'data:image/svg+xml,' + encodeURIComponent(document.querySelector('.qr-code-svg')?.outerHTML || '') : ''}" width="120" height="120" />
            </div>
          </div>
          <div class="ticket-no">${invitation.ticket_no}</div>
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="ticket-card rounded-2xl p-6 mx-4">
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b border-dashed border-border">
        <div className="flex justify-center mb-3">
          <Ticket className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-bold text-lg">{EVENT_INFO.name}</h3>
        <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {EVENT_INFO.date}
          </span>
        </div>
        <div className="flex items-center justify-center gap-1 mt-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {EVENT_INFO.venue}
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Left - Info */}
        <div className="flex-1 space-y-4">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white ${
              isVisitor ? 'bg-primary' : 'bg-accent'
            }`}
          >
            {isVisitor ? (
              <User className="w-3 h-3" />
            ) : (
              <Building2 className="w-3 h-3" />
            )}
            {invitation.type.toUpperCase()}
          </div>

          {/* Name */}
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {isVisitor ? 'Name' : 'Company'}
            </div>
            <div className="font-semibold text-lg">{displayName}</div>
          </div>

          {/* Subtitle */}
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {isVisitor ? 'Interest Area' : 'Contact Person'}
            </div>
            <div className="font-medium">{subtitle}</div>
          </div>

          {/* Location */}
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              From
            </div>
            <div className="font-medium">
              {invitation.city}, {invitation.country}
            </div>
          </div>
        </div>

        {/* Right - QR Code */}
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <QRCodeSVG
              value={invitation.qr_payload}
              size={100}
              level="M"
              className="qr-code-svg"
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2">Scan to verify</div>
        </div>
      </div>

      {/* Ticket Number */}
      <div className="mt-6 pt-6 border-t border-dashed border-border text-center">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          Ticket Number
        </div>
        <div className="font-mono font-bold text-2xl text-primary">
          {invitation.ticket_no}
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4 mr-2" />
          Download / Print Ticket
        </Button>
      </div>
    </div>
  );
}
