import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";

import { convertNumbersToPersian } from "../../utils/convert";
import { useGetProduct } from "../../configs/queries";

import Loading from "../modules/Loading";
import styles from "./ProductPage.module.css";
const ProductPage = () => {
  const { productId } = useParams();
  const [imgSelected, setImgSelected] = useState(1);
  const [errorMessageProduct, setErrorMessageProduct] = useState(null);
  const { data, isLoading, error } = useGetProduct(productId);

  useEffect(() => {
    const handleError = (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessageProduct(
              "محصولی یافت نشد."
            );
            break;
          case 404:
            setErrorMessageProduct("محصولی یافت نشد.");
            break;
          case 500:
            setErrorMessageProduct("خطای داخلی سرور. لطفا بعدا دوباره امتحان کنید.");
            break;
          default:
            setErrorMessageProduct("خطایی در هنگام دریافت محصول رخ داده است.");
        }
      } else if (error.request) {
        setErrorMessageProduct("خطای شبکه: اتصال به سرور برقرار نشد.");
      } else {
        setErrorMessageProduct("خطای غیرمنتظره‌ای رخ داده است.");
      }
    };

    if (error) {
      handleError(error);
    } else {
      setErrorMessageProduct(null);
    }
  }, [error]);
  
  const numberImages = [1, 2, 3, 4];
  if (isLoading) return <Loading />;
  if (errorMessageProduct) return <h5 className={styles.errorMessage}>{errorMessageProduct}</h5>
  return (
    <article className={styles.wrapper}>
      <div className={styles.imagesWrapper}>
        <ul className={styles.imagesBox}>
          {numberImages.map((num) => (
            <li key={num}>
              <img
                onClick={() => setImgSelected(num)}
                src={`/images/${num}.jfif`}
                alt="picture"
              />
            </li>
          ))}
        </ul>
        <div className={styles.selectedImg}>
          <img src={`/images/${imgSelected}.jfif`} alt="picture selected" />
        </div>
      </div>
      <div className={styles.dataWrapper}>
        <h3>{data?.id}</h3>
        <h1>{data?.name}</h1>
        <div className={styles.row}>
          <p>تعداد باقیمانده محصول</p>
          <h5> {data?.quantity && convertNumbersToPersian(data?.quantity)}</h5>
          <p>عدد</p>
        </div>
        <div className={styles.row}>
          <p>قیمت محصول</p>
          <h5> {data?.price && convertNumbersToPersian(data?.price)}</h5>
          <p>هزار تومان</p>
        </div>

        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
        </p>
      </div>
    </article>
  );
};

export default ProductPage;
