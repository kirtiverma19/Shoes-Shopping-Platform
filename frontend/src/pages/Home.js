import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticleCartProduct from "../components/VerticleCartProduct";

function Home() {
  return (
    <div className=" mt-2">
      <CategoryList  />
      <BannerProduct />
      <VerticleCartProduct
        category={"Women Casual"}
        heading={"Women Casual"}
      />
      <VerticleCartProduct category={"Men Formal"} heading={"Men Formal"} />
      <VerticleCartProduct category={"Heels"} heading={"Heels"} />
      <HorizontalCardProduct category={"MenSandel "} heading={"Men Sandel"} />
      <VerticleCartProduct category={"Boot"} heading={"Boot"} />
      <VerticleCartProduct category={"Party"} heading={"Party"} />   
      <HorizontalCardProduct category={"Women Sandel"} heading={"Women Sandel"} />
      <VerticleCartProduct category={"Women Flats"} heading={"Women Flats"} />
    </div>
  );
}

export default Home;
