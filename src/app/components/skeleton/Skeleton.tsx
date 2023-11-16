import Skeleton from "react-loading-skeleton"
import { FiShoppingBag } from "react-icons/fi"

import styles from './page.module.css'

export default function SkeletonComponent() {
    const products = Object.keys(new Array(8).fill(null))

    return (
        <>
            <div className={styles.mainDivProducts}>
                {products.map(item => (
                    <div key={item} className={styles.divProduct}>
                        <Skeleton height={138} width={111} /> 
                        <div className={styles.divName}>
                            <Skeleton count={3} /> 
                        </div>
                        <button className={styles.buyBtn}> <FiShoppingBag className={styles.shop}/>
                            <p>COMPRAR</p>
                        </button>
                    </div>
                ))}
            </div>
        </>)
}