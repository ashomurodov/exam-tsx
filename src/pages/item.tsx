import React, { Component } from "react";
import axios from "axios";
import { baseURL } from "../utils";
// import { Product } from "../components/gallery";
import ItemStyles from "./styles/item.module.scss";

interface ItemProps {
  token: string;
  deleteToken: () => void;
}

interface ItemState {
  item: any;
  isLoading: boolean;
  currentImage: number;
}

export default class Item extends Component<ItemProps, ItemState> {
  state: ItemState = {
    item: {},
    isLoading: true,
    currentImage: 0,
  };

  async componentDidMount() {
    try {
      const res_product = await axios.get(`${baseURL}/${this.props.token}`);
      this.setState({ item: res_product.data, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  changeCurrentImage = (idx: number) => {
    this.setState({ currentImage: idx });
  };
  render() {
    const { isLoading } = this.state;
    if (isLoading)
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      );
    const { item, currentImage } = this.state;
    const { deleteToken } = this.props;
    return (
      <div className={ItemStyles.item__container}>
        <div className={ItemStyles.left__side}>
          <button onClick={deleteToken}>back to products</button>
          <div className={ItemStyles.img__container}>
            <img className={ItemStyles.current__image} src={item.images[currentImage]} alt="" />
            <div className={ItemStyles.small__images}>
              <img src={item.images[0]} alt="" onClick={() => this.changeCurrentImage(0)} />
              <img src={item.images[1]} alt="" onClick={() => this.changeCurrentImage(1)} />
              <img src={item.images[2]} alt="" onClick={() => this.changeCurrentImage(2)} />
              <img src={item.images[3]} alt="" onClick={() => this.changeCurrentImage(3)} />
            </div>
          </div>
        </div>
        <div className={ItemStyles.right__side}>
          <h1>{item.brand}</h1>
          <span>${item.discountPercentage}</span>
          <p>{item.description}</p>
          <div className={ItemStyles.word}>
            <h4>Available:</h4>
            <p>In Stock</p>
          </div>
          <div className={ItemStyles.word}>
            <h4>SKU:</h4>
            <p>Rec7JInsuCEHgmaGe</p>
          </div>
          <div className={ItemStyles.word}>
            <h4>Brand:</h4>
            <p>{item.brand}</p>
          </div>
        </div>
      </div>
    );
  }
}
