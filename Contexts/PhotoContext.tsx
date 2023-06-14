import React, {createContext, useContext, useState} from 'react';
import {Asset} from 'react-native-image-picker';

type Props = {
  children: JSX.Element;
};

type PhotoStore = {
  photo: Asset | null;
  setPhoto: React.Dispatch<React.SetStateAction<Asset | null>>;
  resetPhoto: () => void;
};

const PhotoContext = createContext<PhotoStore>({} as PhotoStore);

export const usePhotoContext = () => {
  return useContext(PhotoContext);
};

const PhotoProvider: React.FC<Props> = ({children}) => {
  const [photo, setPhoto] = useState<Asset | null>(null);
  const resetPhoto = () => {
    setPhoto(null);
  };
  const store = {photo, setPhoto, resetPhoto};
  return (
    <PhotoContext.Provider value={store}>{children}</PhotoContext.Provider>
  );
};

export default PhotoProvider;
