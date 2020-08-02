import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

import MealItem from "./MealItem";

const MealList = (props) => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  const openMealDetail = (mealId) => {
    const isFavorite = favoriteMeals.find(meal => meal.id === mealId)
    props.navigation.navigate({
      routeName: "MealDetail",
      params: {
        mealId: mealId,
        isFav: isFavorite
      },
    });
  };

  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectMeal={openMealDetail.bind(this, itemData.item.id, itemData.item.title)}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "95%", margin: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
