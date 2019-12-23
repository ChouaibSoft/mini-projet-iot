<template>
   <div id="home">
        <home-nav/>
       <header>
         <div class="header-img"> </div>
          <div class="section">
              <div class="container">
                <h1 class="header center black-text">Iot Agriculture</h1>
                <div class="row">
                  <h5 class="header col s12"><i class="small material-icons">check_box</i> Collect your data from sensors</h5>
                  <h5 class="header col s12"><i class="small material-icons">check_box</i> Visualize, analyse and protect your data</h5>
                  <h5 class="header col s12"><i class="small material-icons">check_box</i> Controle your IOT devices remotely </h5>
                </div>
                <div class="center">
                   <router-link to="/auth" class="btn-large waves-effect waves-light">
                        Get Started
                  </router-link>
                </div>
            </div>
           </div>
       </header>
       <br><br><br>

    <div class="section">
      <div class="container">
          <div class="row">
            <div class="col s12 m4">
              <div>
                <h2 class="center indigo-text"><i class="large material-icons">settings_input_antenna</i></h2>
                <h5 class="center">Collect data</h5>

                <p class="light"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam tenetur, doloremque, modi aut maiores asperiores molestiae delectus eligendi architecto amet doloribus soluta nesciunt! Odit cupiditate sed quae! Earum, praesentium illum.</p>
              </div>
            </div>

            <div class="col s12 m4">
              <div>
                <h2 class="center indigo-text"><i class="large material-icons">pie_chart</i></h2>
                <h5 class="center">Analyze and visualize your data </h5>

                <p class="light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut tempora porro itaque mollitia soluta minima sint, sed alias? Vitae amet beatae nam praesentium deleniti quod. Pariatur quasi amet facere officiis?</p>
              </div>
            </div>

            <div class="col s12 m4">
              <div>
                <h2 class="center indigo-text"><i class="large material-icons">settings</i></h2>
                <h5 class="center">Controle IOT devices</h5>

                <p class="light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aut soluta cumque isquam asperiores nemo minima! Necessitatibus optio repellat accusamus!</p>
              </div>
            </div>
          </div>
        </div>
  </div>

     <footer class="footer-distributed">
      <div class="container">
       <div class="footer-left">

         <h3>Agriculture <span>IOT</span></h3>

         <p class="footer-links">
           <a href="#">Home</a>

           ·
           <a href="#">About</a>
           ·
           <a href="#">Faq</a>
           ·
           <a href="#">Contact</a>
         </p>

         <p class="footer-company-name">Iot Agriculture &copy; 2019</p>
       </div>

       <div class="footer-center">

         <div>
           <i class="fa fa-map-marker"></i>
           <p><span>22 SBA EL WIAM Street</span> SIDI BEL ABBES, ALGERIA</p>
         </div>

         <div>
           <i class="fa fa-phone"></i>
           <p>+6 55 123456</p>
         </div>

         <div>
           <i class="fa fa-envelope"></i>
           <p><a href="mailto:support@company.com">esi-iot@esi-sba.dz</a></p>
         </div>

       </div>

       <div class="footer-right">

         <p class="footer-company-about">
           <span>About US</span>
           Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
         </p>

       </div>
      </div>
     </footer>


   </div>
</template>

<script>
import HomeNav from '../components/HomeNav'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'home',
  components: {
    'home-nav': HomeNav
  },
  computed: {
      ...mapState([
          'jwtToken',
      ])
  }
}
</script>


<style scoped>

.header-img {
  position: absolute;
  background:url(../assets/images/smart-agriculture-700x394.png);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 530px;
  width: 100%;
  z-index: -1;
  opacity: 0.7;

}
.footer-distributed{
  background-color: #616161;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  font:  16px sans-serif;

  padding: 55px 50px;
  margin-top: 80px;
}

.footer-distributed .footer-left,
.footer-distributed .footer-center,
.footer-distributed .footer-right{
  display: inline-block;
  vertical-align: top;
}

/* Footer left */

.footer-distributed .footer-left{
  width: 40%;
}

/* The company logo */

.footer-distributed h3{
  color:  #ffffff;
  font: normal 36px 'Cookie', cursive;
  margin: 0;
}

.footer-distributed h3 span{
  color:  #5383d3;
}

/* Footer links */

.footer-distributed .footer-links{
  color:  #ffffff;
  margin: 20px 0 12px;
  padding: 0;
}

.footer-distributed .footer-links a{
  display:inline-block;
  line-height: 1.8;
  text-decoration: none;
  color:  inherit;
}

.footer-distributed .footer-company-name{
  color:  #8f9296;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
}

/* Footer Center */

.footer-distributed .footer-center{
  width: 35%;
}

.footer-distributed .footer-center i{
  background-color:  #616161;;
  color: #ffffff;
  font-size: 25px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  margin: 10px 15px;
  vertical-align: middle;
}

.footer-distributed .footer-center i.fa-envelope{
  font-size: 17px;
  line-height: 38px;
}

.footer-distributed .footer-center p{
  display: inline-block;
  color: #ffffff;
  vertical-align: middle;
  margin:0;
}

.footer-distributed .footer-center p span{
  display:block;
  font-weight: normal;
  font-size:14px;
  line-height:2;
}

.footer-distributed .footer-center p a{
  color:  #5383d3;
  text-decoration: none;;
}


/* Footer Right */

.footer-distributed .footer-right{
  width: 20%;
}

.footer-distributed .footer-company-about{
  line-height: 20px;
  color:  #92999f;
  font-size: 13px;
  font-weight: normal;
  margin: 0;
}

.footer-distributed .footer-company-about span{
  display: block;
  color:  #ffffff;
  font-size: 14px;

  margin-bottom: 20px;
}

.footer-distributed .footer-icons{
  margin-top: 25px;
}

.footer-distributed .footer-icons a{
  display: inline-block;
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color:  #616161;;
  border-radius: 2px;

  font-size: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 35px;

  margin-right: 3px;
  margin-bottom: 5px;
}

/* If you don't want the footer to be responsive, remove these media queries */

@media (max-width: 880px) {

  .footer-distributed{
    font:  14px sans-serif;
  }

  .footer-distributed .footer-left,
  .footer-distributed .footer-center,
  .footer-distributed .footer-right{
    display: block;
    width: 100%;
    margin-bottom: 40px;
    text-align: center;
  }

  .footer-distributed .footer-center i{
    margin-left: 0;
  }

}


</style>
