const url = import.meta.env.VITE_API_URL;

const getPhotoURL = (photoUUID) => {
  return `${url}/ads/${photoUUID}/photo`;
};

export default getPhotoURL;
