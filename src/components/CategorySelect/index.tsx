import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './style';

import { categories } from '../../utils/categories';
import Category from '../Category';

type Props = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
  hasError?: boolean;
}

const CategorySelect: React.FC<Props> = ({
  categorySelected,
  setCategory,
  hasCheckBox = false,
  hasError = false
}) => {
  return <ScrollView
    horizontal
    style={styles.container}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingRight: 40 }}
  >
    {
      categories.map(category => (
        <Category
          key={category.id}
          title={category.title}
          icon={category.icon}
          checked={category.id === categorySelected}
          onPress={() => setCategory(category.id)}
          hasCheckBox={hasCheckBox}
          hasError={hasError}
        />
      ))
    }
  </ScrollView>;
}

export default CategorySelect;