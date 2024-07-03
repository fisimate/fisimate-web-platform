export default function getLastPathUrl(url) {
  const urlSegment = url.split("/");

  return urlSegment[urlSegment.length - 1];
}
