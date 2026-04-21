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
    const [shortDesc, setShortDesc] = useState("");
    const [longDesc, setLongDesc] = useState("");

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        const form = event.target;

        const product_name   = form.product_name.value.trim();
        const cat_id         = form.cat_id.value;
        const brand_id       = form.brand_id.value;
        const regular_price  = form.regular_price.value;
        const sale_price     = form.sale_price.value;
        const sku            = form.sku.value.trim();
        const qty            = form.qty.value;
        const stock_status   = form.stock_status.value;
        const is_featured    = form.is_featured.value;
        const is_trendy      = form.is_trendy_product.value;
        const just_arrived   = form.just_arrived.value;
        const is_top_selling = form.is_top_selling.value;
        const thumbnail      = form.thumbnail_image.files[0];
        const gallery        = form.galleryImages.files;

        if (!product_name) return toast.error("Product name is required");

        if (!cat_id) return toast.error("Category is required");

        if (!brand_id) return toast.error("Brand is required");

        if (!shortDesc) return toast.error("Short description is required");

        if (!longDesc) return toast.error("Long description is required");

        if (!thumbnail) return toast.error("Thumbnail image is required");

        if (!gallery || gallery.length === 0) {
            return toast.error("At least one gallery image is required");
        }

        // image type validation
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(thumbnail.type)) {
            return toast.error("Thumbnail must be JPG, PNG, or WEBP");
        }

        for (let i = 0; i < gallery.length; i++) {
            if (!allowedTypes.includes(gallery[i].type)) {
                return toast.error("Gallery images must be JPG, PNG, or WEBP");
            }
        }

        if (!regular_price || isNaN(regular_price) || Number(regular_price) <= 0) {
            return toast.error("Valid regular price is required");
        }

        if (sale_price && Number(sale_price) > Number(regular_price)) {
            return toast.error("Sale price cannot be greater than regular price");
        }

        if (!sku) return toast.error("SKU is required");

        if (!qty || isNaN(qty) || Number(qty) < 0) {
            return toast.error("Valid quantity is required");
        }

        const formData = new FormData();

        formData.append("product_name", product_name);
        formData.append("cat_id", cat_id);
        formData.append("brand_id", brand_id);
        formData.append("short_desc", shortDesc);
        formData.append("long_desc", longDesc);
        formData.append("regular_price", regular_price);
        formData.append("sale_price", sale_price);
        formData.append("sku", sku);
        formData.append("qty", qty);
        formData.append("stock_status", stock_status);
        formData.append("is_featured", is_featured);
        formData.append("is_trendy", is_trendy);
        formData.append("just_arrived", just_arrived);
        formData.append("is_top_selling", is_top_selling);

        formData.append("thumbnail_image", thumbnail);

        for (let i = 0; i < gallery.length; i++) {
            formData.append("galleryImages", gallery[i]);
        }

        // formData.append("product_name", event.target.product_name.value);
        // formData.append("cat_id", event.target.cat_id.value);
        // formData.append("brand_id", event.target.brand_id.value);
        // formData.append("short_desc", shortDesc);
        // formData.append("long_desc", longDesc);
        // formData.append("regular_price", event.target.regular_price.value);
        // formData.append("sale_price", event.target.sale_price.value);
        // formData.append("sku", event.target.sku.value);
        // formData.append("qty", event.target.qty.value);
        // formData.append("stock_status", event.target.stock_status.value);
        // formData.append("is_featured", event.target.is_featured.value);
        // formData.append("is_trendy", event.target.is_trendy_product.value);
        // formData.append("just_arrived", event.target.just_arrived.value);
        // formData.append("is_top_selling", event.target.is_top_selling.value);

        // if (event.target.thumbnail_image.files[0]) {
        //     formData.append("thumbnail_image", event.target.thumbnail_image.files[0]);
        // }

        // if (event.target.galleryImages.files.length > 0) {
        //     for (let i = 0; i < event.target.galleryImages.files.length; i++) {
        //         formData.append("galleryImages", event.target.galleryImages.files[i]);
        //     }
        // }

        // console.log(...formData);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }

        try {
            dispatch(showLoader());
            const response = await createProductService(formData);
            if (response?.status === "success") {
                setTimeout(() => {
                    toast.success(`${response?.message}`);
                    formRef.current.reset();
                    setThumbnailPreview(null);
                    setGalleryPreviews([]);
                    setShortDesc("");
                    setLongDesc("");
                    dispatch(hideLoader());
                }, 300);

            } else {
                setTimeout(() => {
                    toast.error(`${response?.message}`);
                    dispatch(hideLoader());
                }, 300)
            }
        } catch (error) {
            console.error("Error creating the product:", error);
            toast.error("An error occurred while creating the product");
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
                toast.error(response?.message);
                console.error('Failed to fetch categories:', response?.message);
            }
            } catch (error) {
                toast.error(error.response?.data?.message);
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

    }, [dispatch]);

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

                        <div className="gap22 cols">

                            <fieldset className="category">
                                <div className="body-title mb-10">{t("category")} <span className="tf-color-1">*</span>
                                </div>
                                <div className="select">
                                    <select name="cat_id">
                                        <option value="">{t("select_category")}</option>
                                        {categories && categories.length > 0 && categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </fieldset>

                            <fieldset className="category">
                                <div className="body-title mb-10">{t("sub_category")}
                                </div>
                                <div className="select">
                                    <select name="sub_cat_id">
                                        <option>{t("select_sub_category")}</option>
                                        {categories && categories.length > 0 && categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </fieldset>

                            <fieldset className="brand">
                                <div className="body-title mb-10">{t("brand")} <span className="tf-color-1">*</span>
                                </div>
                                <div className="select">
                                    <select name="brand_id">
                                        <option value="">{t("select_brand")}</option>
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

                            {/* <Editor 
                            name="short_desc"
                            value={shortDesc} 
                            onTextChange={(e) => setShortDesc(e.htmlValue)} 
                            style={{ height: '200px' }} 
                            /> */}

                            <textarea 
                            className="mb-10 ht-150" 
                            name="short_desc"
                            placeholder={ t("write_text") }
                            onChange={(e) => setShortDesc(e.target.value)}
                            >
                                {shortDesc}
                            </textarea>

                        </fieldset>

                        <fieldset className="description">
                            <div className="body-title mb-10">{t("long_description")} <span className="tf-color-1">*</span>
                            </div>

                            {/* <Editor 
                            name="long_desc"
                            value={longDesc} 
                            onTextChange={(e) => setLongDesc(e.htmlValue)} 
                            style={{ height: '200px' }} 
                            /> */}

                            <textarea 
                            className="mb-10" 
                            name="long_desc" 
                            placeholder={ t("write_text") }
                            onChange={(e) => setLongDesc(e.target.value)}
                            >
                                {longDesc}
                            </textarea>

                        </fieldset>

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
                                    <label className="uploadfile" htmlFor="myFile">
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

                    </div>

                    <div className="wg-box">

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
                                    <label className="uploadfile" htmlFor="gFile">
                                        <span className="icon">
                                            <i className="icon-upload-cloud"></i>
                                        </span>
                                        <span className="text-tiny">{t("drop_images")} <span className="tf-color">{t("click_to_browse")}</span></span>
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
                                <div className="body-title mb-10">{t("featured_product")}</div>
                                <div className="select mb-10">
                                    <select name="is_featured">
                                        <option value="false">{t("no")}</option>
                                        <option value="true">{t("yes")}</option>
                                    </select>
                                </div>
                            </fieldset>
                        </div>

                        <div className="cols gap22">

                            <fieldset className="name">
                                <div className="body-title mb-10">{t("trendy_product")}</div>
                                <div className="select mb-10">
                                    <select name="is_trendy_product">
                                        <option value="false">{t("No")}</option>
                                        <option value="true">{t("Yes")}</option>
                                    </select>
                                </div>
                            </fieldset>

                            <fieldset className="name">
                                <div className="body-title mb-10">{t("new_arrival")}</div>
                                <div className="select mb-10">
                                    <select name="just_arrived">
                                        <option value="false">{t("No")}</option>
                                        <option value="true">{t("Yes")}</option>
                                    </select>
                                </div>
                            </fieldset>

                            <fieldset className="name">
                                <div className="body-title mb-10">{t("top_selling")}</div>
                                <div className="select mb-10">
                                    <select name="is_top_selling">
                                        <option value="false">{t("No")}</option>
                                        <option value="true">{t("Yes")}</option>
                                    </select>
                                </div>
                            </fieldset>

                        </div>

                        <div className="cols gap10">
                            <button 
                            className="tf-button w-full" 
                            type="submit"
                            disabled={loading}
                            >
                                {loading ? t("saving..") : t("add_product")}
                            </button>
                        </div>
                    </div>

                </form>
          </div>
      </div>
  )
}

export default CreateProduct