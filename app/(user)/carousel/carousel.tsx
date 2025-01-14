"use client"
import styles from './carousel.module.css'

//this function is for display carousel in dashboard user
export default function Carousel () {
  return <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
              aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
              aria-label="Slide 4"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"
              aria-label="Slide 5"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className={styles.img} src="/banner/banner-1.jpg" alt="First slide"/>
      </div>
      <div className="carousel-item">
        <img className={styles.img} src="/banner/banner-2.jpg" alt="Second slide"/>
      </div>
      <div className="carousel-item">
        <img className={styles.img} src="/banner/banner-3.jpg" alt="Third slide"/>
      </div>
      <div className="carousel-item">
        <img className={styles.img} src="/banner/banner-4.png" alt="Fourth slide"/>
      </div>
      <div className="carousel-item">
        <img className={styles.img} src="/banner/banner-5.jpg" alt="Fiveth slide"/>
      </div>

    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
}
