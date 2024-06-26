export default function limitString(content, maxLength = 60) {
  if (content.length <= maxLength) return content;

  return `${content.substring(0, maxLength)}...`;
}
