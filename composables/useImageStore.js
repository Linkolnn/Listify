export function useImageStore() {
  const saveImage = (id, imageData) => {
    localStorage.setItem(`event_image_${id}`, imageData);
  };

  const getImage = (id) => {
    return localStorage.getItem(`event_image_${id}`) || '';
  };

  const deleteImage = (id) => {
    localStorage.removeItem(`event_image_${id}`);
  };

  return {
    saveImage,
    getImage,
    deleteImage
  };
}
