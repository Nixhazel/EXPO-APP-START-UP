import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgProps } from '_/@types/misc';

const EyeOffIcon: React.FC<SvgProps> = ({ size, accessibilityHint, color, style }) => (
  <Svg
    accessibilityHint={accessibilityHint}
    width={size}
    height={size}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    fill="none"
    style={style}>
    <Path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <Path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20" />
  </Svg>
);

export default EyeOffIcon;
