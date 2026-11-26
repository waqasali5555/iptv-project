export const site = {
  name: 'PlexTech',
  subtitle: 'OTT & Cloud Infra',
  domain: 'plextech.online',
  url: 'https://www.plextech.online',
  tagline: 'Build • Secure • Monitor • Optimize',
  whatsapp: 'https://wa.me/923057270179',
  phone: '+92 305 7270179',
  email: 'waqasalidevops@gmail.com',
  linkedin: 'https://www.linkedin.com/in/waqas-ali-699095308/',
  facebook: 'https://www.facebook.com/profile.php?id=61593882225466',
  disclaimer:
    'For authorized and licensed IPTV/OTT platforms, private media servers, and SMB storage infrastructure.',
} as const;

export const nav = [
  ['Home', '/'],
  ['Services', '/services/'],
  ['Infrastructure', '/infrastructure/'],
  ['Streaming', '/streaming-solutions/'],
  ['Troubleshooting', '/troubleshooting/'],
  ['Security & Monitoring', '/security-monitoring/'],
  ['Portfolio', '/portfolio/'],
  ['Blog', '/blog/'],
  ['Technologies', '/technologies/'],
  ['About', '/about/'],
  ['Contact', '/contact/'],
] as const;

export const services = [
  [
    'IPTV & OTT Streaming Infrastructure',
    'SRT/RTMP ingest, FFmpeg/ABR transcoding, HLS/DASH delivery, CDN edge caching, and M3U & EPG pipelines.',
  ],
  [
    'Plex Media Server Optimization',
    '4K hardware GPU transcoding (QuickSync, NVENC, AMD VCN), CGNAT/Double NAT remote access, and library tuning.',
  ],
  [
    'Unraid, TrueNAS & Synology NAS',
    'Zero-data-loss migrations, Docker UID/GID permission fixes, ZFS/XFS storage pools, and 3-2-1 automated backups.',
  ],
  [
    'DevOps, Containers & Mesh VPN',
    'Docker, Kubernetes, Terraform, Nginx reverse proxies, and secure Tailscale/WireGuard remote networking.',
  ],
  [
    'M3U & EPG Integration',
    'Automated XMLTV cron workflows, timezone offset correction, middleware integration, and stream validation.',
  ],
  [
    '24/7 Monitoring & Alerting',
    'Grafana, Prometheus, Alertmanager, and Loki observability with real-time Telegram alerts for stream and server health.',
  ],
  [
    'Live TV & VOD Infrastructure',
    'Scalable technical foundations for licensed live channels and on-demand media libraries.',
  ],
  [
    'Streaming Protocols',
    'HLS, MPEG-DASH, RTMP, RTSP, SRT, and WebRTC ingest, relay, and low-latency delivery workflows.',
  ],
  [
    'CDN & Cloud Infrastructure',
    'Cloud architecture, VPS edge relays, and CDN edge delivery designed around peak concurrent viewers.',
  ],
  [
    'SSL & Security Configuration',
    'TLS certificates, reverse proxy hardening, firewall rules, least-privilege access, and API protection.',
  ],
  [
    'Performance Optimization',
    'Bottleneck profiling, TCP BBR congestion tuning, encoder worker balancing, and storage I/O optimization.',
  ],
  [
    'Backup & Recovery',
    'Practical 3-2-1 backup policies, ZFS snapshots, off-site replication, and verified restore drills.',
  ],
  [
    'IPTV / OTT & Plex Troubleshooting',
    'Structured diagnosis of buffering, CGNAT drops, transcoding stalls, panel errors, and network failures.',
  ],
  [
    'Server & NAS Migration',
    'Controlled server and multi-terabyte storage migrations with checksum verification and clear rollback plans.',
  ],
  [
    'Managed Server Maintenance',
    'Ongoing OS updates, Docker maintenance, SMART disk monitoring, SSL checks, and priority incident response.',
  ],
] as const;

export type IssueCategory = 'IPTV & OTT' | 'Plex & Unraid' | 'NAS & DevOps';

export interface CommonIssue {
  id: string;
  title: string;
  category: IssueCategory;
  tags: string[];
  summary: string;
  defaultDetails: string;
}

export const commonIssues: CommonIssue[] = [
  {
    id: 'iptv-buffering',
    title: 'IPTV Buffering & Stream Freezing',
    category: 'IPTV & OTT',
    tags: ['FFmpeg ABR', 'CDN Edge Caching', 'TCP BBR'],
    summary:
      'Eliminate peak-hour stalling and segment drops with adaptive bitrate ladder tuning, Nginx/CDN edge caching, and Linux TCP BBR congestion control.',
    defaultDetails:
      'Experiencing IPTV buffering or stream freezing during peak hours. Looking for FFmpeg ABR, CDN edge caching, and TCP BBR tuning.',
  },
  {
    id: 'm3u-epg-sync',
    title: 'M3U Playlist & EPG Sync Errors',
    category: 'IPTV & OTT',
    tags: ['XMLTV Cron', 'Timezone Offsets', 'Middleware'],
    summary:
      'Resolve broken channel mappings, stale guide schedules, and parsing failures across XMLTV cron jobs, timezone offsets, and OTT middleware.',
    defaultDetails:
      'Need help fixing M3U playlist errors, XMLTV cron sync failures, timezone offsets, or middleware EPG mapping.',
  },
  {
    id: 'srt-rtmp-ingest',
    title: 'SRT / RTMP Ingest & Transcode Drops',
    category: 'IPTV & OTT',
    tags: ['Encoder Stability', 'GPU Load Balancing', 'SRT / RTMP'],
    summary:
      'Stabilize upstream ingest feeds, tune SRT latency/jitter buffers, and balance FFmpeg GPU transcode workers so channels stay online continuously.',
    defaultDetails:
      'Seeing SRT/RTMP ingest disconnects or FFmpeg transcode worker drops. Need encoder stability and GPU load balancing.',
  },
  {
    id: 'plex-cgnat-remote',
    title: 'Plex Remote Access & CGNAT Fix',
    category: 'Plex & Unraid',
    tags: ['IP Passthrough', 'WireGuard / Tailscale', 'VPS Reverse Proxy'],
    summary:
      'Bypass ISP CGNAT and Double NAT restrictions cleanly using router IP Passthrough, WireGuard/Tailscale tunnels, or a dedicated VPS reverse proxy.',
    defaultDetails:
      'Plex Remote Access shows unavailable or indirect playback due to CGNAT / Double NAT. Need WireGuard/Tailscale or VPS reverse proxy setup.',
  },
  {
    id: '4k-gpu-transcoding',
    title: '4K Hardware Transcoding & GPU Passthrough',
    category: 'Plex & Unraid',
    tags: ['Intel QuickSync', 'NVIDIA NVENC', 'AMD VCN / Docker'],
    summary:
      'Stop CPU 100% spikes during 4K HDR playback by configuring Intel QuickSync (/dev/dri), NVIDIA NVENC, or AMD VCN GPU passthrough inside Unraid and Docker.',
    defaultDetails:
      'Need 4K hardware transcoding and GPU passthrough configured for Plex/Jellyfin on Unraid or Docker (QuickSync / NVENC / AMD VCN).',
  },
  {
    id: 'nas-migration',
    title: 'Unraid / TrueNAS / Synology Migration',
    category: 'NAS & DevOps',
    tags: ['Zero-Data-Loss', 'UID/GID Permissions', 'Automated Backups'],
    summary:
      'Move multi-terabyte media libraries and Docker appdata safely across Unraid, TrueNAS Scale, and Synology with unified UID/GID permissions and 3-2-1 backups.',
    defaultDetails:
      'Planning an Unraid, TrueNAS, or Synology NAS migration and need zero-data-loss transfer, Docker UID/GID fixes, and automated backups.',
  },
];

export interface CaseStudy {
  tag: string;
  metric: string;
  title: string;
  summary: string;
  stack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    tag: 'IPTV & OTT',
    metric: '99.95% Uptime',
    title: 'Peak-Hour HLS Buffering Fix',
    summary:
      'Diagnosed evening packet loss and origin saturation on a licensed OTT platform. Rebuilt FFmpeg ABR profiles, added Nginx micro-caching with CDN edge rules, and enabled TCP BBR.',
    stack: ['FFmpeg ABR', 'Nginx Cache', 'Cloudflare CDN', 'TCP BBR'],
  },
  {
    tag: 'Plex & Unraid',
    metric: '6x 4K Streams',
    title: 'CGNAT & 4K GPU Transcoding Fix',
    summary:
      'Resolved indirect Plex relay throttling behind ISP CGNAT using a lightweight VPS WireGuard tunnel and reverse proxy, paired with Intel QuickSync tone-mapping passthrough.',
    stack: ['Plex', 'WireGuard', 'VPS Proxy', 'Intel QuickSync'],
  },
  {
    tag: 'NAS Storage',
    metric: '40TB Zero Loss',
    title: '40TB Synology to TrueNAS Scale Migration',
    summary:
      'Migrated 40TB of media and container configs from Synology DSM to TrueNAS Scale ZFS RAIDZ2 with checksum-verified sync, clean UID/GID mappings, and 3-2-1 off-site snapshots.',
    stack: ['TrueNAS Scale', 'ZFS', 'Docker UID/GID', '3-2-1 Backups'],
  },
  {
    tag: 'DevOps & SRE',
    metric: '< 30s Alerts',
    title: '24/7 Grafana & Telegram Alerts',
    summary:
      'Deployed Prometheus, Grafana, Alertmanager, and Loki across streaming nodes and NAS hosts to trigger instant Telegram alerts on stream drops, SMART warnings, or high GPU load.',
    stack: ['Grafana', 'Prometheus', 'Loki', 'Telegram Bot'],
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'remote-connection',
    question: 'How do remote engineering sessions work (SSH, AnyDesk, or RustDesk)?',
    answer:
      'We connect securely via SSH (with temporary key-based access) for Linux, Docker, TrueNAS, and Unraid servers, or via encrypted screen-sharing using RustDesk or AnyDesk when router/NAS GUI access is required. You stay in full control, can observe every change live, and can revoke temporary credentials immediately after handover.',
  },
  {
    id: 'plex-cgnat',
    question: 'Can you fix Plex Remote Access if my ISP uses CGNAT or Double NAT?',
    answer:
      'Yes. When an ISP blocks port forwarding via CGNAT or Double NAT, we inspect your router/ONT topology for IP Passthrough or bridge options first. If public IPv4 is unavailable, we configure a clean WireGuard or Tailscale mesh tunnel routed through an inexpensive VPS reverse proxy so Plex streams directly in full quality instead of 2 Mbps Plex Relay.',
  },
  {
    id: 'iptv-ott-scaling',
    question: 'How do you help scale authorized IPTV and OTT streaming platforms?',
    answer:
      'We audit your full pipeline from SRT/RTMP ingest and GPU-accelerated FFmpeg ABR transcoding to origin shielding, load balancing, and CDN edge delivery. All work is strictly for authorized, licensed IPTV/OTT platforms, private media servers, and legitimate SMB storage infrastructure.',
  },
  {
    id: 'monthly-retainers',
    question: 'What is included in a monthly support retainer?',
    answer:
      'Monthly retainers cover 24/7 Prometheus/Grafana monitoring with Telegram alerting, routine OS and Docker/NAS patching, SSL certificate checks, ZFS/XFS and 3-2-1 backup verification, capacity reviews, and priority remote incident response when a stream or storage node needs urgent attention.',
  },
];

const technologyEntries = [
  ['HLS', 'Streaming'],
  ['MPEG-DASH', 'Streaming'],
  ['RTMP', 'Streaming'],
  ['RTSP', 'Streaming'],
  ['SRT', 'Streaming'],
  ['WebRTC', 'Streaming'],
  ['FFmpeg', 'Streaming'],
  ['Nginx RTMP', 'Streaming'],
  ['SRS', 'Streaming'],
  ['MediaMTX', 'Streaming'],
  ['Wowza', 'Streaming'],
  ['Ant Media Server', 'Streaming'],
  ['Flussonic', 'Streaming'],
  ['Nimble Streamer', 'Streaming'],
  ['GStreamer', 'Streaming'],
  ['Plex', 'IPTV Platforms'],
  ['Jellyfin', 'IPTV Platforms'],
  ['Emby', 'IPTV Platforms'],
  ['Tvheadend', 'IPTV Platforms'],
  ['Kodi', 'IPTV Platforms'],
  ['ErsatzTV', 'IPTV Platforms'],
  ['Threadfin', 'IPTV Platforms'],
  ['xTeVe', 'IPTV Platforms'],
  ['Ministra / Stalker', 'IPTV Platforms'],
  ['Xtream-compatible panels', 'IPTV Platforms'],
  ['IPTVnator', 'IPTV Platforms'],
  ['TiviMate', 'IPTV Platforms'],
  ['OTT Navigator', 'IPTV Platforms'],
  ['IPTV Smarters', 'IPTV Platforms'],
  ['M3U4U', 'IPTV Platforms'],
  ['XMLTV', 'IPTV Platforms'],
  ['EPG Collector', 'IPTV Platforms'],
  ['WebGrab+Plus', 'IPTV Platforms'],
  ['Linux', 'Servers'],
  ['Unraid', 'Servers'],
  ['TrueNAS Scale', 'Servers'],
  ['Synology DSM', 'Servers'],
  ['ZFS / XFS', 'Servers'],
  ['Intel QuickSync', 'Servers'],
  ['NVIDIA NVENC', 'Servers'],
  ['Docker', 'DevOps'],
  ['Kubernetes', 'DevOps'],
  ['Terraform', 'DevOps'],
  ['AWS', 'Cloud'],
  ['Cloudflare', 'CDN'],
  ['Nginx', 'Networking'],
  ['Tailscale', 'Networking'],
  ['WireGuard', 'Networking'],
  ['Prometheus', 'Monitoring'],
  ['Grafana', 'Monitoring'],
  ['Alertmanager', 'Monitoring'],
  ['Loki', 'Monitoring'],
  ['SSL/TLS', 'Security'],
  ['Firewall', 'Security'],
] as const;

const categoryLogos: Record<string, string> = {
  Streaming: 'streaming/stream',
  'IPTV Platforms': 'iptv/platform',
  Servers: 'servers/server',
  DevOps: 'devops/devops',
  Cloud: 'cloud/cloud',
  CDN: 'cdn/cdn',
  Networking: 'networking/network',
  Monitoring: 'monitoring/monitoring',
  Security: 'security/security',
};

export const technologies = technologyEntries.map(([name, category]) => ({
  name,
  category,
  description: 'Deployment, integration or troubleshooting support.',
  logo: categoryLogos[category],
  logoAlt: `${name} ${
    ['HLS', 'MPEG-DASH', 'RTMP', 'RTSP', 'SRT', 'WebRTC', 'SSL/TLS', 'Firewall'].includes(name)
      ? 'technology icon'
      : 'logo'
  }`,
}));
