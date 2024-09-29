import Image, { ImageLoader } from 'next/image';

import { urlForImage } from '@/sanity/lib/utils';

import { ModalImageProps } from './types';

export const ModalImage = (props: ModalImageProps) => {
  const { image } = props;

  const imageLoader: ImageLoader = ({ width, quality = 100 }) => {
    const imageUrl = urlForImage(image);

    if (imageUrl) {
      return imageUrl.width(width).quality(quality).url();
    }

    return '';
  };

  return (
    <Image
      src="image is passed through loader"
      alt=""
      sizes="100%"
      fill
      style={{ objectFit: 'cover' }}
      loader={imageLoader}
    />
  );
};
