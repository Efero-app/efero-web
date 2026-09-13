export function NewJobMockup() {
  return (
    <div className="rounded-[12px] overflow-hidden border border-border bg-white" style={{ height: 340 }}>
      <div className="bg-navy px-5 py-3 flex items-center gap-3">
        <div className="w-5 h-5 rounded flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 1L5 7l4 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-white font-semibold text-[13px]">Ny jobb</span>
      </div>
      <div className="p-5 flex flex-col gap-4">
        {[
          { label: 'Kundenavn', value: 'Kjetil Hansen', hint: '' },
          { label: 'Adresse',   value: 'Storgata 12, Oslo', hint: '' },
          { label: 'Beskrivelse', value: 'Bytte varmtvannsbereder', hint: '' },
        ].map(f => (
          <div key={f.label}>
            <div className="text-[11px] text-slate font-medium mb-1">{f.label}</div>
            <div className="h-10 rounded-lg border border-border bg-lgray px-3 flex items-center text-[13px] text-charcoal">{f.value}</div>
          </div>
        ))}
        <div>
          <div className="text-[11px] text-slate font-medium mb-1">Tekniker</div>
          <div className="h-10 rounded-lg border border-eblue bg-eblue/5 px-3 flex items-center justify-between text-[13px]">
            <span className="text-eblue font-medium">Magnus Vik</span>
            <svg className="w-4 h-4 text-eblue" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 10L3 5h10L8 10z"/>
            </svg>
          </div>
        </div>
        <div className="h-10 rounded-lg bg-navy flex items-center justify-center text-white text-[13px] font-semibold mt-1">
          Opprett jobb
        </div>
      </div>
    </div>
  )
}

export function DashboardMockup() {
  const jobs = [
    { name: 'Kjetil Hansen', addr: 'Storgata 12, Oslo', status: 'Pågår', color: 'bg-blue-100 text-eblue' },
    { name: 'Nina Berg',      addr: 'Fjordveien 3, Bergen', status: 'Ny',    color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Tor Lindgren',   addr: 'Elvegata 8, Trondheim', status: 'Ny',   color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Anne Sørby',     addr: 'Parkveien 22, Oslo',  status: 'Pågår', color: 'bg-blue-100 text-eblue' },
  ]
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-border flex" style={{ height: 380 }} role="img" aria-label="Efero jobbstyring dashboard for håndverkere">
      {/* Sidebar */}
      <div className="w-[160px] bg-navy flex-shrink-0 flex flex-col py-4 px-3 gap-1">
        <div className="flex items-center gap-1.5 px-2 pb-4 mb-2 border-b border-white/10">
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="4" width="9" height="4" rx="1.5" fill="#2563FF"/>
            <rect x="2" y="12" width="7" height="4" rx="1.5" fill="#2563FF"/>
            <rect x="2" y="20" width="9" height="4" rx="1.5" fill="#2563FF"/>
          </svg>
          <span className="text-white font-bold text-[14px]">Efero</span>
        </div>
        {[
          ['Jobbtavle', true],['Tilbud', false],['Kunder', false],
          ['Team', false],['Faktura', false],['Innstillinger', false],
        ].map(([label, active]) => (
          <div key={label as string} className={`px-2 py-2 rounded-lg text-[12px] font-medium ${active ? 'bg-eblue text-white' : 'text-white/50'}`}>
            {label as string}
          </div>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 bg-lgray overflow-hidden flex flex-col">
        <div className="bg-white px-4 py-3 border-b border-border flex justify-between items-center">
          <span className="font-semibold text-[15px] text-navy">Jobbtavle</span>
          <div className="h-7 px-3 rounded-lg bg-eblue text-white text-[11px] font-semibold flex items-center">+ Ny jobb</div>
        </div>
        <div className="flex gap-3 p-3">
          {[['Aktive', '8', '#EEF4FF', '#2563FF'],['Fullført', '24', '#F0FDF4', '#15803D'],['Forfalt', '2', '#FEF2F2', '#DC2626'],['I dag', '3', '#FFFBEB', '#C2410C']].map(([l,n,bg,c]) => (
            <div key={l} className="flex-1 rounded-xl p-3" style={{ backgroundColor: bg }}>
              <div className="text-[11px] font-medium" style={{ color: c }}>{l}</div>
              <div className="text-[22px] font-bold mt-0.5" style={{ color: c }}>{n}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-hidden px-3">
          <div className="bg-white rounded-xl overflow-hidden border border-border">
            {jobs.map((j, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2.5 ${i < jobs.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  {j.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-navy truncate">{j.name}</div>
                  <div className="text-[10px] text-slate truncate">{j.addr}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${j.color}`}>{j.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function InvoiceMockup() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-white" style={{ height: 320 }} role="img" aria-label="Efero faktura for håndverkere">
      <div className="bg-navy px-5 py-3 flex justify-between items-center">
        <span className="text-white font-semibold text-[13px]">Faktura</span>
        <span className="text-white/50 text-[11px]">INV-2026-004</span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[11px] text-slate mb-0.5">KUNDE</div>
            <div className="font-semibold text-[14px]">Kjetil Hansen</div>
            <div className="text-[12px] text-slate">Storgata 12, Oslo</div>
          </div>
          <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[11px] font-semibold">Betalt</div>
        </div>
        <div className="border border-border rounded-xl overflow-hidden mb-4">
          {[['Arbeidstimer (3t × 895 kr)', '2 685'],['Materiell', '450'],['Fremmøtegebyr', '350']].map(([d,a], i, arr) => (
            <div key={i} className={`flex justify-between px-3 py-2.5 text-[12px] ${i < arr.length-1 ? 'border-b border-border' : ''}`}>
              <span className="text-charcoal">{d}</span><span className="font-medium">{a} kr</span>
            </div>
          ))}
          <div className="flex justify-between px-3 py-2.5 bg-lgray border-t border-border">
            <span className="font-semibold text-[13px]">Totalt inkl. MVA</span>
            <span className="font-bold text-[15px] text-eblue">4 356 kr</span>
          </div>
        </div>
        <div className="bg-eblue text-white text-center py-2.5 rounded-btn text-[13px] font-semibold">Last ned PDF</div>
      </div>
    </div>
  )
}

export function TechnicianMockup() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-white mx-auto" style={{ height: 320, maxWidth: 260 }} role="img" aria-label="Efero team oversikt for håndverkerbedrifter">
      <div className="bg-navy px-4 py-3">
        <div className="text-white font-semibold text-[13px]">Mine jobber</div>
        <div className="text-white/50 text-[11px]">3 jobber i dag</div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        {[
          { name: 'Kjetil Hansen', addr: 'Storgata 12', time: '08:00', status: 'Fullført', color: 'text-emerald-700 bg-emerald-100' },
          { name: 'Nina Berg',     addr: 'Fjordveien 3', time: '11:00', status: 'Pågår',   color: 'text-eblue bg-blue-100' },
          { name: 'Tor Lindgren',  addr: 'Elvegata 8',  time: '14:00', status: 'Ny',       color: 'text-slate bg-lgray' },
        ].map((j, i) => (
          <div key={i} className="border border-border rounded-xl p-3">
            <div className="flex justify-between items-start mb-1.5">
              <div className="font-semibold text-[13px] text-navy">{j.name}</div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${j.color}`}>{j.status}</span>
            </div>
            <div className="text-[11px] text-slate">{j.addr}</div>
            <div className="text-[11px] text-slate mt-0.5">kl. {j.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StatisticsMockup() {
  const bars = [
    { month: 'Jan', h: 42 },
    { month: 'Feb', h: 55 },
    { month: 'Mar', h: 50 },
    { month: 'Apr', h: 68 },
    { month: 'Mai', h: 60 },
    { month: 'Jun', h: 100 },
  ]
  const techs = [
    { name: 'Magnus Vik',  jobs: 28, pct: 75 },
    { name: 'Lars Nilsen', jobs: 19, pct: 51 },
    { name: 'Tor Berg',    jobs: 12, pct: 32 },
  ]
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-white" style={{ height: 360 }}>
      <div className="bg-navy px-5 py-3 flex justify-between items-center">
        <span className="text-white font-semibold text-[13px]">Statistikk</span>
        <span className="text-white/50 text-[11px]">Juni 2026</span>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <div className="text-[11px] text-slate mb-0.5">Totalt denne måneden</div>
          <div className="text-[26px] font-bold text-navy leading-none">48 500 kr</div>
        </div>
        <div className="mb-4">
          <div className="text-[11px] text-slate mb-2">Månedlig inntekt</div>
          <div className="flex items-end gap-1.5" style={{ height: 64 }}>
            {bars.map((b, idx) => (
              <div key={b.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t ${idx === bars.length - 1 ? 'bg-eblue' : 'bg-eblue/25'}`}
                  style={{ height: `${b.h}%` }}
                />
                <div className="text-[9px] text-slate">{b.month}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-slate mb-2">Teknikere</div>
          <div className="flex flex-col gap-2">
            {techs.map(t => (
              <div key={t.name} className="flex items-center gap-2">
                <div className="w-[88px] text-[11px] text-charcoal truncate shrink-0">{t.name}</div>
                <div className="flex-1 bg-lgray rounded-full overflow-hidden" style={{ height: 6 }}>
                  <div className="bg-eblue h-full rounded-full" style={{ width: `${t.pct}%` }} />
                </div>
                <div className="text-[10px] text-slate w-14 text-right shrink-0">{t.jobs} jobber</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function QuoteMockup() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-white" style={{ height: 320 }}>
      <div className="bg-navy px-5 py-3 flex justify-between items-center">
        <span className="text-white font-semibold text-[13px]">Tilbud</span>
        <span className="text-white/50 text-[11px]">TIL-2026-002</span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[11px] text-slate mb-0.5">MOTTAKER</div>
            <div className="font-semibold text-[14px]">Nina Berg</div>
            <div className="text-[12px] text-slate">nina@berg.no</div>
          </div>
          <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[11px] font-semibold">Venter</div>
        </div>
        <div className="border border-border rounded-xl overflow-hidden mb-4">
          {[['Baderomsmontasje', '6 500'],['Rørlegging bad', '3 200'],['MVA 25%', '2 425']].map(([d,a], i, arr) => (
            <div key={i} className={`flex justify-between px-3 py-2.5 text-[12px] ${i < arr.length-1 ? 'border-b border-border' : ''}`}>
              <span className="text-charcoal">{d}</span><span className="font-medium">{a} kr</span>
            </div>
          ))}
          <div className="flex justify-between px-3 py-2.5 bg-lgray border-t border-border">
            <span className="font-semibold text-[13px]">Totalt</span>
            <span className="font-bold text-[15px] text-eblue">12 125 kr</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-eblue text-white text-center py-2.5 rounded-btn text-[12px] font-semibold">Send på e-post</div>
          <div className="flex-1 border border-eblue text-eblue text-center py-2.5 rounded-btn text-[12px] font-semibold">Forhåndsvis</div>
        </div>
      </div>
    </div>
  )
}
