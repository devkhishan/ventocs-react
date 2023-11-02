// NFTCard.jsx


import styles from '../styles/cardStyles.module.css';
import nft7 from './images/nft7.png'

import React from 'react';


function NFTGrid() {
  return (
    <div className="bodycontainer">
      <div className={styles.nftGrid}>

        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={nft7} alt="Card Image" className={styles.image} />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Master Coder</h2>
            <p className={styles.description}>Unlimited Questions with High Priority</p>
            <div className={styles.mintContainer}>
              <span className={styles.mintPrice}>0.1 ETH</span>
              <span className={styles.mintNow}>Mint Now</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={nft7} alt="Card Image" className={styles.image} />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Master Coder</h2>
            <p className={styles.description}>Unlimited Questions with High Priority</p>
            <div className={styles.mintContainer}>
              <span className={styles.mintPrice}>0.1 ETH</span>
              <span className={styles.mintNow}>Mint Now</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={nft7} alt="Card Image" className={styles.image} />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Master Coder</h2>
            <p className={styles.description}>Unlimited Questions with High Priority</p>
            <div className={styles.mintContainer}>
              <span className={styles.mintPrice}>0.1 ETH</span>
              <span className={styles.mintNow}>Mint Now</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={nft7} alt="Card Image" className={styles.image} />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Master Coder</h2>
            <p className={styles.description}>Unlimited Questions with High Priority</p>
            <div className={styles.mintContainer}>
              <span className={styles.mintPrice}>0.1 ETH</span>
              <span className={styles.mintNow}>Mint Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default NFTGrid;
