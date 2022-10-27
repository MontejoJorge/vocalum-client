const url = import.meta.env.VITE_AWS_URL;

const getPhotoURL = (photoUUID) => {
  return `${url}${photoUUID}`;
};

export default getPhotoURL;
