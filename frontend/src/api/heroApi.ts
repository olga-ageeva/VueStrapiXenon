import { fetchData } from '../plugins/api';
import type { HeroStrapiResponse, Hero } from '@/types/hero';

export const getHeroData = async (): Promise<Hero> => {
  const res = await fetchData<HeroStrapiResponse>('hero', {
    populate: '*'
  });

  const attr = res.data.attributes;

  return {
    title: attr.title,
    subtitle: attr.subtitle,
    buttonText: attr.buttonText,
    buttonLink: attr.buttonLink,
    image: attr.image?.data?.attributes?.url ?? null
  };
};
