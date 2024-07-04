
// // import { useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// // export default function Carousel (){
// //     return (
// //         <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
// //             <ol className="carousel-indicators">
// //                 <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
// //                 <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
// //                 <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
// //             </ol>
// //             <div className="carousel-inner">
// //                 <div className="carousel-item active">
// //                     <img className="d-block w-50" src="/genshin.jpg" alt="First slide"/>
// //                 </div>
// //                 <div className="carousel-item">
// //                     <img className="d-block w-50" src="/icongenshin.jpg" alt="Second slide"/>
// //                 </div>
// //                 <div className="carousel-item">
// //                     <img className="d-block w-50" src="/noproduct.jpg" alt="Third slide"/>
// //                 </div>
// //             </div>
// //             <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
// //                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
// //                 <span className="sr-only">Previous</span>
// //             </a>
// //             <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
// //                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
// //                 <span className="sr-only">Next</span>
// //             </a>
// //         </div>
// //     )
// // }


"use client"
import styles from './carousel.module.css'
// import { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Carousel () {
//   useEffect(() => {
//     // Import Bootstrap JS dynamically only on the client side
//     import('bootstrap/dist/js/bootstrap.bundle.min.js');
//   }, []);

  return (
    <div id="carouselExampleIndicators" className={`carousel slide ${styles.container}`} data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className={styles.img} src="/genshin.jpg" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className={styles.img} src="icongenshin.jpg" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className={styles.img} src="/noproduct.jpg" alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
};
