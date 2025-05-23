import React from 'react'

function Images() {
   return (
      <section className='Images'>
         <div className="row m-3">
            <div className="col p-5 bg-secondary rounded-3">
               <h1>Obrazy</h1>
               <div className="row mt-4">
                  <table className="table table-hover">
                     <thead className="thead-light">
                        <tr>
                           <th scope="col">Repository</th>
                           <th scope="col">Tag</th>
                           <th scope="col">Image ID</th>
                           <th scope="col">Created</th>
                           <th scope="col">Size</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr><td>docker101tutorial                 </td><td>latest</td>    <td>17759a2d875c</td>   <td>3 weeks ago </td>   <td>28.3MB</td></tr>
                        <tr><td>mysql                             </td><td>latest</td>    <td>ecac195d15af</td>   <td>3 weeks ago </td>   <td>516MB</td></tr>
                        <tr><td>node                              </td><td>latest</td>    <td>c4fbd6393264</td>   <td>4 weeks ago </td>   <td>905MB</td></tr>
                        <tr><td>alpine/git                        </td><td>latest</td>    <td>612b988140be</td>   <td>5 weeks ago </td>   <td>27.4MB</td></tr>
                        <tr><td>docker.elastic.co/kibana/kibana   </td><td>7.15.1</td>    <td>9871707dda25</td>   <td>5 weeks ago </td>   <td>1.19GB</td></tr>
                        <tr><td>elasticsearch                     </td><td>7.14.2</td>    <td>2abd5342ace0</td>   <td>2 months ago</td>   <td>1.04GB</td></tr>
                        <tr><td>docker.elastic.co/kibana/kibana   </td><td>7.14.2</td>    <td>750d302f8aff</td>   <td>2 months ago</td>   <td>1.29GB</td></tr>
                        <tr><td>kibana                            </td><td>7.14.2</td>    <td>750d302f8aff</td>   <td>2 months ago</td>   <td>1.29GB</td></tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Images;
