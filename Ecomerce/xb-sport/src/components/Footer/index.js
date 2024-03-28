export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="register container">
          <span className="register__title col-3 col-lg-12 col-md-12">ĐĂNG KÝ NHẬN TIN</span>
          <form className="register__form col-5 col-lg-8 col-md-12">
            <input type="email" placeholder="Email" />
            <button>
              <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
              ĐĂNG KÝ
            </button>
          </form>
          <div className="register__social col-4 col-lg-4 col-md-12">
            <a href="/">
              <i class="fa-brands fa-tiktok"></i>
            </a>
            <a href="/">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="/">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__mid">
        <div className="container d-flex">
          <div className="item-info col-3  col-lg-6 col-md-12">
            <a className="img-container" href="/">
              <img className="logo" src={require('../../assets/images/header-logo.png')} alt="logo" />
            </a>
            <p>
              XBSPORTS.VN - Hệ thống cửa hàng chuyên cung cấp các sản phẩm cầu lông chính hãng: vợt, giày, cước, phụ
              kiện.
            </p>
            <ul>
              <li>
                <i class="fa fa-map-marker" aria-hidden="true"></i> Số cửa hàng: 4
              </li>
              <li>
                <i class="fa fa-phone" aria-hidden="true"></i>{' '}
                <a rel="nofollow" href="tel:Zalo: 0964 953 286">
                  Zalo: 0964 953 286
                </a>
              </li>
              <li>
                <i class="fa fa-envelope-o" aria-hidden="true"></i>{' '}
                <a rel="nofollow" href="mailto:XbSportsvn@gmail.com ">
                  XbSportsvn@gmail.com{' '}
                </a>
              </li>
              <li>© CÔNG TY TNHH XB SPORT</li>
              <li>MST: 0318177707</li>
            </ul>
          </div>
          <div className="item-info col-3 col-lg-6 col-md-12">
            <div className="item-info__title">CHÍNH SÁCH</div>
            <div className="item-info__body">
              <ul className="list-info">
                <li>
                  <a href="/">Chính sách xử lý khiếu nại</a>
                </li>
                <li>
                  <a href="/">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="/">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="/">Chính sách dịch vụ</a>
                </li>
                <li>
                  <a href="/">Chính sách đổi trả</a>
                </li>
                <li>
                  <a href="/">Liên hệ</a>
                </li>
                <li>
                  <a href="/">Hướng dẫn kiểm tra bảo hành</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="item-info col-3 col-lg-6 col-md-12">
            <div className="item-info__title">CHĂM SÓC KHÁCH HÀNG</div>
            <div className="item-info__body">
              <ul className="list-info">
                <li>
                  <a href="/">Dịch vụ căng lưới</a>
                </li>
                <li>
                  <a href="/">Tra cứu đơn hàng</a>
                </li>
                <li>
                  <a href="/">Hỏi đáp - FAQs</a>
                </li>
                <li>
                  <a href="/">Hướng dẫn mua hàng Online</a>
                </li>
                <li>
                  <a href="/">Tuyển dụng - Cơ hội việc làm</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="item-info col-3 col-lg-6 col-md-12">
            <div className="item-info__title">Thời gian mở cửa</div>
            <p>08:00 - 21:30</p>
            <div className="item-info__title margin-top-20px">Phương thức thanh toán</div>
            <div className="img-container">
              <img className="item-info__img" src={require('../../assets/images/footer_trustbadge.webp')} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bot">
        <div className="container">
          <span>
            © Copyright {new Date().getFullYear()} By <a href="/"> XBSPORTS - HỆ THỐNG CỬA HÀNG CẦU LÔNG UY TÍN.</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
