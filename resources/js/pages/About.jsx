import React from "react";
import { BiDownArrowAlt } from "react-icons/bi";
//import Project2 from "../assets/images/hero/2.png";
//import Project3 from "../assets/images/hero/3.png";
//import Project4 from "../assets/images/hero/4.png";
//import Project5 from "../assets/images/hero/5.png";
import Layout from "@/Layouts/Layout";
import {usePage} from "@inertiajs/inertia-react";

const About = ({seo}) => {
    const {localizations, page, images} = usePage().props;
    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });
  return (
      <Layout seo={seo}>
          <div className="wrapper md:pt-44 pt-32">
              <div className="flex items-center justify-between mb-20 flex-col lg:flex-row">
                  <div className=" lg:w-1/2 lg:max-w-xl mb-10">
                      <div className="flex items-center justify-start text-xl bold ">
                          <BiDownArrowAlt className="text-4xl mb-2 -rotate-45" />
                          <span>{__('client.nav_about',localizations)}</span>
                      </div>
                      <div className="md:text-4xl text-2xl  my-6">
                          {page.title}
                      </div>
                      {/*<p className="opacity-50">
                          გერმანული კომპანია რომელიც 1861 წელს დაარსდა და ჩაერთო ტექსილის
                          წარმოებაში., ხოლო 1958 წლიდან ის ქმნის ზემძლავრ გეოკომპოზიტურ
                          მასალებს, როლებიც უზრუნველყოფენ მიწის ვაკის არმირებას
                          (მზიდუნარიანობის გაზრდას) გეოკომპოზიტური მასალები ასევე ახდენენ გზის
                          შემადგენელი ფენების სეპარაციას, უზრუნველყოფენ დრენაჟისა და
                          ფილტრაციის ბუნებრივი სისტემების გამართულ მუშაობას.
                      </p>
                      <p className="opacity-50">
                          გერმანული კომპანია რომელიც 1861 წელს დაარსდა და ჩაერთო ტექსილის
                          წარმოებაში., ხოლო 1958 წლიდან ის ქმნის ზემძლავრ გეოკომპოზიტურ
                          მასალებებს.
                      </p>*/}
                      {renderHTML(page.description)}
                      <div className="w-full flex justify-between items-end mt-5">
                          <div className="text-sm bold ">
                              {renderHTML(__('client.experience_years',localizations).newLineToBr())}
                              <br />
                              <span className="md:text-5xl text-3xl">{__('client.experience_years_value',localizations)}</span>
                          </div>
                          <div className="text-sm bold md:mx-16 ">
                              {renderHTML(__('client.naming_product',localizations).newLineToBr())}
                              <br />
                              <span className="md:text-5xl text-3xl">{__('client.naming_product_value',localizations)}</span>
                          </div>
                          <div className="text-sm bold ">
                              {renderHTML(__('client.successful_projects',localizations).newLineToBr())}
                              <br />
                              <span className="md:text-5xl text-3xl">{__('client.successful_projects_value',localizations)}</span>
                          </div>
                      </div>
                  </div>
                  <div className="lg:w-1/2 xl:pl-20 lg:pl-3">
                      <div className="flex items-start justify-center w-full">
                          <div className="w-1/2">
                              {" "}
                              <div className="w-full sm:h-96 h-60 sm:p-2 p-1">
                                  <img
                                      className="w-full h-full object-cover"
                                      src={images[0]}
                                      alt=""
                                  />
                              </div>
                              <div className="w-3/5 sm:h-40 h-28 sm:p-2 p-1 mx-auto mr-0">
                                  <img
                                      className="w-full h-full object-cover"
                                      src={images[1]}
                                      alt=""
                                  />
                              </div>
                          </div>
                          <div className="w-1/2 mt-14">
                              <div className="w-3/5 sm:h-40 h-28 sm:p-2 p-1">
                                  <img
                                      className="w-full h-full object-cover"
                                      src={images[2]}
                                      alt=""
                                  />
                              </div>
                              <div className="w-full sm:h-96 h-60 sm:p-2 p-1">
                                  <img
                                      className="w-full h-full object-cover"
                                      src={images[3]}
                                      alt=""
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default About;
