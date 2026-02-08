import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { getAllBrandsService } from "../../services/brandService";
import { getAllCategoriesService } from "../../services/categoryService";
import { createProductService } from "../../services/productService";

const CreateProduct = () => {

    const {t} = useTranslation();
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loader.loading);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const[thumbnailPreview, setThumbnailPreview] = useState(null);
    const[galleryPreviews, setGalleryPreviews] = useState([]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("product_name", event.target.product_name.value);
        formData.append("cat_id", event.target.cat_id.value);
        formData.append("brand_id", event.target.brand_id.value);
        formData.append("short_desc", event.target.short_desc.value);
        formData.append("long_desc", event.target.long_desc.value);
        formData.append("regular_price", event.target.regular_price.value);
        formData.append("sale_price", event.target.sale_price.value);
        formData.append("sku", event.target.sku.value);
        formData.append("qty", event.target.qty.value);
        formData.append("stock_status", event.target.stock_status.value);
        formData.append("is_featured", event.target.is_featured.value);

        // formData.append("thumbnail_image", event.target.thumbnail_image.files[0]);
        if (event.target.thumbnail_image.files[0]) {
            formData.append("thumbnail_image", event.target.thumbnail_image.files[0]);
        }

        // for (let i = 0; i < event.target.galleryImages.files.length; i++) {
        //     formData.append("galleryImages", event.target.galleryImages.files[i]);
        // }

        if (event.target.galleryImages.files.length > 0) {
            for (let i = 0; i < event.target.galleryImages.files.length; i++) {
                formData.append("galleryImages", event.target.galleryImages.files[i]);
            }
        }

        // console.log(...formData);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }

        try {
            dispatch(showLoader());
            const response = await createProductService(formData);
            if (response?.status === "success") {
                toast.success(`✅ ${response?.message}`);
                formRef.current.reset();
                setThumbnailPreview(null);
                setGalleryPreviews([]);
            } else {
                toast.error(`❌ ${response?.message}`);
            }
        } catch (error) {
            console.error("Error creating the product:", error);
            toast.error("❌ An error occurred while creating the product");
        } finally {
            dispatch(hideLoader());
        }
    }

    useEffect(() => {
    const fetchCategories = async () => {
        try {
        const response = await getAllCategoriesService('/categories');
        if (response.status === 'success') {
            setCategories(response?.data);
        } else {
            toast.error(`❌ ${response?.message}`);
            console.error('Failed to fetch categories:', response?.message);
        }
        } catch (error) {
        toast.error("❌ An error occurred while fetching categories");
        console.error('Error fetching categories:', error);
        }
    }

    const fetchBrands = async () => {
        try {
            const response =  await getAllBrandsService();
            if (response?.status === "success") {
                setBrands(response?.brand);
            } else {
                toast.error(`❌ ${response?.message}`);
            }
        } catch (error) {
            console.error("Error fetching brands:", error);
            toast.error("❌ An error occurred while fetching brands");
        }
    }

    fetchCategories();
    fetchBrands();
    }, []);

  return (
      <div className="main-content-inner">
          <div className="main-content-wrap">
              <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                  <h3>{t("add_new_product")}</h3>
                  <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                      <li>
                          <Link to="/">
                              <div className="text-tiny">{t("dashboard")}</div>
                          </Link>
                      </li>
                      <li>
                          <i className="icon-chevron-right"></i>
                      </li>
                      <li>
                          <Link to="/products">
                              <div className="text-tiny">{t("all_products")}</div>
                          </Link>
                      </li>
                      <li>
                          <i className="icon-chevron-right"></i>
                      </li>
                      <li>
                          <div className="text-tiny">{t("add_new_product")}</div>
                      </li>
                  </ul>
              </div>
            { loading && <Loader /> }
                <form 
                className="tf-section-2 form-add-product" 
                ref={formRef}
                onSubmit={handleFormSubmit}
                >
                    <div className="wg-box">
                        <fieldset className="name">
                            <div className="body-title mb-10">{t("product_name")} <span className="tf-color-1">*</span>
                            </div>
                            <input 
                            className="mb-10" 
                            type="text" 
                            placeholder={t("enter_product_name")}
                            name="product_name" 
                            />
                            <div className="text-tiny">{t("product_name_limit")}</div>
                        </fieldset>

                        {/* <fieldset className="name">
                            <div className="body-title mb-10">Slug <span className="tf-color-1">*</span></div>
                            <input 
                            className="mb-10" 
                            type="text" 
                            placeholder="Enter product slug"
                            name="slug" 
                            />
                            <div className="text-tiny">Do not exceed 100 characters when entering the
                                product name.</div>
                        </fieldset> */}

                        <div className="gap22 cols">
                            <fieldset className="category">
                                <div className="body-title mb-10">Category <span className="tf-color-1">*</span>
                                </div>
                                <div className="select">
                                    <select name="cat_id">
                                        <option>{t("select_a_category")}</option>
                                        {categories && categories.length > 0 && categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </fieldset>
                            <fieldset className="brand">
                                <div className="body-title mb-10">Brand <span className="tf-color-1">*</span>
                                </div>
                                <div className="select">
                                    <select name="brand_id">
                                        <option>{t("select_a_brand")}</option>
                                        {brands && brands.length > 0 && brands.map((brand) => (
                                            <option key={brand._id} value={brand._id}>
                                                {brand.brand_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </fieldset>
                        </div>

                        <fieldset className="shortdescription">
                            <div className="body-title mb-10">{t("short_description")} <span className="tf-color-1">*</span></div>
                            <textarea 
                            className="mb-10 ht-150" 
                            name="short_desc"
                            placeholder={t("short_description")}></textarea>
                        </fieldset>

                        <fieldset className="description">
                            <div className="body-title mb-10">{t("description")} <span className="tf-color-1">*</span>
                            </div>
                            <textarea 
                            className="mb-10" 
                            name="long_desc" 
                            placeholder={t("description")}></textarea>
                        </fieldset>

                    </div>

                    <div className="wg-box">
                        <fieldset>
                            <div className="body-title mb-10">{t("upload_thumbnail_image")} <span className="tf-color-1">*</span>
                            </div>
                            <div className="upload-image flex-grow">

                                {thumbnailPreview && (
                                    <div className="item" id="imgpreview">
                                        <img src={thumbnailPreview} className="effect8" alt="ThumbnailPreview" />
                                    </div>
                                )}

                                <div id="upload-file" className="item up-load">
                                    <label className="uploadfile" for="myFile">
                                        <span className="icon">
                                            <i className="icon-upload-cloud"></i>
                                        </span>
                                        <span className="body-text">{t("drop_images")} <span className="tf-color">{t("click_to_browse")}</span></span>
                                        <input 
                                        type="file" 
                                        id="myFile" 
                                        name="thumbnail_image" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
                                        }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="body-title mb-10">{t("upload_product_images")}</div>
                            <div className="upload-image mb-16">

                                {galleryPreviews && galleryPreviews.length > 0 && (
                                    galleryPreviews.map((preview, index) => (
                                        <div className="item" id="imgpreview" key={index}>
                                            <img src={preview} className="effect8" alt={`GalleryPreview-${index}`} />
                                        </div>
                                    ))
                                )}

                                <div id="galUpload" className="item up-load">
                                    <label className="uploadfile" for="gFile">
                                        <span className="icon">
                                            <i className="icon-upload-cloud"></i>
                                        </span>
                                        <span className="text-tiny">{t("drop_images")} <span
                                                className="tf-color">{t("click_to_browse")}</span></span>
                                        <input 
                                        type="file" 
                                        id="gFile" 
                                        name="galleryImages" 
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files); // e.target.files is a FileList (an array-like object). Array.from(...) converts that FileList into a real JavaScript array
                                            const previews = files.map(file => URL.createObjectURL(file));
                                            setGalleryPreviews(previews);
                                        }}  
                                        />
                                    </label>
                                        
                                </div>
                            </div>
                        </fieldset>

                        <div className="cols gap22">
                            <fieldset className="name">
                                <div className="body-title mb-10">{t("regular_price")} <span className="tf-color-1">*</span></div>
                                <input 
                                className="mb-10" 
                                type="text" 
                                placeholder={t("enter_regular_price")}
                                name="regular_price" 
                                />
                            </fieldset>
                            <fieldset className="name">
                                <div className="body-title mb-10">{t("sale_price")} <span
                                        className="tf-color-1">*</span></div>
                                <input 
                                className="mb-10" 
                                type="text" 
                                placeholder={t("enter_sale_price")}
                                name="sale_price" 
                                />
                            </fieldset>
                        </div>


                        <div className="cols gap22">
                            <fieldset className="name">
                                <div className="body-title mb-10">{t("sku")} <span className="tf-color-1">*</span>
                                </div>
                                <input 
                                className="mb-10" 
                                type="text" 
                                placeholder={t("enter_sku")} 
                                name="sku"
                                />
                            </fieldset>
                            <fieldset className="name">
                                <div className="body-title mb-10">{t("quantity")} <span className="tf-color-1">*</span>
                                </div>
                                <input 
                                className="mb-10" 
                                type="text" 
                                placeholder={t("enter_quantity")}
                                name="qty" 
                                />
                            </fieldset>
                        </div>

                        <div className="cols gap22">
                            <fieldset className="name">
                                <div className="body-title mb-10">{t("stock_status")}</div>
                                <div className="select mb-10">
                                    <select name="stock_status">
                                        <option value="in-stock">{t("in_stock")}</option>
                                        <option value="out-of-stock">{t("out_of_stock")}</option>
                                    </select>
                                </div>
                            </fieldset>
                            <fieldset className="name">
                                <div className="body-title mb-10">{t("featured")}</div>
                                <div className="select mb-10">
                                    <select name="is_featured">
                                        <option value="false">{t("no")}</option>
                                        <option value="true">{t("yes")}</option>
                                    </select>
                                </div>
                            </fieldset>
                        </div>
                        <div className="cols gap10">
                            <button className="tf-button w-full" type="submit">{t("add_product")}</button>
                        </div>
                    </div>

                </form>
          </div>
      </div>
  )
}

export default CreateProduct