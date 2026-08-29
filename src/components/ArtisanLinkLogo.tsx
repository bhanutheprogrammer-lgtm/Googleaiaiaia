import React from 'react';
import { ArtLynkLogo, ArtLynkLogoProps } from './ArtLynkLogo';

export interface ArtisanLinkLogoProps extends ArtLynkLogoProps {}

export const ArtisanLinkLogo: React.FC<ArtisanLinkLogoProps> = (props) => {
  return <ArtLynkLogo {...props} />;
};

export default ArtisanLinkLogo;

