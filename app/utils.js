export function formatImgUrl(url) {
  if (!url) return '/src/assets/shinku_banner.png';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (!url.startsWith('/')) {
    return '/' + url;
  }
  return url;
}
