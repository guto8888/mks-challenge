'use client'

import React, { useState, useEffect } from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { FiShoppingBag } from "react-icons/fi";
import 'react-loading-skeleton/dist/skeleton.css'
import { IoCloseCircle } from "react-icons/io5";
import SkeletonComponent from './components/skeleton/Skeleton';
import styles from './page.module.scss'


interface Products {
  id: number,
  name: string,
  brand: string,
  description: string,
  price: number,
  photo: string,
  qtd?: number
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<Products[]>([])
  const [cart, setCart] = useState<Products[]>([])
  const [showCart, setShowCart] = useState<boolean>(false)
  const  [priceQtd, setPrice] = useState<number>(0)

  useEffect(() => {
    async function getItems() {
      setLoading(false)
      const fetchRequest = await fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC')
      const requestJson = await fetchRequest.json()
      setItems(requestJson.products)
      setLoading(true)
    }
    getItems()
  }, [])



  return (
    <>
    <header className={styles.navMenu}>
      <div>
        <p className={styles.mks}>MKS 
        <span className={styles.system}>Sistemas</span>
        </p>
      </div>
        <button onClick={() => setShowCart(true)} className={styles.btnCart}><TiShoppingCart className={styles.cart} /> <p className={styles.cartNumber}>{cart?.length ? cart.length : 0}</p> </button>
    </header>
    {showCart && 
    <>
    <div className={styles.shownCart}>
      <div className={styles.titleCart}>
        <h1 className={styles.cartTitle}>Carrinho de compras</h1>
        <IoCloseCircle onClick={() => setShowCart(false)} className={styles.closeCart}/>
      </div>
      <div className={styles.divTotalAndProducts}>
      <div className={styles.cartItems}>
        {cart.map(product => {
          let newPrice = product.qtd!
          
          function addProduct() {
            product.qtd! ++
            if(product.qtd) {
              setPrice(priceQtd + Number(product.price))
            }
          }

          function removeProduct() {
            if(product.qtd === 0) {
              product.qtd = 0
              setPrice(priceQtd)
            } else if(product.qtd) {
              product.qtd--
              setPrice(priceQtd - Number(product.price))
            }
          }
          
          return(
          <div key={product.id} className={styles.itemDivCart}>
          <div className={styles.productCartItem}>
            <img className={styles.cartImg} src={product.photo} alt="productImg" />
            <h1 className={styles.cartItemName}>{product.name}</h1>
            <div className={styles.qtdValue}>
              <p className={styles.qtdItem}>Qtd:</p>
              <div className={styles.btnCartPlusLess}>
                <div data-testid="less" onClick={removeProduct} className={styles.btnPlus}>-</div>
                <hr className={styles.line}/>
                <p className={styles.qtdBtn}>{product.qtd}</p>
                <hr  className={styles.line}/>
                <div data-testid="more" onClick={() => addProduct()} className={styles.btnLess}>+</div>
              </div>
            </div>
            <h3 className={styles.productCartPrice}>R${Math.trunc(product.price * newPrice).toLocaleString('pt-br', {minimumFractionDigits: 0})}</h3>
          </div>
          <IoCloseCircle data-testid="removeCart" onClick={() => {
            let remove = cart.findIndex((item: Products) => item.id === product.id)
            let removed = cart.splice(remove, 1)
            setPrice(priceQtd - (removed[0].price * removed[0].qtd! ))
            setCart(cart)
          }} className={styles.btnRemove} />
          </div>
        )})}
      </div>
      <div className={styles.totalAndPrice}>
      <h3 className={styles.totalPrice}>Total: 
      </h3>
      <p>
      R${Math.trunc(priceQtd).toLocaleString('pt-br', {minimumFractionDigits: 0})}
      </p>
      </div>
      </div>
      <button className={styles.endBtn}>
        <p>
        Finalizar Compra
        </p>
        </button>
    </div>
    </>
    }
      {loading ? <>
        <div className={styles.mainDivProducts}>
        {items?.map((product: Products) => (
      <div className={styles.divProduct} key={product.id}>
        <img className={styles.img} src={product.photo} alt={product.name} />
        <div className={styles.namePrice}>
        <div className={styles.divName}>
        <h1 className={styles.productName}>{product.name}</h1>
        </div>
        <div className={styles.divPrice}>
        <h3>R${Math.trunc(product.price).toLocaleString('pt-br', {minimumFractionDigits: 0})}</h3>
        </div>
        </div>
        <p className={styles.productDescription}>{product.description}</p>
        <button data-testid="addCart" onClick={() => {
          if(!cart.find((item) => item === product)) {
            product.qtd = 1
            setPrice(priceQtd + Number(product.price))
            setCart([...cart, product])}} 
          }
          className={styles.buyBtn}> <FiShoppingBag className={styles.shop}/>
 <p>COMPRAR</p></button>
      </div>
    ))} 
    </div>
    </> : <SkeletonComponent/>} 
    <footer className={styles.footer}>MKS sistemas © Todos os direitos reservados</footer>
    </>  
  )
}