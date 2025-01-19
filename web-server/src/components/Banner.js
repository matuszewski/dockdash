import React from 'react'

function Banner() {
   return (
      <section className='Banner'>
         <div className="row m-3">
            <div className='col p-5 bg-success rounded-3'>
               <h1>Banner Component</h1>

               <div class="row">
                  <div class="col-md-6 p-5 bg-light rounded">
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
         </div>
      </section>
   );
}

export default Banner;
