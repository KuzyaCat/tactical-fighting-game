import { SkeletonImage } from './skeleton-image';
import { BanditImage } from './bandit-image';
import { ArchimageImage } from './archimage-image';
import { BishopImage } from './bishop-image';
import { CentaurImage } from './centaur-image';
import { ElfArcherImage } from './elf-archer-image';
import { MonkImage } from './monk-image';
import { SirenaImage } from './sirena-image';
import { SkeletonMageImage } from './skeleton-mage-image';

export const UnitImages: { [key: string]: React.FC } = {
  SkeletonImage,
  BanditImage,
  ArchimageImage,
  BishopImage,
  CentaurImage,
  ElfArcherImage,
  MonkImage,
  SirenaImage,
  SkeletonMageImage,
};
