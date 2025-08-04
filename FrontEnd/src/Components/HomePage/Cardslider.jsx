import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function CardSlider() {
    const x = `images/cardslider`
    const slides = [
        `${x}/android.webp`,
        `${x}/ehack.webp`,
        `${x}/cpp.webp`,
        `${x}/office.webp`,
        `${x}/js.webp`,
        `${x}/coding.webp`,
        `${x}/ai.webp`,
        `${x}/tail.webp`,
        `${x}/ppt.webp`,
        `${x}/python.webp`,
        `${x}/ai1.webp`,
        `${x}/ps1.webp`,
    ];

    return (
        <div style={{ width: "100%", overflow: "hidden" }} className="about-section">
            <Swiper
                className="pb-5 about-card"
                style={{ height: "100%", width: "100%" }}
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                loop={true}
                slidesPerView={9}
                slidesPerGroup={1}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                spaceBetween={10}
                centeredSlides={false}
                watchSlidesProgress={true}
                grabCursor={true}
            >
                {slides.map((src, index) => (
                    <SwiperSlide key={index} className="swiper-slide-custom">
                        <img src={src} loading="lazy" alt={`Slide ${index + 1}`} className="slide-image img-fluid" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <style>{`
                .swiper-slide-custom {
                    width: 210px !important;
                    height: 130px !important;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 12px;
                    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                }

                .slide-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 12px;
                }

                .swiper-pagination-bullet {
                    width: 15px !important;
                    height: 6px !important;
                    border-radius: 9px !important;
                    background: #001297 !important;
                }
            `}</style>
        </div>
    );
}
