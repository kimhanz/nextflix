export function mapCertification(cert: string): string {
  if (!cert) return 'NR';

  switch (cert.toUpperCase()) {
    case 'G':
      return '0+';
    case 'PG':
      return '10+';
    case 'PG-13':
      return '13+';
    case 'R':
      return '16+';
    case 'NC-17':
      return '18+';
    default:
      return cert;
  }
}
