/**
 * Collection of ContentType Constants for using to avoid Typos.
 * If needed ContentType missing feel free to add.
 */
export const ContentType = {
  JSON: 'application/json',
  JSON_UTF8: 'application/json;charset=UTF-8',
  ForceDownload: 'application/force-download',
  FormUrlEncoded: 'application/x-www-form-urlencoded',
  Multipart_Mixed: 'multipart/mixed',
  Multipart_FormData: 'multipart/form-data',
  Text: 'text/plain',
  HTML: 'text/html',
  PDF: 'application/pdf',
  Image_JPEG: 'image/jpeg',
  Image_PNG: 'image/png',
  Video: 'video/mp4',
  Xml: 'application/xml',
} as const;
