export function formatImgUrl(url) {
  if (!url) return '/src/assets/shinku_banner.png';

  let cleaned = String(url);

  // If it's a Wikia/Fandom image URL with /revision/latest..., strip scale parameters to avoid 403 hotlinking block
  if (cleaned.includes('static.wikia.nocookie.net')) {
    cleaned = cleaned.split('/revision/latest')[0];
  }

  if (cleaned.startsWith('http://') || cleaned.startsWith('https://') || cleaned.startsWith('data:')) {
    return cleaned;
  }

  if (!cleaned.startsWith('/')) {
    return '/' + cleaned;
  }

  return cleaned;
}
