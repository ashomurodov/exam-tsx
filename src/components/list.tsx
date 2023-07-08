import React, { Component } from "react";
import { GalleryProps } from "./gallery";
import ListStyles from "./styles/list.module.scss";

interface ListProps extends GalleryProps {}

export default class List extends Component<ListProps> {
  render() {
    const { product } = this.props;
    return (
      <div className={ListStyles.list__container}>
        <div className={ListStyles.list__side}>
          <img src={product.images[0]} alt="img" />
        </div>
        <div className={ListStyles.right__side}>
          <h5 className={ListStyles.title}>{product.brand}</h5>
          <span className={ListStyles.cost}>${product.discountPercentage}</span>
          <p className={ListStyles.description}>{product.description}</p>
          <button className={ListStyles.btn} onClick={() => this.props.addToken(product.id.toString())}>
            detail
          </button>
        </div>
      </div>
    );
  }
}
