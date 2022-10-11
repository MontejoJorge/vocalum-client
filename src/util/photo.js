const url = import.meta.env.VITE_STORAGE_URL;

const getPhotoURL = (photoUUID) => {
  return `${url}/${photoUUID}.jpg`;
}

export default getPhotoURL;