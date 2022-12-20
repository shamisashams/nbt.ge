import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
//import { Link } from "react-router-dom";
import { Link, usePage } from '@inertiajs/inertia-react'
//import Tile1 from "../assets/images/tiles/2.png";
import GallerySlider from "../components/GallerySlider";
import ProductSlider from "../components/ProductSlider";
import Layout from "@/Layouts/Layout";

const SingleProduct = ({seo}) => {
    const {product,category_path,product_images,similar_products} = usePage().props;
    console.log(product, category_path);

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

  return (
      <Layout seo={seo}>
          <div className="wrapper md:pt-44 pt-32">
              <Link className="bold inline-block" href={route('client.product.index')}>
                  <BsArrowLeftCircle className="text-2xl mb-1 mr-2" />
                  უკან
              </Link>
              <section className="flex items-stretch justify-start mt-5 flex-col lg:flex-row">
                  <div className="xl:w-1/3  h-full xl:mr-20 lg:mr-10 max-h-[30rem] overflow-hidden mb-10">
                      <img className="w-full h-full object-cover" src={product.latest_image?product.latest_image.full_url:null} alt="" />
                  </div>
                  <div className="max-w-2xl">
                      <p>{category_path}</p>
                      <div className="md:text-4xl text-2xl bold mt-3 mb-4">
                          {product.title}
                      </div>
                      <p className="opacity-50 mb-5">
                          {renderHTML(product.description)}
                      </p>
                      <p className="opacity-50">{product.attributes.material ? product.attributes.material.attribute : null}</p>
                      <div className="bold text-lg mb-4">{product.attributes.material ? product.attributes.material.option : null}</div>
                      <p className="opacity-50">{product.attributes.brand ? product.attributes.brand.attribute : null}</p>
                      <div className="bold text-lg mb-4">{product.attributes.brand ? product.attributes.brand.option : null}</div>
                      <p className="opacity-50">{product.attributes.color ? product.attributes.color.attribute : null}</p>
                      <div className="bold text-lg mb-4">{product.attributes.color ? product.attributes.color.option : null}</div>
                      <p className="opacity-50">{product.attributes.size ? product.attributes.size.attribute : null}</p>
                      <div className="bold text-lg mb-4">{product.attributes.size ? product.attributes.size.option : null} სმ</div>
                  </div>
              </section>
              <section className="my-5">
                  <div className="opacity-80 text-lg -mb-6">გალერეა</div>
                  <GallerySlider images={product_images} />
              </section>
              <section className="my-16 mb-20">
                  <div className="opacity-80 text-lg mb-5">მსგავსი პროდუქცია</div>
                  <ProductSlider products={similar_products} />
              </section>
          </div>
      </Layout>

  );
};

export default SingleProduct;
