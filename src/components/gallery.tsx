import React, { Component } from "react";
import GalleryStyles from "./styles/gallery.module.scss";

export interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: 18;
  images: string[];
}

export interface GalleryProps {
  product: Product;
  addToken: (token: string) => void;
}

export default class Gallery extends Component<GalleryProps> {
  render() {
    const { product } = this.props;
    return (
      <div className={GalleryStyles.gallery_img_container}>
        <img
          className={GalleryStyles.gallery_img}
          src={product.images[0]}
          alt=""
          onClick={() => this.props.addToken(product.id.toString())}
        />
        <div className="bottom d-flex justify-content-between">
          <p className={GalleryStyles.title}>{product.brand}</p>
          <p className={GalleryStyles.const}>${product.discountPercentage}</p>
        </div>
      </div>
    );
  }
}
