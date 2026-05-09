export function convertToWebP(file: File, quality = 0.85): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas unavailable')); return; }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (!blob) { reject(new Error('WebP conversion failed')); return; }
        const webpName = file.name.replace(/\.[^/.]+$/, '.webp');
        resolve(new File([blob], webpName, { type: 'image/webp' }));
      }, 'image/webp', quality);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Image failed to load for conversion'));
    };

    img.src = objectUrl;
  });
}
