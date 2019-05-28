export function rotateImage(image: HTMLImageElement, mimeType: string, reversed: boolean = false) {
  const degrees = reversed ? -90 : 90;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  canvas.width = image.naturalHeight;
  canvas.height = image.naturalWidth;
  context!.translate(canvas.width / 2, canvas.height / 2);
  context!.rotate(degrees * Math.PI / 180);
  context!.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);

  const newImage = canvas.toDataURL(mimeType);
  canvas.remove();
  return newImage;
}