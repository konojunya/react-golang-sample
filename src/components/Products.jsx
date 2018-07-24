import React from "react"
import axios from "axios"

export default class Products extends React.Component {

  constructor() {
    super();

    this.state = {
      products: [],
      name: "",
      price: 0
    }

    this.add = this.add.bind(this) // thisのbind問題
  }

  componentWillMount() {
    this.fetchProducts() // componentがmountされる前にデータを取得しにいく
  }

  render() {

    const { products } = this.state;

    return (
      <div>
        <label htmlFor="name">名前:
          <input type="text" id="name" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
        </label>
        <label htmlFor="price">
          <input type="number" id="price" value={this.state.price} onChange={(e) => { this.setState({ price: e.target.value }) }} />
        </label>
        <button onClick={this.add}>Add</button>
        <ul>
          {products.map((product, index) => { // productsの配列を回す
            return (
              <li key={index}>{product.name}: ¥{product.price}</li>
            )
          })}
        </ul>
      </div>
    )
  }

  async fetchProducts() {
    const res = await axios.get("/api/products"); // GET
    if(res.status === 200) {
      this.setState({
        products: res.data
      })
    }
  }

  async add() {
    const { name, price } = this.state;
    const res = await axios.post("/api/products", { name, price }) // 作成
    if(res.status === 201) {
      alert(`商品: ${name}を${price}円で追加しました。`) // できたことを確認
      this.setState({
        name: "",
        price: 0
      }) // 初期値に戻す
      this.fetchProducts() // 新しいデータを取得しにいく
    }
  }

}