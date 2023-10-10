import React from 'react';
import { TouchableOpacity } from 'react-native';

import Label, { type LabelProps } from '_/components/Label';

type Props = LabelProps & {
  onPress: () => void;
  activeOpacity?: number;
  containerStyle?: TouchableOpacity['props']['style'];
};

const PressableLabel: React.FC<Props> = ({ onPress, activeOpacity, containerStyle, ...props }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity} style={containerStyle}>
    <Label {...props} />
  </TouchableOpacity>
);

PressableLabel.defaultProps = {
  activeOpacity: 0.625,
};

export default PressableLabel;
