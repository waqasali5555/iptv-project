export const site = {
  name: 'IPTV & OTT Infrastructure Services',
  tagline: 'Build • Secure • Monitor • Optimize',
  whatsapp: 'https://wa.me/923057270179',
  phone: '03057270179',
  email: 'waqasalidevops@gmail.com',
  linkedin: 'https://www.linkedin.com/in/waqas-ali-699095308/',
  facebook: 'https://www.facebook.com/profile.php?id=61593882225466',
};

export const nav = [
  ['Home', '/'], ['Services', '/services/'], ['Infrastructure', '/infrastructure/'], ['Streaming', '/streaming-solutions/'], ['Troubleshooting', '/troubleshooting/'], ['Security & Monitoring', '/security-monitoring/'], ['Technologies', '/technologies/'], ['About', '/about/'], ['Contact', '/contact/'],
] as const;

export const services = [
  ['IPTV & OTT Server Setup', 'Purpose-built server environments, correctly provisioned for production workloads.'],
  ['Streaming Server Deployment', 'Reliable ingest, relay, encoding and delivery pipelines for authorized media.'],
  ['IPTV Panel Installation', 'Panel installation, configuration and operational integration.'],
  ['M3U & EPG Integration', 'Structured playlist and guide data integration, validation and maintenance.'],
  ['Live TV & VOD Infrastructure', 'Scalable technical foundations for licensed live and on-demand services.'],
  ['Streaming Protocols', 'HLS, MPEG-DASH, RTMP, RTSP, SRT and WebRTC workflows.'],
  ['CDN & Cloud Infrastructure', 'Cloud architecture and CDN edge delivery designed around your demand.'],
  ['SSL & Security Configuration', 'TLS, reverse proxy, access controls and sensible hardening.'],
  ['Performance Optimization', 'Profiling bottlenecks and tuning server, network and streaming layers.'],
  ['24/7 Monitoring & Alerts', 'Actionable health checks and alerting for systems and streams.'],
  ['Backup & Recovery', 'Practical backup policies with restore-minded verification.'],
  ['IPTV / OTT Troubleshooting', 'Fast diagnosis of playback, panel, network and platform issues.'],
  ['Server Migration', 'Controlled migrations with a clear cutover plan and rollback path.'],
  ['Infrastructure Audit', 'Review architecture, risk, capacity and operational blind spots.'],
  ['Managed Server Maintenance', 'Ongoing updates, monitoring, maintenance and incident response.'],
] as const;

const technologyEntries = [
  ['HLS', 'Streaming'], ['MPEG-DASH', 'Streaming'], ['RTMP', 'Streaming'], ['RTSP', 'Streaming'], ['SRT', 'Streaming'], ['WebRTC', 'Streaming'], ['FFmpeg', 'Streaming'], ['Nginx RTMP', 'Streaming'], ['SRS', 'Streaming'], ['MediaMTX', 'Streaming'], ['Wowza', 'Streaming'], ['Ant Media Server', 'Streaming'], ['Flussonic', 'Streaming'], ['Nimble Streamer', 'Streaming'], ['GStreamer', 'Streaming'],
  ['Jellyfin', 'IPTV Platforms'], ['Plex', 'IPTV Platforms'], ['Emby', 'IPTV Platforms'], ['Tvheadend', 'IPTV Platforms'], ['Kodi', 'IPTV Platforms'], ['ErsatzTV', 'IPTV Platforms'], ['Threadfin', 'IPTV Platforms'], ['xTeVe', 'IPTV Platforms'], ['Ministra / Stalker', 'IPTV Platforms'], ['Xtream-compatible panels', 'IPTV Platforms'], ['IPTVnator', 'IPTV Platforms'], ['TiviMate', 'IPTV Platforms'], ['OTT Navigator', 'IPTV Platforms'], ['IPTV Smarters', 'IPTV Platforms'], ['M3U4U', 'IPTV Platforms'], ['XMLTV', 'IPTV Platforms'], ['EPG Collector', 'IPTV Platforms'], ['WebGrab+Plus', 'IPTV Platforms'],
  ['Linux', 'Servers'], ['Docker', 'DevOps'], ['Kubernetes', 'DevOps'], ['Terraform', 'DevOps'], ['AWS', 'Cloud'], ['Cloudflare', 'CDN'], ['Nginx', 'Networking'], ['Prometheus', 'Monitoring'], ['Grafana', 'Monitoring'], ['Alertmanager', 'Monitoring'], ['Loki', 'Monitoring'], ['SSL/TLS', 'Security'], ['Firewall', 'Security']
] as const;

const categoryLogos: Record<string, string> = {
  'Streaming': 'streaming/stream',
  'IPTV Platforms': 'iptv/platform',
  'Servers': 'servers/server',
  'DevOps': 'devops/devops',
  'Cloud': 'cloud/cloud',
  'CDN': 'cdn/cdn',
  'Networking': 'networking/network',
  'Monitoring': 'monitoring/monitoring',
  'Security': 'security/security',
};

export const technologies = technologyEntries.map(([name, category]) => ({
  name,
  category,
  description: 'Deployment, integration or troubleshooting support.',
  logo: categoryLogos[category],
  logoAlt: `${name} ${['HLS','MPEG-DASH','RTMP','RTSP','SRT','WebRTC','SSL/TLS','Firewall'].includes(name) ? 'technology icon' : 'logo'}`,
}));
