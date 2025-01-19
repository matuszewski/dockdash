import React from 'react'

function Banner() {
   return (
      <section className='Banner'>
         <div className="row m-3 mt-5">
            <div className='col my-5 rounded-3'>

               <div class="row">
                  <div class="col-md-10 p-5 bg-secondary rounded-3">
                     <h1><b>: :</b> dock<b>dash</b></h1>
                     <p>Część projektowa pracy magisterskiej</p>
                     <table class="table">
                        <tbody>
                           <tr>
                              <td>autor</td>
                              <td>Krzysztof Matuszewski</td>
                           </tr>
                           <tr>
                              <td>indeks</td>
                              <td>160802</td>
                           </tr>
                           <tr>
                              <td>email</td>
                              <td>krzysiekmatuszewski@outlook.com</td>
                           </tr>
                           <tr>
                              <td>github</td>
                              <td>@matuszewski</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>

            </div>




            <div className='col my-5 rounded-3'>
               <div class="row">
                  <div class="col-md-6 p-5 bg-secondary rounded-3">
                     <h1>Zasoby</h1>
                     <p>Część projektowa pracy magisterskiej</p>
                     <table class="table">
                        <tbody>
                           <tr>
                              <td>autor</td>
                              <td>Krzysztof Matuszewski</td>
                           </tr>
                           <tr>
                              <td>indeks</td>
                              <td>160802</td>
                           </tr>
                           <tr>
                              <td>email</td>
                              <td>krzysiekmatuszewski@outlook.com</td>
                           </tr>
                           <tr>
                              <td>github</td>
                              <td>@matuszewski</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}

export default Banner;
