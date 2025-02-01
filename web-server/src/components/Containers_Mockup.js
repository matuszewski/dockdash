import React from 'react'

function Containers() {
   return (
      <section id="containers" className='Containers'>
         <div className="row m-3">
            <div className='col p-5 bg-secondary rounded-3'>
               <h1>Kontenery</h1>
               <div className="row mt-4">
                  <table className="table table-hover">
                     <thead className="thead-light">
                     <tr>
                        <th scope="col">Container ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Command</th>
                        <th scope="col">Created</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ports</th>
                        <th scope="col">Name</th>
                     </tr>
                     </thead>
                     <tbody>
                     <tr>
                        <td>c9a233d90e10</td>
                        <td>mysql</td>
                        <td>docker-entrypoint.s…</td>
                        <td>2m ago</td>
                        <td>Up</td>
                        <td>2332:2300</td>
                        <td>api-server</td>
                     </tr>
                     <tr>
                        <td>78a2c356ef99</td>
                        <td>node</td>
                        <td>npm start</td>
                        <td>6h 21m ago</td>
                        <td>Up</td>
                        <td>3444:8008</td>
                        <td>rwd-frontend</td>
                     </tr>
                     <tr>
                        <td>d2abcc350e19</td>
                        <td>redis</td>
                        <td>docker-entrypoint.s…</td>
                        <td>3d ago</td>
                        <td>Exited</td>
                        <td>5000:5000</td>
                        <td>redis-container</td>
                     </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>
   );
}

export default Containers;


