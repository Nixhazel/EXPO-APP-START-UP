import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { SvgProps } from '_/@types/misc';

const EyeIcon: React.FC<SvgProps> = ({ size, accessibilityHint, color, style }) => (
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
    <Path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <Circle cx={12} cy={12} r={3} />
  </Svg>
);

export default EyeIcon;
