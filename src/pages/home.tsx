import { Component } from "react";
import { Categories, Products } from "../components";
import "./styles/home.scss";
import axios from "axios";
import { baseURL } from "../utils";
import { Product } from "../components/gallery";

export type ShowType = "gallery" | "list";

interface HomeProps {
  addToken: (token: string) => void;
}

interface HomeState {
  products: Product[];
  categories: string[];
  isLoading: boolean;
  currentCategoria: string;
  productsShowType: ShowType;
  search: string;
}

export default class Home extends Component<HomeProps, HomeState> {
  state: HomeState = {
    products: [],
    categories: [],
    isLoading: true,
    currentCategoria: "all",
    productsShowType: "gallery",
    search: "",
  };

  async componentDidMount() {
    const res_products = await axios.get(`${baseURL}`);
    const res_categories = await axios.get(`${baseURL}/categories`);
    const products = res_products.data.products;
    const categories = res_categories.data;
    this.setState({ products, categories: ["all", ...categories], isLoading: false });
  }

  handleCurrentCategory = (category: string) => {
    this.setState({ currentCategoria: category });
  };

  handleCurrentSearch = (search: string) => {
    this.setState({ search });
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading)
      return (
        <div className="spinner-border d-flex justify-content-center mt-5" role="status">
          <span className="sr-only"></span>
        </div>
      );

    const { categories, currentCategoria, products, productsShowType, search } = this.state;

    const filteredProducts =
      currentCategoria === "all" ? products : products.filter((product) => product.category === currentCategoria);

    const searchedProducts = filteredProducts.filter((product) => product.brand.toLowerCase().includes(search.toLowerCase()));
    return (
      <div className="container my-3">
        <div className="top__settings mb-4">
          <input type="text" id="search" placeholder="search..." onChange={(e) => this.handleCurrentSearch(e.target.value)} />
          <div className="type__selection">
            <button className="gallery_sn" onClick={() => this.setState({ productsShowType: "gallery" })}>
              gallery
            </button>
            <button className="list_sn" onClick={() => this.setState({ productsShowType: "list" })}>
              list
            </button>
          </div>
          <p>{searchedProducts.length} Products Found</p>
          <div className="sort__selection">
            <p>Sort by:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Categories
              categories={categories}
              currentCategoria={currentCategoria}
              onCurrentCategory={this.handleCurrentCategory}
            />
          </div>
          <div className="col">
            <Products addToken={this.props.addToken} products={searchedProducts} pageShowType={productsShowType} />
          </div>
        </div>
      </div>
    );
  }
}
