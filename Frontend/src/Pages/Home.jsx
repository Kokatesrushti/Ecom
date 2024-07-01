import React from 'react'
import Categorylist from '../Components/Categorylist'
import BannerProduct from '../Components/BannerProduct'
import HorizontalCardProduct from '../Components/HorizontalCardProduct'
import VerticleCardProduct from '../Components/VerticleCardProduct'


export default function Home() {
  return (
    <div>
      <Categorylist></Categorylist>
      <BannerProduct/>
      <HorizontalCardProduct category={"Electronics"} heading={"Top's Electronics"}/>
      <HorizontalCardProduct category={"Fashion"} heading={"Trending Fashion"}/>
      <HorizontalCardProduct category={"Personal Care"} heading={"Personal Care"}/>
      <VerticleCardProduct category={"Mobile"} heading={"Mobile"}/>
      <VerticleCardProduct category={"Televisions"} heading={"Smart Televisions's"}/>
    </div>
  )
}
