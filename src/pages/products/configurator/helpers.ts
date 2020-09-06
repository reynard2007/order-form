import Product from 'types/Product';
import { isNullOrUndefined } from 'util';
import Variant from 'types/Variant';
import Size from 'types/Size';

// I assumed that the API is reliable enough to provide information that we need in the format that we expect
export const mapMockPayloadToProduct = (payload: any): Product => ({
  available: payload.available,
  content: payload.content,
  description: payload.description,
  mediaUrls: payload.media
    .sort((a: any, b: any) => a.position - b.position)
    .map((item: any) => item.src),
  featuredImageUrl: payload.featured_image,
  options: payload.options,
  title: payload.title,
  variants: payload.variants.map((variant: any) => ({
    available: variant.available,
    size: variant.option1,
    colour: variant.option2,
    price: variant.price,
    title: variant.title,
    featuredImageUrl: variant.featured_image.src,
  })),
  minPrice: payload.price_min,
  maxPrice: payload.price_max,
});

const getValuesByOptionName = (
  filteredVariants: Array<Variant>,
  optionName: keyof Variant
) =>
  Object.keys(
    filteredVariants.reduce(
      (acc, curr) => ({
        ...acc,
        [curr[optionName].toString()]: true,
      }),
      {}
    )
  );

const sortSizes = (sizes: Array<Size>) => {
  const sizeSortIndexMap = {
    [Size.XS]: 1,
    [Size.S]: 2,
    [Size.M]: 3,
    [Size.L]: 4,
  };

  return sizes.sort((a, b) => sizeSortIndexMap[a] - sizeSortIndexMap[b]);
};

export const getProductSizes = (product: Product, colour?: string) => {
  const filteredVariants = isNullOrUndefined(colour)
    ? product.variants
    : product.variants.filter((variant) => variant.colour === colour);

  const sizesMap = getValuesByOptionName(filteredVariants, 'size') as Array<
    Size
  >;

  return sortSizes(sizesMap);
};

export const getProductColours = (product: Product, size?: string) => {
  const filteredVariants = isNullOrUndefined(size)
    ? product.variants
    : product.variants.filter((variant) => variant.size === size);

  const coloursMap = getValuesByOptionName(filteredVariants, 'colour');

  return coloursMap.map((colour) => ({
    value: colour,
    label: colour,
  }));
};

export const getMatchedVariantWithSizeAndColor = (
  product: Product,
  colour?: string,
  size?: string
) =>
  product?.variants.find(
    (variant) => variant.colour === colour && variant.size === size
  ) ?? null;
