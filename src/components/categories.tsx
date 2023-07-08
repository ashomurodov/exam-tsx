import React, { Component } from "react";
import CategoryStyles from "./styles/categories.module.scss";

interface CategoriesProps {
  categories: string[];
  currentCategoria: string;
  onCurrentCategory: (category: string) => void;
}

export default class Categories extends Component<CategoriesProps> {
  render() {
    const { categories, currentCategoria, onCurrentCategory } = this.props;
    return (
      <div className={CategoryStyles.category__container}>
        <h6>Categoris</h6>
        {categories.map((item, idx) => (
          <p key={idx} className={currentCategoria === item ? CategoryStyles.active : ""} onClick={() => onCurrentCategory(item)}>
            {item}
          </p>
        ))}
      </div>
    );
  }
}
