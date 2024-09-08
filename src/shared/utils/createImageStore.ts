import { create } from "zustand";

type ImageItem = {
  file: File;
  url: string;
};

type ImageStore = {
  images: ImageItem[];
  setImages: (images: ImageItem[]) => void;
  addImage: (image: ImageItem) => void;
  removeImage: (index: number) => void;
  updateImage: (index: number, newImage: ImageItem) => void;
};

export const createImageStore = () =>
  create<ImageStore>((set) => ({
    images: [],
    setImages: (images) => set({ images }),
    addImage: (image) => set((state) => ({ images: [...state.images, image] })),
    removeImage: (index) =>
      set((state) => ({
        images: state.images.filter((_, i) => i !== index),
      })),
    updateImage: (index, newImage) =>
      set((state) => ({
        images: state.images.map((img, i) => (i === index ? newImage : img)),
      })),
  }));
