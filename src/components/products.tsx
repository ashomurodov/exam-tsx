import React, { Component } from "react";
import { ShowType } from "../pages/home";
import Gallery, { Product } from "./gallery";
import List from "./list";

import ProductsStyle from "./styles/products.module.scss";

interface ProductsProps {
  products: Product[];
  pageShowType: ShowType;
  addToken: (token: string) => void;
}

export default class Products extends Component<ProductsProps> {
  render() {
    const { products, pageShowType } = this.props;

    if (products.length < 1) return <h1>No Products yet :(</h1>;

    const checkerForGallery = pageShowType === "gallery";
    console.log(products);
    return (
      <div className={checkerForGallery ? ProductsStyle.gallery : ProductsStyle.list}>
        {products.map((product) =>
          checkerForGallery ? (
            <Gallery addToken={this.props.addToken} key={product.id} product={product} />
          ) : (
            <List addToken={this.props.addToken} key={product.id} product={product} />
          )
        )}
      </div>
    );
  }
}
